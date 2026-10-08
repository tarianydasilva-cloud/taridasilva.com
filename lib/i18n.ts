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
    role: "Strategic Product Designer",
    nav: { work: "Work", about: "About", contact: "Contact" },
    language: "Language",
    home: "Home",
    aside: { tagline: "Strategy, systems & product", contact: "Contact", contactSub: "Let's talk" },
    pages: {
      home: { eyebrow: "Index", title: "Strategy, systems and products that move people forward." },
      work: { eyebrow: "Selected work", title: "Work" },
      about: { eyebrow: "Profile", title: "About" },
      contact: { eyebrow: "Get in touch", title: "Contact" },
    },
    work: { disciplines: "Disciplines", allWork: "All work", year: "Year" },
    footer: {
      cta: "Have a product worth shaping?",
      ctaLink: "Start a conversation",
      elsewhere: "Elsewhere",
      backToTop: "Back to top",
      rights: "All rights reserved.",
    },
  },
  es: {
    skip: "Saltar al contenido",
    role: "Diseñadora de Producto Estratégica",
    nav: { work: "Trabajo", about: "Sobre mí", contact: "Contacto" },
    language: "Idioma",
    home: "Inicio",
    aside: { tagline: "Estrategia, sistemas y producto", contact: "Contacto", contactSub: "Hablemos" },
    pages: {
      home: { eyebrow: "Índice", title: "Estrategia, sistemas y productos que impulsan a las personas." },
      work: { eyebrow: "Trabajo seleccionado", title: "Trabajo" },
      about: { eyebrow: "Perfil", title: "Sobre mí" },
      contact: { eyebrow: "Hablemos", title: "Contacto" },
    },
    work: { disciplines: "Disciplinas", allWork: "Todo el trabajo", year: "Año" },
    footer: {
      cta: "¿Tienes un producto que merece forma?",
      ctaLink: "Iniciar una conversación",
      elsewhere: "En otros sitios",
      backToTop: "Volver arriba",
      rights: "Todos los derechos reservados.",
    },
  },
} as const

export type Dictionary = (typeof dictionary)[Locale]
