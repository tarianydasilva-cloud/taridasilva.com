"use client"

import { useEffect, useRef, useState } from "react"
import { sectionIds, type SectionId } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

// A section becomes current once its top passes this line (px from the top of the viewport).
// It sits below where a clicked section lands (scroll-mt-32) and above where the next one starts.
const ACTIVE_LINE = 180

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

// The About page's index: a card of pills in the left margin on large screens,
// and a floating pill bar that sticks to the top below that. When the header returns at the end of
// the page, the bar steps aside on phones and moves below the header on wider screens.
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
      className={cn(
        vertical
          ? "rounded-2xl bg-muted p-2"
          : "sticky top-3 z-30 mt-20 rounded-full transition-[top,translate,opacity] duration-300 max-md:[html[data-page-end]_&]:pointer-events-none max-md:[html[data-page-end]_&]:-translate-y-[150%] max-md:[html[data-page-end]_&]:opacity-0 md:[html[data-page-end]_&]:top-24 bg-muted/85 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/5 backdrop-blur-xl",
        className,
      )}
    >
      <ul
        ref={listRef}
        className={cn("relative flex gap-1", vertical ? "flex-col" : "overflow-x-auto [scrollbar-width:none]")}
      >
        {sectionIds.map((id) => (
          // In the horizontal bar the pills share the full width; they scroll sideways only if they cannot fit.
          <li key={id} className={cn("shrink-0", !vertical && "flex-1")}>
            <a
              href={`#${id}`}
              onClick={() => select(id)}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "block text-sm text-foreground/75 transition-colors hover:bg-background hover:text-foreground aria-[current=location]:bg-foreground aria-[current=location]:text-background",
                vertical ? "rounded-xl px-3 py-2" : "whitespace-nowrap rounded-full px-3 py-2 text-center sm:px-4",
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
