export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
export const LOCALE_COOKIE = "locale"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}

export const dictionary = {
  en: {
    skip: "Skip to content",
    role: "Product Design & Strategy",
    nav: { work: "Work", about: "About", contact: "Contact" },
    language: "Language",
    home: "Home",
    about: {
      sectionNav: "About sections",
      sections: {
        story: "Story",
        services: "What I do",
        industries: "Industries",
        principles: "Principles",
        approach: "How I work",
      },
    },
    pages: {
      work: { eyebrow: "Selected work", title: "Work" },
      about: { eyebrow: "Profile", title: "About" },
      contact: { eyebrow: "Get in touch", title: "Contact" },
    },
    work: { disciplines: "Disciplines", allWork: "All work", year: "Year" },
    caseStudy: {
      sectionNav: "Case study sections",
      sections: {
        overview: "Overview",
        challenge: "Challenge",
        approach: "Approach",
        solution: "Solution",
        results: "Results",
        learnings: "Learnings",
      },
      facts: { client: "Client", role: "Role", team: "Team", timeline: "Timeline" },
      nextProject: "Next project",
    },
    footer: {
      cta: "Have a product worth shaping?",
      elsewhere: "Elsewhere",
      backToTop: "Back to top",
      rights: "All rights reserved.",
    },
  },
  es: {
    skip: "Saltar al contenido",
    role: "Diseño de Producto y Estrategia",
    nav: { work: "Trabajo", about: "Sobre mí", contact: "Contacto" },
    language: "Idioma",
    home: "Inicio",
    about: {
      sectionNav: "Secciones de Sobre mí",
      sections: {
        story: "Historia",
        services: "Qué hago",
        industries: "Sectores",
        principles: "Principios",
        approach: "Cómo trabajo",
      },
    },
    pages: {
      work: { eyebrow: "Trabajo seleccionado", title: "Trabajo" },
      about: { eyebrow: "Perfil", title: "Sobre mí" },
      contact: { eyebrow: "Hablemos", title: "Contacto" },
    },
    work: { disciplines: "Disciplinas", allWork: "Todo el trabajo", year: "Año" },
    caseStudy: {
      sectionNav: "Secciones del caso de estudio",
      sections: {
        overview: "Resumen",
        challenge: "Reto",
        approach: "Enfoque",
        solution: "Solución",
        results: "Resultados",
        learnings: "Aprendizajes",
      },
      facts: { client: "Cliente", role: "Rol", team: "Equipo", timeline: "Duración" },
      nextProject: "Siguiente proyecto",
    },
    footer: {
      cta: "¿Tienes un producto que merece forma?",
      elsewhere: "En otros sitios",
      backToTop: "Volver arriba",
      rights: "Todos los derechos reservados.",
    },
  },
} as const

export type Dictionary = (typeof dictionary)[Locale]
