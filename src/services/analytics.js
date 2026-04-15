/**
 * analytics.js
 *
 * Todas las operaciones de escritura hacia Supabase.
 * Cada función tiene try/catch silencioso: si Supabase falla,
 * la app sigue funcionando con normalidad y retorna null.
 */

import { supabase } from '../lib/supabase'

// ── Participantes ────────────────────────────────────────────────

/**
 * Crea un participante en Supabase y retorna su UUID.
 * Si falla, genera un UUID local para no bloquear el onboarding.
 */
export async function createParticipant(firstName, lastName) {
  try {
    const { data, error } = await supabase
      .from('participants')
      .insert({ first_name: firstName, last_name: lastName })
      .select('id')
      .single()

    if (error) throw error
    return data.id
  } catch {
    // Fallback: UUID local si Supabase no está configurado o falla
    return crypto.randomUUID()
  }
}

// ── Sesiones ─────────────────────────────────────────────────────

/**
 * Crea una sesión nueva y retorna su ID.
 */
export async function startSession(participantId) {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({ participant_id: participantId })
      .select('id')
      .single()

    if (error) throw error
    return data.id
  } catch {
    return null
  }
}

/**
 * Cierra una sesión calculando la duración total.
 * @param {string} sessionId - UUID de la sesión
 * @param {number} startedAtMs - Date.now() del momento de inicio
 */
// Set para evitar llamadas duplicadas al mismo sessionId
const endedSessions = new Set()

export async function endSession(sessionId, startedAtMs) {
  if (!sessionId) return
  if (endedSessions.has(sessionId)) return
  endedSessions.add(sessionId)
  try {
    const endedAt = new Date().toISOString()
    const durationSeconds = Math.round((Date.now() - startedAtMs) / 1000)

    await supabase
      .from('sessions')
      .update({ ended_at: endedAt, duration_seconds: durationSeconds })
      .eq('id', sessionId)
  } catch {
    // silencioso
  }
}

// ── Intentos de lección ──────────────────────────────────────────

/**
 * Registra el inicio de un intento de lección y retorna su ID.
 * @param {string} participantId
 * @param {string|null} sessionId
 * @param {{ id: number, title: string }} lesson
 */
export async function startLessonAttempt(participantId, sessionId, lesson) {
  try {
    const { data, error } = await supabase
      .from('lesson_attempts')
      .insert({
        participant_id: participantId,
        session_id: sessionId,
        lesson_id: lesson.id,
        lesson_title: lesson.title,
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error) throw error
    return data.id
  } catch {
    return null
  }
}

/**
 * Completa un intento de lección con métricas finales.
 * @param {string|null} attemptId
 * @param {number} startedAtMs - Date.now() del inicio de la fase 'playing'
 * @param {number} score - 0.0 a 1.0
 * @param {number} stars - 1, 2 o 3
 * @param {number} xpEarned
 */
export async function completeLessonAttempt(attemptId, startedAtMs, score, stars, xpEarned) {
  if (!attemptId) return
  try {
    const completedAt = new Date().toISOString()
    const durationSeconds = Math.round((Date.now() - startedAtMs) / 1000)

    await supabase
      .from('lesson_attempts')
      .update({
        completed_at: completedAt,
        duration_seconds: durationSeconds,
        score,
        stars,
        xp_earned: xpEarned,
        passed: score >= 0.7,
      })
      .eq('id', attemptId)
  } catch {
    // silencioso
  }
}

// ── Respuestas por ejercicio ──────────────────────────────────────

/**
 * Registra la respuesta a un ejercicio individual.
 * @param {string} participantId
 * @param {string|null} sessionId
 * @param {string|null} lessonAttemptId
 * @param {{ id: string, type: string }} exercise
 * @param {boolean} isCorrect
 * @param {number} exerciseStartedAtMs - Date.now() de cuando apareció el ejercicio
 */
export async function logExerciseResponse(
  participantId,
  sessionId,
  lessonAttemptId,
  exercise,
  isCorrect,
  exerciseStartedAtMs
) {
  try {
    const responseTimeSec = parseFloat(
      ((Date.now() - exerciseStartedAtMs) / 1000).toFixed(2)
    )

    await supabase.from('exercise_responses').insert({
      participant_id: participantId,
      session_id: sessionId,
      lesson_attempt_id: lessonAttemptId,
      exercise_id: exercise.id,
      exercise_type: exercise.type,
      is_correct: isCorrect,
      response_time_sec: responseTimeSec,
    })
  } catch {
    // silencioso
  }
}
