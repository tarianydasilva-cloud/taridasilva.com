"use client"

import type { ReactNode } from "react"
import { approach, industries, principles, services, story, type SectionId } from "@/lib/about"
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
      <p className="text-lead reveal text-pretty">
        {story.body[locale]} <span className="text-muted-foreground">{story.aside[locale]}</span>
      </p>
    </Section>
  )
}

function Services() {
  const { locale } = useLanguage()

  return (
    <Section id="services">
      <ul className="flex flex-col gap-2">
        {services.map((service) => (
          <li key={service.title.en}>
            <details className="accordion group rounded-2xl bg-muted">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-xl tracking-tight md:text-2xl">{service.title[locale]}</span>
                {/* A plus that turns into a cross when the card is open. */}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  <path d="M8 2.5v11M2.5 8h11" />
                </svg>
              </summary>
              <p className="max-w-2xl px-5 pb-6 leading-relaxed text-muted-foreground text-pretty md:px-6">
                {service.body[locale]}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Industries() {
  const { locale } = useLanguage()

  return (
    <Section id="industries">
      <h2 className="text-statement reveal text-balance">{industries.title[locale]}</h2>
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
      <h2 className="text-statement reveal text-balance">{approach.title[locale]}</h2>
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
      <Services />
      <Principles />
      <Industries />
    </div>
  )
}
