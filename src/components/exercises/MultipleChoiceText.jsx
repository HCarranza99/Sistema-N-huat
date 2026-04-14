import { useState } from 'react'
import { useTextToSpeech } from '../../hooks/useTextToSpeech'

export default function MultipleChoiceText({ item, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null)
  const { speak, isSpeaking, isSupported } = useTextToSpeech(item.nahuat_word)

  const handleSelect = (option) => {
    if (selected) return
    setSelected(option)
    if (option.correct) {
      onCorrect()
    } else {
      onWrong()
    }
  }

  const getOptionClass = (option) => {
    const base = 'option-btn'
    if (!selected) return base
    if (option.correct) return `${base} option-correct`
    if (option.id === selected.id) return `${base} option-wrong`
    return `${base} option-disabled`
  }

  return (
    <div className="mc-exercise">
      <p className="exercise-instruction">¿Qué significa en español?</p>

      <div className="word-display">
        <div className="word-with-speaker">
          <h2 className="word-nahuat">{item.nahuat_word}</h2>
          {isSupported && (
            <button
              className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
              onClick={speak}
              disabled={isSpeaking}
              aria-label="Escuchar pronunciación"
              title="Escuchar pronunciación"
            >
              🔊
            </button>
          )}
        </div>
        {item.pronunciation && (
          <span className="word-pronunciation">/{item.pronunciation}/</span>
        )}
      </div>

      <div className="options-grid">
        {item.options.map((option) => (
          <button
            key={option.id}
            className={getOptionClass(option)}
            onClick={() => handleSelect(option)}
            disabled={!!selected}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}
