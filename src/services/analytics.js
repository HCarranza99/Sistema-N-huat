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

// ── Consentimiento ───────────────────────────────────────────────

/**
 * Hash simple (no criptográfico) del texto de consentimiento — sirve para
 * demostrar que el participante aceptó esta versión específica del texto.
 */
function hashText(text) {
  let h = 0
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0
  }
  return (h >>> 0).toString(16)
}

/**
 * Registra que el participante aceptó el consentimiento.
 * @param {string} participantId
 * @param {string} consentVersion
 * @param {string} consentText - texto mostrado, para calcular hash de auditoría
 */
export async function saveConsent(participantId, consentVersion, consentText) {
  try {
    await supabase.from('consent_records').insert({
      participant_id: participantId,
      consent_version: consentVersion,
      consent_text_hash: hashText(consentText),
    })
  } catch {
    // silencioso
  }
}

// ── Respuestas de cuestionario ───────────────────────────────────

/**
 * Guarda la respuesta a un item de cuestionario (pretest o postest).
 * Usa upsert sobre (participant_id, phase, item_code) para permitir que el
 * participante corrija una respuesta antes de enviar.
 *
 * @param {string} participantId
 * @param {string|null} sessionId
 * @param {'pretest'|'posttest'} phase
 * @param {string} itemCode
 * @param {object} values - { valueNumeric?, valueText?, valueOther?, responseTimeMs? }
 */
export async function saveQuestionnaireResponse(
  participantId,
  sessionId,
  phase,
  itemCode,
  { valueNumeric = null, valueText = null, valueOther = null, responseTimeMs = null } = {}
) {
  try {
    await supabase.from('questionnaire_responses').upsert(
      {
        participant_id: participantId,
        session_id: sessionId,
        phase,
        item_code: itemCode,
        value_numeric: valueNumeric,
        value_text: valueText,
        value_other: valueOther,
        response_time_ms: responseTimeMs,
        answered_at: new Date().toISOString(),
      },
      { onConflict: 'participant_id,phase,item_code' }
    )
  } catch {
    // silencioso
  }
}

// ── Timeline de intervención ─────────────────────────────────────

/**
 * Upsert helper para intervention_timeline — un solo row por participante.
 */
async function upsertTimeline(participantId, patch) {
  try {
    await supabase.from('intervention_timeline').upsert(
      { participant_id: participantId, ...patch },
      { onConflict: 'participant_id' }
    )
  } catch {
    // silencioso
  }
}

export async function markPretestCompleted(participantId) {
  await upsertTimeline(participantId, { pretest_completed_at: new Date().toISOString() })
}

export async function markPosttestUnlocked(participantId) {
  await upsertTimeline(participantId, { posttest_unlocked_at: new Date().toISOString() })
}

export async function markPosttestCompleted(participantId) {
  await upsertTimeline(participantId, { posttest_completed_at: new Date().toISOString() })
}
