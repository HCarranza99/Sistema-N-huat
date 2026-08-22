/**
 * Los saludos del Torogoz.
 *
 * Es el PRIMER náhuat que ve cualquiera que abre la app, así que lleva su
 * fuente, igual que el contenido de las lecciones. `src/test/creditos.test.js`
 * comprueba que cada uno apunte a una obra acreditada.
 *
 * VIVE EN src/data/ Y NO EN LA PANTALLA. Es contenido, no interfaz: mientras
 * estuvo dentro de HomeScreen.jsx no se podía comprobar sin arrastrar el store,
 * Supabase y las animaciones a la prueba —que se colgaba—. Lo mismo vale para
 * cualquier cadena en náhuat que se agregue al chrome de la app.
 *
 * CORREGIDOS EL 14-AGO-2026. Los anteriores no existían en el diccionario:
 * «Piyali», «Tikweli», «Nawat tiwelli» y «Ximomachti» dan CERO coincidencias, y
 * esta última está en ortografía del náhuatl mexicano (x-, mo-), que no es la de
 * Witzapan. «Yawi» sí existe, pero significa "va", no "vamos".
 *
 * Es el mismo problema que Héctor encontró en «Yek tunal»: material de otras
 * variantes colándose por parecerse.
 */

const M = 'Diccionario YULTAJTAKETZALIS (Pérez & Martínez, 2023)'
const K = 'Curso Timumachtikan (King)'
const H = 'Héctor Martínez, hablante de Witzapan, 14-ago-2026'

export const TOROGOZ_GREETINGS = [
  { nahuat: '¡Yek peyna!', spanish: '¡Buena mañana!', source: H },
  { nahuat: '¿Ken tinemi?', spanish: '¿Cómo estás?', source: `${K}, p.19` },
  { nahuat: '¡Yek, padiush!', spanish: '¡Bien, gracias!', source: `${K}, p.24` },
  { nahuat: '¡Nemi pal timumachtia!', spanish: '¡Hay que estudiar!', source: `${M}, l.12838 — "Nemi pal nimumachtia: Tengo que estudiar"` },
  { nahuat: '¡Chujchupika!', spanish: '¡Poco a poco!', source: `${M}, l.40276 — "Naja nimumachtia nawat chujchupika"` },
]

export default TOROGOZ_GREETINGS
