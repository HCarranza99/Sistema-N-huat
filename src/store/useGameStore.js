import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set) => ({
      // ── Perfil de participante ────────────────────────────────
      participantId: null,         // UUID asignado por Supabase (o crypto.randomUUID() como fallback)
      participantName: null,       // "Nombre Apellido" para mostrar en UI

      // ── Sesión activa (NO se persiste entre recargas) ─────────
      currentSessionId: null,      // UUID de la sesión en curso — ver partialize abajo

      // ── Gamificación ──────────────────────────────────────────
      xp: 0,
      lives: 3,
      livesLastLostAt: null,       // ISO timestamp — cuando las vidas llegaron a 0
      streak: 0,
      lastPlayedDate: null,        // 'YYYY-MM-DD' — último día que completó una lección
      hasSeenOnboarding: false,
      lessonProgress: {},          // { [lessonId]: { completed, score, stars } }

      // ── Acciones de perfil ────────────────────────────────────
      setParticipant: (id, fullName) => set({ participantId: id, participantName: fullName }),
      setSessionId: (id) => set({ currentSessionId: id }),

      // ── Onboarding ───────────────────────────────────────────
      setOnboardingDone: () => set({ hasSeenOnboarding: true }),

      // ── XP ───────────────────────────────────────────────────
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      // ── Vidas ────────────────────────────────────────────────
      loseLife: () =>
        set((state) => {
          const newLives = Math.max(0, state.lives - 1)
          return {
            lives: newLives,
            livesLastLostAt: newLives === 0 ? new Date().toISOString() : state.livesLastLostAt,
          }
        }),

      resetLives: () => set({ lives: 3, livesLastLostAt: null }),

      // ── Racha diaria ─────────────────────────────────────────
      recordPlay: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          if (state.lastPlayedDate === today) return {}

          const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0]
          const newStreak = state.lastPlayedDate === yesterday ? state.streak + 1 : 1

          return { streak: newStreak, lastPlayedDate: today }
        }),

      // ── Lecciones ────────────────────────────────────────────
      completeLesson: (lessonId, score, xpEarned) =>
        set((state) => ({
          xp: state.xp + xpEarned,
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              completed: score >= 0.5,
              score,
              stars: score >= 0.9 ? 3 : score >= 0.7 ? 2 : score >= 0.5 ? 1 : 0,
            },
          },
        })),

      resetProgress: () =>
        set({
          xp: 0,
          lives: 3,
          livesLastLostAt: null,
          streak: 0,
          lastPlayedDate: null,
          lessonProgress: {},
          // participantId y participantName se mantienen
          // hasSeenOnboarding se mantiene
        }),
    }),
    {
      name: 'nahuat-game-v1',
      // currentSessionId NO se persiste — se regenera en cada apertura de app
      partialize: (state) => {
        const { currentSessionId, ...rest } = state
        return rest
      },
    }
  )
)

export default useGameStore
