import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Text in [square brackets] is a placeholder waiting for real content.

// Clips play in order and loop. Put the files in /public/about/ and list them here, e.g. "/about/hero-1.mp4".
export const heroVideos: string[] = []

export const hero = {
  eyebrow: { en: "Product Design & Strategy", es: "Diseño de Producto y Estrategia" },
  title: {
    en: "I design honest digital products and services through research, strategy, design and AI-built prototypes.",
    es: "Diseño productos y servicios digitales honestos a través de la investigación, la estrategia, el diseño y prototipos construidos con IA.",
  },
} satisfies Record<string, Localized>

export const sectionIds = [
  "origins",
  "services",
  "clients",
  "values",
  "methodology",
] as const

export type SectionId = (typeof sectionIds)[number]

export const origins = {
  body: {
    en: "I was born in 2001 in the Peruvian Andes and grew up between countries, languages and ways of noticing the world. Living between places taught me to question why things are done the way they are, and I never stopped asking. Curiosity and rebellion still drive my work, all assumptions are challenged. I take ownership with care, rigour and a real commitment to the people I work with. Results are simple, useful, thorough to the last detail, grounded in evidence so the complex feels obvious.",
    es: "Nací en 2001 en los Andes peruanos y crecí entre países, idiomas y formas de mirar el mundo. Vivir entre lugares me enseñó a cuestionar por qué las cosas se hacen como se hacen, y nunca dejé de preguntar. La curiosidad y la rebeldía siguen impulsando mi trabajo: cuestiono cada suposición. Asumo la responsabilidad con cuidado, rigor y un compromiso real con las personas con las que trabajo. Los resultados son simples, útiles, cuidados hasta el último detalle y basados en evidencias, para que lo complejo parezca obvio.",
  },
  aside: {
    en: "And yes, my parents did kind of make up my name.",
    es: "Y sí, mis padres más o menos se inventaron mi nombre.",
  },
} satisfies Record<string, Localized>

export type ServiceIcon = "product" | "strategy" | "service" | "systems" | "prototyping" | "ops"

export const services: { icon: ServiceIcon; title: Localized; body: Localized }[] = [
  {
    icon: "product",
    title: { en: "Product Design", es: "Diseño de producto" },
    body: {
      en: "End-to-end design of digital products, from discovery and research to flows, interfaces and validated prototypes. Every screen answers a business goal and a user need, and ships with the specs, states and edge cases engineering needs to build it right the first time.",
      es: "Diseño integral de productos digitales, desde el discovery y la investigación hasta los flujos, las interfaces y los prototipos validados. Cada pantalla responde a un objetivo de negocio y a una necesidad del usuario, y se entrega con las especificaciones, estados y casos límite que ingeniería necesita para construirla bien a la primera.",
    },
  },
  {
    icon: "strategy",
    title: { en: "Strategy", es: "Estrategia" },
    body: {
      en: "Turning ambiguity into a clear direction: user and market insight, positioning, opportunity framing and roadmaps that connect what people need with what the business has to achieve. The result is a plan teams can act on, with the bets, trade-offs and success metrics made explicit.",
      es: "Convertir la ambigüedad en una dirección clara: insights de usuarios y de mercado, posicionamiento, definición de oportunidades y roadmaps que conectan lo que las personas necesitan con lo que el negocio tiene que lograr. El resultado es un plan sobre el que los equipos pueden actuar, con las apuestas, las renuncias y las métricas de éxito explícitas.",
    },
  },
  {
    icon: "service",
    title: { en: "Service Design", es: "Diseño de servicios" },
    body: {
      en: "Designing the whole service, front stage and back stage: journeys, blueprints, touchpoints and the operations behind them. Finding the moments where people get stuck and fixing them at the root, so every channel works as one experience.",
      es: "Diseñar el servicio completo, lo que se ve y lo que no: recorridos, blueprints, puntos de contacto y las operaciones que los sostienen. Encontrar los momentos en los que las personas se atascan y resolverlos de raíz, para que todos los canales funcionen como una sola experiencia.",
    },
  },
  {
    icon: "systems",
    title: { en: "Design Systems", es: "Sistemas de diseño" },
    body: {
      en: "Tokens, components, patterns and documentation that let many teams ship one coherent product. Designed together with engineering, versioned like code and governed so the system keeps up with the product instead of slowing it down.",
      es: "Tokens, componentes, patrones y documentación para que muchos equipos construyan un único producto coherente. Diseñados junto a ingeniería, versionados como el código y gobernados para que el sistema acompañe al producto en lugar de frenarlo.",
    },
  },
  {
    icon: "prototyping",
    title: { en: "Rapid Prototyping", es: "Prototipado rápido" },
    body: {
      en: "Interactive, AI-built prototypes in days rather than weeks, to test ideas with real users before they become expensive. Real enough to feel like the product, fast enough to throw away, and the quickest way to replace opinion with evidence.",
      es: "Prototipos interactivos construidos con IA en días y no en semanas, para probar ideas con usuarios reales antes de que salgan caras. Lo bastante reales como para sentirse como el producto, lo bastante rápidos como para descartarlos, y la forma más rápida de cambiar opiniones por evidencias.",
    },
  },
  {
    icon: "ops",
    title: { en: "Design Ops", es: "Design Ops" },
    body: {
      en: "The operating model behind good design at scale: rituals, tooling, critique, hiring and career frameworks. Less time lost to process, more time spent on the work, and a design team the rest of the company can plan around.",
      es: "El modelo operativo detrás del buen diseño a escala: rituales, herramientas, crítica, contratación y planes de carrera. Menos tiempo perdido en procesos, más tiempo dedicado al trabajo y un equipo de diseño con el que el resto de la empresa puede planificar.",
    },
  },
]

export const clients = {
  title: {
    en: "I've worked for industries such as Banking, Insurance, Automotive & Mobility, Manufacturing, Construction & Services and Public Sector.",
    es: "He trabajado para sectores como Banca, Seguros, Automoción y Movilidad, Industria, Construcción y Servicios, y Sector Público.",
  },
} satisfies Record<string, Localized>

export const values: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Rigor", es: "Rigor" },
    body: {
      en: "Decisions backed by research and data. If it can be measured, it gets measured.",
      es: "Decisiones respaldadas por investigación y datos. Si se puede medir, se mide.",
    },
  },
  {
    title: { en: "Rebellion", es: "Rebeldía" },
    body: {
      en: "Questioning the brief, the benchmark and the way it has always been done, politely and on purpose.",
      es: "Cuestionar el brief, el benchmark y lo de siempre, con educación y a propósito.",
    },
  },
  {
    title: { en: "Honesty", es: "Honestidad" },
    body: {
      en: "Saying what the work needs, not what is comfortable to hear. Bad news early, always.",
      es: "Decir lo que el trabajo necesita, no lo que es cómodo escuchar. Las malas noticias, pronto y siempre.",
    },
  },
  {
    title: { en: "Essentiality", es: "Esencialidad" },
    body: {
      en: "Removing until only what matters is left. Simple is the hardest thing to design.",
      es: "Quitar hasta que solo quede lo importante. Lo simple es lo más difícil de diseñar.",
    },
  },
]


export const methodology = {
  title: { en: "Lean, by default.", es: "Lean, por defecto." },
  intro: {
    en: "Short loops beat long plans. Every project runs on the same three steps, as many times as it takes.",
    es: "Los ciclos cortos ganan a los planes largos. Cada proyecto sigue los mismos tres pasos, tantas veces como haga falta.",
  },
  steps: [
    {
      title: { en: "Create fast", es: "Crear rápido" },
      body: {
        en: "Prototype the riskiest idea first, in days rather than months.",
        es: "Prototipar primero la idea más arriesgada, en días y no en meses.",
      },
    },
    {
      title: { en: "Measure smart", es: "Medir con cabeza" },
      body: {
        en: "Test with real users and the few metrics that decide the outcome.",
        es: "Probar con usuarios reales y con las pocas métricas que deciden el resultado.",
      },
    },
    {
      title: { en: "Learn & iterate", es: "Aprender e iterar" },
      body: {
        en: "Keep what works, cut what doesn't, and run the loop again.",
        es: "Quedarse con lo que funciona, eliminar lo que no y repetir el ciclo.",
      },
    },
  ],
}
