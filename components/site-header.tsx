"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { container } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

const navItems = [
  { href: "/about", key: "about" },
  { href: "/work", key: "work" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

const pill = "block rounded-full px-3 py-1.5 text-sm transition-colors md:px-4"

// One rule on every page and screen: shown near the top and bottom of the page and on any scroll up,
// hidden while scrolling down. The visibility is also published on <html data-header-shown>, so a
// page's own floating bar (the About and case study section bar) can move below the header.
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const update = () => {
      const y = window.scrollY
      const nearTop = y <= 80
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80
      if (nearTop || nearBottom) setHidden(false)
      else if (Math.abs(y - lastY) >= 4) setHidden(y > lastY)
      lastY = y
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-shown", !hidden)
  }, [hidden])

  return hidden
}

export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const hidden = useHideOnScroll()

  return (
    <header
      data-autohide
      data-hidden={hidden || undefined}
      className="fixed inset-x-0 top-3 z-40 transition-transform duration-300 ease-out focus-within:translate-y-0 data-[hidden]:-translate-y-[150%] motion-reduce:transition-none"
    >
      <div className={container}>
        <div className="flex h-14 items-center justify-between gap-2 rounded-2xl bg-background/80 p-1.5 pl-4 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07] backdrop-blur-xl md:pl-5">
          <Link
            href="/"
            className="shrink-0 text-lg font-medium tracking-tight transition-colors hover:text-accent"
          >
            Tari da Silva
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-1 md:gap-1.5">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        pill,
                        active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted",
                      )}
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
                  className={cn(pill, "bg-accent text-accent-foreground hover:bg-foreground aria-[current=page]:bg-foreground")}
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
