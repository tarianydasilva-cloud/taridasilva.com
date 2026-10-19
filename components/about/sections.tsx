"use client"

import type { ReactNode } from "react"
import { clients, methodology, origins, services, values, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"
import { ServiceIcon } from "./service-icon"

const label = "font-mono text-xs uppercase tracking-wider"

// Sections show a dot label and a headline unless they are left out; an unlabelled section is named for screen readers only.
function Section({
  id,
  title,
  bare,
  className,
  children,
}: {
  id: SectionId
  title?: string
  bare?: boolean
  className?: string
  children?: ReactNode
}) {
  const { t } = useLanguage()

  return (
    <section
      id={id}
      aria-label={bare ? t.about.sections[id] : undefined}
      aria-labelledby={bare ? undefined : `${id}-label`}
      className={cn("scroll-mt-24", className)}
    >
      {!bare && (
        <p id={`${id}-label`} className={cn(label, "flex items-center gap-3 text-muted-foreground")}>
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {t.about.sections[id]}
        </p>
      )}
      {title && (
        <h2
          className={cn(
            "reveal text-balance",
            bare ? "text-statement" : "mt-6 text-3xl leading-[1.05] tracking-tight md:text-5xl",
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

function Origins() {
  const { locale } = useLanguage()

  return (
    <Section id="origins" bare>
      <p className="text-lead reveal text-pretty">
        {origins.body[locale]} <span className="text-muted-foreground">{origins.aside[locale]}</span>
      </p>
    </Section>
  )
}

function Services() {
  const { locale, t } = useLanguage()

  return (
    <Section id="services" bare>
      <ul className="flex flex-col gap-2">
        {services.map((service) => (
          <li key={service.icon}>
            {/* Each service is a card; an open card turns black. */}
            <details className="accordion group rounded-2xl bg-muted transition-colors duration-300 hover:bg-border/70 open:bg-foreground open:text-background open:hover:bg-foreground">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-background transition-colors group-open:bg-background/10">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="min-w-0">
                  <span className={cn(label, "block text-muted-foreground group-open:text-background/60")}>
                    {t.about.servicesLabel}
                  </span>
                  <span className="mt-1 block text-xl tracking-tight md:text-2xl">{service.title[locale]}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-background text-foreground transition-[rotate,background-color,color] duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-open:rotate-180 group-open:bg-background group-open:text-foreground"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                    <path d="M8 3.5v9M4 8.5l4 4 4-4" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-6 leading-relaxed text-background/70 text-pretty md:pl-20">{service.body[locale]}</p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Clients() {
  const { locale } = useLanguage()

  return <Section id="clients" title={clients.title[locale]} bare />
}

function Values() {
  const { locale } = useLanguage()

  return (
    <Section id="values" bare>
      <ul className="grid gap-3 sm:grid-cols-2">
        {values.map((value) => (
          <li key={value.title.en} className="reveal flex flex-col gap-10 rounded-2xl bg-muted p-6">
            <h3 className="text-2xl tracking-tight md:text-3xl">{value.title[locale]}</h3>
            <p className="leading-relaxed text-muted-foreground">{value.body[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Methodology() {
  const { locale } = useLanguage()

  return (
    <Section id="methodology" title={methodology.title[locale]}>
      <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {methodology.intro[locale]}
      </p>
      <ol className="mt-10 grid gap-3 md:grid-cols-3">
        {methodology.steps.map((step, index) => (
          <li key={step.title.en} className="reveal flex flex-col gap-8 rounded-2xl border border-border p-5">
            <span className={cn(label, "flex items-center justify-between text-muted-foreground")}>
              {String(index + 1).padStart(2, "0")}
              {index < methodology.steps.length - 1 && (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              )}
            </span>
            <span>
              <span className="block text-xl tracking-tight">{step.title[locale]}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{step.body[locale]}</span>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  )
}



export function AboutSections() {
  return (
    <div className="@container flex flex-col gap-28 pb-32 pt-20 md:gap-40 md:pb-48 md:pt-28">
      <Origins />
      <Services />
      <Clients />
      <Values />
      <Methodology />
    </div>
  )
}
