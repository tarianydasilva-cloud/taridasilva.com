"use client"

import { container, email, socials } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { LanguageToggle } from "./language-toggle"

const pill = "block rounded-full bg-background px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className={cn(container, "mt-24 pb-4 md:mt-32 md:pb-6")}>
      <div className="rounded-3xl bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${email}`}
            className="self-start rounded-full bg-accent px-5 py-3 text-accent-foreground transition-colors hover:bg-foreground md:text-lg"
          >
            {email}
          </a>
          <ul className="flex flex-wrap gap-2" aria-label={t.footer.elsewhere}>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={pill}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            © {year} Tari da Silva. {t.footer.rights} {t.footer.builtWith}
          </p>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-background px-4 py-2">
              <LanguageToggle />
            </div>
            <a href="#top" className={pill}>
              {t.footer.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
