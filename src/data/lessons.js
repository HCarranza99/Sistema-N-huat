/**
 * Base de datos de lecciones - Sistema de Aprendizaje Náhuat
 *
 * Tipos de items disponibles:
 * - flashcard: Muestra palabra + traducción, el usuario la memoriza
 * - multiple_choice_text: Elige la traducción correcta entre opciones de texto
 * - multiple_choice_image: Elige la imagen que corresponde a la palabra
 * - matching: Une pares de palabras Náhuat ↔ Español
 * - build_sentence: Ordena palabras para formar una oración
 */

const lessons = [
  // ─────────────────────────────────────────────────────────────
  // LECCIÓN 1 — COMPLETA CON DATOS DE PRUEBA FUNCIONALES
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Saludos y Cortesía",
    icon: "👋",
    description: "Aprende a saludar y ser cortés en Náhuat",
    color: "#4CAF50",
    xpReward: 100,
    items: [
      // 1 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "1-1",
        type: "flashcard",
        nahuat_word: "Pialli",
        spanish_translation: "Hola / Buenos días",
        pronunciation: "pi-a-LLI",
        example_sentence: "Pialli, taja!",
        example_translation: "¡Hola, tú!",
      },

      // 2 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "1-2",
        type: "multiple_choice_text",
        nahuat_word: "Niaw",
        spanish_translation: "Me voy / Adiós",
        pronunciation: "ni-AW",
        options: [
          { id: "a", text: "Me voy / Adiós", correct: true },
          { id: "b", text: "Gracias", correct: false },
          { id: "c", text: "Hola", correct: false },
          { id: "d", text: "Por favor", correct: false },
        ],
      },

      // 3 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "1-3",
        type: "flashcard",
        nahuat_word: "Matiok",
        spanish_translation: "Gracias",
        pronunciation: "ma-ti-OK",
        example_sentence: "Matiok, naja niaw.",
        example_translation: "Gracias, yo me voy.",
      },

      // 4 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "1-4",
        type: "multiple_choice_text",
        nahuat_word: "Welika",
        spanish_translation: "De nada / Con gusto",
        pronunciation: "we-LI-ka",
        options: [
          { id: "a", text: "Por favor", correct: false },
          { id: "b", text: "De nada / Con gusto", correct: true },
          { id: "c", text: "Hasta luego", correct: false },
          { id: "d", text: "Perdón", correct: false },
        ],
      },

      // 5 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "1-5",
        type: "flashcard",
        nahuat_word: "Nutech",
        spanish_translation: "Aquí estoy / Presente",
        pronunciation: "nu-TECH",
        example_sentence: "Nutech, naja.",
        example_translation: "Aquí estoy, yo.",
      },

      // 6 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "1-6",
        type: "multiple_choice_text",
        nahuat_word: "Kenha timitz ittas?",
        spanish_translation: "¿Hasta luego? / ¿Nos vemos?",
        pronunciation: "KEN-ha ti-mitz IT-tas",
        options: [
          { id: "a", text: "¿Cómo te llamas?", correct: false },
          { id: "b", text: "¿Cuántos años tienes?", correct: false },
          { id: "c", text: "¿Hasta luego? / ¿Nos vemos?", correct: true },
          { id: "d", text: "¿Dónde estás?", correct: false },
        ],
      },

      // 7 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "1-7",
        type: "flashcard",
        nahuat_word: "Naja",
        spanish_translation: "Yo",
        pronunciation: "NA-ha",
        example_sentence: "Naja niaw.",
        example_translation: "Yo me voy.",
      },

      // 8 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "1-8",
        type: "multiple_choice_text",
        nahuat_word: "Taja",
        spanish_translation: "Tú",
        pronunciation: "TA-ha",
        options: [
          { id: "a", text: "Él / Ella", correct: false },
          { id: "b", text: "Nosotros", correct: false },
          { id: "c", text: "Yo", correct: false },
          { id: "d", text: "Tú", correct: true },
        ],
      },

      // 9 ── MATCHING ───────────────────────────────────────────
      {
        id: "1-9",
        type: "matching",
        instruction: "Une cada palabra Náhuat con su significado en español",
        pairs: [
          { nahuat: "Pialli", spanish: "Hola" },
          { nahuat: "Matiok", spanish: "Gracias" },
          { nahuat: "Niaw", spanish: "Me voy" },
          { nahuat: "Welika", spanish: "De nada" },
        ],
      },

      // 10 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "1-10",
        type: "multiple_choice_text",
        nahuat_word: "Yek",
        spanish_translation: "Bien / Bueno",
        pronunciation: "YEK",
        options: [
          { id: "a", text: "Bien / Bueno", correct: true },
          { id: "b", text: "Malo / Feo", correct: false },
          { id: "c", text: "Grande", correct: false },
          { id: "d", text: "Pequeño", correct: false },
        ],
      },

      // 11 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "1-11",
        type: "flashcard",
        nahuat_word: "Tlen tikneki?",
        spanish_translation: "¿Qué quieres?",
        pronunciation: "TLEN tik-NE-ki",
        example_sentence: "Pialli! Tlen tikneki?",
        example_translation: "¡Hola! ¿Qué quieres?",
      },

      // 12 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "1-12",
        type: "build_sentence",
        instruction: "Ordena las palabras para formar el saludo correcto",
        spanish_translation: "Hola, yo me voy. Gracias.",
        word_bank: ["Pialli,", "naja", "niaw.", "Matiok."],
        correct_order: ["Pialli,", "naja", "niaw.", "Matiok."],
      },

      // 13 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "1-13",
        type: "multiple_choice_text",
        nahuat_word: "Pejna",
        spanish_translation: "Empieza / Comienza / Ábrelo",
        pronunciation: "PEH-na",
        options: [
          { id: "a", text: "Termina", correct: false },
          { id: "b", text: "Empieza / Comienza", correct: true },
          { id: "c", text: "Espera", correct: false },
          { id: "d", text: "Regresa", correct: false },
        ],
      },

      // 14 ── MATCHING ───────────────────────────────────────────
      {
        id: "1-14",
        type: "matching",
        instruction: "Une los pronombres con su equivalente en español",
        pairs: [
          { nahuat: "Naja", spanish: "Yo" },
          { nahuat: "Taja", spanish: "Tú" },
          { nahuat: "Yaja", spanish: "Él / Ella" },
          { nahuat: "Tejemet", spanish: "Ustedes" },
        ],
      },

      // 15 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "1-15",
        type: "build_sentence",
        instruction: "Forma la pregunta correcta en Náhuat",
        spanish_translation: "¿Qué quieres, tú?",
        word_bank: ["Tlen", "tikneki,", "taja?"],
        correct_order: ["Tlen", "tikneki,", "taja?"],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECCIÓN 2 — NÚMEROS
  // ─────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Números",
    icon: "🔢",
    description: "Aprende a contar del 1 al 10 en Náhuat",
    color: "#2196F3",
    xpReward: 120,
    items: [
      // 1 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "2-1",
        type: "flashcard",
        nahuat_word: "Se",
        spanish_translation: "Uno (1)",
        pronunciation: "SE",
        example_sentence: "Se, ume, eyi...",
        example_translation: "Uno, dos, tres...",
      },

      // 2 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "2-2",
        type: "flashcard",
        nahuat_word: "Ume",
        spanish_translation: "Dos (2)",
        pronunciation: "U-me",
        example_sentence: "Se wan ume.",
        example_translation: "Uno y dos.",
      },

      // 3 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "2-3",
        type: "multiple_choice_text",
        nahuat_word: "Eyi",
        spanish_translation: "Tres (3)",
        pronunciation: "E-yi",
        options: [
          { id: "a", text: "Dos", correct: false },
          { id: "b", text: "Tres", correct: true },
          { id: "c", text: "Cuatro", correct: false },
          { id: "d", text: "Cinco", correct: false },
        ],
      },

      // 4 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "2-4",
        type: "multiple_choice_text",
        nahuat_word: "Naui",
        spanish_translation: "Cuatro (4)",
        pronunciation: "na-UI",
        options: [
          { id: "a", text: "Cuatro", correct: true },
          { id: "b", text: "Tres", correct: false },
          { id: "c", text: "Cinco", correct: false },
          { id: "d", text: "Seis", correct: false },
        ],
      },

      // 5 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "2-5",
        type: "flashcard",
        nahuat_word: "Makuili",
        spanish_translation: "Cinco (5)",
        pronunciation: "ma-KUI-li",
        example_sentence: "Makuili, chikuase, chikume...",
        example_translation: "Cinco, seis, siete...",
      },

      // 6 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "2-6",
        type: "multiple_choice_text",
        nahuat_word: "Chikuase",
        spanish_translation: "Seis (6)",
        pronunciation: "chi-KUA-se",
        options: [
          { id: "a", text: "Cinco", correct: false },
          { id: "b", text: "Seis", correct: true },
          { id: "c", text: "Siete", correct: false },
          { id: "d", text: "Ocho", correct: false },
        ],
      },

      // 7 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "2-7",
        type: "flashcard",
        nahuat_word: "Chikume",
        spanish_translation: "Siete (7)",
        pronunciation: "chi-KU-me",
      },

      // 8 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "2-8",
        type: "multiple_choice_text",
        nahuat_word: "Chikueyi",
        spanish_translation: "Ocho (8)",
        pronunciation: "chi-KUE-yi",
        options: [
          { id: "a", text: "Seis", correct: false },
          { id: "b", text: "Siete", correct: false },
          { id: "c", text: "Ocho", correct: true },
          { id: "d", text: "Nueve", correct: false },
        ],
      },

      // 9 ── MATCHING ───────────────────────────────────────────
      {
        id: "2-9",
        type: "matching",
        instruction: "Une cada número Náhuat con su valor en español",
        pairs: [
          { nahuat: "Se", spanish: "Uno" },
          { nahuat: "Ume", spanish: "Dos" },
          { nahuat: "Eyi", spanish: "Tres" },
          { nahuat: "Naui", spanish: "Cuatro" },
        ],
      },

      // 10 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "2-10",
        type: "multiple_choice_text",
        nahuat_word: "Chikunawi",
        spanish_translation: "Nueve (9)",
        pronunciation: "chi-ku-NA-wi",
        options: [
          { id: "a", text: "Siete", correct: false },
          { id: "b", text: "Ocho", correct: false },
          { id: "c", text: "Nueve", correct: true },
          { id: "d", text: "Diez", correct: false },
        ],
      },

      // 11 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "2-11",
        type: "flashcard",
        nahuat_word: "Majtakti",
        spanish_translation: "Diez (10)",
        pronunciation: "maj-TAK-ti",
        example_sentence: "Se asta majtakti.",
        example_translation: "Del uno al diez.",
      },

      // 12 ── MATCHING ───────────────────────────────────────────
      {
        id: "2-12",
        type: "matching",
        instruction: "Une cada número Náhuat con su valor en español",
        pairs: [
          { nahuat: "Makuili", spanish: "Cinco" },
          { nahuat: "Chikuase", spanish: "Seis" },
          { nahuat: "Chikueyi", spanish: "Ocho" },
          { nahuat: "Chikunawi", spanish: "Nueve" },
        ],
      },

      // 13 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "2-13",
        type: "multiple_choice_text",
        nahuat_word: "Ume",
        spanish_translation: "Dos (2)",
        pronunciation: "U-me",
        options: [
          { id: "a", text: "Uno", correct: false },
          { id: "b", text: "Dos", correct: true },
          { id: "c", text: "Tres", correct: false },
          { id: "d", text: "Cuatro", correct: false },
        ],
      },

      // 14 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "2-14",
        type: "build_sentence",
        instruction: "Ordena los números del 1 al 4 en Náhuat",
        spanish_translation: "Uno, dos, tres, cuatro",
        word_bank: ["Naui", "Se", "Eyi", "Ume"],
        correct_order: ["Se", "Ume", "Eyi", "Naui"],
      },

      // 15 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "2-15",
        type: "build_sentence",
        instruction: "Ordena los números del 5 al 10 en Náhuat",
        spanish_translation: "Cinco, seis, siete, ocho, nueve, diez",
        word_bank: ["Chikume", "Majtakti", "Chikueyi", "Makuili", "Chikunawi", "Chikuase"],
        correct_order: ["Makuili", "Chikuase", "Chikume", "Chikueyi", "Chikunawi", "Majtakti"],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECCIÓN 3 — COLORES
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Colores",
    icon: "🎨",
    description: "Aprende los colores básicos en Náhuat",
    color: "#9C27B0",
    xpReward: 120,
    items: [
      // 1 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "3-1",
        type: "flashcard",
        nahuat_word: "Chichiltic",
        spanish_translation: "Rojo",
        pronunciation: "chi-CHIL-tic",
        example_sentence: "Ne chichiltic yek.",
        example_translation: "El rojo es bonito.",
      },

      // 2 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "3-2",
        type: "flashcard",
        nahuat_word: "Iztac",
        spanish_translation: "Blanco",
        pronunciation: "IS-tac",
        example_sentence: "Iztac, yek.",
        example_translation: "Blanco, bonito.",
      },

      // 3 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "3-3",
        type: "multiple_choice_text",
        nahuat_word: "Yayawik",
        spanish_translation: "Negro",
        pronunciation: "ya-YA-wik",
        options: [
          { id: "a", text: "Blanco", correct: false },
          { id: "b", text: "Rojo", correct: false },
          { id: "c", text: "Negro", correct: true },
          { id: "d", text: "Verde", correct: false },
        ],
      },

      // 4 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "3-4",
        type: "multiple_choice_text",
        nahuat_word: "Xoxoctic",
        spanish_translation: "Verde",
        pronunciation: "sho-SHOC-tic",
        options: [
          { id: "a", text: "Azul", correct: false },
          { id: "b", text: "Verde", correct: true },
          { id: "c", text: "Amarillo", correct: false },
          { id: "d", text: "Rojo", correct: false },
        ],
      },

      // 5 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "3-5",
        type: "flashcard",
        nahuat_word: "Coztic",
        spanish_translation: "Amarillo",
        pronunciation: "COS-tic",
        example_sentence: "Coztic, yek.",
        example_translation: "Amarillo, bonito.",
      },

      // 6 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "3-6",
        type: "multiple_choice_text",
        nahuat_word: "Putic",
        spanish_translation: "Café / Marrón",
        pronunciation: "PU-tic",
        options: [
          { id: "a", text: "Negro", correct: false },
          { id: "b", text: "Amarillo", correct: false },
          { id: "c", text: "Café / Marrón", correct: true },
          { id: "d", text: "Blanco", correct: false },
        ],
      },

      // 7 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "3-7",
        type: "multiple_choice_text",
        nahuat_word: "Chichiltic",
        spanish_translation: "Rojo",
        pronunciation: "chi-CHIL-tic",
        options: [
          { id: "a", text: "Amarillo", correct: false },
          { id: "b", text: "Verde", correct: false },
          { id: "c", text: "Negro", correct: false },
          { id: "d", text: "Rojo", correct: true },
        ],
      },

      // 8 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "3-8",
        type: "multiple_choice_text",
        nahuat_word: "Iztac",
        spanish_translation: "Blanco",
        pronunciation: "IS-tac",
        options: [
          { id: "a", text: "Blanco", correct: true },
          { id: "b", text: "Gris", correct: false },
          { id: "c", text: "Café", correct: false },
          { id: "d", text: "Rojo", correct: false },
        ],
      },

      // 9 ── MATCHING ───────────────────────────────────────────
      {
        id: "3-9",
        type: "matching",
        instruction: "Une cada color Náhuat con su nombre en español",
        pairs: [
          { nahuat: "Chichiltic", spanish: "Rojo" },
          { nahuat: "Iztac", spanish: "Blanco" },
          { nahuat: "Yayawik", spanish: "Negro" },
          { nahuat: "Xoxoctic", spanish: "Verde" },
        ],
      },

      // 10 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "3-10",
        type: "multiple_choice_text",
        nahuat_word: "Coztic",
        spanish_translation: "Amarillo",
        pronunciation: "COS-tic",
        options: [
          { id: "a", text: "Verde", correct: false },
          { id: "b", text: "Naranja", correct: false },
          { id: "c", text: "Amarillo", correct: true },
          { id: "d", text: "Café", correct: false },
        ],
      },

      // 11 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "3-11",
        type: "multiple_choice_text",
        nahuat_word: "Putic",
        spanish_translation: "Café / Marrón",
        pronunciation: "PU-tic",
        options: [
          { id: "a", text: "Café / Marrón", correct: true },
          { id: "b", text: "Rojo", correct: false },
          { id: "c", text: "Negro", correct: false },
          { id: "d", text: "Verde", correct: false },
        ],
      },

      // 12 ── MATCHING ───────────────────────────────────────────
      {
        id: "3-12",
        type: "matching",
        instruction: "Une cada color Náhuat con su nombre en español",
        pairs: [
          { nahuat: "Chichiltic", spanish: "Rojo" },
          { nahuat: "Coztic", spanish: "Amarillo" },
          { nahuat: "Putic", spanish: "Café" },
          { nahuat: "Yayawik", spanish: "Negro" },
        ],
      },

      // 13 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "3-13",
        type: "multiple_choice_text",
        nahuat_word: "Xoxoctic",
        spanish_translation: "Verde",
        pronunciation: "sho-SHOC-tic",
        options: [
          { id: "a", text: "Amarillo", correct: false },
          { id: "b", text: "Azul", correct: false },
          { id: "c", text: "Verde", correct: true },
          { id: "d", text: "Blanco", correct: false },
        ],
      },

      // 14 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "3-14",
        type: "build_sentence",
        instruction: "Ordena los colores: el rojo, el blanco",
        spanish_translation: "El rojo, el blanco",
        word_bank: ["ne", "iztac,", "ne", "chichiltic,"],
        correct_order: ["ne", "chichiltic,", "ne", "iztac,"],
      },

      // 15 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "3-15",
        type: "build_sentence",
        instruction: "Ordena los colores: verde, amarillo, café",
        spanish_translation: "Verde, amarillo, café",
        word_bank: ["putic.", "xoxoctic,", "coztic,"],
        correct_order: ["xoxoctic,", "coztic,", "putic."],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECCIÓN 4 — LA FAMILIA
  // ─────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "La Familia",
    icon: "👨‍👩‍👧‍👦",
    description: "Aprende las palabras de parentesco en Náhuat",
    color: "#FF9800",
    xpReward: 140,
    items: [
      // 1 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "4-1",
        type: "flashcard",
        nahuat_word: "Tata",
        spanish_translation: "Papá",
        pronunciation: "TA-ta",
        example_sentence: "Ne tata pialli.",
        example_translation: "El papá saluda.",
      },

      // 2 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "4-2",
        type: "flashcard",
        nahuat_word: "Nana",
        spanish_translation: "Mamá",
        pronunciation: "NA-na",
        example_sentence: "Ne nana, yek.",
        example_translation: "La mamá, bien.",
      },

      // 3 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "4-3",
        type: "multiple_choice_text",
        nahuat_word: "Icniw",
        spanish_translation: "Hermano / Hermana",
        pronunciation: "IC-niw",
        options: [
          { id: "a", text: "Papá", correct: false },
          { id: "b", text: "Mamá", correct: false },
          { id: "c", text: "Hermano / Hermana", correct: true },
          { id: "d", text: "Hijo", correct: false },
        ],
      },

      // 4 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "4-4",
        type: "flashcard",
        nahuat_word: "Telpuchtli",
        spanish_translation: "Hijo / Joven varón",
        pronunciation: "tel-PUCH-tli",
        example_sentence: "Ne telpuchtli yek.",
        example_translation: "El joven es bueno.",
      },

      // 5 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "4-5",
        type: "multiple_choice_text",
        nahuat_word: "Ichpuchtli",
        spanish_translation: "Hija / Joven mujer",
        pronunciation: "ich-PUCH-tli",
        options: [
          { id: "a", text: "Mamá", correct: false },
          { id: "b", text: "Hija / Joven mujer", correct: true },
          { id: "c", text: "Hermana", correct: false },
          { id: "d", text: "Abuela", correct: false },
        ],
      },

      // 6 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "4-6",
        type: "flashcard",
        nahuat_word: "Kali",
        spanish_translation: "Casa",
        pronunciation: "KA-li",
        example_sentence: "Ne kali yek.",
        example_translation: "La casa es bonita.",
      },

      // 7 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "4-7",
        type: "multiple_choice_text",
        nahuat_word: "Tata",
        spanish_translation: "Papá",
        pronunciation: "TA-ta",
        options: [
          { id: "a", text: "Abuelo", correct: false },
          { id: "b", text: "Hermano", correct: false },
          { id: "c", text: "Hijo", correct: false },
          { id: "d", text: "Papá", correct: true },
        ],
      },

      // 8 ── MULTIPLE CHOICE TEXT ──────────────────────────────
      {
        id: "4-8",
        type: "multiple_choice_text",
        nahuat_word: "Nana",
        spanish_translation: "Mamá",
        pronunciation: "NA-na",
        options: [
          { id: "a", text: "Abuela", correct: false },
          { id: "b", text: "Mamá", correct: true },
          { id: "c", text: "Hermana", correct: false },
          { id: "d", text: "Hija", correct: false },
        ],
      },

      // 9 ── MATCHING ───────────────────────────────────────────
      {
        id: "4-9",
        type: "matching",
        instruction: "Une cada palabra con su significado en español",
        pairs: [
          { nahuat: "Tata", spanish: "Papá" },
          { nahuat: "Nana", spanish: "Mamá" },
          { nahuat: "Icniw", spanish: "Hermano/a" },
          { nahuat: "Kali", spanish: "Casa" },
        ],
      },

      // 10 ── FLASHCARD ─────────────────────────────────────────
      {
        id: "4-10",
        type: "flashcard",
        nahuat_word: "Chantia",
        spanish_translation: "Vivir / Habitar",
        pronunciation: "chan-TI-a",
        example_sentence: "Naja nichantia ne kali.",
        example_translation: "Yo vivo en la casa.",
      },

      // 11 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "4-11",
        type: "multiple_choice_text",
        nahuat_word: "Telpuchtli",
        spanish_translation: "Hijo / Joven varón",
        pronunciation: "tel-PUCH-tli",
        options: [
          { id: "a", text: "Papá", correct: false },
          { id: "b", text: "Hermano", correct: false },
          { id: "c", text: "Hijo / Joven varón", correct: true },
          { id: "d", text: "Abuelo", correct: false },
        ],
      },

      // 12 ── MULTIPLE CHOICE TEXT ─────────────────────────────
      {
        id: "4-12",
        type: "multiple_choice_text",
        nahuat_word: "Kali",
        spanish_translation: "Casa",
        pronunciation: "KA-li",
        options: [
          { id: "a", text: "Familia", correct: false },
          { id: "b", text: "Hogar", correct: false },
          { id: "c", text: "Casa", correct: true },
          { id: "d", text: "Pueblo", correct: false },
        ],
      },

      // 13 ── MATCHING ───────────────────────────────────────────
      {
        id: "4-13",
        type: "matching",
        instruction: "Une cada palabra con su significado en español",
        pairs: [
          { nahuat: "Telpuchtli", spanish: "Hijo" },
          { nahuat: "Ichpuchtli", spanish: "Hija" },
          { nahuat: "Chantia", spanish: "Vivir" },
          { nahuat: "Icniw", spanish: "Hermano/a" },
        ],
      },

      // 14 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "4-14",
        type: "build_sentence",
        instruction: "Forma la frase: El papá, la mamá, el hermano",
        spanish_translation: "El papá, la mamá, el hermano",
        word_bank: ["ne", "nana,", "ne", "tata,", "ne", "icniw."],
        correct_order: ["ne", "tata,", "ne", "nana,", "ne", "icniw."],
      },

      // 15 ── BUILD SENTENCE ────────────────────────────────────
      {
        id: "4-15",
        type: "build_sentence",
        instruction: "Forma la frase: La hija vive en la casa",
        spanish_translation: "La hija vive en la casa",
        word_bank: ["ne", "kali.", "ne", "ichpuchtli", "chantia"],
        correct_order: ["ne", "ichpuchtli", "chantia", "ne", "kali."],
      },
    ],
  },
];

export default lessons;
