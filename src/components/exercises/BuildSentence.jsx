import { useState } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function BankToken({ token, hint, onAdd }) {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="bank-token-wrap">
      {showHint && hint && (
        <span className="bank-hint-bubble">{hint}</span>
      )}
      <div className="bank-token-row">
        <button className="word-token" onClick={() => onAdd(token)}>
          {token.w}
        </button>
        {hint && (
          <button
            className="bank-hint-btn"
            onClick={() => setShowHint((v) => !v)}
            aria-label={`Pista: ${hint}`}
          >
            ?
          </button>
        )}
      </div>
    </div>
  )
}

export default function BuildSentence({ item, hints = {}, onCorrect, onWrong }) {
  const [bank, setBank] = useState(() =>
    shuffle(item.word_bank.map((w, i) => ({ w, key: `bank-${i}` })))
  )
  const [sentence, setSentence] = useState([])
  const [verified, setVerified] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  const addWord = (token) => {
    if (verified) return
    setSentence((s) => [...s, token])
    setBank((b) => b.filter((t) => t.key !== token.key))
  }

  const removeWord = (token) => {
    if (verified) return
    setBank((b) => [...b, token])
    setSentence((s) => s.filter((t) => t.key !== token.key))
  }

  const verify = () => {
    const built = sentence.map((t) => t.w).join(' ')
    const target = item.correct_order.join(' ')
    const correct = built === target
    setIsCorrect(correct)
    setVerified(true)
    if (correct) {
      onCorrect()
    } else {
      onWrong()
    }
  }

  const sentenceAreaClass = `sentence-area${
    verified ? (isCorrect ? ' area-correct' : ' area-wrong') : ''
  }`

  return (
    <div className="build-exercise">
      <p className="exercise-instruction">{item.instruction}</p>
      <p className="build-target">"{item.spanish_translation}"</p>

      <div className={sentenceAreaClass}>
        {sentence.length === 0 ? (
          <span className="sentence-placeholder">Toca las palabras para ordenarlas</span>
        ) : (
          sentence.map((token) => (
            <button
              key={token.key}
              className="word-token word-placed"
              onClick={() => removeWord(token)}
            >
              {token.w}
            </button>
          ))
        )}
      </div>

      <div className="word-bank">
        {bank.map((token) => (
          <BankToken
            key={token.key}
            token={token}
            hint={hints[token.w]}
            onAdd={addWord}
          />
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={verify}
        disabled={sentence.length === 0 || verified}
      >
        Verificar
      </button>
    </div>
  )
}
