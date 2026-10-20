import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Text in [square brackets] is a placeholder for facts only Tari can fill in: role, team, numbers, results.

export type CaseStudy = {
  statement: Localized
  facts: { client: Localized; role: Localized; team: Localized; timeline: Localized }
  // Key numbers shown near the top: the value (e.g. "+40%") and what it measures.
  outcomes: { value: Localized; label: Localized }[]
  challenge: Localized[]
  decisions: { title: Localized; body: Localized }[]
  // Captions for the solution images; pictures go in /public/projects/<slug>/ once available.
  gallery: { caption: Localized; image?: string }[]
  results: Localized[]
  learnings: Localized[]
}

const role = { en: "[Your role, e.g. Lead Product Designer]", es: "[Tu rol, p. ej. Lead Product Designer]" }
const team = { en: "[Team size and roles]", es: "[Tamaño y roles del equipo]" }

export const caseStudies: Record<string, CaseStudy> = {
  innohub: {
    statement: {
      en: "Rebuilding an innovation platform so anyone in a large insurer could turn an idea into a proposal.",
      es: "Reconstruir una plataforma de innovación para que cualquiera en una gran aseguradora pudiera convertir una idea en una propuesta.",
    },
    facts: {
      client: { en: "Spanish insurance company, Innovation Hub", es: "Aseguradora española, Innovation Hub" },
      role,
      team,
      timeline: { en: "[Duration], 2026", es: "[Duración], 2026" },
    },
    outcomes: [
      { value: { en: "[+X%]", es: "[+X%]" }, label: { en: "ideas submitted", es: "ideas enviadas" } },
      {
        value: { en: "[X → Y]", es: "[X → Y]" },
        label: { en: "steps to submit an idea", es: "pasos para enviar una idea" },
      },
      {
        value: { en: "[X]", es: "[X]" },
        label: { en: "sections built in HTML with AI", es: "secciones construidas en HTML con IA" },
      },
    ],
    challenge: [
      {
        en: "The Innovation Hub ran its innovation model on a SaaS tool that people found hard to use. [Name the main UX problems, e.g. confusing navigation, a long idea form, no visibility of an idea's status.]",
        es: "El Innovation Hub gestionaba su modelo de innovación con una herramienta SaaS difícil de usar. [Nombra los principales problemas de UX, p. ej. navegación confusa, un formulario de ideas largo, sin visibilidad del estado de una idea.]",
      },
      {
        en: "[What it caused, e.g. low participation or ideas abandoned halfway, and how you knew: interviews, analytics, usability tests.]",
        es: "[Qué provocaba, p. ej. poca participación o ideas abandonadas a medias, y cómo lo supiste: entrevistas, analítica, tests de usabilidad.]",
      },
    ],
    decisions: [
      {
        title: { en: "Map the innovation model first", es: "Mapear primero el modelo de innovación" },
        body: {
          en: "Before touching screens, I mapped how an idea moves through the hub, from submission to evaluation, to see where the tool got in the way.",
          es: "Antes de tocar pantallas, mapeé cómo avanza una idea en el hub, del envío a la evaluación, para ver dónde estorbaba la herramienta.",
        },
      },
      {
        title: { en: "Rebuild instead of patching", es: "Reconstruir en lugar de parchear" },
        body: {
          en: "The problems were structural, so I recreated the flows and information architecture rather than fixing screens one by one. [Why this was the right call.]",
          es: "Los problemas eran estructurales, así que rehice los flujos y la arquitectura de información en lugar de arreglar pantallas una a una. [Por qué fue la decisión correcta.]",
        },
      },
      {
        title: { en: "Build parts in HTML with AI", es: "Construir partes en HTML con IA" },
        body: {
          en: "Some sections I built directly in HTML with AI, so the team could test real, working interfaces instead of static mock-ups.",
          es: "Algunas secciones las construí directamente en HTML con IA, para que el equipo probara interfaces reales y funcionales en lugar de maquetas estáticas.",
        },
      },
    ],
    gallery: [
      { caption: { en: "[Idea creation flow]", es: "[Flujo de creación de ideas]" } },
      { caption: { en: "[Idea status and feedback]", es: "[Estado de la idea y feedback]" } },
      { caption: { en: "[A section built in HTML with AI]", es: "[Una sección construida en HTML con IA]" } },
    ],
    results: [
      {
        en: "[What changed after launch: participation, quality of ideas, time saved, feedback from the hub team.]",
        es: "[Qué cambió tras el lanzamiento: participación, calidad de las ideas, tiempo ahorrado, feedback del equipo del hub.]",
      },
    ],
    learnings: [
      {
        en: "[What you would do differently, and what you learned about designing for participation.]",
        es: "[Qué harías diferente y qué aprendiste sobre diseñar para la participación.]",
      },
    ],
  },

  "fleet-connect": {
    statement: {
      en: "Dashboards that adapt to every fleet analyst, so vehicle data turns into decisions.",
      es: "Dashboards que se adaptan a cada analista de flotas, para que los datos de los vehículos se conviertan en decisiones.",
    },
    facts: {
      client: { en: "[Mobility company]", es: "[Empresa de movilidad]" },
      role,
      team,
      timeline: { en: "[Duration], 2026", es: "[Duración], 2026" },
    },
    outcomes: [
      {
        value: { en: "[X]", es: "[X]" },
        label: { en: "user profiles served by one adaptive system", es: "perfiles de usuario en un único sistema adaptable" },
      },
      { value: { en: "[X]", es: "[X]" }, label: { en: "key metrics made visual", es: "métricas clave visualizadas" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "users tested with", es: "usuarios en las pruebas" } },
    ],
    challenge: [
      {
        en: "The people analysing data from the client's vehicles needed dashboards that changed with each user's role and questions, while showing complex data in a visual, immediate way.",
        es: "Las personas que analizaban los datos de los vehículos del cliente necesitaban dashboards que cambiaran según el rol y las preguntas de cada usuario, mostrando datos complejos de forma visual e inmediata.",
      },
      {
        en: "[What they used before and why it wasn't working.]",
        es: "[Qué usaban antes y por qué no funcionaba.]",
      },
    ],
    decisions: [
      {
        title: { en: "Start from the questions, not the data", es: "Empezar por las preguntas, no por los datos" },
        body: {
          en: "[Which questions each type of user needed to answer every day, and how that shaped the dashboards.]",
          es: "[Qué preguntas necesitaba responder cada tipo de usuario a diario y cómo eso dio forma a los dashboards.]",
        },
      },
      {
        title: { en: "One system, many views", es: "Un sistema, muchas vistas" },
        body: {
          en: "Dashboards built from modular widgets that each user can arrange and filter, so the product adapts instead of multiplying versions.",
          es: "Dashboards hechos de widgets modulares que cada usuario puede ordenar y filtrar, para que el producto se adapte en lugar de multiplicar versiones.",
        },
      },
      {
        title: { en: "Visual first, numbers one click away", es: "Primero lo visual, los números a un clic" },
        body: {
          en: "Each chart chosen for the decision it supports, with the exact figures always one click away.",
          es: "Cada gráfico elegido según la decisión que apoya, con las cifras exactas siempre a un clic.",
        },
      },
    ],
    gallery: [
      { caption: { en: "[Dashboard overview]", es: "[Vista general del dashboard]" } },
      { caption: { en: "[Customisable widgets]", es: "[Widgets personalizables]" } },
      { caption: { en: "[Data detail view]", es: "[Vista de detalle de datos]" } },
    ],
    results: [
      {
        en: "The project was delivered as a design proposal. [Whether it was presented or built, and any feedback.] If it shipped, I would measure [adoption, time to insight, weekly active users].",
        es: "El proyecto se entregó como propuesta de diseño. [Si se presentó o se construyó, y el feedback recibido.] Si se lanzara, mediría [adopción, tiempo hasta el insight, usuarios activos semanales].",
      },
    ],
    learnings: [
      {
        en: "[What you learned about designing for data-heavy, expert users.]",
        es: "[Qué aprendiste sobre diseñar para usuarios expertos con mucha carga de datos.]",
      },
    ],
  },

  "service-experience-design": {
    statement: {
      en: "Clarifying and aligning services across a growing organisation.",
      es: "Aclarar y alinear servicios en una organización en crecimiento.",
    },
    facts: {
      client: { en: "[Organisation]", es: "[Organización]" },
      role,
      team,
      timeline: { en: "[Duration], 2025", es: "[Duración], 2025" },
    },
    outcomes: [
      { value: { en: "[X]", es: "[X]" }, label: { en: "services mapped end to end", es: "servicios mapeados de principio a fin" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "teams aligned", es: "equipos alineados" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "[another result]", es: "[otro resultado]" } },
    ],
    challenge: [
      {
        en: "As the organisation grew, its services multiplied and overlapped. [What that looked like: teams describing the same service differently, confused clients, duplicated work.]",
        es: "Al crecer la organización, sus servicios se multiplicaron y se solaparon. [Cómo se notaba: equipos que describían el mismo servicio de forma distinta, clientes confundidos, trabajo duplicado.]",
      },
    ],
    decisions: [
      {
        title: { en: "Map every service end to end", es: "Mapear cada servicio de principio a fin" },
        body: {
          en: "[Service blueprints of what clients see and what happens behind it.]",
          es: "[Blueprints de servicio de lo que ve el cliente y lo que ocurre detrás.]",
        },
      },
      {
        title: { en: "Agree on one shared language", es: "Acordar un lenguaje común" },
        body: {
          en: "[Workshops with the teams to define and name each service.]",
          es: "[Talleres con los equipos para definir y nombrar cada servicio.]",
        },
      },
      {
        title: { en: "Design the target experience", es: "Diseñar la experiencia objetivo" },
        body: {
          en: "[The future journeys and the changes needed to get there.]",
          es: "[Los recorridos futuros y los cambios necesarios para llegar a ellos.]",
        },
      },
    ],
    gallery: [
      { caption: { en: "[Service map]", es: "[Mapa de servicios]" } },
      { caption: { en: "[Service blueprint]", es: "[Blueprint de servicio]" } },
    ],
    results: [
      {
        en: "[What changed: clearer offer, faster onboarding, fewer handoff problems, feedback from teams or clients.]",
        es: "[Qué cambió: una oferta más clara, onboarding más rápido, menos problemas de traspaso, feedback de equipos o clientes.]",
      },
    ],
    learnings: [
      {
        en: "[What you learned about aligning many teams around one service.]",
        es: "[Qué aprendiste sobre alinear a muchos equipos en torno a un servicio.]",
      },
    ],
  },

  "design-ops-strategy": {
    statement: {
      en: "Shaping how a design studio works, as an ongoing process.",
      es: "Dar forma a cómo trabaja un estudio de diseño, como un proceso continuo.",
    },
    facts: {
      client: { en: "[Design studio]", es: "[Estudio de diseño]" },
      role,
      team,
      timeline: { en: "Ongoing since 2025", es: "En curso desde 2025" },
    },
    outcomes: [
      { value: { en: "[X]", es: "[X]" }, label: { en: "[result, e.g. hours saved per project]", es: "[resultado, p. ej. horas ahorradas por proyecto]" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "[result]", es: "[resultado]" } },
    ],
    challenge: [
      {
        en: "[What wasn't working in the studio's dynamics: handoffs, rituals, tools, visibility of work.]",
        es: "[Qué no funcionaba en las dinámicas del estudio: traspasos, rituales, herramientas, visibilidad del trabajo.]",
      },
    ],
    decisions: [
      {
        title: { en: "Make the work visible", es: "Hacer visible el trabajo" },
        body: { en: "[How.]", es: "[Cómo.]" },
      },
      {
        title: { en: "Set shared rituals", es: "Establecer rituales comunes" },
        body: { en: "[Which ones and why.]", es: "[Cuáles y por qué.]" },
      },
      {
        title: { en: "Measure and iterate", es: "Medir e iterar" },
        body: { en: "[What you track and what changed.]", es: "[Qué mides y qué cambió.]" },
      },
    ],
    gallery: [{ caption: { en: "[Studio operating model]", es: "[Modelo operativo del estudio]" } }],
    results: [{ en: "[What has changed so far.]", es: "[Qué ha cambiado hasta ahora.]" }],
    learnings: [{ en: "[What you are learning along the way.]", es: "[Qué estás aprendiendo por el camino.]" }],
  },
}
