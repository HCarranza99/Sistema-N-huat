# Sistema Náhuat — Arquitectura del MVP

## Stack
- **React** (Vite) — UI mobile-first
- **React Router** — navegación entre pantallas
- **Zustand** — estado global (XP, vidas, progreso)
- **localStorage** — persistencia sin backend

## Estructura de carpetas

```
src/
├── data/
│   ├── lessons.js        ← todas las lecciones y ejercicios
│   └── gameConfig.js     ← constantes del sistema de puntos
├── components/
│   ├── exercises/
│   │   ├── Flashcard.jsx
│   │   ├── MultipleChoiceText.jsx
│   │   ├── Matching.jsx
│   │   └── BuildSentence.jsx
│   ├── ui/
│   │   ├── ProgressBar.jsx
│   │   ├── LivesBar.jsx
│   │   ├── XPBadge.jsx
│   │   └── FeedbackModal.jsx   ← correcto / incorrecto
│   └── layout/
│       └── BottomNav.jsx
├── screens/
│   ├── HomeScreen.jsx          ← mapa de lecciones
│   ├── LessonScreen.jsx        ← orquesta los ejercicios
│   └── ResultScreen.jsx        ← resumen XP ganado
├── store/
│   └── useGameStore.js         ← Zustand: XP, vidas, progreso
└── App.jsx
```

## Flujo de una sesión de lección

```
HomeScreen → LessonScreen (items en cola) → ResultScreen
                 │
                 ├── Flashcard       (tap para voltear, luego "siguiente")
                 ├── MultipleChoice  (toca la opción → feedback inmediato)
                 ├── Matching        (arrastra / toca pares)
                 └── BuildSentence   (arrastra palabras al orden correcto)
```

## Fases de desarrollo

| Fase | Contenido |
|------|-----------|
| 1    | Estructura de datos + esqueleto del proyecto |
| 2    | Pantallas HomeScreen y LessonScreen + ejercicios básicos |
| 3    | Estado global (Zustand) + sistema de XP y vidas |
| 4    | Animaciones, sonidos y pulido visual |
| 5    | Lecciones 2-4 con datos completos |
