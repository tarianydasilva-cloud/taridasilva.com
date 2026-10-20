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
  // Optional short wins shown as cards under the results text.
  resultHighlights?: Localized[]
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
      en: "Bringing coherence to services that had grown organically, for customers and employees alike.",
      es: "Dar coherencia a unos servicios que habían crecido de forma orgánica, para clientes y empleados por igual.",
    },
    facts: {
      client: { en: "Growing organisation, B2B and B2C", es: "Organización en crecimiento, B2B y B2C" },
      role,
      team,
      timeline: { en: "[Duration], 2025", es: "[Duración], 2025" },
    },
    outcomes: [
      { value: { en: "[X]", es: "[X]" }, label: { en: "services mapped end to end", es: "servicios mapeados de principio a fin" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "journey maps created", es: "journey maps creados" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "teams involved", es: "equipos implicados" } },
    ],
    challenge: [
      {
        en: "The organisation worked across multiple services and touchpoints, serving both B2B and B2C audiences. Its offering, services and supporting processes had evolved organically over time, which led to fragmented experiences, duplicated effort and misalignment between customer needs, internal operations and communication.",
        es: "La organización trabajaba con múltiples servicios y puntos de contacto, para públicos B2B y B2C. Su oferta, sus servicios y sus procesos habían evolucionado de forma orgánica con el tiempo, lo que provocó experiencias fragmentadas, esfuerzo duplicado y falta de alineación entre las necesidades de los clientes, las operaciones internas y la comunicación.",
      },
      {
        en: "The core challenge was misalignment: services were not always structured around real user needs, internal processes were inconsistently documented, and communication varied across channels and teams. The goal was to understand how services were really experienced end to end, and to bring greater coherence to processes, communication and delivery.",
        es: "El reto principal era la falta de alineación: los servicios no siempre se estructuraban en torno a necesidades reales, los procesos internos estaban documentados de forma desigual y la comunicación variaba entre canales y equipos. El objetivo era entender cómo se vivían de verdad los servicios de principio a fin y dar más coherencia a los procesos, la comunicación y la entrega.",
      },
    ],
    decisions: [
      {
        title: { en: "Map services and experiences", es: "Mapear servicios y experiencias" },
        body: {
          en: "Journey maps made customer and employee experiences visible across key services, so pain points, inefficiencies and moments of friction were shared by every stakeholder.",
          es: "Los journey maps hicieron visibles las experiencias de clientes y empleados en los servicios clave, para que todos los stakeholders compartieran los puntos de dolor, las ineficiencias y los momentos de fricción.",
        },
      },
      {
        title: { en: "Redesign services and processes", es: "Rediseñar servicios y procesos" },
        body: {
          en: "Existing services and internal workflows were reviewed and restructured to align with user needs and business objectives, improving clarity, efficiency and consistency.",
          es: "Los servicios existentes y los flujos internos se revisaron y reestructuraron para alinearlos con las necesidades de los usuarios y los objetivos de negocio, mejorando la claridad, la eficiencia y la coherencia.",
        },
      },
      {
        title: { en: "Streamline and document processes", es: "Simplificar y documentar procesos" },
        body: {
          en: "Business processes were documented and simplified to reduce ambiguity, support smoother collaboration and give teams a clearer operational baseline.",
          es: "Los procesos de negocio se documentaron y simplificaron para reducir la ambigüedad, facilitar la colaboración y dar a los equipos una base operativa más clara.",
        },
      },
      {
        title: { en: "Align communication and visuals", es: "Alinear la comunicación y lo visual" },
        body: {
          en: "Visual and written materials were developed so services were clearly and consistently articulated across internal and external channels.",
          es: "Se desarrollaron materiales visuales y escritos para que los servicios se explicaran de forma clara y coherente en los canales internos y externos.",
        },
      },
      {
        title: { en: "Work across teams", es: "Trabajar entre equipos" },
        body: {
          en: "The work was carried out with multiple teams to build shared understanding, consistent messaging and alignment between service intent and execution.",
          es: "El trabajo se hizo junto a varios equipos para construir una comprensión compartida, un mensaje coherente y alineación entre la intención del servicio y su ejecución.",
        },
      },
      {
        title: { en: "Monitor and evolve", es: "Medir y evolucionar" },
        body: {
          en: "Services and communication strategies were treated as evolving systems, monitored and adapted over time to improve engagement, relevance and satisfaction.",
          es: "Los servicios y las estrategias de comunicación se trataron como sistemas vivos, medidos y adaptados con el tiempo para mejorar la participación, la relevancia y la satisfacción.",
        },
      },
    ],
    solution: [
      {
        en: "Rather than fixing isolated touchpoints or delivering a single fixed solution, the work looked at services as a whole and built shared understanding and structures that enable ongoing improvement.",
        es: "En lugar de arreglar puntos de contacto aislados o entregar una única solución cerrada, el trabajo miró los servicios en su conjunto y construyó una comprensión compartida y estructuras que permiten mejorar de forma continua.",
      },
    ],
    gallery: [
      { caption: { en: "[Journey map]", es: "[Journey map]" } },
      { caption: { en: "[Service blueprint]", es: "[Blueprint de servicio]" } },
      { caption: { en: "[Redesigned services website]", es: "[Web de servicios rediseñada]" } },
    ],
    results: [
      {
        en: "Due to organisational constraints and shifting priorities, the work did not progress to a formal rollout. It worked instead as an exploratory and diagnostic effort: elements were shared and reviewed with team members, helping validate assumptions and refine thinking about service structure, customer needs and internal processes.",
        es: "Por restricciones de la organización y cambios de prioridades, el trabajo no llegó a un despliegue formal. Funcionó como un esfuerzo exploratorio y de diagnóstico: partes del trabajo se compartieron y revisaron con el equipo, lo que ayudó a validar hipótesis y afinar la estructura de los servicios, las necesidades de los clientes y los procesos internos.",
      },
    ],
    resultHighlights: [
      { en: "Surfaced misalignments between services, communication and internal operations.", es: "Hizo visibles los desajustes entre servicios, comunicación y operaciones internas." },
      { en: "Gave a structured view of services and journeys that had never been documented.", es: "Ofreció una visión estructurada de servicios y recorridos que nunca se habían documentado." },
      { en: "Created references that can be reused or expanded when the organisation is ready.", es: "Creó referencias que pueden reutilizarse o ampliarse cuando la organización esté preparada." },
      { en: "Strengthened cross-team dialogue about consistency, efficiency and experience quality.", es: "Reforzó el diálogo entre equipos sobre coherencia, eficiencia y calidad de la experiencia." },
      { en: "Led to a redesign of the main website, simplifying the first view of the services.", es: "Llevó al rediseño de la web principal, simplificando la primera visión de los servicios." },
    ],
    learnings: [
      {
        en: "While the initiative remained exploratory, it laid the groundwork and showed how service design tools can support clearer decisions and future improvements. [What you would do differently to get it adopted.]",
        es: "Aunque la iniciativa quedó en fase exploratoria, sentó las bases y demostró cómo las herramientas de diseño de servicios pueden apoyar decisiones más claras y mejoras futuras. [Qué harías diferente para conseguir que se adoptara.]",
      },
    ],
  },

  "design-ops-strategy": {
    statement: {
      en: "Bringing structure to how a creative studio receives, scopes and manages work under constant ambiguity.",
      es: "Dar estructura a cómo un estudio creativo recibe, dimensiona y gestiona el trabajo en un contexto de ambigüedad constante.",
    },
    facts: {
      client: { en: "Multidisciplinary creative studio", es: "Estudio creativo multidisciplinar" },
      role,
      team,
      timeline: { en: "[Duration], 2025", es: "[Duración], 2025" },
    },
    outcomes: [
      { value: { en: "[X]", es: "[X]" }, label: { en: "levels of project complexity defined", es: "niveles de complejidad de proyecto definidos" } },
      { value: { en: "[X]", es: "[X]" }, label: { en: "[another result, e.g. projects run with the new briefing]", es: "[otro resultado, p. ej. proyectos con el nuevo briefing]" } },
    ],
    challenge: [
      {
        en: "Creative organisations running many projects in parallel share a common problem: work arrives with varying levels of clarity. Requests may lack defined priorities, clear timelines or complete briefings, creating friction in client relationships and internal workflows. This multidisciplinary studio dealt with high ambiguity and constant demand.",
        es: "Las organizaciones creativas que llevan muchos proyectos en paralelo comparten un problema: el trabajo llega con niveles de claridad muy distintos. Las peticiones pueden no tener prioridades definidas, plazos claros ni briefings completos, lo que genera fricción con los clientes y en los flujos internos. Este estudio multidisciplinar convivía con mucha ambigüedad y una demanda constante.",
      },
      {
        en: "At the core was ambiguity: unclear requests, misaligned expectations, emotionally charged interactions with clients, and internal bottlenecks caused by centralised information flow. The goal was to bring structure to how requests were received, understood and managed, while balancing client expectations, team capacity and an evolving vision.",
        es: "En el centro estaba la ambigüedad: peticiones poco claras, expectativas desalineadas, interacciones con clientes cargadas emocionalmente y cuellos de botella internos causados por un flujo de información centralizado. El objetivo era dar estructura a cómo se recibían, entendían y gestionaban las peticiones, equilibrando las expectativas de los clientes, la capacidad del equipo y una visión en evolución.",
      },
    ],
    decisions: [
      {
        title: { en: "Structure incoming requests", es: "Estructurar las peticiones" },
        body: {
          en: "Raw client demands were translated into clear, actionable briefings before reaching the team, enabling realistic effort estimates and early alignment.",
          es: "Las demandas de los clientes se convertían en briefings claros y accionables antes de llegar al equipo, lo que permitía estimar el esfuerzo de forma realista y alinearse pronto.",
        },
      },
      {
        title: { en: "Stabilise client communication", es: "Estabilizar la comunicación con clientes" },
        body: {
          en: "Interactions were reframed towards calm, fact-based responses, avoiding confrontation and setting a minimum line of professional respect.",
          es: "Las interacciones se reorientaron hacia respuestas serenas y basadas en hechos, evitando la confrontación y estableciendo un mínimo de respeto profesional.",
        },
      },
      {
        title: { en: "Introduce project dimensioning", es: "Introducir el dimensionamiento de proyectos" },
        body: {
          en: "A shared language for levels of complexity and effort made conversations about scope and timelines more realistic.",
          es: "Un lenguaje común para los niveles de complejidad y esfuerzo hizo más realistas las conversaciones sobre alcance y plazos.",
        },
      },
      {
        title: { en: "Rethink the structure", es: "Repensar la estructura" },
        body: {
          en: "We explored a more distributed and sustainable setup, identifying where centralised coordination created bottlenecks and how shared systems could enable autonomy.",
          es: "Exploramos una organización más distribuida y sostenible, identificando dónde la coordinación centralizada creaba cuellos de botella y cómo los sistemas compartidos podían dar autonomía.",
        },
      },
      {
        title: { en: "Treat culture as infrastructure", es: "Tratar la cultura como infraestructura" },
        body: {
          en: "Team rituals and informal practices were recognised as key to cohesion, trust and long-term sustainability.",
          es: "Los rituales del equipo y las prácticas informales se reconocieron como clave para la cohesión, la confianza y la sostenibilidad a largo plazo.",
        },
      },
    ],
    solution: [
      {
        en: "Rather than implementing a closed or final system, the focus was on setting a direction and creating the conditions for clearer decisions under uncertainty.",
        es: "En lugar de implantar un sistema cerrado o definitivo, el foco estuvo en marcar una dirección y crear las condiciones para tomar decisiones más claras en la incertidumbre.",
      },
    ],
    gallery: [
      { caption: { en: "[Briefing structure]", es: "[Estructura del briefing]" } },
      { caption: { en: "[Project dimensioning levels]", es: "[Niveles de dimensionamiento de proyectos]" } },
    ],
    results: [
      {
        en: "Although the work did not become a fully implemented operational framework, it led to meaningful shifts in how the studio works.",
        es: "Aunque el trabajo no llegó a ser un marco operativo totalmente implantado, provocó cambios significativos en cómo trabaja el estudio.",
      },
    ],
    resultHighlights: [
      { en: "Projects began with clearer alignment and less ambiguity.", es: "Los proyectos empezaban con más alineación y menos ambigüedad." },
      { en: "Client interactions became more stable and predictable.", es: "Las interacciones con clientes se volvieron más estables y predecibles." },
      { en: "Scope and effort discussions gained a shared reference framework.", es: "Las conversaciones sobre alcance y esfuerzo ganaron un marco de referencia común." },
      { en: "Organisational bottlenecks were surfaced and made explicit.", es: "Los cuellos de botella de la organización se hicieron visibles y explícitos." },
      { en: "Cultural practices were recognised as strategic assets.", es: "Las prácticas culturales se reconocieron como activos estratégicos." },
    ],
    learnings: [
      {
        en: "Strategic design can work beyond deliverables, shaping how creative organisations function, communicate and grow in contexts of uncertainty.",
        es: "El diseño estratégico puede ir más allá de los entregables y dar forma a cómo las organizaciones creativas funcionan, se comunican y crecen en contextos de incertidumbre.",
      },
    ],
  },
}
