import { describe, expect, it } from 'vitest'
import modules, { cadenasConFuente } from '../data/curriculum'
import { PRIMARY_SOURCE, SECONDARY_SOURCES, VALIDATION } from '../data/credits'
import { TOROGOZ_GREETINGS } from '../data/saludos'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  Los créditos dicen exactamente de qué se alimenta la app
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Dos errores posibles, y los dos importan en un trabajo académico:
 *
 *   · Usar una obra SIN acreditarla.
 *   · Acreditar una obra que ya no se usa. Suena inofensivo, pero es atribuir
 *     un uso que no existe. Pasó: la "Gramática del Nawat / CGN" de Alan R.
 *     King figuró en los créditos meses sin que el contenido la citara una
 *     sola vez. Se quitó el 15-ago-2026.
 *
 * Esta prueba cierra los dos lados. Recorre TODA cadena en náhuat que la app
 * puede mostrar —lecciones y saludos de la pantalla de inicio— y la contrasta
 * contra la pantalla de créditos, en las dos direcciones.
 */

/** Palabra distintiva de cada obra, para reconocerla dentro de un `source`. */
const CLAVE_DE_LA_OBRA = {
  YULTAJTAKETZALIS: /YULTAJTAKETZALIS/i,
  'Curso Timumachtikan!': /Timumachtikan/i,
}

/** Toda cadena en náhuat que la app puede mostrar, con su fuente. */
function todoLoQueSeMuestra() {
  const salida = []
  for (const l of modules.flatMap((m) => m.lessons)) {
    for (const c of cadenasConFuente(l)) {
      salida.push({ nawat: c.nawat, source: c.source, donde: `${l.id} (${c.donde})` })
    }
  }
  for (const g of TOROGOZ_GREETINGS) {
    salida.push({ nawat: g.nahuat, source: g.source, donde: 'saludo del inicio' })
  }
  return salida
}

const cadenas = todoLoQueSeMuestra()

/** ¿A qué obra acreditada apunta este `source`? */
function obraDe(source = '') {
  for (const [titulo, patron] of Object.entries(CLAVE_DE_LA_OBRA)) {
    if (patron.test(source)) return titulo
  }
  if (new RegExp(VALIDATION.name, 'i').test(source)) return VALIDATION.name
  return null
}

describe('créditos — nada se usa sin acreditar', () => {
  it('la prueba está mirando contenido de verdad', () => {
    expect(cadenas.length).toBeGreaterThan(100)
    expect(TOROGOZ_GREETINGS.length).toBeGreaterThan(0)
  })

  it('toda cadena en náhuat apunta a una obra acreditada o al hablante', () => {
    const huerfanas = cadenas
      .filter((c) => !obraDe(c.source))
      .map((c) => `${c.donde}: "${c.nawat}" → ${c.source}`)
    expect(huerfanas).toEqual([])
  })

  it('el diccionario está acreditado con sus autores y su ISBN', () => {
    expect(CLAVE_DE_LA_OBRA[PRIMARY_SOURCE.title]).toBeDefined()
    expect(PRIMARY_SOURCE.authors.length).toBeGreaterThan(0)
    expect(PRIMARY_SOURCE.isbn).toBeTruthy()
  })
})

describe('créditos — nada se acredita sin usar', () => {
  it('cada obra secundaria de la pantalla se cita en el contenido', () => {
    const sinUsar = []
    for (const obra of SECONDARY_SOURCES) {
      const patron = CLAVE_DE_LA_OBRA[obra.title]
      expect(patron, `"${obra.title}" figura en créditos pero la prueba no sabe reconocerla: agregá su clave en CLAVE_DE_LA_OBRA`).toBeDefined()
      if (!cadenas.some((c) => patron.test(c.source || ''))) {
        sinUsar.push(`"${obra.title}" (${obra.author}) está acreditada pero el contenido no la cita`)
      }
    }
    expect(sinUsar).toEqual([])
  })
})

describe('créditos — la revisión por hablante', () => {
  it('nombra a quién, qué hizo y cuándo', () => {
    expect(VALIDATION.name).toBeTruthy()
    expect(VALIDATION.role).toBeTruthy()
    expect(VALIDATION.what).toBeTruthy()
    expect(VALIDATION.date).toMatch(/\d{4}/)
  })

  /**
   * Aprobó los módulos en bloque, no palabra por palabra. La pantalla tiene que
   * decirlo: exagerar el alcance de una validación es lo único peor que no
   * tenerla.
   */
  it('dice también lo que todavía falta', () => {
    expect(VALIDATION.pendiente, 'sin esto la pantalla da a entender una revisión total').toBeTruthy()
  })

  it('quien validó aparece de verdad como fuente del contenido', () => {
    const suyas = cadenas.filter((c) => new RegExp(VALIDATION.name, 'i').test(c.source || ''))
    expect(suyas.length, 'se acredita una revisión que no dejó rastro en el contenido').toBeGreaterThan(0)
  })
})
