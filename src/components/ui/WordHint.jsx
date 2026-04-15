import { useState, useEffect } from 'react'

/**
 * Wraps a word making it tappable to reveal its translation.
 * Auto-hides after 2.5 seconds.
 */
export default function WordHint({ word, translation }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <span className="hint-wrapper">
      <span
        className="hint-trigger"
        onClick={(e) => { e.stopPropagation(); setVisible((v) => !v) }}
        role="button"
        aria-label={`Pista: ${translation}`}
      >
        {word}
      </span>
      {visible && (
        <span className="hint-tooltip" role="tooltip">
          {translation}
        </span>
      )}
    </span>
  )
}
