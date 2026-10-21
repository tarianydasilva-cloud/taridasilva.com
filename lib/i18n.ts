export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
export const LOCALE_COOKIE = "locale"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}

// Picks Spanish only when the browser's preferred language is Spanish; English otherwise.
export function localeFromAcceptLanguage(header: string | null): Locale {
  const preferred = header?.split(",")[0]?.trim().toLowerCase() ?? ""
  return preferred.startsWith("es") ? "es" : defaultLocale
}

export const dictionary = {
  en: {
    skip: "Skip to content",
    role: "Product Design & Strategy",
    nav: { work: "Work", about: "About", contact: "Say hola!" },
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
    },
    work: { disciplines: "Disciplines", year: "Year" },
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
    contact: {
      title: "Say hola.",
      intro: "Whether it's a role, a project or a question, email is the fastest way to reach me.",
      email: "Email",
      copy: "Copy",
      copied: "Copied",
      elsewhere: "Elsewhere",
    },
    footer: {
      elsewhere: "Elsewhere",
      backToTop: "Back to top",
      rights: "All rights reserved.",
    },
  },
  es: {
    skip: "Saltar al contenido",
    role: "Diseño de Producto y Estrategia",
    nav: { work: "Trabajo", about: "Sobre mí", contact: "Di olá!" },
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
    },
    work: { disciplines: "Disciplinas", year: "Año" },
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
    contact: {
      title: "Di hola.",
      intro: "Ya sea un puesto, un proyecto o una pregunta, el email es la forma más rápida de contactarme.",
      email: "Email",
      copy: "Copiar",
      copied: "Copiado",
      elsewhere: "En otros sitios",
    },
    footer: {
      elsewhere: "En otros sitios",
      backToTop: "Volver arriba",
      rights: "Todos los derechos reservados.",
    },
  },
} as const

export type Dictionary = (typeof dictionary)[Locale]
