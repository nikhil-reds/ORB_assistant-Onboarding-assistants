// ============================================================
//  Future City Telangana — single source of truth (knowledge base)
//  Everything the voice assistant is allowed to know and say lives
//  in THIS file. The assistant must not use any information that is
//  not contained below.
//  Source: https://futurecitytg.in
// ============================================================

export type SitePage = {
  slug: string; // "/about"
  title: string;
  summary: string; // 1–2 sentences
  keywords: string[]; // helps retrieval & guides the model
  content: string; // full text the model can quote
};

export type FAQ = { q: string; a: string };

// ------------------------------------------------------------
//  The assistant persona (name + how she opens the conversation)
// ------------------------------------------------------------
export const assistant = {
  name: "Tara",
  // Tara speaks this FIRST, before the user says anything.
  openingStatement:
    "Hello, and welcome to Future City Telangana — India's first Net-Zero Greenfield Smart City. I'm Tara, your guide. I can tell you about the project, its location, sustainability, investment opportunities, and more. What would you like to know?",
};

// ------------------------------------------------------------
//  Company / project
// ------------------------------------------------------------
export const company = {
  name: "Future City Telangana",
  tagline: "India's first Net-Zero Greenfield Smart City",
  location:
    "Between the Srisailam and Nagarjunasagar highways, spanning seven mandals in Telangana, India",
  developer:
    "Future City Development Authority (FCDA), under the Telangana State Government",
  contact: {
    website: "https://futurecitytg.in",
    enquiry:
      "Use the enquiry form on the Contact Us page of the website (fields: name, email, subject, message).",
    social: {
      instagram: "@futurecitytg",
      facebook: "Futurecitytg",
      x: "@Futurecitytg",
    },
  },
};

// ------------------------------------------------------------
//  Page index — the structured knowledge the model may quote
// ------------------------------------------------------------
export const pageIndex: SitePage[] = [
  {
    slug: "/",
    title: "Overview",
    summary:
      "Future City Telangana is India's first Net-Zero Greenfield Smart City — an integrated, sustainable city spanning 30,000 acres.",
    keywords: [
      "future city",
      "telangana",
      "net zero",
      "smart city",
      "greenfield",
      "overview",
      "what is",
      "30000 acres",
    ],
    content: `Future City Telangana (also called the Fourth City) is India's first Net-Zero Greenfield Smart City. It is an integrated smart city spanning 30,000 acres, designed to achieve zero carbon emissions, energy neutrality, and sustainable waste management. The city is organised into separate residential, commercial, industrial, recreational, and green zones, and serves as a hub for industries, research institutions, residential communities, and public services with a strong focus on environmental sustainability.`,
  },
  {
    slug: "/about",
    title: "About & Vision",
    summary:
      "A Net-Zero Greenfield city built from scratch on undeveloped land, managed by the Future City Development Authority (FCDA).",
    keywords: [
      "about",
      "vision",
      "net zero",
      "greenfield",
      "fcda",
      "telangana government",
      "carbon emissions",
      "developer",
      "who is building",
    ],
    content: `A "Net-Zero Greenfield City" is a city designed and developed from scratch on previously undeveloped land, with the primary objective of achieving zero carbon emissions. Future City Telangana integrates renewable energy systems, efficient waste and water management, and sustainable infrastructure so the city's carbon footprint is minimized — balancing the energy it consumes with what it produces. The planning, development, and management is handled by the Future City Development Authority (FCDA), under the guidance of the Telangana State Government.`,
  },
  {
    slug: "/location",
    title: "Location & Connectivity",
    summary:
      "Located between the Srisailam and Nagarjunasagar highways across seven mandals, with strong highway, ring-road and future metro connectivity.",
    keywords: [
      "location",
      "where",
      "connectivity",
      "srisailam",
      "nagarjunasagar",
      "orr",
      "rrr",
      "metro",
      "pharma city",
      "highway",
    ],
    content: `Future City Telangana is strategically located between the Srisailam and Nagarjunasagar highways, spanning across seven mandals in Telangana, in the heart of the state's upcoming development zone. It is near Hyderabad Pharma City. Connectivity is provided through major highways including the Outer Ring Road (ORR) and the Regional Ring Road (RRR), with planned metro rail extensions, greenfield corridors, smart roads, pedestrian pathways, and cycling tracks.`,
  },
  {
    slug: "/innovation-hubs",
    title: "Innovation Hubs & Sectors",
    summary:
      "Dedicated hubs for AI, Life Sciences & Biotechnology, FinTech, Renewable Energy, Smart Manufacturing, and Advanced Urban Infrastructure.",
    keywords: [
      "innovation hubs",
      "sectors",
      "ai",
      "artificial intelligence",
      "life sciences",
      "biotechnology",
      "fintech",
      "renewable energy",
      "manufacturing",
      "industries",
    ],
    content: `Future City Telangana promotes key sectors through dedicated innovation hubs: Artificial Intelligence (AI), Life Sciences and Biotechnology, Financial Technology (FinTech), Renewable Energy, Smart Manufacturing, and Advanced Urban Infrastructure.`,
  },
  {
    slug: "/infrastructure",
    title: "Infrastructure & Amenities",
    summary:
      "Internal roads, underground utilities, LED street lighting, parks, jogging/cycling tracks, water systems, and sustainable infrastructure.",
    keywords: [
      "infrastructure",
      "amenities",
      "roads",
      "utilities",
      "street lighting",
      "parks",
      "water",
      "drainage",
      "facilities",
    ],
    content: `Infrastructure includes internal roads (40' and 33' wide), underground utility lines, energy-efficient LED street lighting, and efficient drainage systems. Residential features include landscaped parks and green spaces, children's play areas, jogging and cycling tracks, and overhead water tanks with piped connections. Sustainable systems include rainwater harvesting, solar-powered street lights, and zero-waste management principles.`,
  },
  {
    slug: "/sustainability",
    title: "Sustainability",
    summary:
      "Renewable energy (solar and wind), green building standards, zero-waste policies, water conservation, and EV infrastructure.",
    keywords: [
      "sustainability",
      "renewable energy",
      "solar",
      "wind",
      "green building",
      "zero waste",
      "rainwater",
      "ev",
      "electric vehicle",
      "environment",
    ],
    content: `The city integrates renewable energy sources such as solar and wind power, enforces green building standards, implements zero-waste policies, features water conservation and rainwater harvesting, and supports electric vehicle (EV) infrastructure. Green energy policies support renewable energy and EV adoption.`,
  },
  {
    slug: "/residential",
    title: "Residential",
    summary:
      "Affordable housing, premium apartments, and villas with modern amenities, healthcare, education, parks and recreation.",
    keywords: [
      "residential",
      "housing",
      "homes",
      "apartments",
      "villas",
      "affordable",
      "amenities",
      "living",
    ],
    content: `Future City Telangana offers affordable housing, premium apartments, and villas, equipped with modern amenities, healthcare facilities, educational institutions, parks, and recreational areas.`,
  },
  {
    slug: "/investment",
    title: "Investment & Land Allotment",
    summary:
      "Investment in industrial parks, tech hubs, commercial complexes, residential developments and public infrastructure, with FCDA single-window clearance and incentives.",
    keywords: [
      "investment",
      "land allotment",
      "investors",
      "industrial parks",
      "tech hubs",
      "commercial",
      "incentives",
      "subsidies",
      "tax benefits",
      "proposals",
      "tenders",
      "nri",
    ],
    content: `Future City Telangana offers diverse investment opportunities, including industrial parks, technology hubs, commercial complexes, residential developments, and public infrastructure projects. Investors can apply for land allotment through the Future City Development Authority (FCDA); applications, proposals, and tenders are submitted via the Proposals & Tenders section on the website, supported by a single-window clearance system (TS-iPASS for industrial clearances). Incentives include subsidies on infrastructure development, priority land allotment in innovation hubs, tax benefits, and simplified regulatory procedures, with special packages for AI, FinTech, Life Sciences, and Green Technology sectors. Target investors include aspiring homeowners, long-term land investors, NRIs, businesses, startups, and industrial companies.`,
  },
  {
    slug: "/approvals",
    title: "Approvals & Legal",
    summary:
      "HMDA approved and RERA registered, with clear-title ownership and transparency.",
    keywords: [
      "approvals",
      "legal",
      "hmda",
      "rera",
      "clear title",
      "registration",
      "documents",
      "transparency",
    ],
    content: `The project is HMDA (Hyderabad Metropolitan Development Authority) approved and RERA registered, with clear-title ownership provisions. RERA compliance ensures transparency and timely completion. The purchase process: (1) inquire about available plots and pricing, (2) schedule a site visit, (3) select a plot, (4) verify legal documents (HMDA/RERA approvals), (5) pay the booking amount, (6) complete the booking form, (7) execute remaining payment per the agreed plan, (8) finalize registration at the local sub-registrar office, and (9) receive the registered sale deed.`,
  },
  {
    slug: "/contact",
    title: "Contact",
    summary:
      "Reach Future City Telangana via the enquiry form on the website or its social channels.",
    keywords: ["contact", "reach", "enquiry", "support", "social media"],
    content: `You can reach Future City Telangana through the enquiry form on the Contact Us page of the website (fields: name, email, subject, and message). The project is also on Instagram (@futurecitytg), Facebook (Futurecitytg), and X / Twitter (@Futurecitytg). The website also has Documentation, Innovation Hubs, Proposals & Tenders, Blog, Careers, and FAQ sections.`,
  },
];

// ------------------------------------------------------------
//  FAQs (verbatim from the website FAQ page)
// ------------------------------------------------------------
export const faqs: FAQ[] = [
  {
    q: "What is Future City Telangana?",
    a: "Future City Telangana is India's first Net-Zero Greenfield Smart City, developed to set new standards in sustainable urban living and technological innovation. Spanning 30,000 acres, the city is designed to be an integrated hub for industries, research institutions, residential communities, and public services, all while maintaining a strong focus on environmental sustainability.",
  },
  {
    q: "Who is responsible for developing Future City Telangana?",
    a: "The Future City Development Authority (FCDA), under the guidance of the Telangana State Government, is responsible for the planning, development, and management of Future City Telangana.",
  },
  {
    q: 'What does "Net-Zero Greenfield City" mean?',
    a: "A Net-Zero Greenfield City is a city designed and developed from scratch on previously undeveloped land, with the primary objective of achieving zero carbon emissions. Future City Telangana integrates renewable energy systems, efficient waste and water management, and sustainable infrastructure to ensure the city's carbon footprint is minimized, ultimately balancing the energy it consumes with what it produces.",
  },
  {
    q: "Where is Future City Telangana located?",
    a: "Future City Telangana is strategically located between the Srisailam and Nagarjunasagar highways, spanning across seven mandals in Telangana. Its location ensures excellent connectivity through major highways and proximity to expanding urban centers.",
  },
  {
    q: "What sectors are being promoted?",
    a: "Key sectors include Artificial Intelligence (AI), Life Sciences and Biotechnology, Financial Technology (FinTech), Renewable Energy, Smart Manufacturing, and Advanced Urban Infrastructure.",
  },
  {
    q: "What investment opportunities are available?",
    a: "Future City Telangana offers diverse investment opportunities, including industrial parks, technology hubs, commercial complexes, residential developments, and public infrastructure projects.",
  },
  {
    q: "How can an investor apply for land allotment?",
    a: "Investors can apply through the Future City Development Authority (FCDA). Applications for land allotment, proposals, and tenders can be submitted via the Proposals & Tenders section on the website. The FCDA provides a single-window clearance system.",
  },
  {
    q: "Are there incentives available for businesses?",
    a: "Yes. Future City Telangana offers subsidies on infrastructure development, priority land allotment in innovation hubs, tax benefits, and simplified regulatory procedures. Special packages are available for AI, FinTech, Life Sciences, and Green Technology sectors.",
  },
  {
    q: "What sustainability initiatives are in place?",
    a: "The city integrates renewable energy sources such as solar and wind power, enforces green building standards, implements zero-waste policies, features water conservation and rainwater harvesting, and supports electric vehicle infrastructure.",
  },
  {
    q: "What residential facilities are planned?",
    a: "Future City Telangana offers affordable housing, premium apartments, and villas, equipped with modern amenities, healthcare facilities, educational institutions, parks, and recreational areas.",
  },
  {
    q: "How will transportation and connectivity be handled?",
    a: "The city connects through major highways including the Outer Ring Road and Regional Ring Road. Plans include metro rail extensions, greenfield corridors, smart roads, pedestrian pathways, and cycling tracks.",
  },
];
