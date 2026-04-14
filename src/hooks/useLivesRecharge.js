import { useState, useEffect } from 'react'
import useGameStore from '../store/useGameStore'
import { GAME_CONFIG } from '../data/gameConfig'

/**
 * useLivesRecharge()
 *
 * Observa el timestamp livesLastLostAt y, cuando han pasado
 * GAME_CONFIG.lives.rechargeMinutes, llama a resetLives() automáticamente.
 *
 * Retorna { minutesLeft } — null cuando las vidas están llenas.
 */
export function useLivesRecharge() {
  const { lives, livesLastLostAt, resetLives } = useGameStore()
  const [minutesLeft, setMinutesLeft] = useState(null)

  useEffect(() => {
    if (lives > 0 || !livesLastLostAt) {
      setMinutesLeft(null)
      return
    }

    const tick = () => {
      const elapsedMin = (Date.now() - new Date(livesLastLostAt).getTime()) / 60_000
      const remaining = GAME_CONFIG.lives.rechargeMinutes - elapsedMin

      if (remaining <= 0) {
        resetLives()
        setMinutesLeft(null)
      } else {
        setMinutesLeft(Math.ceil(remaining))
      }
    }

    tick()
    const id = setInterval(tick, 30_000) // re-evalúa cada 30 segundos
    return () => clearInterval(id)
  }, [lives, livesLastLostAt, resetLives])

  return { minutesLeft }
}
