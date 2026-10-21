"use client"

import { locales } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div role="group" aria-label={t.language} className="flex items-center gap-1.5 font-mono text-xs uppercase">
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1.5">
          {index > 0 && (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            lang={code}
            className={cn(
              "py-1 tracking-wider transition-colors",
              locale === code ? "text-accent" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  )
}
