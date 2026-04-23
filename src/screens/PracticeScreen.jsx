import { useState } from 'react'
import useGameStore from '../store/useGameStore'
import { PRACTICE_ITEM } from '../data/questionnaires'
import LikertItem from '../components/questionnaire/LikertItem'

export default function PracticeScreen() {
  const [answer, setAnswer] = useState(null)
  const finishPractice = useGameStore((s) => s.finishPractice)

  const answered = answer?.valueNumeric != null

  return (
    <div className="screen practice-screen">
      <div className="practice-body">
        <div className="onboarding-slide">
          <span className="onboarding-icon">✍️</span>
          <h1 className="onboarding-title">Practiquemos primero</h1>
          <p className="onboarding-text">
            A lo largo del cuestionario verás escalas del <strong>1 al 5</strong>. Selecciona el número que mejor refleje tu opinión. No hay respuestas correctas ni incorrectas — esta respuesta es solo de práctica y no se guardará.
          </p>
        </div>

        <div className="practice-card">
          <span className="question-section-label">Ejemplo</span>
          <h2 className="question-text">{PRACTICE_ITEM.question_text}</h2>
          <LikertItem answer={answer} onChange={setAnswer} />
          {answered && (
            <p className="practice-hint">
              ¡Listo! Así es como funciona la escala. Continúa cuando estés listo/a.
            </p>
          )}
        </div>
      </div>

      <div className="onboarding-actions">
        <button
          className="btn btn-primary"
          onClick={finishPractice}
          disabled={!answered}
        >
          Empezar el cuestionario →
        </button>
      </div>
    </div>
  )
}
