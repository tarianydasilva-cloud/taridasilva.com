"use client"

import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/projects"
import { useLanguage } from "./language-provider"

// Animated project tiles built in code: a glossy orange card where small pieces of the product come alive on a
// 10-second loop (the timings live in globals.css, under .motion-*). With reduced motion the first scene shows still.

const index = (i: number) => ({ "--i": i }) as CSSProperties

const copy = {
  en: {
    tiers: "B2B Services",
    plans: ["Basic", "Pro", "Master"],
    ask: "What should this service feel like?",
    answer: "Clear from the first view.",
  },
  es: {
    tiers: "Servicios B2B",
    plans: ["Basic", "Pro", "Master"],
    ask: "¿Cómo debería sentirse este servicio?",
    answer: "Claro desde la primera vista.",
  },
}

const card = "rounded-[clamp(12px,2.4cqi,20px)] bg-white/90 shadow-[0_20px_50px_-24px_rgba(120,30,0,0.55)] backdrop-blur"
const text = "text-[clamp(11px,3.2cqi,15px)] @xl:text-[clamp(11px,1.8cqi,16px)]"
const width = "w-[68cqi] @xl:w-[36cqi]"

function Service() {
  const { locale } = useLanguage()
  const c = copy[locale]

  return (
    <>
      {/* Scene one: the service tiers list, with a selection moving down it. */}
      <div className="motion-a absolute inset-0 flex items-center justify-center">
        <div className={cn(card, width, text, "p-[clamp(10px,2cqi,18px)]")}>
          <p className="motion-row px-[0.6em] pb-[0.5em] text-[0.85em] text-muted-foreground" style={index(0)}>
            {c.tiers}
          </p>
          <ul className="relative">
            <li aria-hidden="true" className="motion-select absolute inset-x-0 top-0 h-1/3 rounded-[0.6em] bg-accent/10" />
            {c.plans.map((plan, i) => (
              <li
                key={plan}
                style={index(i + 1)}
                className="motion-row relative flex items-center justify-between px-[0.6em] py-[0.7em]"
              >
                {plan}
                <span aria-hidden="true" className="text-muted-foreground">
                  ›
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scene two: a prompt answered as if typed. */}
      <div className="motion-b absolute inset-0 flex items-center justify-center">
        <div className={cn(card, text, "w-[78cqi] p-[clamp(14px,2.8cqi,24px)] @xl:w-[48cqi]")}>
          <p className="text-[1.15em] tracking-tight">{c.ask}</p>
          <p className="mt-[0.5em] flex items-center text-muted-foreground">
            <span className="motion-type">{c.answer}</span>
            <span aria-hidden="true" className="motion-caret ml-px h-[1.1em] w-px bg-foreground" />
          </p>
        </div>
      </div>
    </>
  )
}

const wordmark = { en: ["Service", "& Experience"], es: ["Servicios", "y Experiencia"] }

// The case study cover: the same orange, with the name set large in white and the light slowly drifting.
function Wordmark() {
  const { locale } = useLanguage()

  return (
    <>
      <div className="motion-glow absolute -inset-1/4 bg-[radial-gradient(40%_35%_at_35%_30%,rgb(255_240_232/0.85),transparent_70%)]" />
      <p className="motion-wordmark absolute inset-0 flex flex-col items-center justify-center text-center text-[9cqi] font-medium leading-[0.95] tracking-[-0.04em] text-white">
        {wordmark[locale].map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </>
  )
}

const ops = { en: ["Design Ops", "& Strategy"], es: ["Design Ops", "y Estrategia"] }

// Design Ops: black type on light grey. Every 6 seconds the words blur away one by one and come back in order.
function Ops() {
  const { locale } = useLanguage()
  let word = 0

  return (
    <p className="absolute inset-0 flex flex-col items-center justify-center text-center text-[11cqi] leading-[1.02] tracking-[-0.035em] text-foreground">
      {ops[locale].map((line) => (
        <span key={line}>
          {line.split(" ").map((w, k) => (
            <span key={w} style={index(word++)} className="motion-ops-word inline-block">
              {k > 0 && "\u00a0"}
              {w}
            </span>
          ))}
        </span>
      ))}
    </p>
  )
}

// The Design Ops cover: Tari's process as a loop. The loop draws itself, the stages appear in order around it and a
// dot keeps travelling the path. Points sit on an ellipse in a 1600×900 box, so labels never leave the frame.
const loop = { cx: 640, cy: 450, rx: 560, ry: 300 }
type Stop = { t: number; en: string; es: string; phase?: boolean }
const stops: Stop[] = [
  { t: -92, en: "Observe & diagnose", es: "Observar y diagnosticar", phase: true },
  { t: -76, en: "Requests intake", es: "Entrada de peticiones" },
  { t: -60, en: "Decision making", es: "Toma de decisiones" },
  { t: -44, en: "Information flow", es: "Flujo de información" },
  { t: -27, en: "Framing", es: "Enmarcar", phase: true },
  { t: -10, en: "Structure design", es: "Diseño de estructura", phase: true },
  { t: 3, en: "Framework creation", es: "Creación del marco" },
  { t: 16, en: "Mediate & align", es: "Mediar y alinear", phase: true },
  { t: 28, en: "Relationships", es: "Relaciones" },
  { t: 39, en: "Expectations", es: "Expectativas" },
  { t: 54, en: "Adapt", es: "Adaptar", phase: true },
  { t: 70, en: "Reiterate", es: "Reiterar" },
  { t: 86, en: "Culture focus", es: "Foco en la cultura" },
  { t: 102, en: "Reiterate", es: "Reiterar" },
]
const point = (t: number) => {
  const a = (t * Math.PI) / 180
  return { x: loop.cx + loop.rx * Math.cos(a), y: loop.cy + loop.ry * Math.sin(a) }
}
const loopPath = `M${loop.cx - loop.rx} ${loop.cy}a${loop.rx} ${loop.ry} 0 1 1 ${loop.rx * 2} 0a${loop.rx} ${loop.ry} 0 1 1 ${-loop.rx * 2} 0`

function OpsLoop() {
  const { locale } = useLanguage()

  return (
    <>
      <svg viewBox="0 0 1600 900" className="absolute inset-0 size-full" fill="none">
        <path d={loopPath} pathLength={1} stroke="rgb(255 255 255 / 0.55)" strokeWidth="1.5" className="ops-draw" />
        {stops.map((stop, i) => {
          const { x, y } = point(stop.t)
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={stop.phase ? 9 : 5}
              fill="#ffffff"
              style={index(i)}
              className="ops-pop [transform-box:fill-box] [transform-origin:center]"
            />
          )
        })}
        <circle r="5" fill="var(--accent)" className="ops-traveller">
          <animateMotion dur="14s" repeatCount="indefinite" path={loopPath} />
        </circle>
      </svg>

      {stops.map((stop, i) => {
        const { x, y } = point(stop.t)
        // Labels sit outside the loop: above the top stops, to the right of the side ones, below the bottom ones.
        const side = stop.t < -85 ? "top" : stop.t > 64 ? "bottom" : "right"
        const place = {
          top: "-translate-x-1/2 -translate-y-[calc(100%+1.4cqi)]",
          right: "translate-x-[1.6cqi] -translate-y-1/2",
          bottom: "-translate-x-1/2 translate-y-[1.2cqi]",
        }[side]
        return (
          <span
            key={i}
            style={{ left: `${(x / 1600) * 100}%`, top: `${(y / 900) * 100}%` }}
            className={cn("absolute", place, !stop.phase && "hidden @lg:block")}
          >
            <span
              style={index(i)}
              className={cn(
                "ops-pop block text-white",
                stop.phase
                  ? "max-w-[24cqi] text-[clamp(8px,1.55cqi,18px)] uppercase leading-tight @lg:max-w-none @lg:whitespace-nowrap"
                  : "whitespace-nowrap text-[clamp(8px,1.1cqi,13px)] text-white/80",
                side !== "right" && "text-center",
              )}
            >
              {stop[locale]}
            </span>
          </span>
        )
      })}

      <div className="ops-title absolute left-[13%] top-1/2 -translate-y-1/2 text-white">
        <p className="text-[6.6cqi] leading-[1.02] tracking-[-0.03em]">
          {ops[locale].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-[1.6cqi] text-[clamp(7px,1cqi,12px)] uppercase tracking-wider text-white/70">
          {locale === "es" ? "Mi proceso en curso" : "My ongoing process"}
        </p>
      </div>
    </>
  )
}

const backgrounds = {
  service:
    "bg-[radial-gradient(80%_60%_at_30%_0%,#ffe6da_0%,transparent_60%),radial-gradient(70%_70%_at_100%_100%,#ff3d00,transparent_70%),linear-gradient(160deg,#ffb08a,#ff5a1f_60%,#ff2700)]",
  ops: "bg-[linear-gradient(160deg,#f2f2f0,#e3e3e0)]",
  opsCover: "bg-black",
}

// `tile` is the card on Home and Work; `cover` opens the case study.
export function ProjectMotion({
  motion,
  variant = "tile",
  className,
}: {
  motion: NonNullable<Project["motion"]>
  variant?: "tile" | "cover"
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      data-motion={motion}
      className={cn(
        "@container relative overflow-hidden",
        backgrounds[motion === "ops" && variant === "cover" ? "opsCover" : motion],
        className,
      )}
    >
      {motion === "ops" ? (
        variant === "cover" ? <OpsLoop /> : <Ops />
      ) : variant === "cover" ? (
        <Wordmark />
      ) : (
        <Service />
      )}
    </div>
  )
}
