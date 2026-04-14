import { useState } from 'react'
import useGameStore from '../store/useGameStore'
import { createParticipant } from '../services/analytics'

const SLIDES = [
  {
    icon: '🌿',
    title: 'Bienvenido al Náhuat',
    body: 'El Náhuat es el idioma ancestral del pueblo Pipil de El Salvador. Aprender sus palabras es ayudar a preservar su cultura.',
  },
  {
    icon: '🎮',
    title: '¿Cómo funciona?',
    features: [
      { icon: '❤️', label: 'Vidas', desc: 'Tienes 3 vidas por sesión. Si las pierdes, descansa 30 minutos antes de continuar.' },
      { icon: '⚡', label: 'XP', desc: 'Gana puntos de experiencia respondiendo correctamente.' },
      { icon: '⭐', label: 'Estrellas', desc: 'Obtén hasta 3 estrellas por lección según tu precisión.' },
    ],
  },
  {
    icon: '🚀',
    title: '¡Estás listo!',
    body: 'Completa lecciones, gana XP y desbloquea nuevos temas. El primer paso empieza ahora.',
  },
]

export default function OnboardingScreen() {
  // step -1 = formulario de perfil, 0..2 = slides
  const [step, setStep] = useState(-1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const { setParticipant, setOnboardingDone } = useGameStore()

  // ── Paso 0: formulario de perfil ──────────────────────────────
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    const fn = firstName.trim()
    const ln = lastName.trim()

    if (fn.length < 2 || ln.length < 2) {
      setFieldError('Ingresa al menos 2 caracteres en cada campo.')
      return
    }
    setFieldError('')
    setLoading(true)

    const id = await createParticipant(fn, ln)
    setParticipant(id, `${fn} ${ln}`)
    setLoading(false)
    setStep(0)
  }

  // ── Slides 1-3 ────────────────────────────────────────────────
  const slide = step >= 0 ? SLIDES[step] : null
  const isLastSlide = step === SLIDES.length - 1
  // dots: perfil (step -1) + 3 slides
  const totalDots = SLIDES.length + 1
  const activeDot = step + 1   // -1→0, 0→1, 1→2, 2→3

  if (step === -1) {
    return (
      <div className="screen onboarding-screen">
        <div className="onboarding-body-wrap">
          <div className="onboarding-slide">
            <span className="onboarding-icon">📋</span>
            <h1 className="onboarding-title">Crear perfil</h1>
            <p className="onboarding-text">
              Antes de empezar, ingresa tu nombre y apellido. Esto nos ayuda a registrar tu progreso.
            </p>
          </div>

          <form className="profile-form" onSubmit={handleProfileSubmit} noValidate>
            <div className="profile-field">
              <label className="profile-label" htmlFor="firstName">Nombre</label>
              <input
                id="firstName"
                className="profile-input"
                type="text"
                placeholder="Ej. María"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                disabled={loading}
              />
            </div>
            <div className="profile-field">
              <label className="profile-label" htmlFor="lastName">Apellido</label>
              <input
                id="lastName"
                className="profile-input"
                type="text"
                placeholder="Ej. García"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                disabled={loading}
              />
            </div>
            {fieldError && <p className="profile-error">{fieldError}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creando perfil…' : 'Continuar →'}
            </button>
          </form>

          <div className="onboarding-dots">
            {Array.from({ length: totalDots }, (_, i) => (
              <span key={i} className={`onboarding-dot ${i === activeDot ? 'dot-active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen onboarding-screen">
      <div className="onboarding-body-wrap">
        <div className="onboarding-slide">
          <span className="onboarding-icon">{slide.icon}</span>
          <h1 className="onboarding-title">{slide.title}</h1>

          {slide.body && <p className="onboarding-text">{slide.body}</p>}

          {slide.features && (
            <div className="onboarding-features">
              {slide.features.map((f) => (
                <div key={f.label} className="onboarding-feature">
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <p className="feature-label">{f.label}</p>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="onboarding-dots">
          {Array.from({ length: totalDots }, (_, i) => (
            <span key={i} className={`onboarding-dot ${i === activeDot ? 'dot-active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="onboarding-actions">
        <button
          className="btn btn-primary"
          onClick={() => (isLastSlide ? setOnboardingDone() : setStep((s) => s + 1))}
        >
          {isLastSlide ? '¡Empezar!' : 'Siguiente →'}
        </button>
        {!isLastSlide && (
          <button className="btn-skip" onClick={setOnboardingDone}>
            Saltar
          </button>
        )}
      </div>
    </div>
  )
}
