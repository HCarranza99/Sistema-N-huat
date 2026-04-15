import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useGameStore from './store/useGameStore'
import ErrorBoundary from './components/ErrorBoundary'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import LessonScreen from './screens/LessonScreen'
import ResultScreen from './screens/ResultScreen'
import { startSession, endSession } from './services/analytics'

export default function App() {
  const hasSeenOnboarding = useGameStore((s) => s.hasSeenOnboarding)
  const participantId = useGameStore((s) => s.participantId)
  const currentSessionId = useGameStore((s) => s.currentSessionId)
  const setSessionId = useGameStore((s) => s.setSessionId)

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

  return (
    <ErrorBoundary>
      <div className="app-shell">
        {!hasSeenOnboarding ? (
          <OnboardingScreen />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/lesson/:id" element={<LessonScreen />} />
              <Route path="/result" element={<ResultScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </ErrorBoundary>
  )
}
