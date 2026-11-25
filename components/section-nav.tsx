"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// A section becomes current once its top passes this line (px from the top of the viewport).
// It sits below where a clicked section lands (scroll-mt-32) and above where the next one starts.
const ACTIVE_LINE = 180

function currentSection(ids: string[]): string {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) return ids[ids.length - 1]
  let current = ids[0]
  for (const id of ids) {
    const section = document.getElementById(id)
    if (section && section.getBoundingClientRect().top <= ACTIVE_LINE) current = id
  }
  return current
}

export type SectionNavItem = { id: string; label: string }

// A long page's index (About, case studies): a card of pills in the left margin on large screens,
// and a floating pill bar that sticks to the top below that, moving down whenever the header shows.
export function SectionNav({
  items,
  label,
  vertical,
  className,
}: {
  items: SectionNavItem[]
  label: string
  vertical?: boolean
  className?: string
}) {
  const ids = items.map((item) => item.id)
  const [active, setActive] = useState(ids[0])
  const listRef = useRef<HTMLUListElement>(null)
  // While a click scrolls the page to its section, the clicked step stays current.
  const scrollingToRef = useRef(false)
  const releaseTimerRef = useRef<number>(undefined)

  useEffect(() => {
    const update = () => {
      if (!scrollingToRef.current) setActive(currentSection(ids))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      window.clearTimeout(releaseTimerRef.current)
    }
    // The ids only change with the page, so the joined string is a stable dependency.
  }, [ids.join()])

  function select(id: string) {
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
      aria-label={label}
      data-section-nav
      className={cn(
        vertical
          ? "rounded-2xl bg-muted p-2"
          : "sticky top-3 z-30 mt-20 rounded-full transition-[top] duration-300 [html[data-header-shown]_&]:top-20 bg-muted/85 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/5 backdrop-blur-xl",
        className,
      )}
    >
      <ul
        ref={listRef}
        className={cn("relative flex gap-1", vertical ? "flex-col" : "overflow-x-auto [scrollbar-width:none]")}
      >
        {items.map(({ id, label: itemLabel }) => (
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
              {itemLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
