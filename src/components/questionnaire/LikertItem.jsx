import { LIKERT_5_LABELS, LIKERT_5_SHORT_LABELS } from '../../data/questionnaires'

/**
 * Ítem Likert 1–5 — fila segmentada con número y etiqueta breve en cada botón.
 * Las etiquetas textuales bajo cada número reemplazan un gradiente de color
 * para evitar sesgar al usuario en ítems con polaridad alternada (SUS).
 *
 * answer = { valueNumeric: 1|2|3|4|5 } o null
 */
export default function LikertItem({ answer, onChange }) {
  const selected = answer?.valueNumeric ?? null

  return (
    <div className="likert-row" role="radiogroup" aria-label="Selecciona una opción del 1 al 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={selected === n}
          aria-label={`${n} — ${LIKERT_5_LABELS[n]}`}
          className={`likert-btn ${selected === n ? 'likert-selected' : ''}`}
          onClick={() => onChange({ valueNumeric: n, valueText: null, valueOther: null })}
        >
          <span className="likert-num">{n}</span>
          <span className="likert-label">{LIKERT_5_SHORT_LABELS[n]}</span>
        </button>
      ))}
    </div>
  )
}
