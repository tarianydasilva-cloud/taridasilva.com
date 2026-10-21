"use client"

import type { CSSProperties } from "react"
import type { GalleryItem } from "@/lib/case-studies"
import { useLanguage } from "./language-provider"

// Animated scenes for case study galleries, built in code so they stay sharp at any size.
// They play as they scroll into view (see .scene-pop and .scene-float in globals.css) and sit still with reduced motion.

const index = (i: number) => ({ "--i": i }) as CSSProperties

// Positions follow Tari's original artwork: four principles scattered across a light canvas.
const principles = [
  { en: "Alignment", es: "Alineación", x: "82.5%", y: "20.5%" },
  { en: "Coherence", es: "Coherencia", x: "17.5%", y: "36.5%" },
  { en: "Clarity", es: "Claridad", x: "72%", y: "64%" },
  { en: "Structure", es: "Estructura", x: "39.5%", y: "79%" },
]

function Principles() {
  const { locale } = useLanguage()

  return (
    <div className="@container relative aspect-[2/1] overflow-hidden rounded-2xl bg-[#f4f4f4]">
      {principles.map((pill, i) => (
        // Three layers, each with its own translate: placement, the pop-in and the float.
        <span key={pill.en} style={{ left: pill.x, top: pill.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
          <span style={index(i)} className="scene-pop block">
            <span
              style={index(i)}
              className="scene-float block whitespace-nowrap rounded-[0.9cqi] bg-white px-[3.2cqi] py-[1.2cqi] text-[clamp(11px,1.9cqi,20px)] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)]"
            >
              {pill[locale]}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}

const tagline = {
  en: ["Clearer services and better experiences,", "designed from the inside out."],
  es: ["Servicios más claros y mejores experiencias,", "diseñados de dentro hacia fuera."],
}

// The closing line, revealed word by word: the first line in full colour, the second muted.
function Tagline() {
  const { locale } = useLanguage()
  let word = 0

  return (
    <p className="text-lead rounded-2xl bg-[#f4f4f4] px-6 py-16 text-center text-balance md:py-24">
      {tagline[locale].map((line, l) => (
        <span key={line} className={l === 0 ? "block" : "block text-muted-foreground"}>
          {line.split(" ").map((w) => (
            <span key={w + word} style={index(word++)} className="scene-pop scene-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </span>
      ))}
    </p>
  )
}

export function Scene({ scene }: { scene: NonNullable<GalleryItem["scene"]> }) {
  return scene === "principles" ? <Principles /> : <Tagline />
}
