"use client"

import type { Dictionary } from "@/lib/i18n"
import { useLanguage } from "./language-provider"

export function PageIntro({ page }: { page: keyof Dictionary["pages"] }) {
  const { t } = useLanguage()
  const content = t.pages[page]

  return (
    <section className="pb-16 md:pb-24">
      <p className="text-sm text-accent">{content.eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">{content.title}</h1>
    </section>
  )
}
