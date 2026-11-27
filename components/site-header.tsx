"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { showExplorations } from "@/lib/explorations"
import { container } from "@/lib/site"
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

// The bar steps out of the way while the page scrolls and comes back once it stops. The visibility is published on
// <html data-header-shown>, so a page's own floating bar (the About and case study section bar) can sit below it.
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

  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-shown", !hidden)
  }, [hidden])

  return hidden
}

const MENU_ID = "site-menu"

// Closes the menu after a link is chosen (client navigation keeps the page, so the popover would stay open).
function closeMenu() {
  document.getElementById(MENU_ID)?.hidePopover?.()
}

// The bar: Tari's name on the left, a burger in the right corner. The burger opens the menu as a native
// popover (popovertarget), so it opens and closes without any script, light-dismisses on an outside click or
// Escape, and the burger turns into a cross while it is open (CSS :has, in globals.css).
export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const hidden = useHideWhileScrolling()
  const links = [
    ...navItems
      .filter((item) => item.href !== "/explorations" || showExplorations)
      .map((item) => ({ href: item.href, label: t.nav[item.key] })),
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <header
      data-autohide
      data-hidden={hidden || undefined}
      className="site-header fixed inset-x-0 top-3 z-40 transition-[transform,opacity] duration-300 ease-out focus-within:translate-y-0 focus-within:opacity-100 data-[hidden]:-translate-y-[150%] data-[hidden]:opacity-0 has-[#site-menu:popover-open]:translate-y-0 has-[#site-menu:popover-open]:opacity-100 motion-reduce:transition-none"
    >
      <div className={container}>
        <div className="flex h-14 items-center justify-between gap-2 rounded-2xl bg-background/80 p-1.5 pl-4 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07] backdrop-blur-xl md:pl-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0 text-lg font-medium tracking-tight transition-colors hover:text-accent"
          >
            <span className="wordmark-in">Tari da Silva</span>
          </Link>

          <button
            type="button"
            popoverTarget={MENU_ID}
            aria-label={t.nav.menu}
            className="burger grid size-11 place-items-center rounded-full transition-colors hover:bg-muted"
          >
            {/* Lines are borders (snapped to whole device pixels) placed 8px apart, a whole number of device pixels on
                common screens (1x, 1.5x, 2x, 2.625x, 2.75x, 3x), so both lines always render alike. */}
            <span aria-hidden="true" className="relative block h-2.5 w-5">
              <span className="burger-line absolute inset-x-0 top-0 h-0 border-t-2 border-foreground" />
              <span className="burger-line absolute inset-x-0 top-2 h-0 border-t-2 border-foreground" />
            </span>
          </button>

          <nav
            id={MENU_ID}
            popover="auto"
            aria-label="Primary"
            className="site-menu w-56 rounded-2xl bg-background p-2 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07]"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-full px-4 py-2.5 text-[19px] leading-snug transition-colors",
                        active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
