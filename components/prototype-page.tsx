"use client"

import Link from "next/link"
import { FleetPrototype } from "./fleet-prototype"
import { useLanguage } from "./language-provider"

const copy = {
  en: {
    back: "Fleet Connect case study",
    title: "Fleet Connect, coded",
    intro:
      "A working rebuild of the dashboard, made in Claude Code for this portfolio with sample data. The dashboard system comes from my Figma prototypes; the filters and their states are in code, because the states mattered more than the layout.",
  },
  es: {
    back: "Caso de estudio de Fleet Connect",
    title: "Fleet Connect, en código",
    intro:
      "Una reconstrucción funcional del dashboard, hecha con Claude Code para este portfolio con datos de ejemplo. El sistema del dashboard viene de mis prototipos en Figma; los filtros y sus estados están en código, porque los estados importaban más que el layout.",
  },
}

export function PrototypePage() {
  const { locale } = useLanguage()
  const c = copy[locale]

  return (
    <article className="pt-8 md:pt-12">
      <Link
        href="/work/fleet-connect"
        className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        <span aria-hidden="true">←</span>
        {c.back}
      </Link>
      <h1 className="mt-8 text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">{c.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">{c.intro}</p>
      <div className="mt-10">
        <FleetPrototype />
      </div>
    </article>
  )
}
