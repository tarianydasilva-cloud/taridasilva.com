"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { container, email } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { LanguageToggle } from "./language-toggle"

const navItems = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

const pill = "block rounded-full px-3 py-2 text-sm transition-colors md:px-4 md:text-base"

// Hidden while scrolling down, shown again on any scroll up or near the top of the page.
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const update = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) < 4) return
      setHidden(y > 80 && y > lastY)
      lastY = y
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

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
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-muted/85 p-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/5 backdrop-blur-xl">
          {/* The name opens About; on About itself it leads back to the home page. */}
          <Link href={isActive(pathname, "/about") ? "/" : "/about"} className="group min-w-0 px-3 py-1.5 md:px-4">
            <span className="block text-lg leading-snug tracking-tight transition-colors group-hover:text-accent">Tari da Silva</span>
            <span className="block truncate text-sm text-muted-foreground">{t.role}</span>
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
                        active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-background",
                      )}
                    >
                      {t.nav[item.key]}
                    </Link>
                  </li>
                )
              })}
              {/* On phones the language switch lives in the footer only, to keep the bar on one line. */}
              <li className="hidden rounded-full bg-background px-3 py-2 sm:block md:px-4">
                <LanguageToggle />
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className={cn(pill, "bg-accent text-accent-foreground hover:bg-foreground")}
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
