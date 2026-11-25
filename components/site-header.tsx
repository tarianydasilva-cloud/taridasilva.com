"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

const navItems = [
  { href: "/about", key: "about" },
  { href: "/work", key: "work" },
  { href: "/explorations", key: "explorations" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

// How long the page has to be still before the bar comes back.
const IDLE_MS = 350

// The bar steps out of the way while the page moves and comes back once it stops.
function useHideWhileScrolling() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      setHidden(true)
      clearTimeout(timer)
      timer = setTimeout(() => setHidden(false), IDLE_MS)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(timer)
    }
  }, [])

  return hidden
}

// The brand mark from Tari's design system: the flat sunset-gradient circle (the favicon), standing in for her name.
function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7">
      <defs>
        <linearGradient id="mark-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff2700" />
          <stop offset=".42" stopColor="#f2582d" />
          <stop offset=".78" stopColor="#c6b8c9" />
          <stop offset="1" stopColor="#bccfd8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill="url(#mark-sunset)" />
    </svg>
  )
}

const pill = "block whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors md:px-4"

// A floating bar at the bottom of every screen: the mark, then every link. It is there whenever the page is still,
// slides away while the page scrolls, and stays while it holds keyboard focus.
export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const hidden = useHideWhileScrolling()

  return (
    <header
      data-autohide
      data-hidden={hidden || undefined}
      className="pointer-events-none fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 transition-[transform,opacity] duration-300 ease-out focus-within:translate-y-0 focus-within:opacity-100 data-[hidden]:translate-y-[150%] data-[hidden]:opacity-0 motion-reduce:transition-none"
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-background/80 p-1.5 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07] backdrop-blur-xl md:gap-1"
      >
        <Link href="/" aria-label="Tari da Silva" className="grid size-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-110">
          <Mark />
        </Link>
        <ul className="flex items-center gap-0.5 md:gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(pill, active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted")}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/contact"
              aria-current={isActive(pathname, "/contact") ? "page" : undefined}
              className={cn(pill, "bg-accent text-foreground hover:bg-foreground hover:text-background aria-[current=page]:bg-foreground aria-[current=page]:text-background")}
            >
              {t.nav.contact}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
