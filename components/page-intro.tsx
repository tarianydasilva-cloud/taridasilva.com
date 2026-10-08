"use client"

import type { Dictionary } from "@/lib/i18n"
import { useLanguage } from "./language-provider"

export function PageIntro({ page }: { page: keyof Dictionary["pages"] }) {
  const { t } = useLanguage()
  const content = t.pages[page]

  return (
    <section className="pb-32 md:pb-48">
      <h1 className="max-w-5xl text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl xl:text-7xl">
        {content.title}
      </h1>
      <p className="mt-16 flex items-center gap-3 text-sm text-muted-foreground md:mt-24">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {content.eyebrow}
      </p>
    </section>
  )
}
