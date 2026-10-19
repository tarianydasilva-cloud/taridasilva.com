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
    aside: { tagline: "Strategy, systems & product", contact: "Contact", contactSub: "Let's talk" },
    about: {
      sectionNav: "About sections",
      sections: {
        origins: "Origins",
        services: "Services",
        clients: "Clients",
        values: "Values",
        methodology: "Methodology",
      },
      servicesLabel: "Services",
    },
    letsTalk: {
      title: "Let's talk",
      intro: "Tell me where you want to start.",
      close: "Close",
      newBusiness: { title: "New business", body: "A product, a brand or a system worth shaping." },
      careers: { title: "Careers", body: "Want to build with me? Send your work." },
    },
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
      newProjects: "New projects",
      joinTeam: "Join the team",
      address: "Studio",
      group: "Group",
      approach: "Approach",
      handbook: "Handbook",
      podcast: "Podcast",
      elsewhere: "Elsewhere",
      legal: { privacy: "Privacy", notice: "Legal notice", cookies: "Cookies" },
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
    aside: { tagline: "Estrategia, sistemas y producto", contact: "Contacto", contactSub: "Hablemos" },
    about: {
      sectionNav: "Secciones de Sobre mí",
      sections: {
        origins: "Orígenes",
        services: "Servicios",
        clients: "Clientes",
        values: "Valores",
        methodology: "Metodología",
      },
      servicesLabel: "Servicios",
    },
    letsTalk: {
      title: "Hablemos",
      intro: "Cuéntame por dónde quieres empezar.",
      close: "Cerrar",
      newBusiness: { title: "Nuevos proyectos", body: "Un producto, una marca o un sistema que merece forma." },
      careers: { title: "Empleo", body: "¿Quieres construir conmigo? Envía tu trabajo." },
    },
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
      newProjects: "Nuevos proyectos",
      joinTeam: "Únete al equipo",
      address: "Estudio",
      group: "Grupo",
      approach: "Enfoque",
      handbook: "Handbook",
      podcast: "Podcast",
      elsewhere: "En otros sitios",
      legal: { privacy: "Privacidad", notice: "Aviso legal", cookies: "Cookies" },
      backToTop: "Volver arriba",
      rights: "Todos los derechos reservados.",
    },
  },
} as const

export type Dictionary = (typeof dictionary)[Locale]
