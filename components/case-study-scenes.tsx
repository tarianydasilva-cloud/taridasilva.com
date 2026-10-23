"use client"

import type { CSSProperties } from "react"
import type { GalleryItem } from "@/lib/case-studies"
import type { Locale } from "@/lib/i18n"
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
        <span
          key={pill.en}
          style={{ left: pill.x, top: pill.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
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

// A quote revealed word by word as it scrolls into view: the first line in full colour, the rest muted.
export function Quote({ lines }: { lines: Record<Locale, string[]> }) {
  const { locale } = useLanguage()
  let word = 0

  return (
    <p className="text-lead rounded-2xl bg-[#f4f4f4] px-6 py-16 text-center text-balance md:px-12 md:py-24">
      {lines[locale].map((line, l) => (
        <span key={line} className={l === 0 ? "block" : "mt-1 block text-muted-foreground"}>
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

const services = {
  en: {
    title: "Our services",
    cards: [
      ["B2B service", "For Directors and Leaders"],
      ["B2C service", "For Professionals"],
    ],
  },
  es: {
    title: "Nuestros servicios",
    cards: [
      ["Servicio B2B", "Para directivos y líderes"],
      ["Servicio B2C", "Para profesionales"],
    ],
  },
}

// The services page on a phone, on Tari's orange: the list scrolls from the first service to the second and back,
// on a loop. The phone sits low in the frame, like the original mock-up.
export function ServicesPhone() {
  const { locale } = useLanguage()
  const c = services[locale]

  return (
    <div
      aria-hidden="true"
      className="@container relative aspect-[4/5] overflow-hidden rounded-2xl bg-[radial-gradient(90%_70%_at_0%_0%,#ff4a12,transparent_70%),linear-gradient(160deg,#ff6a2e,#ff9a6b_60%,#ffe2d4)]"
    >
      <div className="absolute inset-x-[16%] top-[22%] -bottom-[6%] rounded-[9cqi] bg-[#1a1a1a] p-[2.2cqi] shadow-[0_30px_60px_-30px_rgba(120,30,0,0.6)] ring-[0.6cqi] ring-[#b9b4ad]">
        <div className="@container relative h-full overflow-hidden rounded-[7cqi] bg-[#f1f1f3]">
          <div className="relative z-10 flex items-center justify-between bg-white px-[8cqi] pt-[5cqi] text-[4.4cqi] font-semibold">
            9:41
            <span className="h-[7cqi] w-[30cqi] rounded-full bg-black" />
            <span className="flex gap-[1.5cqi]">
              <span className="h-[3cqi] w-[5cqi] rounded-sm bg-black" />
              <span className="h-[3cqi] w-[7cqi] rounded-sm border border-black" />
            </span>
          </div>
          <div className="relative z-10 flex items-center justify-center bg-white py-[6cqi] text-[6cqi]">
            <span className="absolute left-[6cqi] text-[7cqi] leading-none">←</span>
            {c.title}
          </div>
          <div className="services-scroll flex flex-col gap-[6cqi] px-[7cqi] pt-[7cqi]">
            {c.cards.map(([title, subtitle], i) => (
              <div
                key={title}
                className="overflow-hidden rounded-[5cqi] bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
              >
                {i === 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/projects/service-experience-design/b2b-photo.jpg"
                    alt=""
                    className="aspect-[9/8] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[9/8] items-center justify-center bg-[linear-gradient(150deg,#ffd9c7,#ff8a5b)]">
                    <span className="flex size-[22cqi] items-center justify-center rounded-full bg-white/80 text-[10cqi]">
                      ✦
                    </span>
                  </div>
                )}
                <div className="px-[6cqi] py-[5cqi]">
                  <p className="text-[7cqi] font-semibold leading-tight">{title}</p>
                  <p className="mt-[1.5cqi] text-[4.4cqi] text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Only one scene exists so far; the prop keeps the gallery data explicit about which one it shows.
export function Scene({ scene }: { scene: NonNullable<GalleryItem["scene"]> }) {
  return scene === "principles" ? <Principles /> : null
}
