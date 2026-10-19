"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { LetsTalkTrigger } from "./lets-talk"

// z-10 keeps the cards above full-bleed sections such as the About hero.
const stickySide = "relative z-10 lg:sticky lg:top-6 lg:row-span-2 lg:row-start-1 lg:self-start"
const cardBox = "flex rounded-2xl px-6 py-5 lg:px-5 lg:py-3.5"

export function NameCard() {
  const { t } = useLanguage()

  return (
    <aside aria-label="Tari da Silva" className={cn(stickySide, "lg:col-start-1")}>
      <Link
        href="/about"
        className={cn(cardBox, "flex-col justify-center bg-muted transition-colors hover:bg-border/70")}
      >
        <p className="text-lg leading-snug tracking-tight">Tari da Silva</p>
        <p className="text-sm text-muted-foreground">{t.role}</p>
      </Link>
    </aside>
  )
}

export function ContactCard() {
  const { t } = useLanguage()

  return (
    <aside aria-label={t.aside.contact} className={cn(stickySide, "lg:col-start-3")}>
      <LetsTalkTrigger
        className={cn(
          cardBox,
          "group w-full items-center justify-between gap-4 bg-gradient-to-br from-foreground to-[#2a2a2a] text-left text-background",
        )}
      >
        <span>
          <span className="block text-lg leading-snug tracking-tight">{t.aside.contact}</span>
          <span className="block text-sm text-background/50">{t.aside.contactSub}</span>
        </span>
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 lg:size-8 place-items-center rounded-full bg-background text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-4 transition-transform duration-300 group-hover:rotate-45"
          >
            <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
          </svg>
        </span>
      </LetsTalkTrigger>
    </aside>
  )
}
