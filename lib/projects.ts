import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

export type Project = {
  slug: string
  title: Localized
  summary: Localized
  year: string
  tags: Localized[]
  image: string
  imageAlt: Localized
  video?: string
}

export const projects: Project[] = [
  {
    slug: "ledger",
    title: { en: "Ledger — Rethinking everyday banking", es: "Ledger — Repensar la banca diaria" },
    summary: {
      en: "A mobile-first banking experience that turned a legacy product into a daily habit.",
      es: "Una experiencia bancaria mobile-first que convirtió un producto heredado en un hábito diario.",
    },
    year: "2025",
    tags: [
      { en: "Product Strategy", es: "Estrategia de producto" },
      { en: "UX/UI", es: "UX/UI" },
      { en: "Fintech", es: "Fintech" },
    ],
    image: "/projects/ledger.png",
    imageAlt: {
      en: "Banking app dashboard on a phone and laptop",
      es: "Panel de la app bancaria en un teléfono y un portátil",
    },
  },
  {
    slug: "atlas",
    title: { en: "Atlas — A design system at scale", es: "Atlas — Un sistema de diseño a escala" },
    summary: {
      en: "One shared language for 12 product teams, from tokens to governance.",
      es: "Un lenguaje común para 12 equipos de producto, de los tokens a la gobernanza.",
    },
    year: "2024",
    tags: [
      { en: "Design Systems", es: "Sistemas de diseño" },
      { en: "Governance", es: "Gobernanza" },
    ],
    image: "/projects/atlas.png",
    imageAlt: {
      en: "Grid of monochrome interface components",
      es: "Cuadrícula de componentes de interfaz monocromos",
    },
  },
  {
    slug: "clinic",
    title: { en: "Clinic — Service design for care", es: "Clinic — Diseño de servicios para la salud" },
    summary: {
      en: "Mapping the patient journey end-to-end to cut waiting times by a third.",
      es: "Mapear el recorrido del paciente de principio a fin para reducir un tercio las esperas.",
    },
    year: "2024",
    tags: [
      { en: "Service Design", es: "Diseño de servicios" },
      { en: "Research", es: "Investigación" },
      { en: "Healthcare", es: "Salud" },
    ],
    image: "/projects/clinic.png",
    imageAlt: {
      en: "Workshop wall with a journey map and sticky notes",
      es: "Pared de taller con un mapa de recorrido y notas adhesivas",
    },
  },
  {
    slug: "transit",
    title: { en: "Transit — Mobility, simplified", es: "Transit — Movilidad simplificada" },
    summary: {
      en: "Planning, paying and riding unified in a single city mobility app.",
      es: "Planificar, pagar y viajar en una sola app de movilidad urbana.",
    },
    year: "2023",
    tags: [
      { en: "Product Design", es: "Diseño de producto" },
      { en: "Prototyping", es: "Prototipado" },
    ],
    image: "/projects/transit.png",
    imageAlt: {
      en: "Transit app on a phone over a city street",
      es: "App de transporte en un teléfono sobre una calle de la ciudad",
    },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
