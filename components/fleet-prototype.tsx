"use client"

import { useEffect, useRef, useState } from "react"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

// A working rebuild of two Fleet Connect widgets, coded for the portfolio with sample data. The point is the
// interaction: filtering what counts towards savings, and every state that produces (loading, empty, error).

type Metric = { id: string; en: string; es: string; chip: { en: string; es: string }; value: number; alert?: boolean }

// Monthly potential savings in euros. The first three are the defaults from the Figma prototype (4.5K in total).
const metrics: Metric[] = [
  {
    id: "penalties",
    chip: { en: "Penalties", es: "Penalizaciones" },
    en: "Penalties for excess vehicle use",
    es: "Penalizaciones por uso excesivo de vehículos",
    value: 1200,
    alert: true,
  },
  {
    id: "driving",
    chip: { en: "Efficient driving", es: "Conducción eficiente" },
    en: "Efficient driving",
    es: "Conducción eficiente",
    value: 900,
  },
  {
    id: "electric",
    chip: { en: "Electrification", es: "Electrificación" },
    en: "Potential savings from electrification",
    es: "Ahorro potencial por electrificación",
    value: 2400,
  },
  {
    id: "fuel",
    chip: { en: "Fuel cards", es: "Tarjetas de combustible" },
    en: "Fuel card usage",
    es: "Uso de tarjetas de combustible",
    value: 650,
  },
  {
    id: "maintenance",
    chip: { en: "Maintenance", es: "Mantenimiento" },
    en: "Preventive maintenance",
    es: "Mantenimiento preventivo",
    value: 800,
  },
  {
    id: "tyres",
    chip: { en: "Tyres", es: "Neumáticos" },
    en: "Tyre management",
    es: "Gestión de neumáticos",
    value: 300,
  },
  { id: "idle", chip: { en: "Idle time", es: "Ralentí" }, en: "Idle time", es: "Tiempo al ralentí", value: 420 },
  { id: "routes", chip: { en: "Routes", es: "Rutas" }, en: "Route planning", es: "Planificación de rutas", value: 550 },
]
const defaults = ["penalties", "driving", "electric"]

// The "before": every indicator at the same weight, the way the old dashboards read.
const before: { en: string; es: string; value: string }[] = [
  { en: "Vehicles", es: "Vehículos", value: "342" },
  { en: "Connected", es: "Conectados", value: "192" },
  { en: "Disconnected", es: "Desconectados", value: "150" },
  { en: "Km this month", es: "Km este mes", value: "418,220" },
  { en: "Avg. km / vehicle", es: "Km medio / vehículo", value: "1,223" },
  { en: "Fuel (L)", es: "Combustible (L)", value: "29,410" },
  { en: "Fuel cost", es: "Coste combustible", value: "€48,906" },
  { en: "CO₂ (t)", es: "CO₂ (t)", value: "71.3" },
  { en: "Idle hours", es: "Horas al ralentí", value: "1,284" },
  { en: "Harsh braking", es: "Frenadas bruscas", value: "2,031" },
  { en: "Speeding events", es: "Excesos de velocidad", value: "864" },
  { en: "Services due", es: "Revisiones pendientes", value: "37" },
  { en: "Tyre alerts", es: "Alertas de neumáticos", value: "19" },
  { en: "Excess-use penalties", es: "Penalizaciones", value: "€1,200" },
  { en: "Contracts ending", es: "Contratos que vencen", value: "23" },
  { en: "Claims open", es: "Siniestros abiertos", value: "11" },
  { en: "EV share", es: "% eléctricos", value: "14%" },
  { en: "Charging sessions", es: "Recargas", value: "612" },
  { en: "Avg. consumption", es: "Consumo medio", value: "6.9 L" },
  { en: "Drivers", es: "Conductores", value: "355" },
]

const copy = {
  en: {
    before: "Before",
    after: "After",
    state: "State",
    states: { live: "Live", loading: "Loading", empty: "Empty", error: "Error" },
    beforeNote: "Every indicator at the same weight. Recreated with sample data.",
    savings: "Savings & cost optimisation",
    total: "Total potential savings",
    perMonth: "€/month",
    filter: "Filter metrics",
    selected: (n: number, of: number) => `${n} of ${of} selected`,
    add: "Add",
    remove: (name: string) => `Remove ${name}`,
    emptyTitle: "No metrics selected",
    emptyBody: "Add a metric to see how much the fleet could save.",
    errorTitle: "Couldn't load savings",
    errorBody: "The data service didn't answer. Nothing is lost.",
    retry: "Try again",
    status: "Fleet status",
    total_: "Total fleet",
    disconnected: "Disconnected",
    connected: "Connected",
    percent: "Show %",
    hint: "Try it: remove a metric, add one back, or remove them all.",
  },
  es: {
    before: "Antes",
    after: "Después",
    state: "Estado",
    states: { live: "En vivo", loading: "Cargando", empty: "Vacío", error: "Error" },
    beforeNote: "Todos los indicadores con el mismo peso. Recreado con datos de ejemplo.",
    savings: "Ahorros y optimización de costes",
    total: "Ahorro total potencial",
    perMonth: "€/mes",
    filter: "Filtrar métricas",
    selected: (n: number, of: number) => `${n} de ${of} seleccionadas`,
    add: "Añadir",
    remove: (name: string) => `Quitar ${name}`,
    emptyTitle: "No hay métricas seleccionadas",
    emptyBody: "Añade una métrica para ver cuánto podría ahorrar la flota.",
    errorTitle: "No se pudo cargar el ahorro",
    errorBody: "El servicio de datos no respondió. No se ha perdido nada.",
    retry: "Reintentar",
    status: "Estado de la flota",
    total_: "Total flota",
    disconnected: "Flota desconectada",
    connected: "Flota conectada",
    percent: "Mostrar %",
    hint: "Pruébalo: quita una métrica, vuelve a añadirla o quítalas todas.",
  },
}

type State = "live" | "loading" | "empty" | "error"

const short = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n))

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full bg-muted p-1 text-sm">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className="rounded-full px-3 py-1.5 transition-colors aria-checked:bg-foreground aria-checked:text-background hover:bg-border/70 aria-checked:hover:bg-foreground"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

const widget = "rounded-2xl bg-white p-5 shadow-[0_12px_40px_-24px_rgba(0,40,30,0.45)] ring-1 ring-black/5"
const tile =
  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#109a63,#04473d)] text-white"

function Savings({ state, setState, locale }: { state: State; setState: (s: State) => void; locale: Locale }) {
  const c = copy[locale]
  const [selected, setSelected] = useState<string[]>(defaults)
  const [adding, setAdding] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // Every change re-queries the data, so the widget shows a short loading state, like the real service would.
  const update = (next: string[]) => {
    setSelected(next)
    setAdding(false)
    setState("loading")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState(next.length ? "live" : "empty"), 500)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const shown = state === "empty" ? [] : metrics.filter((m) => selected.includes(m.id))
  const available = metrics.filter((m) => !selected.includes(m.id))
  const total = shown.reduce((sum, m) => sum + m.value, 0)

  return (
    <section aria-label={c.savings} className={cn(widget, "flex flex-col gap-4")}>
      <header className="flex items-center gap-3">
        <span className={tile} aria-hidden="true">
          €
        </span>
        <h3 className="font-semibold uppercase leading-tight tracking-tight text-[#04473d]">{c.savings}</h3>
      </header>

      {state === "error" ? (
        <div role="alert" className="flex flex-col items-start gap-3 rounded-xl bg-[#fff1f1] p-5">
          <p className="font-medium text-[#c62828]">{c.errorTitle}</p>
          <p className="text-sm text-muted-foreground">{c.errorBody}</p>
          <button
            type="button"
            onClick={() => update(selected)}
            className="rounded-full bg-foreground px-4 py-2 text-sm text-background"
          >
            {c.retry}
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-xl bg-[linear-gradient(160deg,#0fa864,#04473d)] p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-wider text-white/80">{c.total}</p>
            <p aria-live="polite" className="mt-1 flex items-baseline gap-2">
              {state === "loading" ? (
                <span className="h-12 w-32 animate-pulse rounded-lg bg-white/25" />
              ) : (
                <>
                  <span className="text-5xl font-semibold tracking-tight tabular-nums">{short(total)}</span>
                  <span className="text-lg text-white/85">{c.perMonth}</span>
                </>
              )}
            </p>
          </div>

          <div className="rounded-xl bg-[#f6f8f8] p-4 ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <button
                type="button"
                aria-expanded={adding}
                onClick={() => setAdding(!adding)}
                disabled={!available.length}
                className="flex items-center gap-1.5 font-semibold text-[#04473d] disabled:opacity-40"
              >
                <span aria-hidden="true">{adding ? "−" : "+"}</span> {c.filter}
              </button>
              <span className="text-muted-foreground">{c.selected(selected.length, metrics.length)}</span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {metrics
                .filter((m) => selected.includes(m.id))
                .map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      aria-label={c.remove(m[locale])}
                      onClick={() => update(selected.filter((id) => id !== m.id))}
                      className="flex items-center gap-1.5 rounded-lg bg-[#0d8a55] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#04473d]"
                    >
                      <span aria-hidden="true">×</span>
                      {m.chip[locale]}
                    </button>
                  </li>
                ))}
            </ul>
            {adding && (
              <ul className="mt-3 flex flex-col gap-1 border-t border-black/5 pt-3">
                {available.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => update([...selected, m.id])}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white"
                    >
                      {m[locale]}
                      <span className="text-[#0d8a55]">
                        {c.add} <span aria-hidden="true">+</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {state === "empty" || (state !== "loading" && !shown.length) ? (
            <div className="rounded-xl border border-dashed border-black/15 p-5 text-center">
              <p className="font-medium">{c.emptyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.emptyBody}</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {(state === "loading" ? metrics.filter((m) => selected.includes(m.id)) : shown).map((m) => (
                <li
                  key={m.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-3 ring-1",
                    m.alert ? "bg-[#fff1f1] ring-[#f5c2c2]" : "bg-[#f1f8f5] ring-[#cfe8dc]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("size-8 shrink-0 rounded-lg", m.alert ? "bg-[#e53935]" : "bg-[#0d8a55]")}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-xs text-muted-foreground">{m[locale]}</span>
                    {state === "loading" ? (
                      <span className="mt-1 block h-5 w-20 animate-pulse rounded bg-black/10" />
                    ) : (
                      <span
                        className={cn(
                          "block text-lg font-semibold tabular-nums",
                          m.alert ? "text-[#d32f2f]" : "text-[#0d8a55]",
                        )}
                      >
                        {short(m.value)} {c.perMonth}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

function FleetStatus({ locale }: { locale: Locale }) {
  const c = copy[locale]
  const [percent, setPercent] = useState(false)
  const total = 342
  const parts = [
    { key: "disconnected", value: 150, className: "bg-[#04473d] text-white" },
    { key: "connected", value: 192, className: "bg-[#12b76a] text-[#04473d]" },
  ] as const
  const label = (n: number) => (percent ? `${Math.round((n / total) * 100)}%` : String(n))

  return (
    <section aria-label={c.status} className={cn(widget, "flex flex-col gap-4")}>
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={tile} aria-hidden="true">
            ⛟
          </span>
          <h3 className="font-semibold uppercase tracking-tight text-[#04473d]">{c.status}</h3>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={percent}
            onChange={(e) => setPercent(e.target.checked)}
            className="accent-[#0d8a55]"
          />
          {c.percent}
        </label>
      </header>
      <div className="flex h-11 overflow-hidden rounded-md bg-[#bdbdbd] text-sm font-semibold tabular-nums">
        {parts.map((part) => (
          <span
            key={part.key}
            style={{ width: `${(part.value / total) * 100}%` }}
            className={cn("flex items-end justify-end px-2 pb-1 transition-[width]", part.className)}
          >
            {label(part.value)}
          </span>
        ))}
        <span className="flex flex-1 items-end justify-end px-2 pb-1 text-[#04473d]">{percent ? "100%" : total}</span>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bdbdbd]" /> {c.total_}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#04473d]" /> {c.disconnected}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#12b76a]" /> {c.connected}
        </li>
      </ul>
    </section>
  )
}

export function FleetPrototype() {
  const { locale } = useLanguage()
  const c = copy[locale]
  const [view, setView] = useState<"before" | "after">("after")
  const [state, setState] = useState<State>("live")

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-[#eef2f1] p-3 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Segmented
          label={`${c.before} / ${c.after}`}
          value={view}
          onChange={setView}
          options={[
            { value: "before", label: c.before },
            { value: "after", label: c.after },
          ]}
        />
        {view === "after" && (
          <Segmented
            label={c.state}
            value={state}
            onChange={setState}
            options={(["live", "loading", "empty", "error"] as const).map((s) => ({ value: s, label: c.states[s] }))}
          />
        )}
      </div>

      {view === "before" ? (
        <div className={cn(widget, "p-3")}>
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-5">
            {before.map((item) => (
              <li key={item.en} className="rounded-md bg-[#f4f4f4] p-2">
                <span className="block truncate text-[11px] text-muted-foreground">{item[locale]}</span>
                <span className="block text-sm font-semibold tabular-nums">{item.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-1 text-xs text-muted-foreground">{c.beforeNote}</p>
        </div>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Savings state={state} setState={setState} locale={locale} />
          <FleetStatus locale={locale} />
        </div>
      )}

      {view === "after" && <p className="px-1 text-sm text-muted-foreground">{c.hint}</p>}
    </div>
  )
}
