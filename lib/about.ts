import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Text in [square brackets] is a placeholder waiting for real content.

// Clips play in order and loop. Put the files in /public/about/ and list them here, e.g. "/about/hero-1.mp4".
// Encode them mirrored, muted and web-sized, with a first-frame poster next to each as .jpg:
//   ffmpeg -i in.mov -vf "hflip,scale=1440:-2" -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart out.mp4
//   ffmpeg -i out.mp4 -frames:v 1 -q:v 4 out.jpg
export const heroVideos: string[] = ["/about/tari-desktop.mp4"]

// Icons on the About "desktop", placed down the left and right edges so the face in the video stays clear.
// File names stay in English in both languages, like real files.
export type DesktopIcon = "folder" | "text" | "pdf" | "mail"

export const desktopItems: { label: string; icon: DesktopIcon; href: string; side: "left" | "right" }[] = [
  { label: "about_me.txt", icon: "text", href: "#story", side: "left" },
  { label: "how_i_work.pdf", icon: "pdf", href: "#approach", side: "left" },
  { label: "principles.txt", icon: "text", href: "#principles", side: "left" },
  { label: "say_hola", icon: "mail", href: "/contact", side: "left" },
  { label: "Innohub", icon: "folder", href: "/work/innohub", side: "right" },
  { label: "Fleet Connect", icon: "folder", href: "/work/fleet-connect", side: "right" },
  { label: "Service Design", icon: "folder", href: "/work/service-experience-design", side: "right" },
  { label: "Design Ops", icon: "folder", href: "/work/design-ops-strategy", side: "right" },
]

export const hero = {
  eyebrow: { en: "Product Design & Strategy", es: "Diseño de Producto y Estrategia" },
  title: {
    en: "I design honest digital products and services through research, strategy, design and AI-built prototypes.",
    es: "Diseño productos y servicios digitales honestos a través de la investigación, la estrategia, el diseño y prototipos construidos con IA.",
  },
} satisfies Record<string, Localized>

export const sectionIds = ["story", "approach", "services", "principles", "industries"] as const

export type SectionId = (typeof sectionIds)[number]

export const story = {
  body: {
    en: "I was born in 2001 in the Peruvian Andes and grew up between countries, languages and ways of noticing the world. Living between places taught me to question why things are done the way they are, and I never stopped asking. Curiosity and rebellion still drive my work, all assumptions are challenged. I take ownership with care, rigour and a real commitment to the people I work with. Results are simple, useful, thorough to the last detail, grounded in evidence so the complex feels obvious.",
    es: "Nací en 2001 en los Andes peruanos y crecí entre países, idiomas y formas de mirar el mundo. Vivir entre lugares me enseñó a cuestionar por qué las cosas se hacen como se hacen, y nunca dejé de preguntar. La curiosidad y la rebeldía siguen impulsando mi trabajo: cuestiono cada suposición. Asumo la responsabilidad con cuidado, rigor y un compromiso real con las personas con las que trabajo. Los resultados son simples, útiles, cuidados hasta el último detalle y basados en evidencias, para que lo complejo parezca obvio.",
  },
  aside: {
    en: "And yes, my parents did kind of make up my name.",
    es: "Y sí, mis padres más o menos se inventaron mi nombre.",
  },
} satisfies Record<string, Localized>

export const services: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Product Design", es: "Diseño de producto" },
    body: {
      en: "End-to-end design of digital products, from research to flows, interfaces and working prototypes. From rebuilding a SaaS platform with deep UX problems to turning data-heavy dashboards into tools for decisions, every screen answers a user need and a business goal.",
      es: "Diseño integral de productos digitales, de la investigación a los flujos, las interfaces y los prototipos funcionales. Desde reconstruir una plataforma SaaS con problemas profundos de UX hasta convertir dashboards cargados de datos en herramientas para decidir, cada pantalla responde a una necesidad del usuario y a un objetivo de negocio.",
    },
  },
  {
    title: { en: "Strategy", es: "Estrategia" },
    body: {
      en: "Turning ambiguity into a clear direction: framing the real problem, prioritising what matters most and defining the use cases that guide what gets built. Grounded in research with users and stakeholders, and shared so teams can act on it.",
      es: "Convertir la ambigüedad en una dirección clara: plantear el problema real, priorizar lo que más importa y definir los casos de uso que guían lo que se construye. Basado en investigación con usuarios y stakeholders, y compartido para que los equipos puedan actuar.",
    },
  },
  {
    title: { en: "Service Design", es: "Diseño de servicios" },
    body: {
      en: "Designing the whole service, front stage and back stage: journeys, blueprints, touchpoints and the operations behind them. Finding the moments where people get stuck and fixing them at the root, so every channel works as one experience.",
      es: "Diseñar el servicio completo, lo que se ve y lo que no: recorridos, blueprints, puntos de contacto y las operaciones que los sostienen. Encontrar los momentos en los que las personas se atascan y resolverlos de raíz, para que todos los canales funcionen como una sola experiencia.",
    },
  },
  {
    title: { en: "Rapid Prototyping", es: "Prototipado rápido" },
    body: {
      en: "Interactive, AI-built prototypes in days rather than weeks, to test ideas with real users before they become expensive. Real enough to feel like the product, fast enough to throw away, and the quickest way to replace opinion with evidence.",
      es: "Prototipos interactivos construidos con IA en días y no en semanas, para probar ideas con usuarios reales antes de que salgan caras. Lo bastante reales como para sentirse como el producto, lo bastante rápidos como para descartarlos, y la forma más rápida de cambiar opiniones por evidencias.",
    },
  },
  {
    title: { en: "Design Ops", es: "Design Ops" },
    body: {
      en: "Bringing structure to how design and creative teams work: clearer briefings, a shared language for scope and effort, calmer client communication and rituals that keep everyone aligned. Less friction, more time spent on the work.",
      es: "Dar estructura a cómo trabajan los equipos de diseño y creativos: briefings más claros, un lenguaje común para alcance y esfuerzo, una comunicación con clientes más serena y rituales que mantienen a todos alineados. Menos fricción, más tiempo para el trabajo.",
    },
  },
]

export const industries = {
  title: {
    en: "I've worked for industries such as Banking, Insurance, Automotive & Mobility, Manufacturing, Construction & Services and Public Sector.",
    es: "He trabajado para sectores como Banca, Seguros, Automoción y Movilidad, Industria, Construcción y Servicios, y Sector Público.",
  },
} satisfies Record<string, Localized>

export const principles: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Vision", es: "Visión" },
    body: {
      en: "Start with the destination. Before designing anything, define what success looks like and who it's for.",
      es: "Empezar por el destino. Antes de diseñar nada, definir cómo es el éxito y para quién es.",
    },
  },
  {
    title: { en: "Evidence", es: "Evidencia" },
    body: {
      en: "Opinions start the conversation, research and testing end it. Decisions are made on evidence and explained in plain words.",
      es: "Las opiniones abren la conversación; la investigación y las pruebas la cierran. Las decisiones se toman con evidencias y se explican con palabras claras.",
    },
  },
  {
    title: { en: "Craft", es: "Oficio" },
    body: {
      en: "Make it real, then make it right. Prototype early and refine every detail until the experience feels effortless.",
      es: "Primero hacerlo real, después hacerlo bien. Prototipar pronto y pulir cada detalle hasta que la experiencia parezca natural.",
    },
  },
  {
    title: { en: "Ambition", es: "Ambición" },
    body: {
      en: "Raise the bar every time. Everything should be better than what came before, down to the last detail.",
      es: "Subir el listón cada vez. Todo debería ser mejor que lo anterior, hasta el último detalle.",
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
        en: "Prototype early, often with AI, to test rather than debate.",
        es: "Prototipar pronto, a menudo con IA, para probar y no debatir.",
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
