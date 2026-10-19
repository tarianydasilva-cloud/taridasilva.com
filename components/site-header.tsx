"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

const link =
  "underline-offset-[6px] decoration-accent decoration-2 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline"

export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className={cn(container, "flex h-16 items-center justify-between gap-6")}>
        <Link href="/about" className="min-w-0 leading-tight">
          <span className="block font-medium tracking-tight">Tari da Silva</span>
          <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 text-sm text-muted-foreground md:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={link}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <LanguageToggle />
            </li>
            <li>
              <a href={`mailto:${email}`} className="font-medium text-accent transition-colors hover:text-foreground">
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
