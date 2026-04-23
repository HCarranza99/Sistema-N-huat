import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useGameStore from './store/useGameStore'
import ErrorBoundary from './components/ErrorBoundary'
import ConsentScreen from './screens/ConsentScreen'
import AboutScreen from './screens/AboutScreen'
import PracticeScreen from './screens/PracticeScreen'
import PretestScreen from './screens/PretestScreen'
import PosttestScreen from './screens/PosttestScreen'
import HomeScreen from './screens/HomeScreen'
import LessonScreen from './screens/LessonScreen'
import ResultScreen from './screens/ResultScreen'
import { startSession, endSession } from './services/analytics'
import { INTERVENTION_MS } from './data/questionnaires'

export default function App() {
  const studyPhase = useGameStore((s) => s.studyPhase)
  const participantId = useGameStore((s) => s.participantId)
  const currentSessionId = useGameStore((s) => s.currentSessionId)
  const setSessionId = useGameStore((s) => s.setSessionId)
  const pretestCompletedAt = useGameStore((s) => s.pretestCompletedAt)
  const triggerPosttest = useGameStore((s) => s.triggerPosttest)

  // Guardamos el ms de inicio para calcular duración al cerrar
  const sessionStartRef = useRef(null)
  // Ref para acceder al sessionId actualizado en el listener de beforeunload
  const sessionIdRef = useRef(currentSessionId)

  useEffect(() => {
    sessionIdRef.current = currentSessionId
  }, [currentSessionId])

  // Inicia sesión cuando el participante está identificado
  useEffect(() => {
    if (!participantId) return

    let cancelled = false
    sessionStartRef.current = Date.now()

    startSession(participantId).then((sessionId) => {
      if (!cancelled && sessionId) setSessionId(sessionId)
    })

    const closeSession = () => {
      endSession(sessionIdRef.current, sessionStartRef.current)
    }

    // beforeunload: funciona en desktop
    window.addEventListener('beforeunload', closeSession)

    // visibilitychange: funciona en móvil cuando el usuario cambia de app o cierra pestaña
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') closeSession()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // pagehide: fallback para Safari iOS
    window.addEventListener('pagehide', closeSession)

    return () => {
      cancelled = true
      window.removeEventListener('beforeunload', closeSession)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('pagehide', closeSession)
      closeSession()
    }
  }, [participantId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger global del postest cuando se cumplen los 15 min (wall-clock).
  // Corre aunque el usuario esté dentro de una lección.
  useEffect(() => {
    if (studyPhase !== 'playing' || !pretestCompletedAt) return

    const start = Date.parse(pretestCompletedAt)
    const check = () => {
      if (Date.now() - start >= INTERVENTION_MS) {
        triggerPosttest()
      }
    }
    check() // por si al montar ya se cumplió el tiempo (recarga de página)
    const id = setInterval(check, 1000)
    return () => clearInterval(id)
  }, [studyPhase, pretestCompletedAt, triggerPosttest])

  // ── Routing por fase del estudio ─────────────────────────────
  const renderByPhase = () => {
    if (studyPhase === 'consent') return <ConsentScreen />
    if (studyPhase === 'about') return <AboutScreen />
    if (studyPhase === 'practice') return <PracticeScreen />
    if (studyPhase === 'pretest') return <PretestScreen />
    if (studyPhase === 'posttest') return <PosttestScreen />

    // 'playing' o 'free' → app con router normal
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/lesson/:id" element={<LessonScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <ErrorBoundary>
      <div className="app-shell">{renderByPhase()}</div>
    </ErrorBoundary>
  )
}
