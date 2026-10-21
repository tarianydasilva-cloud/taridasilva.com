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
    principles: ["Coherence", "Clarity", "Alignment"],
    steps: ["Map journeys", "Align teams", "Simplify processes", "Clarify services", "Document", "Launch"],
    ask: "What should this service feel like?",
    answer: "Clear from the first view.",
  },
  es: {
    tiers: "Servicios B2B",
    plans: ["Basic", "Pro", "Master"],
    principles: ["Coherencia", "Claridad", "Alineación"],
    steps: ["Mapear recorridos", "Alinear equipos", "Simplificar procesos", "Aclarar servicios", "Documentar", "Lanzar"],
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
      {/* Scene one: the service tiers list, with a selection moving down it, and principles switching on. */}
      <div className="motion-a absolute inset-0 flex flex-col items-center justify-center gap-[3cqi] @xl:flex-row">
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
                className="motion-row relative flex items-center justify-between border-black/5 px-[0.6em] py-[0.7em] not-last:border-b"
              >
                {plan}
                <span aria-hidden="true" className="text-muted-foreground">
                  ›
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className={cn(card, width, text, "flex flex-col gap-[0.9em] p-[clamp(12px,2.4cqi,20px)]")}>
          {c.principles.map((principle, i) => (
            <li key={principle} style={index(i)} className="motion-row flex items-center justify-between">
              {principle}
              <span style={index(i)} className="motion-track relative h-[1.25em] w-[2.2em] rounded-full">
                <span className="motion-knob absolute left-[0.15em] top-[0.15em] size-[0.95em] rounded-full bg-white shadow-sm" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scene two: the steps of the work scrolling past, and a prompt answered as if typed. */}
      <div className="motion-b absolute inset-0 flex flex-col items-center justify-center gap-[4cqi]">
        <div className="w-full overflow-hidden">
          <ul className={cn("motion-marquee flex w-max gap-[1.5cqi]", text)}>
            {[...c.steps, ...c.steps].map((step, i) => (
              <li key={i} className="whitespace-nowrap rounded-full bg-white/70 px-[1em] py-[0.5em] backdrop-blur">
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(card, text, "w-[78cqi] p-[clamp(14px,2.8cqi,24px)] @xl:w-[48cqi]")}>
          <p className="text-[1.15em] tracking-tight">{c.ask}</p>
          <p className="mt-[0.8em] flex items-center rounded-[0.6em] bg-muted px-[0.8em] py-[0.6em]">
            <span className="motion-type">{c.answer}</span>
            <span aria-hidden="true" className="motion-caret ml-px h-[1.1em] w-px bg-foreground" />
          </p>
        </div>
      </div>
    </>
  )
}

export function ProjectMotion({ motion, className }: { motion: NonNullable<Project["motion"]>; className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-motion={motion}
      className={cn(
        "@container relative overflow-hidden bg-[radial-gradient(80%_60%_at_30%_0%,#ffe6da_0%,transparent_60%),radial-gradient(70%_70%_at_100%_100%,#ff3d00,transparent_70%),linear-gradient(160deg,#ffb08a,#ff5a1f_60%,#ff2700)]",
        className,
      )}
    >
      <Service />
    </div>
  )
}
