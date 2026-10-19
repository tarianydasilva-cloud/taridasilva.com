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

export type ServiceIcon =
  | "product"
  | "branding"
  | "systems"
  | "ops"
  | "management"
  | "venture"
  | "motion"
  | "analytics"

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
    icon: "branding",
    title: { en: "Branding", es: "Branding" },
    body: {
      en: "Brand strategy and identity built for digital products: positioning, naming support, visual language and voice. Brands designed to live inside interfaces and to scale across every touchpoint without losing what makes them recognisable.",
      es: "Estrategia e identidad de marca pensadas para productos digitales: posicionamiento, apoyo en naming, lenguaje visual y tono. Marcas diseñadas para vivir dentro de las interfaces y escalar a todos los puntos de contacto sin perder lo que las hace reconocibles.",
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
    icon: "ops",
    title: { en: "Design Ops", es: "Design Ops" },
    body: {
      en: "The operating model behind good design at scale: rituals, tooling, critique, hiring and career frameworks. Less time lost to process, more time spent on the work, and a design team the rest of the company can plan around.",
      es: "El modelo operativo detrás del buen diseño a escala: rituales, herramientas, crítica, contratación y planes de carrera. Menos tiempo perdido en procesos, más tiempo dedicado al trabajo y un equipo de diseño con el que el resto de la empresa puede planificar.",
    },
  },
  {
    icon: "management",
    title: { en: "Product Management", es: "Product Management" },
    body: {
      en: "Vision, roadmap and prioritisation grounded in evidence. Turning strategy into outcomes the team can measure, writing the problem before the solution, and making the trade-offs explicit so everyone knows what is being built and why.",
      es: "Visión, roadmap y priorización basados en evidencias. Convertir la estrategia en resultados que el equipo pueda medir, escribir el problema antes que la solución y hacer explícitas las renuncias para que todos sepan qué se construye y por qué.",
    },
  },
  {
    icon: "venture",
    title: { en: "Venture Building", es: "Venture Building" },
    body: {
      en: "Taking new ventures from idea to first traction: opportunity framing, business model, MVP definition and launch. Small bets, tested quickly with real users, so investment follows evidence rather than opinion.",
      es: "Llevar nuevas iniciativas de la idea a la primera tracción: definición de la oportunidad, modelo de negocio, MVP y lanzamiento. Apuestas pequeñas, probadas rápido con usuarios reales, para que la inversión siga a la evidencia y no a la opinión.",
    },
  },
  {
    icon: "motion",
    title: { en: "Motion Design", es: "Motion Design" },
    body: {
      en: "Motion as part of the interface, not decoration: transitions, micro-interactions and product storytelling that explain how things work. Specified precisely enough to be built, and restrained enough to never get in the way.",
      es: "El movimiento como parte de la interfaz, no como decoración: transiciones, microinteracciones y narrativa de producto que explican cómo funcionan las cosas. Especificado con la precisión necesaria para construirlo y con la contención suficiente para no estorbar nunca.",
    },
  },
  {
    icon: "analytics",
    title: { en: "CRO & Analytics", es: "CRO y analítica" },
    body: {
      en: "Measurement plans, funnels, experiments and A/B tests that show what is actually working. Conversion work driven by data and qualitative insight, with every change tied to a metric and every result fed back into the roadmap.",
      es: "Planes de medición, embudos, experimentos y tests A/B que muestran lo que de verdad funciona. Optimización de la conversión guiada por datos e insights cualitativos, con cada cambio ligado a una métrica y cada resultado de vuelta en el roadmap.",
    },
  },
]

export const clients = {
  claim: {
    en: "Trusted by teams across [N] industries: fintech, healthcare, mobility, retail, education and the public sector.",
    es: "Equipos de [N] sectores confían en mi trabajo: fintech, salud, movilidad, retail, educación y sector público.",
  },
  // Add a logo path (monochrome SVG or PNG in /public/clients/) to replace each placeholder.
  logos: Array.from({ length: 12 }, (_, i) => ({
    name: `[Client ${String(i + 1).padStart(2, "0")}]`,
    logo: undefined as string | undefined,
  })),
}

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
