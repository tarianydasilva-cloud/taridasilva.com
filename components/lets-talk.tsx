"use client"

import type { ReactNode } from "react"
import { emails, letsTalkId } from "@/lib/site"
import { useLanguage } from "./language-provider"

// Opens the global "Let's talk" modal. Uses the native popover API, so it also works without JavaScript.
export function LetsTalkTrigger({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" popoverTarget={letsTalkId} className={className}>
      {children}
    </button>
  )
}

export function LetsTalkModal() {
  const { t } = useLanguage()
  const paths = [
    { ...t.letsTalk.newBusiness, email: emails.newBusiness },
    { ...t.letsTalk.careers, email: emails.careers },
  ]

  return (
    <div
      id={letsTalkId}
      popover="auto"
      aria-labelledby={`${letsTalkId}-title`}
      className="lets-talk m-auto w-[min(40rem,calc(100%-2rem))] rounded-3xl bg-background p-6 text-foreground shadow-2xl backdrop:bg-foreground/40 backdrop:backdrop-blur-sm md:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 id={`${letsTalkId}-title`} className="text-3xl tracking-tight md:text-4xl">
            {t.letsTalk.title}
          </h2>
          <p className="mt-2 text-muted-foreground">{t.letsTalk.intro}</p>
        </div>
        <button
          type="button"
          popoverTarget={letsTalkId}
          popoverTargetAction="hide"
          aria-label={t.letsTalk.close}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-muted transition-colors hover:bg-foreground hover:text-background"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {paths.map((path) => (
          <li key={path.title}>
            <a
              href={`mailto:${path.email}`}
              className="group flex h-full flex-col justify-between gap-10 rounded-2xl bg-muted p-5 transition-colors hover:bg-foreground hover:text-background"
            >
              <span>
                <span className="block text-xl tracking-tight">{path.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground group-hover:text-background/60">{path.body}</span>
              </span>
              <span className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate">{path.email}</span>
                <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
