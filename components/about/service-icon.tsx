import type { ServiceIcon as ServiceIconName } from "@/lib/about"

const paths: Record<ServiceIconName, React.ReactNode> = {
  product: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  service: (
    <>
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="7" r="2" />
      <path d="M7 17h4a3 3 0 0 0 3-3v-4a3 3 0 0 1 3-3" />
    </>
  ),
  systems: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <circle cx="16.5" cy="16.5" r="3.5" />
    </>
  ),
  prototyping: <path d="M13 3L5 13h6l-1 8 8-10h-6z" />,
  ops: (
    <>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </>
  ),
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
