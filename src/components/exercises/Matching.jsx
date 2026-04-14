import { useState, useEffect } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function Matching({ item, onComplete }) {
  const [nahuatWords] = useState(() => shuffle(item.pairs.map((p) => p.nahuat)))
  const [spanishWords] = useState(() => shuffle(item.pairs.map((p) => p.spanish)))

  const [selNahuat, setSelNahuat] = useState(null)
  const [selSpanish, setSelSpanish] = useState(null)
  const [matched, setMatched] = useState([])   // matched nahuat words
  const [wrongFlash, setWrongFlash] = useState(false)

  // Check pair when both sides are selected
  useEffect(() => {
    if (!selNahuat || !selSpanish) return

    const pair = item.pairs.find((p) => p.nahuat === selNahuat)
    if (pair?.spanish === selSpanish) {
      setMatched((m) => [...m, selNahuat])
      setSelNahuat(null)
      setSelSpanish(null)
    } else {
      setWrongFlash(true)
      setTimeout(() => {
        setWrongFlash(false)
        setSelNahuat(null)
        setSelSpanish(null)
      }, 750)
    }
  }, [selNahuat, selSpanish])

  // Complete when all pairs matched
  useEffect(() => {
    if (matched.length === item.pairs.length) {
      setTimeout(onComplete, 500)
    }
  }, [matched])

  const isMatchedNahuat = (w) => matched.includes(w)
  const isMatchedSpanish = (w) =>
    matched.some((m) => item.pairs.find((p) => p.nahuat === m)?.spanish === w)

  const nahuatClass = (w) => {
    if (isMatchedNahuat(w)) return 'match-btn match-done'
    if (wrongFlash && selNahuat === w) return 'match-btn match-wrong'
    if (selNahuat === w) return 'match-btn match-selected'
    return 'match-btn'
  }

  const spanishClass = (w) => {
    if (isMatchedSpanish(w)) return 'match-btn match-done'
    if (wrongFlash && selSpanish === w) return 'match-btn match-wrong'
    if (selSpanish === w) return 'match-btn match-selected'
    return 'match-btn'
  }

  return (
    <div className="matching-exercise">
      <p className="exercise-instruction">{item.instruction}</p>

      <div className="matching-columns">
        <div className="matching-col">
          {nahuatWords.map((w) => (
            <button
              key={w}
              className={nahuatClass(w)}
              onClick={() => !isMatchedNahuat(w) && !wrongFlash && setSelNahuat(w)}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="matching-col">
          {spanishWords.map((w) => (
            <button
              key={w}
              className={spanishClass(w)}
              onClick={() => !isMatchedSpanish(w) && !wrongFlash && setSelSpanish(w)}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <p className="matching-hint">
        {matched.length}/{item.pairs.length} pares encontrados
      </p>
    </div>
  )
}
