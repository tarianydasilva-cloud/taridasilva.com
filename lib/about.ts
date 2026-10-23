import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Text in [square brackets] is a placeholder waiting for real content.

// Clips play in order and loop. Put the files in /public/about/ and list them here, e.g. "/about/hero-1.mp4".
// Encode them mirrored, muted and web-sized, with a first-frame poster next to each as .jpg:
//   ffmpeg -i in.mov -vf "hflip,scale=1440:-2" -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart out.mp4
//   ffmpeg -i out.mp4 -frames:v 1 -q:v 4 out.jpg
export const heroVideos: string[] = ["/about/tari-desktop.mp4"]

// Icons on the About "desktop". Left ones sit under the widgets; right ones fill columns from the right edge,
// like Finder, so the face in the video stays clear. File names stay in English in both languages, like real files.
// Items without an href are shown but not clickable yet; an image item shows its picture as the icon once set.
export type DesktopIcon = "folder" | "text" | "pdf" | "map" | "drive" | "image"

export type DesktopItem = {
  label: string
  icon: DesktopIcon
  side: "left" | "right"
  href?: string
  color?: "orange" | "blue"
  image?: string
}

export const desktopItems: DesktopItem[] = [
  { label: "About Me.txt", icon: "text", side: "left", href: "#story" },
  { label: "World Map", icon: "map", side: "left" },
  { label: "Fleet Connect", icon: "folder", side: "right", color: "blue", href: "/work/fleet-connect" },
  { label: "Innohub", icon: "folder", side: "right", color: "blue", href: "/work/innohub" },
  { label: "Service Design", icon: "folder", side: "right", color: "blue", href: "/work/service-experience-design" },
  { label: "Design Ops", icon: "folder", side: "right", color: "blue", href: "/work/design-ops-strategy" },
  { label: "Tari HD", icon: "drive", side: "right", href: "/work" },
  { label: "Erin Brockovich", icon: "image", side: "right", image: "/about/erin-brockovich.jpg" },
]

export const hero = {
  eyebrow: { en: "Product Designer", es: "Product Designer" },
  title: {
    en: "If there's no way, I make one. Bold ideas and stubborn follow-through, from the first research to working code.",
    es: "Si no hay camino, lo abro. Ideas audaces y la tenacidad de llevarlas a cabo, de la primera investigación al código que funciona.",
  },
} satisfies Record<string, Localized>

export const sectionIds = ["story", "approach", "principles"] as const

export type SectionId = (typeof sectionIds)[number]

export const story = {
  body: {
    en: "I was born in 2001 in the Peruvian Andes and grew up between countries and languages, which taught me to ask why things work the way they do before trying to change them. Today I bring that to product design, end to end: from understanding people and the business, to strategy, interface and working code, whatever shape the problem takes. My test for any design is simple: does it make things clearer for the people who use it?",
    es: "Nací en 2001 en los Andes peruanos y crecí entre países e idiomas, lo que me enseñó a preguntar por qué las cosas funcionan como funcionan antes de intentar cambiarlas. Hoy llevo eso al diseño de producto, de principio a fin: desde entender a las personas y el negocio hasta la estrategia, la interfaz y el código que funciona, tenga el problema la forma que tenga. Mi prueba para cualquier diseño es sencilla: ¿hace las cosas más claras para quien lo usa?",
  },
  aside: {
    en: "And yes, my parents did kind of make up my name.",
    es: "Y sí, mis padres más o menos se inventaron mi nombre.",
  },
} satisfies Record<string, Localized>

export const principles: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Focus", es: "Foco" },
    body: {
      en: "A screen earns its place when it makes the next step obvious. Everything else goes one level down.",
      es: "Una pantalla se gana su sitio cuando deja claro el siguiente paso. Todo lo demás baja un nivel.",
    },
  },
  {
    title: { en: "Prototyping", es: "Prototipado" },
    body: {
      en: "A working prototype settles in a day what a meeting argues about for a week.",
      es: "Un prototipo que funciona resuelve en un día lo que una reunión discute durante una semana.",
    },
  },
  {
    title: { en: "Documentation", es: "Documentación" },
    body: {
      en: "Decisions, trade-offs and the reasons behind them get written down while the work happens. It keeps everyone aligned, makes handovers fast and saves the team from rebuilding context later.",
      es: "Las decisiones, las contrapartidas y sus motivos quedan por escrito mientras se trabaja. Mantiene a todos alineados, agiliza los traspasos y evita que el equipo tenga que reconstruir el contexto después.",
    },
  },
  {
    title: { en: "Continuity", es: "Continuidad" },
    body: {
      en: "Good work outlives the people who made it: components, rules and docs that keep running whoever joins or leaves the team.",
      es: "El buen trabajo sobrevive a quienes lo hicieron: componentes, reglas y documentación que siguen funcionando entre o salga quien salga del equipo.",
    },
  },
]

export const approach = {
  title: { en: "Test early, learn faster", es: "Probar pronto, aprender más rápido" },
  steps: [
    {
      title: { en: "Think", es: "Pensar" },
      body: {
        en: "Frame the problem and what to test, from user research.",
        es: "Plantear el problema y qué probar, desde la investigación.",
      },
    },
    {
      title: { en: "Make", es: "Hacer" },
      body: {
        en: "Prototype early in code, often with AI, to test rather than debate.",
        es: "Prototipar pronto en código, a menudo con IA, para probar y no debatir.",
      },
    },
    {
      title: { en: "Check", es: "Comprobar" },
      body: {
        en: "Test with real users and refine until it's ready to build.",
        es: "Probar con usuarios reales y pulir hasta poder construirlo.",
      },
    },
  ],
}
