import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Explorations, after Devin Cooper's "The Overflow": work that doesn't fit a case study, shown as a dense
// wall of pictures in rounded frames with a file-style tag under each. Put the files in /public/explorations/ and list
// them here, newest first. `src` can be a picture or an .mp4 (it plays muted on a loop).
export type Exploration = { src?: string; label: string }

// Not live yet: the page and its nav link only exist in builds made with NEXT_PUBLIC_SHOW_EXPLORATIONS=1
// (the preview). The live site, built without it, leaves both out.
export const showExplorations = process.env.NEXT_PUBLIC_SHOW_EXPLORATIONS === "1"

export const intro: Localized = {
  en: "Not everything fits into a case study. Explorations collects side projects, experiments and pieces of work from along the way.",
  es: "No todo cabe en un caso de estudio. Exploraciones reúne proyectos paralelos, experimentos y piezas de trabajo que he ido haciendo por el camino.",
}

// 56 spaces, like the reference wall (8 columns × 7 rows on desktop). A space without `src` shows empty,
// waiting for its picture; Tari's images replace these one by one, and her own tags replace the labels.
// Filled spaces, by position (1 = top left, 56 = bottom right on desktop).
const filled: Record<number, Exploration> = {
  // Draft: the freim logo as textured 3D pieces, printed on a white tee, on black (to be redone on a blank mockup).
  // 10 Coffee, Tari's packaging brand, as TEN over COFFEE (one width, tight lines): Unbounded, fine print grain, cobalt #5B8CFF (6.6:1) on #000.
  55: { src: "/explorations/10-coffee.jpg", label: "10COFFEE_01.JPG" },
  56: { src: "/explorations/freim-tee.jpg", label: "FREIM_01.JPG" },
}

export const explorations: Exploration[] = Array.from(
  { length: 56 },
  (_, i) => filled[i + 1] ?? { label: `IMAGE_${String(i + 1).padStart(2, "0")}.JPG` },
)
