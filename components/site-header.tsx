"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
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

// The bar stays at the top on every page and screen. <html data-header-shown> stays set, so a page's own
// floating bar (the About and case study section bar) sits below it.
function useHeaderShown() {
  useEffect(() => {
    document.documentElement.setAttribute("data-header-shown", "")
  }, [])
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
  useHeaderShown()
  const links = [
    ...navItems.map((item) => ({ href: item.href, label: t.nav[item.key], primary: false })),
    { href: "/contact", label: t.nav.contact, primary: true },
  ]

  return (
    <header
      className="site-header fixed inset-x-0 top-3 z-40"
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
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className="burger-line absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-foreground" />
              <span className="burger-line absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-foreground" />
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
                        "block rounded-full px-4 py-2.5 text-base transition-colors",
                        link.primary
                          ? "bg-accent text-foreground hover:bg-foreground hover:text-background"
                          : "text-foreground/80 hover:bg-muted",
                        active && "bg-foreground text-background hover:bg-foreground",
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
