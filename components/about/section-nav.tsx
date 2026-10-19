"use client"

import { useEffect, useRef, useState } from "react"
import { sectionIds, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

// A section becomes current once its top passes this line (px from the top of the viewport).
// It sits below where a clicked section lands (scroll-mt-24) and above where the next one starts.
const ACTIVE_LINE = 160

function currentSection(): SectionId {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) return sectionIds[sectionIds.length - 1]
  let current: SectionId = sectionIds[0]
  for (const id of sectionIds) {
    const section = document.getElementById(id)
    if (section && section.getBoundingClientRect().top <= ACTIVE_LINE) current = id
  }
  return current
}

// The About page's in-page steps: a vertical list under the name card on large screens,
// and a sticky horizontal bar inside the page below that.
export function SectionNav({ vertical, className }: { vertical?: boolean; className?: string }) {
  const { t } = useLanguage()
  const [active, setActive] = useState<SectionId>(sectionIds[0])
  const listRef = useRef<HTMLUListElement>(null)
  // While a click scrolls the page to its section, the clicked step stays current.
  const scrollingToRef = useRef(false)
  const releaseTimerRef = useRef<number>(undefined)

  useEffect(() => {
    const update = () => {
      if (!scrollingToRef.current) setActive(currentSection())
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      window.clearTimeout(releaseTimerRef.current)
    }
  }, [])

  function select(id: SectionId) {
    setActive(id)
    scrollingToRef.current = true
    const release = () => {
      scrollingToRef.current = false
      window.clearTimeout(releaseTimerRef.current)
    }
    window.addEventListener("scrollend", release, { once: true })
    window.clearTimeout(releaseTimerRef.current)
    releaseTimerRef.current = window.setTimeout(release, 1200)
  }

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
              onClick={() => select(id)}
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
