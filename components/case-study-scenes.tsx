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

// A service blueprint on Tari's orange: the customer's journey on top, the work behind it below.
// The lanes draw themselves in and the steps pop in along them, once, as the page opens.
// Steps sit at --x0 + n * --dx, wider apart on small covers, where lane names move above their lane.
const front = [
  { en: "Discover", es: "Descubrir" },
  { en: "Compare", es: "Comparar" },
  { en: "Choose", es: "Elegir" },
  { en: "Onboard", es: "Empezar" },
  { en: "Follow up", es: "Seguimiento" },
]
const back = [
  { en: "Contact", es: "Contacto", at: 1 },
  { en: "Proposal", es: "Propuesta", at: 2 },
  { en: "Delivery", es: "Entrega", at: 3 },
]
const lanes = [
  { en: "Customer", es: "Cliente", y: 40 },
  { en: "Behind the scenes", es: "Entre bastidores", y: 70 },
]
const x = (n: number) => `calc(var(--x0) + ${n} * var(--dx))`

function Blueprint() {
  const { locale } = useLanguage()
  // The outer span places the step and the inner one pops in, so their translates don't clash.
  const place = "absolute -translate-x-1/2 -translate-y-1/2"
  const pill =
    "cover-pop block whitespace-nowrap rounded-full bg-white px-[1.4cqi] py-[0.8cqi] text-[clamp(9px,1.5cqi,16px)] text-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] @lg:px-[1.8cqi]"
  const line = "cover-grow absolute h-0.5 -translate-y-1/2 origin-left bg-white"

  return (
    <div
      aria-hidden="true"
      className="@container relative aspect-video overflow-hidden rounded-2xl bg-[radial-gradient(70%_60%_at_35%_0%,#fff1e8,transparent),linear-gradient(160deg,#ffb592,#ff5a26_65%,#ff3d00)] [--dx:19.5%] [--x0:11%]"
    >
      <div className="absolute inset-0 @lg:[--dx:16.5%] @lg:[--x0:22%]">
        <span style={{ left: x(0), width: `calc(4 * var(--dx))`, top: "40%" }} className={line} />
        <span
          style={{ left: x(1), width: `calc(2 * var(--dx))`, top: "70%" }}
          className={`${line} opacity-70 [animation-delay:0.5s]`}
        />
        {back.map((step) => (
          <span
            key={step.en}
            style={{ left: x(step.at) }}
            className="cover-fade absolute top-[40%] h-[30%] border-l-2 border-dashed border-white/60"
          />
        ))}
        {lanes.map((lane) => (
          <span
            key={lane.en}
            style={{ top: `${lane.y}%` }}
            className="absolute left-[3cqi] -translate-y-[260%] text-[clamp(8px,1.2cqi,13px)] font-medium uppercase tracking-wider text-white/85 @lg:-translate-y-1/2"
          >
            {lane[locale]}
          </span>
        ))}
        {front.map((step, i) => (
          <span key={step.en} style={{ left: x(i), top: "40%" }} className={place}>
            <span style={index(i)} className={pill}>
              {step[locale]}
            </span>
          </span>
        ))}
        {back.map((step, i) => (
          <span key={step.en} style={{ left: x(step.at), top: "70%" }} className={place}>
            <span style={index(i + 3)} className={pill}>
              {step[locale]}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Scene({ scene }: { scene: NonNullable<GalleryItem["scene"]> }) {
  if (scene === "blueprint") return <Blueprint />
  return scene === "principles" ? <Principles /> : <Tagline />
}
