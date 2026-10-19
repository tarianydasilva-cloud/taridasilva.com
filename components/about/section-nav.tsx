"use client"

import { useEffect, useRef, useState } from "react"
import { sectionIds, type SectionId } from "@/lib/about"
import { useLanguage } from "../language-provider"

export function SectionNav() {
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

  // Keep the current step visible when the list scrolls sideways on small screens.
  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[href="#${active}"]`)
    if (!list || !item) return
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2, behavior: "smooth" })
  }, [active])

  return (
    <nav aria-label={t.about.sectionNav} data-section-nav className="sticky top-4 z-20 mt-6 lg:top-6">
      <ul
        ref={listRef}
        className="relative flex gap-1 overflow-x-auto rounded-full bg-muted/80 p-1.5 ring-1 ring-black/5 backdrop-blur-xl [scrollbar-width:none]"
      >
        {sectionIds.map((id, index) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground aria-[current=location]:bg-foreground aria-[current=location]:text-background"
            >
              <span className="font-mono text-[10px] opacity-60">{String(index + 1).padStart(2, "0")}</span>
              {t.about.sections[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
