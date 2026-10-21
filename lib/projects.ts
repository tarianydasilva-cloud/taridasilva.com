import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

export type Project = {
  slug: string
  title: Localized
  summary: Localized
  year: string
  tags: Localized[]
  // Without an image, cards and case studies show a neutral placeholder. Put files in /public/projects/<slug>/.
  // The case study header uses `cover` when set, so the card and the header can show different pictures.
  image?: string
  cover?: string
  // An animated tile built in code (components/project-motion.tsx), shown instead of the picture on the card
  // and as the case study cover.
  motion?: "service"
  imageAlt?: Localized
  video?: string
}

export const projects: Project[] = [
  {
    slug: "innohub",
    title: { en: "Innohub", es: "Innohub" },
    summary: {
      en: "Igniting innovation participation.",
      es: "Impulsar la participación en la innovación.",
    },
    year: "2026",
    tags: [
      { en: "Product Design", es: "Diseño de producto" },
      { en: "UX Redesign", es: "Rediseño UX" },
      { en: "AI Prototyping", es: "Prototipado con IA" },
    ],
  },
  {
    slug: "fleet-connect",
    title: { en: "Fleet Connect", es: "Fleet Connect" },
    summary: {
      en: "Driving client adoption with insights.",
      es: "Impulsar la adopción de clientes con insights.",
    },
    year: "2026",
    tags: [
      { en: "Product Design", es: "Diseño de producto" },
      { en: "Data Visualisation", es: "Visualización de datos" },
      { en: "Mobility", es: "Movilidad" },
    ],
    image: "/projects/fleet-connect/card.jpg",
    cover: "/projects/fleet-connect/cover-dashboard-2x.jpg",
    imageAlt: {
      en: "The Fleet Connect dashboard, with cost savings and emissions cards, over a road through a forest",
      es: "El dashboard de Fleet Connect, con las tarjetas de ahorro de costes y de emisiones, sobre una carretera entre bosques",
    },
  },
  {
    slug: "service-experience-design",
    title: { en: "Service & Experience Design", es: "Diseño de servicios y experiencia" },
    summary: {
      en: "Clarifying and aligning services across a growing organisation.",
      es: "Aclarar y alinear servicios en una organización en crecimiento.",
    },
    year: "2025",
    tags: [
      { en: "Service Design", es: "Diseño de servicios" },
      { en: "Strategy", es: "Estrategia" },
    ],
    motion: "service",
  },
  {
    slug: "design-ops-strategy",
    title: { en: "Design Ops & Strategy", es: "Design Ops y estrategia" },
    summary: {
      en: "Bringing structure to work under pressure.",
      es: "Dar estructura al trabajo bajo presión.",
    },
    year: "2025",
    tags: [
      { en: "Design Ops", es: "Design Ops" },
      { en: "Strategy", es: "Estrategia" },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
