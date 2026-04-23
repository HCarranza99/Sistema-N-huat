import LikertItem from './LikertItem'
import SingleChoiceItem from './SingleChoiceItem'
import ShortTextItem from './ShortTextItem'
import LongTextItem from './LongTextItem'

/**
 * Tarjeta de pregunta — encabezado + input según item_type.
 * Renderiza una sola pregunta por pantalla (coherente con el ritmo de las lecciones).
 */
export default function QuestionCard({ item, answer, onChange, sectionLabel }) {
  return (
    <div className="question-card">
      <div className="question-header">
        {sectionLabel && (
          <span className="question-section-label">{sectionLabel}</span>
        )}
        <p className="question-code">{item.code}</p>
        <h2 className="question-text">{item.question_text}</h2>
        {!item.is_required && <span className="question-optional">Opcional</span>}
      </div>

      <div className="question-input">
        {item.item_type === 'likert_5' && (
          <LikertItem answer={answer} onChange={onChange} />
        )}
        {item.item_type === 'single_choice' && (
          <SingleChoiceItem item={item} answer={answer} onChange={onChange} />
        )}
        {item.item_type === 'short_text' && (
          <ShortTextItem item={item} answer={answer} onChange={onChange} />
        )}
        {item.item_type === 'long_text' && (
          <LongTextItem item={item} answer={answer} onChange={onChange} />
        )}
      </div>
    </div>
  )
}
