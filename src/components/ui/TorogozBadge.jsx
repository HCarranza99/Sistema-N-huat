import Torogoz from './Torogoz'

/**
 * Torogoz en versión circular compacta — diseñado para usarse como logo
 * dentro del header del HomeScreen (u otras pantallas).
 *
 * Encaja el SVG del Torogoz (viewBox 320×195) dentro de un círculo blanco,
 * escalando para que se vea centrado. La animación idle del Torogoz se
 * preserva.
 */
export default function TorogozBadge({ size = 56 }) {
  return (
    <div
      className="torogoz-badge"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Torogoz emotion="idle" size={size * 1.4} />
    </div>
  )
}
