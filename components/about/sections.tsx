"use client"

import type { ReactNode } from "react"
import { approach, principles, story, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

// Sections carry no visible label; the index names them, and screen readers get the same name.
function Section({ id, className, children }: { id: SectionId; className?: string; children: ReactNode }) {
  const { t } = useLanguage()

  return (
    <section id={id} aria-label={t.about.sections[id]} className={cn("scroll-mt-32", className)}>
      {children}
    </section>
  )
}

function Story() {
  const { locale } = useLanguage()

  return (
    <Section id="story">
      <p className="text-lead reveal-text text-pretty">
        {story.body[locale]} <span className="text-muted-foreground">{story.aside[locale]}</span>
      </p>
    </Section>
  )
}

function Principles() {
  const { locale } = useLanguage()

  return (
    <Section id="principles">
      <ul className="grid gap-2 sm:grid-cols-2">
        {principles.map((principle) => (
          <li key={principle.title.en} className="reveal flex flex-col gap-8 rounded-2xl bg-muted p-6">
            <h3 className="text-2xl tracking-tight md:text-3xl">{principle.title[locale]}</h3>
            <p className="leading-relaxed text-muted-foreground">{principle.body[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Approach() {
  const { locale } = useLanguage()

  return (
    <Section id="approach">
      <h2 className="text-statement reveal-text text-balance">{approach.title[locale]}</h2>
      <ol className="mt-8 grid gap-2 xl:grid-cols-3">
        {approach.steps.map((step) => (
          <li key={step.title.en} className="reveal flex flex-col gap-2 rounded-2xl bg-muted p-5">
            <span className="text-lg font-medium tracking-tight">{step.title[locale]}</span>
            <span className="text-sm leading-relaxed text-muted-foreground">{step.body[locale]}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function AboutSections() {
  return (
    <div className="@container flex flex-col gap-24 pt-20 md:gap-32 md:pt-28">
      <Story />
      <Approach />
      <Principles />
    </div>
  )
}
