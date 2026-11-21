import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// The kinds of work the filter row on /explorations offers. Only kinds that at least one item uses are shown.
export const explorationKinds = {
  product: { en: "Product", es: "Producto" },
  service: { en: "Service", es: "Servicio" },
  research: { en: "Research", es: "Research" },
  workshop: { en: "Workshops", es: "Talleres" },
  visual: { en: "Visual", es: "Visual" },
  side: { en: "Side projects", es: "Proyectos propios" },
} satisfies Record<string, Localized>

export type ExplorationKind = keyof typeof explorationKinds

export type Exploration = {
  id: string
  title: Localized
  // One short line shown in the viewer under the title. Optional.
  note?: Localized
  year: string
  kind: ExplorationKind
  // Put files in /public/explorations/. Any aspect ratio works: the field crops to a circle around `focus`,
  // and the viewer shows the whole picture. Without an image, a tinted stand-in is shown.
  image?: string
  // Where the circle crop centres, as a CSS object-position (e.g. "50% 30%"). Defaults to the centre.
  focus?: string
  alt?: Localized
  // How large the circle is in the field. Mix them; a few "l" go a long way.
  size: "s" | "m" | "l"
}

// Placeholder entries until Tari's own pictures arrive. Replace titles, years, kinds and add `image`.
const placeholderKinds: ExplorationKind[] = ["product", "workshop", "visual", "service", "side", "research"]
const placeholderSizes: Exploration["size"][] = ["l", "s", "m", "m", "s", "l", "m", "s", "m", "l", "s", "m", "m", "s", "l", "s", "m", "m"]

export const explorations: Exploration[] = placeholderSizes.map((size, index) => {
  const n = String(index + 1).padStart(2, "0")
  return {
    id: `placeholder-${n}`,
    title: { en: `Exploration ${n}`, es: `Exploración ${n}` },
    note: { en: "Placeholder: a picture and a line about it go here.", es: "Provisional: aquí van una imagen y una línea sobre ella." },
    year: String(2026 - (index % 6)),
    kind: placeholderKinds[index % placeholderKinds.length],
    size,
  }
})
