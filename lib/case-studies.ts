import type { Locale } from "./i18n"

type Localized = Record<Locale, string>

// Text in [square brackets] is a placeholder for facts only Tari can fill in: role, team, numbers, results.

// One solution image, two portrait images side by side (`pair`), a quote revealed word by word (one string per
// line; later lines muted), an animated scene built in code (components/case-study-scenes.tsx), or a live prototype.
// Quotes and scenes can go without a caption.
export type GalleryItem = {
  caption?: Localized
  // A link under the caption, e.g. to a full-screen prototype.
  link?: { href: string; label: Localized }
  // A live, coded prototype embedded in the page.
  embed?: "fleet-prototype"
  image?: string
  pair?: [string, string]
  quote?: Record<Locale, string[]>
  scene?: "principles"
}

export type CaseStudy = {
  // How every case opens: the decision I made, what it cost, and where the work stands today. When there is no
  // outcome data, the status says so plainly instead of showing counts.
  lead: { decision: Localized; tradeoff: Localized; status: Localized }
  facts: { client: Localized; role: Localized; team: Localized; date: Localized }
  challenge: Localized[]
  decisions: { title: Localized; body: Localized }[]
  // Optional text shown above the solution images.
  solution?: Localized[]
  // The solution images, in order; pictures go in /public/projects/<slug>/.
  gallery: GalleryItem[]
  results: Localized[]
  // Optional short wins shown as cards under the results text.
  resultHighlights?: Localized[]
  learnings: Localized[]
}


export const caseStudies: Record<string, CaseStudy> = {
  innohub: {
    lead: {
      decision: {
        en: "I designed participation around three employee archetypes and community maturity levels, instead of one idea box for everyone.",
        es: "Diseñé la participación en torno a tres arquetipos de empleado y niveles de madurez de la comunidad, en lugar de un único buzón de ideas para todos.",
      },
      tradeoff: { en: "More to set up and govern than a single platform.", es: "Más que configurar y gobernar que una única plataforma." },
      status: {
        en: "Handed over in June 2026 and in use by the client today; it's too early to share KPIs.",
        es: "Entregado en junio de 2026 y en uso por el cliente hoy; aún es pronto para compartir KPIs.",
      },
    },
    facts: {
      client: { en: "Leading Spanish insurer, 100+ years old", es: "Aseguradora española líder, con más de 100 años" },
      role: { en: "Product Designer", es: "Product Designer" },
      team: {
        en: "Growth strategy, design research, product design and visual design",
        es: "Estrategia de crecimiento, design research, diseño de producto y diseño visual",
      },
      date: { en: "March to June 2026", es: "De marzo a junio de 2026" },
    },
    challenge: [
      {
        en: "The corporate innovation team wanted to strengthen innovation as a shared capability across the organisation. They were already driving new initiatives and engaging employees, but embedding innovation practices beyond dedicated teams remained a key challenge. Ideas also needed stronger alignment with business needs, and more buy-in from stakeholders, to reach their full impact.",
        es: "El equipo de innovación corporativa quería reforzar la innovación como una capacidad compartida en toda la organización. Ya impulsaba nuevas iniciativas y movilizaba a los empleados, pero llevar las prácticas de innovación más allá de los equipos dedicados seguía siendo un reto clave. Además, las ideas necesitaban alinearse mejor con las necesidades del negocio y contar con más apoyo de los stakeholders para alcanzar todo su impacto.",
      },
      {
        en: "Generating ideas is only one part of the innovation journey. As organisations mature, the challenge shifts from collecting ideas to turning them into meaningful outcomes: ideas must align with business priorities, be validated with stakeholders and connect to clear paths to implementation.",
        es: "Generar ideas es solo una parte del camino de la innovación. A medida que las organizaciones maduran, el reto pasa de recoger ideas a convertirlas en resultados con sentido: las ideas tienen que alinearse con las prioridades del negocio, validarse con los stakeholders y conectar con caminos claros de implementación.",
      },
    ],
    decisions: [
      {
        title: { en: "Research both sides", es: "Investigar ambos lados" },
        body: {
          en: "Internal and external research shaped personas and journeys for employees and for external collaborators, finding the key moments where innovation could fit into their work.",
          es: "La investigación interna y externa dio forma a personas y journeys de empleados y colaboradores externos, identificando los momentos clave en los que la innovación podía encajar en su trabajo.",
        },
      },
      {
        title: { en: "Design the rules", es: "Diseñar las reglas" },
        body: {
          en: "Beyond the digital platforms, we defined the participation mechanisms and governance principles needed to keep ideas coming over time.",
          es: "Más allá de las plataformas digitales, definimos los mecanismos de participación y los principios de gobierno necesarios para mantener la generación de ideas en el tiempo.",
        },
      },
      {
        title: { en: "Tailor participation", es: "Adaptar la participación" },
        body: {
          en: "Three employee archetypes and community maturity levels let the experience meet people where they are, from first-time contributors to regulars.",
          es: "Tres arquetipos de empleado y niveles de madurez de la comunidad permitieron que la experiencia se adaptara a cada persona, desde quien participa por primera vez hasta quien lo hace siempre.",
        },
      },
      {
        title: { en: "Open up to partners", es: "Abrirse a partners" },
        body: {
          en: "An external collaboration experience connected talent, knowledge and strategic partners through clear roles and participation journeys.",
          es: "Una experiencia de colaboración externa conectó talento, conocimiento y partners estratégicos mediante roles claros y journeys de participación.",
        },
      },
      {
        title: { en: "Validate with the team", es: "Validar con el equipo" },
        body: {
          en: "Ideation and validation workshops let us test, refine and challenge ideas continuously, so every concept answered a real business need.",
          es: "Los workshops de ideación y validación nos permitieron probar, afinar y cuestionar las ideas de forma continua, para que cada concepto respondiera a una necesidad real del negocio.",
        },
      },
      {
        title: { en: "Speak their language", es: "Hablar su idioma" },
        body: {
          en: "Working closely with the innovation team kept the experience aligned with the organisation's own innovation language and culture.",
          es: "Trabajar de cerca con el equipo de innovación mantuvo la experiencia alineada con el lenguaje y la cultura de innovación propios de la organización.",
        },
      },
    ],
    solution: [
      {
        en: "We designed an innovation experience that empowers employees to contribute to the company's future: a shared innovation model, with the experience and platforms behind it, that lets ideas be generated and developed across business units and brands, plus a vision for an external ecosystem around them.",
        es: "Diseñamos una experiencia de innovación que permite a los empleados contribuir al futuro de la compañía: un modelo de innovación compartido, con la experiencia y las plataformas que lo sostienen, para generar y desarrollar ideas en todas las unidades de negocio y marcas, junto con la visión de un ecosistema externo a su alrededor.",
      },
    ],
    gallery: [
      {
        image: "/projects/innohub/workshops.jpg",
        caption: {
          en: "Ideation and validation workshops with the client's team: where ideas were tested, refined and challenged.",
          es: "Workshops de ideación y validación con el equipo del cliente: donde las ideas se probaban, afinaban y cuestionaban.",
        },
      },
      {
        image: "/projects/innohub/success-story.jpg",
        caption: {
          en: "One of the innovation lines explored with employees: ideas for families, across generations.",
          es: "Una de las líneas de innovación que exploramos con los empleados: ideas para las familias, de todas las generaciones.",
        },
      },
      {
        quote: {
          en: [
            "Innovation must become a shared capability across the business.",
            "From specialists to everyone, from isolated ideas to insight-led opportunities, from sporadic workshops to everyday practice.",
          ],
          es: [
            "La innovación tiene que ser una capacidad compartida en todo el negocio.",
            "De los especialistas a todos, de ideas aisladas a oportunidades basadas en insights, de talleres puntuales a la práctica diaria.",
          ],
        },
      },
    ],
    results: [
      {
        en: "Together, these initiatives gave the client a more structured and scalable innovation model, focused on driving business impact.",
        es: "En conjunto, estas iniciativas dieron al cliente un modelo de innovación más estructurado y escalable, centrado en generar impacto de negocio.",
      },
    ],
    resultHighlights: [
      {
        en: "A shared innovation model for every business unit and brand, with the experience and platforms to run it.",
        es: "Un modelo de innovación compartido para todas las unidades de negocio y marcas, con la experiencia y las plataformas para ponerlo en marcha.",
      },
      {
        en: "Three employee archetypes and community maturity levels to tailor participation.",
        es: "Tres arquetipos de empleado y niveles de madurez de la comunidad para adaptar la participación.",
      },
      {
        en: "A vision for an external ecosystem, with user profiles, journeys and a platform roadmap.",
        es: "La visión de un ecosistema externo, con perfiles de usuario, journeys y un roadmap de plataforma.",
      },
      {
        en: "Participation mechanisms and governance principles to sustain ideas over time.",
        es: "Mecanismos de participación y principios de gobierno para sostener las ideas en el tiempo.",
      },
      {
        en: "Concepts refined with the client's team and aligned with real business needs.",
        es: "Conceptos afinados con el equipo del cliente y alineados con necesidades reales del negocio.",
      },
    ],
    learnings: [
      {
        en: "The validation workshops were the most valuable part of the project. Testing, refining and challenging ideas with the team kept every concept tied to real business needs and built alignment around the opportunities with the greatest potential.",
        es: "Los workshops de validación fueron lo más valioso del proyecto. Probar, afinar y cuestionar las ideas con el equipo mantuvo cada concepto ligado a necesidades reales del negocio y generó alineación en torno a las oportunidades con más potencial.",
      },
      {
        en: "That open, iterative dialogue turned early thinking into stronger solutions, and made innovation a truly collaborative effort.",
        es: "Ese diálogo abierto e iterativo convirtió las primeras ideas en soluciones más sólidas, e hizo de la innovación un esfuerzo verdaderamente colaborativo.",
      },
    ],
  },

  "fleet-connect": {
    lead: {
      decision: {
        en: "I kept all 100+ indicators and split them into two priority tiers.",
        es: "Mantuve los más de 100 indicadores y los dividí en dos niveles de prioridad.",
      },
      tradeoff: {
        en: "Experts kept every number they relied on, but the full view stayed longer than a simple overview.",
        es: "Los expertos conservaron cada dato en el que confiaban, pero la vista completa quedó más larga que un resumen sencillo.",
      },
      status: {
        en: "Six prototypes handed over to the client; I don't know whether they reached production.",
        es: "Seis prototipos entregados al cliente; no sé si llegaron a producción.",
      },
    },
    facts: {
      client: { en: "Fleet management company", es: "Empresa de gestión de flotas" },
      role: { en: "Product Designer", es: "Product Designer" },
      team: {
        en: "Senior Manager, Strategy Consultant and Product Designer",
        es: "Senior Manager, Consultora de Estrategia y Product Designer",
      },
      date: { en: "February 2026", es: "Febrero de 2026" },
    },
    challenge: [
      {
        en: "The company's deep expertise in mobility and access to extensive operational data should have enabled clients to manage their fleets with confidence. However, as the volume and complexity of information grew, Fleet Connect dashboards became increasingly difficult to navigate, often perceived as a \"sea of numbers\" rather than a tool for decision-making.",
        es: "La experiencia de la empresa en movilidad y su acceso a una gran cantidad de datos operativos deberían haber permitido a sus clientes gestionar sus flotas con confianza. Sin embargo, a medida que crecían el volumen y la complejidad de la información, los dashboards de Fleet Connect se volvieron cada vez más difíciles de navegar, y a menudo se percibían como un \"mar de números\" en lugar de una herramienta para tomar decisiones.",
      },
      {
        en: "At the heart of the challenge was information overload. Users were presented with hundreds of metrics and indicators, making it difficult to identify priorities, understand performance and act with confidence. The problem was not a lack of data, but the inability to distinguish what truly mattered.",
        es: "En el centro del reto estaba la sobrecarga de información. Los usuarios veían cientos de métricas e indicadores, lo que dificultaba identificar prioridades, entender el rendimiento y actuar con confianza. El problema no era la falta de datos, sino la incapacidad de distinguir lo que de verdad importaba.",
      },
    ],
    decisions: [
      {
        title: { en: "Listen to users", es: "Escuchar a usuarios" },
        body: {
          en: "Qualitative conversations with internal stakeholders showed how different teams used the dashboards, where friction emerged and how insights fed day-to-day operations.",
          es: "Conversaciones cualitativas con stakeholders internos mostraron cómo usaban los dashboards los distintos equipos, dónde surgía la fricción y cómo se aplicaban los insights en el día a día.",
        },
      },
      {
        title: { en: "Learn from the best", es: "Aprender de los mejores" },
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
      {
        embed: "fleet-prototype",
        caption: {
          en: "Built in Claude Code, with sample data. The dashboard system comes from my Figma prototypes; the filter interactions are in code, because the states mattered more than the layout.",
          es: "Construido con Claude Code, con datos de ejemplo. El sistema del dashboard viene de mis prototipos en Figma; las interacciones de los filtros están en código, porque los estados importaban más que el layout.",
        },
        link: {
          href: "/work/fleet-connect/prototype",
          label: { en: "Open the prototype full screen", es: "Abrir el prototipo a pantalla completa" },
        },
      },
      {
        image: "/projects/fleet-connect/savings-2x.png",
        caption: {
          en: "Savings first: one headline number, with the levers behind it a filter away.",
          es: "Primero el ahorro: una cifra principal y, a un filtro, las palancas que la explican.",
        },
      },
      {
        image: "/projects/fleet-connect/fleet-status-2x.png",
        caption: {
          en: "Fleet status at a glance: connected and disconnected vehicles in a single bar.",
          es: "El estado de la flota de un vistazo: vehículos conectados y desconectados en una sola barra.",
        },
      },
    ],
    results: [
      {
        en: "The project delivered six high-fidelity dashboard prototypes that showed how complex mobility and operational data could become clear, actionable insights for both clients and internal teams. We also mapped and prioritised over 100 performance indicators, creating a scalable foundation for the evolution of Fleet Connect.",
        es: "El proyecto entregó seis prototipos de dashboard de alta fidelidad que mostraban cómo datos complejos de movilidad y operaciones podían convertirse en insights claros y accionables, tanto para clientes como para equipos internos. También mapeamos y priorizamos más de 100 indicadores de rendimiento, creando una base escalable para la evolución de Fleet Connect.",
      },
      {
        en: "Beyond the dashboards, the work defined six strategic internal use cases showing how connected data could unlock value across the organisation. Sharing the vision and recommendations with stakeholders set a clear direction for a more connected, intuitive and insight-driven ecosystem, and a foundation for future development within Fleet Connect.",
        es: "Más allá de los dashboards, el trabajo definió seis casos de uso internos estratégicos que mostraban cómo los datos conectados podían generar valor en toda la organización. Compartir la visión y las recomendaciones con los stakeholders marcó una dirección clara hacia un ecosistema más conectado, intuitivo y basado en insights, y una base para el desarrollo futuro de Fleet Connect.",
      },
    ],
    learnings: [
      {
        en: "This was one of my first projects prototyping with AI. I built the dashboards in Figma Make, which let us explore and test layouts far faster than designing every screen by hand.",
        es: "Fue uno de mis primeros proyectos prototipando con IA. Construí los dashboards en Figma Make, lo que nos permitió explorar y probar layouts mucho más rápido que diseñando cada pantalla a mano.",
      },
      {
        en: "It's also where I learned that AI doesn't keep consistency on its own. Each new generation drifted in components, spacing and how numbers were shown, so I had to set the rules first and check every output against them. AI speeds up the making; the system and the judgement still come from the designer.",
        es: "También fue donde aprendí que la IA no mantiene la consistencia por sí sola. Cada nueva generación se desviaba en componentes, espaciados y en cómo se mostraban los números, así que tuve que definir las reglas primero y revisar cada resultado con ellas. La IA acelera la ejecución; el sistema y el criterio siguen viniendo del diseñador.",
      },
    ],
  },
  "service-experience-design": {
    lead: {
      decision: {
        en: "I mapped every service end to end before touching the website.",
        es: "Mapeé cada servicio de principio a fin antes de tocar la web.",
      },
      tradeoff: { en: "Months of mapping before anything visible shipped.", es: "Meses de mapeo antes de que se publicara nada visible." },
      status: {
        en: "The redesigned website launched; I can't confirm how the new services are selling.",
        es: "La web rediseñada se lanzó; no puedo confirmar cómo se están vendiendo los nuevos servicios.",
      },
    },
    facts: {
      client: { en: "Growing organisation, B2B and B2C", es: "Organización en crecimiento, B2B y B2C" },
      role: { en: "Strategic Service Designer", es: "Strategic Service Designer" },
      team: {
        en: "Solo, working with the talent and sales teams",
        es: "En solitario, junto a los equipos de talento y ventas",
      },
      date: { en: "January to June 2025", es: "De enero a junio de 2025" },
    },
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
      {
        scene: "principles",
        caption: {
          en: "Four ideas guided the work: coherence, structure, clarity and alignment.",
          es: "Cuatro ideas guiaron el trabajo: coherencia, estructura, claridad y alineación.",
        },
      },
      {
        pair: ["/projects/service-experience-design/services-phone.jpg", "/projects/service-experience-design/service-tiers-crop.png"],
        caption: {
          en: "Each service gets one clear way in, with simple tiers behind it.",
          es: "Cada servicio tiene una entrada clara, con niveles sencillos detrás.",
        },
      },
      {
        quote: {
          en: ["Clearer services and better experiences,", "designed from the inside out."],
          es: ["Servicios más claros y mejores experiencias,", "diseñados de dentro hacia fuera."],
        },
      },
    ],
    results: [
      {
        en: "The work progressed to a formal rollout, with a redesigned website that presents the services clearly.",
        es: "El trabajo llegó a un despliegue formal, con una web rediseñada que presenta los servicios con claridad.",
      },
    ],
    resultHighlights: [
      {
        en: "Launched a redesigned website that makes the services clear from the first view.",
        es: "Lanzamos una web rediseñada que deja claros los servicios desde la primera vista.",
      },
      {
        en: "Shaped the two core services.",
        es: "Dimos forma a los dos servicios principales.",
      },
      {
        en: "Mapped how sales first meets clients and hands them on, linking commercial work to the service.",
        es: "Mapeamos cómo ventas conoce a los clientes y los traspasa, conectando el trabajo comercial con el servicio.",
      },
      {
        en: "Gave a structured view of services and journeys that had never been documented.",
        es: "Ofrecimos una visión estructurada de servicios y recorridos que nunca se habían documentado.",
      },
      {
        en: "Mapped the journeys for a community the firm planned to launch, ready for when it moves forward.",
        es: "Mapeamos los recorridos de una comunidad que la firma quería lanzar, listos para cuando avance.",
      },
    ],
    learnings: [
      {
        en: "This is where I learned how service design really works: how a business runs, how clients come in, and how a service comes to life behind every screen.",
        es: "Aquí aprendí cómo funciona de verdad el diseño de servicios: cómo opera un negocio, cómo llegan los clientes y cómo cobra vida un servicio detrás de cada pantalla.",
      },
    ],
  },

  "design-ops-strategy": {
    lead: {
      decision: {
        en: "I added a briefing step and shared complexity levels before work reached designers.",
        es: "Añadí un paso de briefing y niveles de complejidad compartidos antes de que el trabajo llegara a los diseñadores.",
      },
      tradeoff: { en: "One more step at intake for every request.", es: "Un paso más en la entrada de cada petición." },
      status: {
        en: "Framework handed over in December 2025. The team has since added dedicated project managers; I can't confirm it runs on my framework.",
        es: "Marco entregado en diciembre de 2025. Desde entonces el equipo ha incorporado project managers dedicados; no puedo confirmar que funcione con mi marco.",
      },
    },
    facts: {
      client: { en: "Multidisciplinary organisation", es: "Organización multidisciplinar" },
      role: { en: "Design Program Manager", es: "Design Program Manager" },
      team: {
        en: "A team of 25, working closely with the Director of Operations",
        es: "Un equipo de 25, junto a la dirección de operaciones",
      },
      date: { en: "September to December 2025", es: "De septiembre a diciembre de 2025" },
    },
    challenge: [
      {
        en: "Organisations running many client projects in parallel share a common problem: work arrives with varying levels of clarity. Requests may lack defined priorities, clear timelines or complete briefings, creating friction in client relationships and internal workflows. This multidisciplinary team dealt with high ambiguity and constant demand.",
        es: "Las organizaciones que llevan muchos proyectos de cliente en paralelo comparten un problema: el trabajo llega con niveles de claridad muy distintos. Las peticiones pueden no tener prioridades definidas, plazos claros ni briefings completos, lo que genera fricción con los clientes y en los flujos internos. Este equipo multidisciplinar convivía con mucha ambigüedad y una demanda constante.",
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
      {
        pair: ["/projects/design-ops-strategy/intake-flow.png", "/projects/design-ops-strategy/artefacts.png"],
        caption: {
          en: "The intake flow, from a client's request to a designer starting work, and the artefacts that support it.",
          es: "El flujo de entrada, desde la petición del cliente hasta que un diseñador empieza a trabajar, y los artefactos que lo sostienen.",
        },
      },
      {
        quote: {
          en: [
            "The first priority is always to stabilise delivery and protect the team.",
            "In parallel, I observe how work actually happens to design structures that reduce friction over time.",
          ],
          es: [
            "La primera prioridad siempre es estabilizar la entrega y proteger al equipo.",
            "En paralelo, observo cómo sucede de verdad el trabajo para diseñar estructuras que reduzcan la fricción con el tiempo.",
          ],
        },
      },
    ],
    results: [
      {
        en: "The work gave the team a clearer way to receive, scope and manage projects. The organisation has since moved in the same direction, with dedicated project managers and a defined structure.",
        es: "El trabajo dio al equipo una forma más clara de recibir, dimensionar y gestionar proyectos. Desde entonces, la organización ha avanzado en la misma dirección, con project managers dedicados y una estructura definida.",
      },
    ],
    resultHighlights: [
      { en: "Projects began with clearer alignment and less ambiguity.", es: "Los proyectos empezaban con más alineación y menos ambigüedad." },
      { en: "The client accounts I owned stayed stable and under control.", es: "Las cuentas de cliente que llevaba se mantuvieron estables y bajo control." },
      { en: "Scope and effort discussions gained a shared reference framework.", es: "Las conversaciones sobre alcance y esfuerzo ganaron un marco de referencia común." },
      { en: "Organisational bottlenecks were surfaced and made explicit.", es: "Los cuellos de botella de la organización se hicieron visibles y explícitos." },
      { en: "Cultural practices were recognised as strategic assets.", es: "Las prácticas culturales se reconocieron como activos estratégicos." },
    ],
    learnings: [
      {
        en: "Strategic design can work beyond deliverables, shaping how organisations function, communicate and grow in contexts of uncertainty.",
        es: "El diseño estratégico puede ir más allá de los entregables y dar forma a cómo las organizaciones funcionan, se comunican y crecen en contextos de incertidumbre.",
      },
    ],
  },
}
