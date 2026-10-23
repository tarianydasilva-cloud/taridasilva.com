"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./fleet-icons"
import { useLanguage } from "./language-provider"

// A working rebuild of the Fleet Connect dashboard, coded for the portfolio with sample data. The point is the
// interaction: filtering what counts towards each headline number, and every state that produces
// (loading, empty, error). The search narrows the cards on screen.

type Localized = Record<Locale, string>
type Metric = { id: string; icon: IconName; label: Localized; chip: Localized; value: number; alert?: boolean }
type MetricCard = {
  id: string
  icon: IconName
  title: Localized
  total: Localized
  unit: Localized
  metrics: Metric[]
  defaults: string[]
}

// Savings in €/month and emissions in tCO₂eq/year. The defaults match the Figma prototype: 4.5K and 155.
const cards: MetricCard[] = [
  {
    id: "savings",
    icon: "coins",
    title: { en: "Savings & cost optimisation", es: "Ahorros y optimización de costes" },
    total: { en: "Total potential savings", es: "Ahorro total potencial" },
    unit: { en: "€/month", es: "€/mes" },
    defaults: ["penalties", "driving", "electric"],
    metrics: [
      {
        id: "penalties",
        icon: "trendDown",
        chip: { en: "Penalties", es: "Penalizaciones" },
        label: { en: "Penalties for excess vehicle use", es: "Penalizaciones por uso excesivo de vehículos" },
        value: 1200,
        alert: true,
      },
      {
        id: "driving",
        icon: "gauge",
        chip: { en: "Efficient driving", es: "Conducción eficiente" },
        label: { en: "Efficient driving", es: "Conducción eficiente" },
        value: 900,
      },
      {
        id: "electric",
        icon: "banknote",
        chip: { en: "Electrification", es: "Electrificación" },
        label: { en: "Potential savings from electrification", es: "Ahorro potencial por electrificación" },
        value: 2400,
      },
      {
        id: "fuel",
        icon: "fuel",
        chip: { en: "Fuel cards", es: "Tarjetas de combustible" },
        label: { en: "Fuel card usage", es: "Uso de tarjetas de combustible" },
        value: 650,
      },
      {
        id: "maintenance",
        icon: "wrench",
        chip: { en: "Maintenance", es: "Mantenimiento" },
        label: { en: "Preventive maintenance", es: "Mantenimiento preventivo" },
        value: 800,
      },
      {
        id: "tyres",
        icon: "tyre",
        chip: { en: "Tyres", es: "Neumáticos" },
        label: { en: "Tyre management", es: "Gestión de neumáticos" },
        value: 300,
      },
      {
        id: "idle",
        icon: "clock",
        chip: { en: "Idle time", es: "Ralentí" },
        label: { en: "Idle time", es: "Tiempo al ralentí" },
        value: 420,
      },
      {
        id: "routes",
        icon: "route",
        chip: { en: "Routes", es: "Rutas" },
        label: { en: "Route planning", es: "Planificación de rutas" },
        value: 550,
      },
    ],
  },
  {
    id: "emissions",
    icon: "leaf",
    title: { en: "Potential GHG emission savings", es: "Ahorro potencial de emisiones GEI" },
    total: { en: "Total potential reduction", es: "Reducción total potencial" },
    unit: { en: "tCO₂eq/year", es: "tCO₂eq/año" },
    defaults: ["fleet-ev", "eco-driving", "phev"],
    metrics: [
      {
        id: "fleet-ev",
        icon: "zap",
        chip: { en: "Fleet electrification", es: "Electrificación flota" },
        label: { en: "Fleet electrification", es: "Electrificación de la flota" },
        value: 85,
      },
      {
        id: "eco-driving",
        icon: "gauge",
        chip: { en: "Efficient driving", es: "Conducción eficiente" },
        label: { en: "Efficient driving", es: "Conducción eficiente" },
        value: 42,
      },
      {
        id: "phev",
        icon: "plug",
        chip: { en: "PHEV charging", es: "Recarga PHEV" },
        label: { en: "PHEV charging optimisation", es: "Optimización de recarga PHEV" },
        value: 28,
      },
      {
        id: "routing",
        icon: "route",
        chip: { en: "Routes", es: "Rutas" },
        label: { en: "Route optimisation", es: "Optimización de rutas" },
        value: 18,
      },
      {
        id: "idling",
        icon: "clock",
        chip: { en: "Idle time", es: "Ralentí" },
        label: { en: "Less idle time", es: "Menos tiempo al ralentí" },
        value: 12,
      },
      {
        id: "pressure",
        icon: "tyre",
        chip: { en: "Tyre pressure", es: "Presión neumáticos" },
        label: { en: "Correct tyre pressure", es: "Presión correcta de neumáticos" },
        value: 6,
      },
    ],
  },
]

// PHEV charging: plug-in hybrids and how much of their distance runs on electricity, against a 60% target.
const phevs = [
  { plate: "4821 LKM", share: 72 },
  { plate: "1197 MRT", share: 58 },
  { plate: "6630 KZP", share: 31 },
  { plate: "2054 NBV", share: 18 },
]

// Operations: what needs someone's attention this week.
const tasks: { label: Localized; count: number; level: "high" | "medium" | "low" }[] = [
  { label: { en: "Services due", es: "Revisiones pendientes" }, count: 37, level: "high" },
  { label: { en: "Contracts ending", es: "Contratos que vencen" }, count: 23, level: "medium" },
  { label: { en: "Tyre alerts", es: "Alertas de neumáticos" }, count: 19, level: "medium" },
  { label: { en: "Open claims", es: "Siniestros abiertos" }, count: 11, level: "low" },
]

// The "before": every indicator at the same weight, the way the old dashboards read.
const before: { label: Localized; value: string }[] = [
  { label: { en: "Vehicles", es: "Vehículos" }, value: "342" },
  { label: { en: "Connected", es: "Conectados" }, value: "192" },
  { label: { en: "Disconnected", es: "Desconectados" }, value: "150" },
  { label: { en: "Km this month", es: "Km este mes" }, value: "418,220" },
  { label: { en: "Avg. km / vehicle", es: "Km medio / vehículo" }, value: "1,223" },
  { label: { en: "Fuel (L)", es: "Combustible (L)" }, value: "29,410" },
  { label: { en: "Fuel cost", es: "Coste combustible" }, value: "€48,906" },
  { label: { en: "CO₂ (t)", es: "CO₂ (t)" }, value: "71.3" },
  { label: { en: "Idle hours", es: "Horas al ralentí" }, value: "1,284" },
  { label: { en: "Harsh braking", es: "Frenadas bruscas" }, value: "2,031" },
  { label: { en: "Speeding events", es: "Excesos de velocidad" }, value: "864" },
  { label: { en: "Services due", es: "Revisiones pendientes" }, value: "37" },
  { label: { en: "Tyre alerts", es: "Alertas de neumáticos" }, value: "19" },
  { label: { en: "Excess-use penalties", es: "Penalizaciones" }, value: "€1,200" },
  { label: { en: "Contracts ending", es: "Contratos que vencen" }, value: "23" },
  { label: { en: "Claims open", es: "Siniestros abiertos" }, value: "11" },
  { label: { en: "EV share", es: "% eléctricos" }, value: "14%" },
  { label: { en: "Charging sessions", es: "Recargas" }, value: "612" },
  { label: { en: "Avg. consumption", es: "Consumo medio" }, value: "6.9 L" },
  { label: { en: "Drivers", es: "Conductores" }, value: "355" },
]

const copy = {
  en: {
    before: "Before",
    after: "After",
    state: "State",
    states: { live: "Live", loading: "Loading", empty: "Empty", error: "Error" },
    beforeNote: "Every indicator at the same weight. Recreated with sample data.",
    filter: "Filter metrics",
    selected: (n: number, of: number) => `${n} of ${of} selected`,
    add: "Add",
    remove: (name: string) => `Remove ${name}`,
    emptyTitle: "No metrics selected",
    emptyBody: "Add a metric to see the total.",
    errorTitle: "Couldn't load this card",
    errorBody: "The data service didn't answer. Nothing is lost.",
    retry: "Try again",
    status: "Fleet status",
    fleetTotal: "Total fleet",
    disconnected: "Disconnected",
    connected: "Connected",
    percent: "Show %",
    phev: "PHEV charging opportunities",
    phevNote: "Distance driven on electricity, target 60%",
    belowTarget: (n: number) => `${n} below target`,
    ops: "Operations & control",
    opsNote: "Needs attention this week",
    levels: { high: "High", medium: "Medium", low: "Low" },
    search: "Search cards…",
    noResults: "No cards match your search.",
    client: "Client name",
    menu: ["Dashboard", "Analysis", "Team"],
    hint: "Try it: remove a metric, add one back, remove them all, or search for a card.",
  },
  es: {
    before: "Antes",
    after: "Después",
    state: "Estado",
    states: { live: "En vivo", loading: "Cargando", empty: "Vacío", error: "Error" },
    beforeNote: "Todos los indicadores con el mismo peso. Recreado con datos de ejemplo.",
    filter: "Filtrar métricas",
    selected: (n: number, of: number) => `${n} de ${of} seleccionadas`,
    add: "Añadir",
    remove: (name: string) => `Quitar ${name}`,
    emptyTitle: "No hay métricas seleccionadas",
    emptyBody: "Añade una métrica para ver el total.",
    errorTitle: "No se pudo cargar esta tarjeta",
    errorBody: "El servicio de datos no respondió. No se ha perdido nada.",
    retry: "Reintentar",
    status: "Estado de la flota",
    fleetTotal: "Total flota",
    disconnected: "Flota desconectada",
    connected: "Flota conectada",
    percent: "Mostrar %",
    phev: "Oportunidades de optimización recarga PHEV",
    phevNote: "Distancia recorrida en eléctrico, objetivo 60%",
    belowTarget: (n: number) => `${n} por debajo del objetivo`,
    ops: "Gestión operativa y control",
    opsNote: "Requiere atención esta semana",
    levels: { high: "Alta", medium: "Media", low: "Baja" },
    search: "Buscar tarjetas…",
    noResults: "Ninguna tarjeta coincide con la búsqueda.",
    client: "Nombre del cliente",
    menu: ["Dashboard", "Análisis", "Equipo"],
    hint: "Pruébalo: quita una métrica, vuelve a añadirla, quítalas todas o busca una tarjeta.",
  },
}

type State = "live" | "loading" | "empty" | "error"

const menuIcons: IconName[] = ["grid", "chart", "users"]

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
          className="rounded-full px-3 py-1.5 transition-colors hover:bg-border/70 aria-checked:bg-foreground aria-checked:text-background aria-checked:hover:bg-foreground"
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

function CardHeader({ icon, title, aside }: { icon: IconName; title: string; aside?: ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className={tile} aria-hidden="true">
          <Icon name={icon} />
        </span>
        <h3 className="font-semibold uppercase leading-tight tracking-tight text-[#04473d]">{title}</h3>
      </div>
      {aside ?? (
        // The info and download actions from the Figma cards; shown for fidelity, not wired up in this rebuild.
        <span aria-hidden="true" className="flex gap-1.5 text-[#0d8a55]">
          {(["info", "download"] as const).map((name) => (
            <span
              key={name}
              className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
            >
              <Icon name={name} className="size-4" />
            </span>
          ))}
        </span>
      )}
    </header>
  )
}

function ErrorBox({ onRetry, locale }: { onRetry: () => void; locale: Locale }) {
  const c = copy[locale]
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-xl bg-[#fff1f1] p-5">
      <p className="font-medium text-[#c62828]">{c.errorTitle}</p>
      <p className="text-sm text-muted-foreground">{c.errorBody}</p>
      <button type="button" onClick={onRetry} className="rounded-full bg-foreground px-4 py-2 text-sm text-background">
        {c.retry}
      </button>
    </div>
  )
}

// A headline number built from metrics the user can add and remove. Each change re-queries the data,
// so the card shows a short loading state, like the real service would. `forced` comes from the state switcher.
function MetricWidget({ card, forced, locale }: { card: MetricCard; forced: State; locale: Locale }) {
  const c = copy[locale]
  const [selected, setSelected] = useState<string[]>(card.defaults)
  const [own, setOwn] = useState<State>("live")
  const [adding, setAdding] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const state = forced === "live" ? own : forced
  const update = (next: string[]) => {
    setSelected(next)
    setAdding(false)
    setOwn("loading")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOwn("live"), 500)
  }

  const chosen = card.metrics.filter((m) => selected.includes(m.id))
  const shown = state === "empty" ? [] : chosen
  const available = card.metrics.filter((m) => !selected.includes(m.id))
  const total = shown.reduce((sum, m) => sum + m.value, 0)

  return (
    <section aria-label={card.title[locale]} className={cn(widget, "flex flex-col gap-4")}>
      <CardHeader icon={card.icon} title={card.title[locale]} />

      {state === "error" ? (
        <ErrorBox onRetry={() => update(selected)} locale={locale} />
      ) : (
        <>
          <div className="rounded-xl bg-[linear-gradient(160deg,#0fa864,#04473d)] p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-wider text-white/80">{card.total[locale]}</p>
            <p aria-live="polite" className="mt-1 flex items-baseline gap-2">
              {state === "loading" ? (
                <span className="h-12 w-32 animate-pulse rounded-lg bg-white/25" />
              ) : (
                <>
                  <span className="text-5xl font-semibold tracking-tight tabular-nums">{short(total)}</span>
                  <span className="text-lg text-white/85">{card.unit[locale]}</span>
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
              <span className="text-muted-foreground">{c.selected(selected.length, card.metrics.length)}</span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {chosen.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-label={c.remove(m.label[locale])}
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
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white"
                    >
                      {m.label[locale]}
                      <span className="shrink-0 text-[#0d8a55]">
                        {c.add} <span aria-hidden="true">+</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {state !== "loading" && !shown.length ? (
            <div className="rounded-xl border border-dashed border-black/15 p-5 text-center">
              <p className="font-medium">{c.emptyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.emptyBody}</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {(state === "loading" ? chosen : shown).map((m) => (
                <li
                  key={m.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-3 ring-1",
                    m.alert ? "bg-[#fff1f1] ring-[#f5c2c2]" : "bg-[#f1f8f5] ring-[#cfe8dc]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg text-white",
                      m.alert ? "bg-[#e53935]" : "bg-[#0d8a55]",
                    )}
                  >
                    <Icon name={m.icon} className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs text-muted-foreground">{m.label[locale]}</span>
                    {state === "loading" ? (
                      <span className="mt-1 block h-5 w-20 animate-pulse rounded bg-black/10" />
                    ) : (
                      <span
                        className={cn(
                          "block text-lg font-semibold tabular-nums",
                          m.alert ? "text-[#d32f2f]" : "text-[#0d8a55]",
                        )}
                      >
                        {short(m.value)} {card.unit[locale]}
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

function FleetStatus({ forced, locale }: { forced: State; locale: Locale }) {
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
      <CardHeader
        icon="car"
        title={c.status}
        aside={
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={percent}
              onChange={(e) => setPercent(e.target.checked)}
              className="accent-[#0d8a55]"
            />
            {c.percent}
          </label>
        }
      />
      {forced === "loading" ? (
        <span className="h-11 animate-pulse rounded-md bg-black/10" />
      ) : (
        <div className="flex h-11 overflow-hidden rounded-md bg-[#bdbdbd] text-sm font-semibold tabular-nums">
          {parts.map((part) => (
            <span
              key={part.key}
              style={{ width: `${(part.value / total) * 100}%` }}
              className={cn("flex items-end justify-end px-2 pb-1", part.className)}
            >
              {label(part.value)}
            </span>
          ))}
          <span className="flex flex-1 items-end justify-end px-2 pb-1 text-[#04473d]">{percent ? "100%" : total}</span>
        </div>
      )}
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bdbdbd]" /> {c.fleetTotal}
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

// Plug-in hybrids sorted by how much they drive on electricity; the ones under target are the opportunity.
function PhevCard({ forced, locale }: { forced: State; locale: Locale }) {
  const c = copy[locale]
  const [onlyBelow, setOnlyBelow] = useState(false)
  const target = 60
  const below = phevs.filter((v) => v.share < target)
  const list = onlyBelow ? below : phevs

  return (
    <section aria-label={c.phev} className={cn(widget, "flex flex-col gap-4")}>
      <CardHeader icon="plug" title={c.phev} />
      {forced === "error" ? (
        <ErrorBox onRetry={() => {}} locale={locale} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{c.phevNote}</span>
            <button
              type="button"
              aria-pressed={onlyBelow}
              onClick={() => setOnlyBelow(!onlyBelow)}
              className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium ring-1 ring-[#0d8a55] text-[#0d8a55] aria-pressed:bg-[#0d8a55] aria-pressed:text-white"
            >
              {c.belowTarget(below.length)}
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {list.map((v) => (
              <li key={v.plate} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                <span className="font-mono text-xs">{v.plate}</span>
                <span className="relative h-2.5 rounded-full bg-black/10">
                  {forced !== "loading" && (
                    <span
                      style={{ width: `${v.share}%` }}
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        v.share < target ? "bg-[#f59e0b]" : "bg-[#12b76a]",
                      )}
                    />
                  )}
                  <span style={{ left: `${target}%` }} className="absolute -inset-y-1 w-px bg-[#04473d]" />
                </span>
                <span className="text-right tabular-nums">{forced === "loading" ? "–" : `${v.share}%`}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

function OpsCard({ forced, locale }: { forced: State; locale: Locale }) {
  const c = copy[locale]
  const [done, setDone] = useState<string[]>([])

  return (
    <section aria-label={c.ops} className={cn(widget, "flex flex-col gap-4")}>
      <CardHeader icon="alert" title={c.ops} />
      {forced === "error" ? (
        <ErrorBox onRetry={() => {}} locale={locale} />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">{c.opsNote}</p>
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => {
              const checked = done.includes(task.label.en)
              return (
                <li key={task.label.en}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl bg-[#f6f8f8] p-3 ring-1 ring-black/5 transition-opacity",
                      checked && "opacity-50",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDone(checked ? done.filter((d) => d !== task.label.en) : [...done, task.label.en])
                      }
                      className="accent-[#0d8a55]"
                    />
                    <span className={cn("flex-1 text-sm", checked && "line-through")}>{task.label[locale]}</span>
                    <span className="text-lg font-semibold tabular-nums text-[#04473d]">
                      {forced === "loading" ? "–" : task.count}
                    </span>
                    <span
                      className={cn(
                        "w-14 rounded-full px-2 py-0.5 text-center text-xs",
                        task.level === "high" && "bg-[#fde2e1] text-[#c62828]",
                        task.level === "medium" && "bg-[#fef3c7] text-[#92400e]",
                        task.level === "low" && "bg-[#e0f2e9] text-[#04473d]",
                      )}
                    >
                      {c.levels[task.level]}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}

export function FleetPrototype() {
  const { locale } = useLanguage()
  const c = copy[locale]
  const [view, setView] = useState<"before" | "after">("after")
  const [state, setState] = useState<State>("live")
  const [query, setQuery] = useState("")

  // Every card on the dashboard, in reading order, with the title the search matches against.
  const all = [
    { key: "status", title: c.status, node: <FleetStatus forced={state} locale={locale} /> },
    ...cards.map((card) => ({
      key: card.id,
      title: card.title[locale],
      node: <MetricWidget card={card} forced={state} locale={locale} />,
    })),
    { key: "phev", title: c.phev, node: <PhevCard forced={state} locale={locale} /> },
    { key: "ops", title: c.ops, node: <OpsCard forced={state} locale={locale} /> },
  ]
  const q = query.trim().toLowerCase()
  const visible = all.filter((item) => !q || item.title.toLowerCase().includes(q))

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
              <li key={item.label.en} className="rounded-md bg-[#f4f4f4] p-2">
                <span className="block truncate text-[11px] text-muted-foreground">{item.label[locale]}</span>
                <span className="block text-sm font-semibold tabular-nums">{item.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-1 text-xs text-muted-foreground">{c.beforeNote}</p>
        </div>
      ) : (
        // The app shell from the Figma prototype: product switch and menu on the left, search and client on top.
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 lg:grid lg:grid-cols-[11rem_1fr]">
          <aside className="flex flex-wrap items-center gap-2 border-b border-black/5 p-3 lg:flex-col lg:items-stretch lg:border-b-0 lg:border-r">
            <span className="rounded-lg bg-[linear-gradient(160deg,#109a63,#04473d)] px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
              Fleet Connect
            </span>
            <span className="rounded-lg px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-[#04473d] ring-1 ring-[#04473d]/40">
              Fleet Review
            </span>
            <ul className="flex gap-1 text-sm lg:mt-4 lg:flex-col">
              {c.menu.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-1.5",
                    i === 0 ? "bg-[#f1f8f5] font-medium text-[#04473d]" : "text-muted-foreground",
                  )}
                >
                  <Icon name={menuIcons[i]} className="size-4" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex min-w-0 flex-col gap-4 bg-[#f7f9f8] p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <label className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-black/10 focus-within:ring-[#0d8a55]">
                <Icon name="search" className="size-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={c.search}
                  className="w-full bg-transparent outline-none"
                />
              </label>
              <span className="hidden items-center gap-2 text-xs sm:flex">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#04473d] font-semibold text-white">
                  C
                </span>
                <span className="font-semibold uppercase text-[#04473d]">{c.client}</span>
              </span>
            </div>
            {visible.length ? (
              <div className="grid items-start gap-4 xl:grid-cols-2">
                {visible.map((item) => (
                  <div key={item.key} className={cn(item.key === "status" && "xl:col-span-2")}>
                    {item.node}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-sm text-muted-foreground">
                {c.noResults}
              </p>
            )}
          </div>
        </div>
      )}

      {view === "after" && <p className="px-1 text-sm text-muted-foreground">{c.hint}</p>}
    </div>
  )
}
