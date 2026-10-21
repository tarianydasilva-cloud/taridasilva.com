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
const dots = Array.from({ length: 12 }, (_, i) => i)

// Design Ops: black type on light grey that dissolves into a turning ring of dots and comes back, every 6 seconds.
function Ops() {
  const { locale } = useLanguage()

  return (
    <>
      <p className="motion-ops-word absolute inset-0 flex flex-col items-center justify-center text-center text-[11cqi] leading-[1.02] tracking-[-0.035em] text-foreground">
        {ops[locale].map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <div className="absolute inset-0 flex items-center justify-center [perspective:600px]">
        <div className="motion-ops-ring relative size-[26cqi]">
          {dots.map((i) => (
            <span
              key={i}
              style={{ rotate: `${i * 30}deg` }}
              className="absolute inset-0 flex justify-center"
            >
              <span className="size-[1.3cqi] min-h-1 min-w-1 rounded-[0.2cqi] bg-foreground" />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

const backgrounds = {
  service:
    "bg-[radial-gradient(80%_60%_at_30%_0%,#ffe6da_0%,transparent_60%),radial-gradient(70%_70%_at_100%_100%,#ff3d00,transparent_70%),linear-gradient(160deg,#ffb08a,#ff5a1f_60%,#ff2700)]",
  ops: "bg-[linear-gradient(160deg,#f2f2f0,#e3e3e0)]",
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
      className={cn("@container relative overflow-hidden", backgrounds[motion], className)}
    >
      {motion === "ops" ? <Ops /> : variant === "cover" ? <Wordmark /> : <Service />}
    </div>
  )
}
