"use client"

import { useEffect, useRef, useState } from "react"
import { sectionIds, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

// The About page's in-page steps: a vertical list under the name card on large screens,
// and a sticky horizontal bar inside the page below that.
export function SectionNav({ vertical, className }: { vertical?: boolean; className?: string }) {
  const { t } = useLanguage()
  const [active, setActive] = useState<SectionId>(sectionIds[0])
  const listRef = useRef<HTMLUListElement>(null)

  // The section crossing the upper third of the viewport is the current step.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as SectionId)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    for (const id of sectionIds) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  // Keep the current step visible when the horizontal bar scrolls sideways on small screens.
  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[href="#${active}"]`)
    if (vertical || !list || !item) return
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2, behavior: "smooth" })
  }, [active, vertical])

  return (
    <nav
      aria-label={t.about.sectionNav}
      data-section-nav
      className={cn(!vertical && "sticky top-4 z-20 mt-16", className)}
    >
      <ul
        ref={listRef}
        className={cn(
          "relative flex gap-1 p-1.5",
          vertical
            ? "flex-col rounded-2xl bg-muted"
            : "overflow-x-auto rounded-full bg-muted/80 ring-1 ring-black/5 backdrop-blur-xl [scrollbar-width:none]",
        )}
      >
        {sectionIds.map((id) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "block text-sm text-foreground/70 transition-colors hover:text-foreground aria-[current=location]:bg-foreground aria-[current=location]:text-background",
                vertical ? "rounded-xl px-4 py-2.5 lg:px-3.5 lg:py-2" : "rounded-full px-3 py-2",
              )}
            >
              {t.about.sections[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
