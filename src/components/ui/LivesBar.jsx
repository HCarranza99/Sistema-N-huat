export default function LivesBar({ lives, max = 3 }) {
  return (
    <div className="lives-bar" aria-label={`${lives} vidas restantes`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`heart ${i < lives ? 'heart-full' : 'heart-empty'}`}>
          {i < lives ? '❤️' : '🩶'}
        </span>
      ))}
    </div>
  )
}
