"use client"

import type { ReactNode } from "react"
import { clients, methodology, origins, services, values, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"
import { ServiceIcon } from "./service-icon"

const label = "font-mono text-xs uppercase tracking-wider"

function Section({ id, title, children }: { id: SectionId; title: string; children: ReactNode }) {
  const { t } = useLanguage()

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-border pt-10 md:pt-14"
    >
      <p className={cn(label, "flex items-center gap-3 text-muted-foreground")}>
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {t.about.sections[id]}
      </p>
      <h2 id={`${id}-title`} className="reveal mt-6 text-3xl leading-[1.05] tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Origins() {
  const { locale } = useLanguage()
  // Emphasise the repeated "Born…" so the cadence reads at a glance.
  const parts = origins.body[locale].split(/(Born|Nació)/)

  return (
    <Section id="origins" title={origins.title[locale]}>
      <p className="reveal mt-10 text-xl leading-snug tracking-tight text-muted-foreground text-pretty md:text-2xl">
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <span key={index} className="text-foreground">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </p>
    </Section>
  )
}

function Services() {
  const { locale, t } = useLanguage()

  return (
    <Section id="services" title={t.about.servicesTitle}>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {services.map((service) => (
          <li key={service.icon}>
            <details className="accordion group">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted transition-colors group-open:bg-foreground group-open:text-background">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="min-w-0">
                  <span className={cn(label, "block text-muted-foreground")}>{t.about.servicesLabel}</span>
                  <span className="mt-1 block text-xl tracking-tight md:text-2xl">{service.title[locale]}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-border transition-[rotate,background-color,color] duration-300 group-hover:border-accent group-open:rotate-180 group-open:border-foreground group-open:bg-foreground group-open:text-background"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                    <path d="M8 3.5v9M4 8.5l4 4 4-4" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-muted-foreground text-pretty md:pl-15">{service.body[locale]}</p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Clients() {
  const { locale, t } = useLanguage()

  return (
    <Section id="clients" title={t.about.clientsTitle}>
      <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {clients.claim[locale]}
      </p>
      <ul className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {clients.logos.map((client) => (
          <li key={client.name} className="grid aspect-[3/2] place-items-center bg-background p-4">
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className={cn(label, "text-center text-[10px] text-muted-foreground")}>{client.name}</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Values() {
  const { locale, t } = useLanguage()

  return (
    <Section id="values" title={t.about.valuesTitle}>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
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
    <div className="flex flex-col gap-28 pb-32 pt-20 md:gap-40 md:pb-48 md:pt-28">
      <Origins />
      <Services />
      <Clients />
      <Values />
      <Methodology />
    </div>
  )
}
