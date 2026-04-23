import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lessons from '../data/lessons'
import useGameStore from '../store/useGameStore'
import { GAME_CONFIG } from '../data/gameConfig'
import { INTERVENTION_MS } from '../data/questionnaires'
import { useLivesRecharge } from '../hooks/useLivesRecharge'
import TorogozBadge from '../components/ui/TorogozBadge'

function formatClock(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { xp, lives, streak, lessonProgress, resetLives } = useGameStore()
  const { minutesLeft } = useLivesRecharge()

  // ── Temporizador de 15 min (solo visible durante la fase 'playing') ──
  const studyPhase = useGameStore((s) => s.studyPhase)
  const pretestCompletedAt = useGameStore((s) => s.pretestCompletedAt)

  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (studyPhase !== 'playing') return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [studyPhase])

  const msLeft =
    studyPhase === 'playing' && pretestCompletedAt
      ? Math.max(0, INTERVENTION_MS - (now - Date.parse(pretestCompletedAt)))
      : null

  // ── Nivel y progreso de XP ──────────────────────────────────
  const xpPerLevel = GAME_CONFIG.xp.perLevel
  const level = Math.floor(xp / xpPerLevel) + 1
  const xpInLevel = xp % xpPerLevel
  const xpToNext = xpPerLevel - xpInLevel
  const levelPct = Math.round((xpInLevel / xpPerLevel) * 100)

  return (
    <div className="screen home-screen">
      {/* ── HEADER ── */}
      <header className="home-header">
        <div className="home-logo">
          <TorogozBadge size={52} />
          <div>
            <h1 className="logo-title">Náhuat</h1>
            <p className="logo-sub">Idioma del pueblo Pipil</p>
          </div>
        </div>

        <div className="home-header-right">
          <div className="home-lives">
            {Array.from({ length: GAME_CONFIG.lives.max }, (_, i) => (
              <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
            ))}
          </div>
          <div className="home-badges">
            {msLeft != null && (
              <div className="timer-badge" aria-label="Tiempo restante del estudio">
                <span className="xp-icon">⏱</span>
                <span className="xp-count">{formatClock(msLeft)}</span>
              </div>
            )}
            {streak > 0 && (
              <div className="streak-badge">
                <span>🔥</span>
                <span className="streak-count">{streak}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── SIN VIDAS ── */}
      {lives === 0 && (
        <div className="no-lives-banner">
          <p className="no-lives-text">
            {minutesLeft !== null
              ? `Sin vidas — recarga en ${minutesLeft} min`
              : 'Sin vidas — recuperando...'}
          </p>
          <button className="btn-recover" onClick={resetLives}>
            Recuperar
          </button>
        </div>
      )}

      {/* ── PROGRESO DE NIVEL ── */}
      <div className="level-card">
        <div className="level-card-head">
          <div className="level-card-info">
            <p className="level-card-label">XP total</p>
            <p className="level-card-xp">{xp}</p>
          </div>
          <div className="level-card-badge">
            <span className="level-card-badge-label">Nivel</span>
            <span className="level-card-badge-num">{level}</span>
          </div>
        </div>

        <div className="level-progress">
          <div className="level-progress-fill" style={{ width: `${levelPct}%` }} />
        </div>

        <p className="level-card-next">
          {xpToNext} XP para tu siguiente nivel
        </p>
      </div>

      {/* ── LESSON MAP ── */}
      <main className="lesson-map">
        <p className="map-label">Elige una lección</p>

        {lessons.map((lesson, index) => {
          const prev = index > 0 ? lessons[index - 1] : null
          const isUnlocked =
            index === 0 || lessonProgress[prev?.id]?.completed === true
          const isEmpty = lesson.items.length === 0
          const disabled = !isUnlocked || isEmpty || lives === 0
          const progress = lessonProgress[lesson.id]

          return (
            <button
              key={lesson.id}
              className={`lesson-card ${disabled ? 'lesson-locked' : ''} ${progress?.completed ? 'lesson-completed' : ''}`}
              style={{ '--lesson-color': lesson.color }}
              onClick={() => !disabled && navigate(`/lesson/${lesson.id}`)}
              disabled={disabled}
              aria-label={`${lesson.title}${disabled ? ', bloqueada' : ''}`}
            >
              <div
                className="card-icon-wrap"
                style={{ background: lesson.color + '22' }}
              >
                <span className="card-icon">{lesson.icon}</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{lesson.title}</h3>
                <p className="card-desc">{lesson.description}</p>
                {progress?.stars && (
                  <div className="card-stars">
                    {Array.from({ length: 3 }, (_, i) => (
                      <span key={i}>{i < progress.stars ? '⭐' : '☆'}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="card-right">
                {isEmpty ? (
                  <span className="badge-soon">Pronto</span>
                ) : !isUnlocked ? (
                  <span className="card-lock">🔒</span>
                ) : progress?.completed ? (
                  <div className="card-done">
                    <span className="card-done-check">✓</span>
                    <span className="card-done-label">Hecho</span>
                  </div>
                ) : (
                  <div className="card-xp">
                    <span className="card-xp-val">+{lesson.xpReward}</span>
                    <span className="card-xp-label">XP</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </main>
    </div>
  )
}
