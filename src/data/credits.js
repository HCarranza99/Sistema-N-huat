/**
 * credits.js
 *
 * Atribución de las fuentes del contenido de la app.
 *
 * IMPORTANTE — esto es un RECONOCIMIENTO de autoría, no una declaración de
 * licencia. Mientras no haya autorización escrita de los titulares, la pantalla
 * NO debe afirmar ni insinuar que el uso está autorizado ("con permiso de",
 * "bajo licencia de"). Solo dice de dónde viene el material y a quién pertenece.
 * Si llega la autorización, agregar aquí el campo correspondiente y recién
 * entonces mostrarlo.
 *
 * REGLA PARA ESTA LISTA: solo va lo que el contenido CITA de verdad. Una fuente
 * que ya no se usa sobra, y una que se usa sin figurar acá es uso sin crédito.
 * Se comprueba en `src/test/creditos.test.js`.
 *
 * El enlace de compra del diccionario se configura con VITE_DICTIONARY_URL. Sin
 * esa variable la pantalla muestra el ISBN para que la persona pueda buscarlo,
 * en vez de apuntar a una URL inventada.
 */

/** Enlace de adquisición del diccionario (opcional; ver arriba). */
export const DICTIONARY_URL = import.meta.env.VITE_DICTIONARY_URL || null

/** Fuente principal del vocabulario. */
export const PRIMARY_SOURCE = {
  title: 'YULTAJTAKETZALIS',
  subtitle: 'Diccionario náhuat / castellano',
  authors: ['Sixta Pérez García', 'Héctor Martínez'],
  year: 2023,
  isbn: '979-8-218-26213-6',
  blurb:
    'Diccionario de la variedad de Witzapan (Santo Domingo de Guzmán), elaborado por Nantzin Sixta Pérez García, hablante nativa, junto a Héctor Martínez. Es la fuente principal del vocabulario que enseña esta aplicación.',
  dedication:
    'La obra está dedicada a Witzapan y a las comunidades nahuas de El Salvador que han mantenido viva la lengua a lo largo de los siglos.',
}

/**
 * Revisión del contenido por un hablante.
 *
 * Se redacta con cuidado de no decir de más. Héctor revisó los módulos y los
 * aprobó en bloque —"es bien poco lo que encontré mal… de ahí todo bien"— y
 * corrigió dos cosas concretas. NO fue una revisión ítem por ítem, y la
 * pantalla no debe dar a entender que lo fue. `pendiente` existe para eso: para
 * que el reconocimiento y lo que falta se lean juntos.
 */
export const VALIDATION = {
  name: 'Héctor Martínez',
  role: 'Hablante de Witzapan y coautor del diccionario',
  date: '14 de agosto de 2026',
  what:
    'Revisó los módulos que hoy enseña la aplicación y los aprobó. Corrigió dos formas que venían de otra variante del náhuat: «tukay» por «tukey» —así se dice en Witzapan— y el saludo «Yek tunal» por «Yek peyna». Las dos correcciones ya están aplicadas.',
  pendiente:
    'La revisión fue en conjunto, no palabra por palabra. Quedan preguntas abiertas que solo un hablante puede contestar, y se irán resolviendo con él.',
}

/**
 * Otras obras consultadas.
 *
 * El 15-ago-2026 se quitó la "Gramática del Nawat / CGN" de Alan R. King: el
 * contenido no la cita en ninguna parte, así que figurar acá era atribuir un
 * uso que no existe. El Curso Timumachtikan SÍ se queda — sostiene 16 cadenas
 * del módulo 1 (Ken tinemi?, Ninemi yek., Wan taja?, Yek padiush. y los
 * pronombres) y dos saludos de la pantalla de inicio.
 *
 * OJO: es la fuente de OTRA VARIANTE del náhuat. Héctor lo confirmó al corregir
 * «Yek tunal», que venía de ahí. Sigue siendo fuente válida y citada, pero lo
 * que salga solo de King hay que buscarlo antes en el diccionario.
 */
export const SECONDARY_SOURCES = [
  {
    title: 'Curso Timumachtikan!',
    author: 'Alan R. King',
    note: 'Material de enseñanza del náhuat; de aquí salen varias frases de conversación y los pronombres personales.',
  },
]

/** Reconocimiento a la comunidad hablante. */
export const COMMUNITY_NOTE =
  'El náhuat sigue vivo porque las abuelas y abuelos nahuahablantes de El Salvador lo sostuvieron cuando nadie más lo hizo. Esta aplicación existe gracias a ellos, y cualquier mérito que tenga es primero suyo.'
