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
  // Optional text shown above the solution images.
  solution?: Localized[]
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
      en: "Turning a sea of numbers into a decision-support tool for fleet managers.",
      es: "Convertir un mar de números en una herramienta de apoyo a la decisión para gestores de flotas.",
    },
    facts: {
      client: { en: "Arval, Arval Connect", es: "Arval, Arval Connect" },
      role,
      team,
      timeline: { en: "[Duration], 2026", es: "[Duración], 2026" },
    },
    outcomes: [
      {
        value: { en: "6", es: "6" },
        label: { en: "high-fidelity dashboard prototypes", es: "prototipos de dashboard de alta fidelidad" },
      },
      {
        value: { en: "100+", es: "100+" },
        label: { en: "performance indicators mapped and prioritised", es: "indicadores de rendimiento mapeados y priorizados" },
      },
      {
        value: { en: "6", es: "6" },
        label: { en: "strategic internal use cases defined", es: "casos de uso internos estratégicos definidos" },
      },
    ],
    challenge: [
      {
        en: "Arval's deep expertise in mobility and access to extensive operational data should have enabled clients to manage their fleets with confidence. However, as the volume and complexity of information grew, Arval Connect dashboards became increasingly difficult to navigate, often perceived as a \"sea of numbers\" rather than a tool for decision-making.",
        es: "La experiencia de Arval en movilidad y su acceso a una gran cantidad de datos operativos deberían haber permitido a sus clientes gestionar sus flotas con confianza. Sin embargo, a medida que crecían el volumen y la complejidad de la información, los dashboards de Arval Connect se volvieron cada vez más difíciles de navegar, y a menudo se percibían como un \"mar de números\" en lugar de una herramienta para tomar decisiones.",
      },
      {
        en: "At the heart of the challenge was information overload. Users were presented with hundreds of metrics and indicators, making it difficult to identify priorities, understand performance and act with confidence. The problem was not a lack of data, but the inability to distinguish what truly mattered.",
        es: "En el centro del reto estaba la sobrecarga de información. Los usuarios veían cientos de métricas e indicadores, lo que dificultaba identificar prioridades, entender el rendimiento y actuar con confianza. El problema no era la falta de datos, sino la incapacidad de distinguir lo que de verdad importaba.",
      },
    ],
    decisions: [
      {
        title: { en: "Listen to the people using it", es: "Escuchar a quienes lo usan" },
        body: {
          en: "Qualitative conversations with internal stakeholders showed how different teams used the dashboards, where friction emerged and how insights fed day-to-day operations.",
          es: "Conversaciones cualitativas con stakeholders internos mostraron cómo usaban los dashboards los distintos equipos, dónde surgía la fricción y cómo se aplicaban los insights en el día a día.",
        },
      },
      {
        title: { en: "Learn from data-heavy products", es: "Aprender de productos con muchos datos" },
        body: {
          en: "A benchmark of leading products in mobility, logistics and other data-intensive industries showed how the best platforms surface critical signals instead of adding more information.",
          es: "Un benchmark de productos líderes en movilidad, logística y otros sectores intensivos en datos mostró cómo las mejores plataformas destacan las señales críticas en lugar de añadir más información.",
        },
      },
      {
        title: { en: "Prioritise, don't remove", es: "Priorizar, no eliminar" },
        body: {
          en: "Instead of removing data, we kept the full set and defined two levels of prioritisation, so users focus first on the metrics with the greatest operational impact.",
          es: "En lugar de eliminar datos, mantuvimos el conjunto completo y definimos dos niveles de priorización, para que los usuarios se centren primero en las métricas con mayor impacto operativo.",
        },
      },
    ],
    solution: [
      {
        en: "This reframing turned the dashboard from a reporting tool into a decision-support system, designed around clarity, actionability and business value.",
        es: "Este cambio de enfoque transformó el dashboard de una herramienta de reporting en un sistema de apoyo a la decisión, diseñado en torno a la claridad, la accionabilidad y el valor de negocio.",
      },
    ],
    gallery: [
      { caption: { en: "[Dashboard overview]", es: "[Vista general del dashboard]" } },
      { caption: { en: "[Two levels of prioritisation]", es: "[Dos niveles de priorización]" } },
      { caption: { en: "[Metric detail view]", es: "[Vista de detalle de una métrica]" } },
    ],
    results: [
      {
        en: "The project delivered six high-fidelity dashboard prototypes that showed how complex mobility and operational data could become clear, actionable insights for both clients and internal teams. We also mapped and prioritised over 100 performance indicators, creating a scalable foundation for the evolution of Arval Connect.",
        es: "El proyecto entregó seis prototipos de dashboard de alta fidelidad que mostraban cómo datos complejos de movilidad y operaciones podían convertirse en insights claros y accionables, tanto para clientes como para equipos internos. También mapeamos y priorizamos más de 100 indicadores de rendimiento, creando una base escalable para la evolución de Arval Connect.",
      },
      {
        en: "Beyond the dashboards, the work defined six strategic internal use cases showing how connected data could unlock value across the organisation. Sharing the vision and recommendations with stakeholders set a clear direction for a more connected, intuitive and insight-driven ecosystem, and a foundation for future development within Arval Connect.",
        es: "Más allá de los dashboards, el trabajo definió seis casos de uso internos estratégicos que mostraban cómo los datos conectados podían generar valor en toda la organización. Compartir la visión y las recomendaciones con los stakeholders marcó una dirección clara hacia un ecosistema más conectado, intuitivo y basado en insights, y una base para el desarrollo futuro de Arval Connect.",
      },
    ],
    learnings: [
      {
        en: "[What you learned about designing for data-heavy, expert users, and what you would measure if the dashboards shipped.]",
        es: "[Qué aprendiste sobre diseñar para usuarios expertos con mucha carga de datos, y qué medirías si los dashboards se lanzaran.]",
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
