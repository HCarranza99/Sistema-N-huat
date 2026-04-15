import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'

import lessons from '../data/lessons'
import { GAME_CONFIG } from '../data/gameConfig'
import useGameStore from '../store/useGameStore'
import {
  startLessonAttempt,
  completeLessonAttempt,
  logExerciseResponse,
} from '../services/analytics'
import { playCorrect, playWrong, playComplete } from '../lib/sounds'

import ProgressBar from '../components/ui/ProgressBar'
import LivesBar from '../components/ui/LivesBar'
import FeedbackModal from '../components/ui/FeedbackModal'
import Flashcard from '../components/exercises/Flashcard'
import MultipleChoiceText from '../components/exercises/MultipleChoiceText'
import Matching from '../components/exercises/Matching'
import BuildSentence from '../components/exercises/BuildSentence'

export default function LessonScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons.find((l) => l.id === parseInt(id))

  const { lives, loseLife, completeLesson, recordPlay, participantId, currentSessionId } = useGameStore()

  const [phase, setPhase] = useState('intro')   // 'intro' | 'playing'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, xp: 0 })
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'

  // ── Refs para tiempos (no necesitan causar re-renders) ────────
  const attemptIdRef = useRef(null)
  const lessonStartRef = useRef(null)
  const exerciseStartRef = useRef(null)

  if (!lesson) return <Navigate to="/" replace />
  if (lives === 0) return <Navigate to="/" replace />

  const items = lesson.items
  const current = items[currentIndex]

  // Palabras de preview para la pantalla de intro (hasta 5 pares)
  const previewWords = lesson.items
    .filter((it) => it.nahuat_word && it.spanish_translation)
    .slice(0, 5)

  const xpForType = (type) => GAME_CONFIG.itemTypes[type]?.xp ?? 10

  // Hint lookup: nahuat word → spanish translation
  const hints = Object.fromEntries(
    lesson.items
      .filter((it) => it.nahuat_word && it.spanish_translation)
      .map((it) => [it.nahuat_word, it.spanish_translation])
  )

  // ── PANTALLA DE INTRO ────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="screen lesson-intro-screen">
        <button
          className="close-btn lesson-intro-close"
          onClick={() => navigate('/')}
          aria-label="Salir"
        >
          ✕
        </button>

        <div className="lesson-intro-content">
          <div
            className="lesson-intro-badge"
            style={{ background: lesson.color + '22', border: `2px solid ${lesson.color}44` }}
          >
            <span className="lesson-intro-icon">{lesson.icon}</span>
          </div>

          <h1 className="lesson-intro-title">{lesson.title}</h1>
          <p className="lesson-intro-desc">{lesson.description}</p>

          {previewWords.length > 0 && (
            <div className="lesson-intro-vocab">
              <p className="vocab-label">En esta lección aprenderás</p>
              {previewWords.map((w, i) => (
                <div key={i} className="vocab-row">
                  <span className="vocab-nahuat">{w.nahuat_word}</span>
                  <span className="vocab-arrow">→</span>
                  <span className="vocab-spanish">{w.spanish_translation}</span>
                </div>
              ))}
              {lesson.items.length > 5 && (
                <p className="vocab-more">…y {lesson.items.length - 5} ejercicios más</p>
              )}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary lesson-intro-btn"
          onClick={async () => {
            // Registrar inicio del intento en Supabase
            lessonStartRef.current = Date.now()
            exerciseStartRef.current = Date.now()
            const aid = await startLessonAttempt(participantId, currentSessionId, lesson)
            attemptIdRef.current = aid
            setPhase('playing')
          }}
        >
          Empezar lección
        </button>
      </div>
    )
  }

  // ── Navigate to next item or finish lesson ──────────────────
  const goNext = (finalScore) => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= items.length) {
      const ratio = items.length > 0 ? finalScore.correct / items.length : 0
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1
      playComplete()
      recordPlay()
      completeLesson(lesson.id, ratio, finalScore.xp)
      completeLessonAttempt(attemptIdRef.current, lessonStartRef.current, ratio, stars, finalScore.xp)
      navigate('/result', {
        state: {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonIcon: lesson.icon,
          score: ratio,
          xpEarned: finalScore.xp,
          totalItems: items.length,
        },
      })
    } else {
      exerciseStartRef.current = Date.now()
      setCurrentIndex(nextIndex)
    }
  }

  // ── Handlers para ejercicios con feedback modal ─────────────
  const handleCorrect = () => {
    playCorrect()
    const xp = xpForType(current.type)
    const updated = { correct: score.correct + 1, xp: score.xp + xp }
    setScore(updated)
    logExerciseResponse(participantId, currentSessionId, attemptIdRef.current, current, true, exerciseStartRef.current)
    setFeedback('correct')
  }

  const handleWrong = () => {
    playWrong()
    loseLife()
    logExerciseResponse(participantId, currentSessionId, attemptIdRef.current, current, false, exerciseStartRef.current)
    setFeedback('wrong')
  }

  // Called when user taps "Continuar" (or "Volver al inicio" when no lives)
  const handleContinue = () => {
    setFeedback(null)
    if (lives === 0) {
      navigate('/')
      return
    }
    goNext(score)
  }

  // ── Handlers para ejercicios que se auto-avanzan ────────────
  const handleFlashcard = (knew) => {
    if (knew) playCorrect()
    const xp = xpForType('flashcard')
    const updated = knew
      ? { correct: score.correct + 1, xp: score.xp + xp }
      : score
    logExerciseResponse(participantId, currentSessionId, attemptIdRef.current, current, knew, exerciseStartRef.current)
    setScore(updated)
    goNext(updated)
  }

  const handleMatchingComplete = () => {
    playCorrect()
    const xp = xpForType('matching')
    const updated = { correct: score.correct + 1, xp: score.xp + xp }
    logExerciseResponse(participantId, currentSessionId, attemptIdRef.current, current, true, exerciseStartRef.current)
    setScore(updated)
    goNext(updated)
  }

  // ── Render current exercise ─────────────────────────────────
  const renderExercise = () => {
    switch (current.type) {
      case 'flashcard':
        return (
          <Flashcard
            item={current}
            onKnew={() => handleFlashcard(true)}
            onDidntKnow={() => handleFlashcard(false)}
          />
        )
      case 'multiple_choice_text':
        return (
          <MultipleChoiceText
            item={current}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        )
      case 'matching':
        return <Matching item={current} onComplete={handleMatchingComplete} />
      case 'build_sentence':
        return (
          <BuildSentence
            item={current}
            hints={hints}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        )
      default:
        return <p style={{ padding: '2rem', textAlign: 'center' }}>Tipo de ejercicio no soportado: {current.type}</p>
    }
  }

  const progress = currentIndex / items.length

  return (
    <div className={`screen lesson-screen ${feedback ? 'has-feedback' : ''}`}>
      {/* ── TOP BAR ── */}
      <div className="lesson-top-bar">
        <button
          className="close-btn"
          onClick={() => navigate('/')}
          aria-label="Salir de la lección"
        >
          ✕
        </button>
        <ProgressBar value={progress} />
        <LivesBar lives={lives} />
      </div>

      {/* ── EXERCISE ── key forces remount (state reset) on each new item */}
      <div key={currentIndex} className="exercise-wrapper">
        {renderExercise()}
      </div>

      {/* ── FEEDBACK BAR ── */}
      {feedback && (
        <FeedbackModal
          type={feedback}
          correctAnswer={current.spanish_translation}
          onContinue={handleContinue}
          noLives={lives === 0}
        />
      )}
    </div>
  )
}
