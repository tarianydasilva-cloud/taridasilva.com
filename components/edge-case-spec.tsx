"use client"

import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

// The state and edge-case list written with Claude before the Fleet Connect prototype was coded, and what became
// of each one: a switchable state, an edge case the prototype handles, or one queued for the next iteration.

type Status = "state" | "handled" | "next"
type Row = { status: Status; case: Record<Locale, string>; behaviour: Record<Locale, string> }

const rows: Row[] = [
  {
    status: "state",
    case: { en: "Live", es: "En vivo" },
    behaviour: {
      en: "Headline total and its metrics, from the selected filters.",
      es: "Total principal y sus métricas, según los filtros elegidos.",
    },
  },
  {
    status: "state",
    case: { en: "Loading", es: "Cargando" },
    behaviour: {
      en: "Skeletons in place of numbers, so the layout doesn't jump when data arrives.",
      es: "Esqueletos en lugar de cifras, para que el layout no salte al llegar los datos.",
    },
  },
  {
    status: "state",
    case: { en: "Empty", es: "Vacío" },
    behaviour: {
      en: "No metrics selected: say so, and point to the filter instead of showing 0.",
      es: "Sin métricas elegidas: decirlo y señalar el filtro en lugar de mostrar 0.",
    },
  },
  {
    status: "state",
    case: { en: "Error", es: "Error" },
    behaviour: {
      en: "The card says what failed, that nothing is lost, and offers a retry.",
      es: "La tarjeta dice qué falló, que no se ha perdido nada y ofrece reintentar.",
    },
  },
  {
    status: "handled",
    case: { en: "A metric costs money", es: "Una métrica cuesta dinero" },
    behaviour: {
      en: "Penalties show in red, so a cost never reads as a saving.",
      es: "Las penalizaciones van en rojo, para que un coste no se lea como ahorro.",
    },
  },
  {
    status: "handled",
    case: { en: "Every metric selected", es: "Todas las métricas elegidas" },
    behaviour: {
      en: "The add control turns off; there's nothing left to add.",
      es: "El control de añadir se desactiva; no queda nada que añadir.",
    },
  },
  {
    status: "handled",
    case: { en: "Long labels", es: "Etiquetas largas" },
    behaviour: {
      en: "Chips use short names; full names truncate in rows and wrap in titles.",
      es: "Los chips usan nombres cortos; los completos se recortan en filas y saltan de línea en títulos.",
    },
  },
  {
    status: "handled",
    case: { en: "Search with no matches", es: "Búsqueda sin resultados" },
    behaviour: {
      en: "A message replaces the cards instead of a blank screen.",
      es: "Un mensaje sustituye a las tarjetas en vez de una pantalla en blanco.",
    },
  },
  {
    status: "handled",
    case: { en: "Narrow screens", es: "Pantallas estrechas" },
    behaviour: {
      en: "Cards reflow to one column; nothing overflows at 360px.",
      es: "Las tarjetas pasan a una columna; nada se desborda a 360px.",
    },
  },
  {
    status: "next",
    case: { en: "Partial data", es: "Datos parciales" },
    behaviour: {
      en: "Some metrics fail: keep the total, flag what's missing from it.",
      es: "Fallan algunas métricas: mantener el total y señalar qué le falta.",
    },
  },
  {
    status: "next",
    case: { en: "Stale data", es: "Datos desactualizados" },
    behaviour: {
      en: "Show when the numbers were last updated.",
      es: "Mostrar cuándo se actualizaron las cifras por última vez.",
    },
  },
  {
    status: "next",
    case: { en: "No permission", es: "Sin permisos" },
    behaviour: {
      en: "Explain who can grant access instead of hiding the card.",
      es: "Explicar quién puede dar acceso en lugar de ocultar la tarjeta.",
    },
  },
  {
    status: "next",
    case: { en: "Slow network", es: "Red lenta" },
    behaviour: {
      en: "After a few seconds, keep the skeleton and offer a retry.",
      es: "Tras unos segundos, mantener el esqueleto y ofrecer reintentar.",
    },
  },
]

const copy = {
  en: {
    case: "Case",
    behaviour: "What happens",
    where: "In the prototype",
    status: { state: "Switchable state", handled: "Handled", next: "Next iteration" },
  },
  es: {
    case: "Caso",
    behaviour: "Qué pasa",
    where: "En el prototipo",
    status: { state: "Estado activable", handled: "Resuelto", next: "Siguiente iteración" },
  },
}

const badge: Record<Status, string> = {
  state: "bg-foreground text-background",
  handled: "bg-[#e0f2e9] text-[#04473d]",
  next: "bg-muted text-muted-foreground ring-1 ring-black/10",
}

export function EdgeCaseSpec() {
  const { locale } = useLanguage()
  const c = copy[locale]

  return (
    <div className="overflow-hidden rounded-2xl bg-muted">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="max-sm:sr-only">
          <tr className="text-muted-foreground">
            <th scope="col" className="px-5 py-3 font-normal">
              {c.case}
            </th>
            <th scope="col" className="px-5 py-3 font-normal">
              {c.behaviour}
            </th>
            <th scope="col" className="px-5 py-3 font-normal">
              {c.where}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            // On phones each row stacks: the case and its badge, then what happens.
            <tr
              key={row.case.en}
              className="border-t border-black/5 max-sm:grid max-sm:grid-cols-[1fr_auto] max-sm:gap-x-3 max-sm:px-5 max-sm:py-3"
            >
              <th scope="row" className="font-medium sm:px-5 sm:py-3">
                {row.case[locale]}
              </th>
              <td className="text-muted-foreground text-pretty max-sm:col-span-2 max-sm:row-start-2 max-sm:mt-1 sm:px-5 sm:py-3">
                {row.behaviour[locale]}
              </td>
              <td className="sm:px-5 sm:py-3">
                <span
                  className={cn("inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs", badge[row.status])}
                >
                  {c.status[row.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
