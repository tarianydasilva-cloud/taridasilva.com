"use client"

import Link from "next/link"
import { EdgeCaseSpec } from "./edge-case-spec"
import { FleetPrototype } from "./fleet-prototype"
import { useLanguage } from "./language-provider"

const copy = {
  en: {
    back: "Fleet Connect case study",
    title: "Fleet Connect, coded",
    spec: "The spec behind it",
    specIntro:
      "Before designing the screens, I used Figma Make's AI to list every state a card could reach, generated each one by prompt and fixed by hand what it got wrong. For this rebuild I repeated the exercise with Claude before coding: 4 states made it in as switchable states, 5 edge cases are handled, and 4 are queued for the next iteration.",
    intro:
      "A working rebuild of the dashboard, made in Claude Code for this portfolio with sample data. The original dashboards were made in Figma Make, where I prompted each change and adjusted details by hand; here the filters and their states are in code, because the states mattered more than the layout.",
  },
  es: {
    back: "Caso de estudio de Fleet Connect",
    title: "Fleet Connect, en código",
    spec: "La especificación detrás",
    specIntro:
      "Antes de diseñar las pantallas, usé la IA de Figma Make para listar cada estado al que podía llegar una tarjeta, generé cada uno por prompt y corregí a mano lo que no estaba bien. Para esta reconstrucción repetí el ejercicio con Claude antes de programar: 4 estados entraron como activables, 5 casos límite están resueltos y 4 quedan para la siguiente iteración.",
    intro:
      "Una reconstrucción funcional del dashboard, hecha con Claude Code para este portfolio con datos de ejemplo. Los dashboards originales se hicieron en Figma Make, donde pedía cada cambio por prompt y ajustaba los detalles a mano; aquí los filtros y sus estados están en código, porque los estados importaban más que el layout.",
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
      <section aria-labelledby="spec-title" className="mt-20 max-w-4xl">
        <h2 id="spec-title" className="text-2xl tracking-tight md:text-3xl">
          {c.spec}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{c.specIntro}</p>
        <div className="mt-6">
          <EdgeCaseSpec />
        </div>
      </section>
    </article>
  )
}
