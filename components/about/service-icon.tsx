import type { ServiceIcon as ServiceIconName } from "@/lib/about"

const paths: Record<ServiceIconName, React.ReactNode> = {
  product: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  branding: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />,
  systems: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <circle cx="16.5" cy="16.5" r="3.5" />
    </>
  ),
  ops: (
    <>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </>
  ),
  management: (
    <>
      <path d="M4 6h9M4 12h16M4 18h6" />
      <circle cx="16" cy="6" r="1.5" />
      <circle cx="13" cy="18" r="1.5" />
    </>
  ),
  venture: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 15l6-6M10 9h5v5" />
    </>
  ),
  motion: <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />,
  analytics: <path d="M5 20v-8M12 20V5M19 20v-9M3 20h18" />,
}

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      {paths[name]}
    </svg>
  )
}
