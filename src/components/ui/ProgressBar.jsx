export default function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, Math.round(value * 100)))
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
