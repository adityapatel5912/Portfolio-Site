import { Project, Skill } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "fitnessos",
    title: "FitnessOS",
    category: "AI Fitness Platform",
    tagline: "Autonomous workout scheduling and biomechanical posture analysis engine.",
    description: "An intelligent fitness coaching system utilizing real-time computer vision and personalized LLM-driven adaptation protocols to maximize athletic performance.",
    longDescription: "FitnessOS is an all-in-one athletic operating system designed to bridge the gap between high-performance sports science and consumer accessibility. Developed as a founder-level project, it integrates proprietary computer vision algorithms to track joint rotations during weight-lifting, providing immediate audible biofeedback. On the backend, dynamic mathematical modeling analyzes user fatigue coefficients, adjusting session volumes and macronutrient load-outs dynamically day-over-day.",
    url: "/projects/fitnessos",
    metrics: [
      { label: "Real-time pose latency", value: "<14ms" },
      { label: "Active Beta Testers", value: "1,200+" },
      { label: "Adherence rate improvement", value: "+38%" }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Python", "Gemini AI", "Supabase"],
    features: [
      "Real-time skeletal path-tracing and velocity tracking using WebCam API",
      "Dynamic workout progression graphs with automated macro recalculation",
      "AI Voice Coach that speaks in real-time, matching movement tempo and encouraging posture correction",
      "Robust offline sync utilizing client-side SQLite and cloud synchronization triggers"
    ],
    visualPrompt: "A sleek, dashboard mock-up showcasing a human skeletal keypoint overlay in futuristic neon cyan, layered over raw dark graphite background panels.",
    mockupBg: "from-cyan-950/40 via-slate-900 to-black border-cyan-500/20",
    role: "Lead Software Architect & Designer",
    timeline: "Jan 2026 - Present"
  },
  {
    id: "one8",
    title: "One8 Website",
    category: "Premium E-Commerce Experience",
    tagline: "Ultra-fast next-gen luxury direct-to-consumer store with web-native 3D interaction.",
    description: "A visually striking, highly optimized e-commerce system built for premium brands, setting new benchmarks in fluid interaction design and swift checkout latency.",
    longDescription: "Engineered to deliver Apple-grade luxury catalog inspection, the One8 experience breaks away from standard grid-based templates. Combining physics-based cursor scroll interactions, high-definition asset optimization, and a single-hop serverless checkout pipeline, the platform is crafted to maximize user session length and boost conversion metrics.",
    url: "/projects/one8",
    metrics: [
      { label: "Initial load time", value: "0.24s" },
      { label: "Lighthouse mobile score", value: "99" },
      { label: "Interactive bounce reduction", value: "-24%" }
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    features: [
      "Custom inertia-scroll canvas wrapper enabling seamless kinetic image gliding",
      "Dynamic asset rendering using Next-Image optimization and smart WebP multi-size serving",
      "Integrated micro-cart drawer using localized state machine to support instantly responsive item counts",
      "Ultra-minimalist, single-line checkout UI with built-in postal address auto-verification"
    ],
    visualPrompt: "An editorial-grade product deck centering a high-fashion apparel model, layered with sharp minimalist typography and structured technical grids.",
    mockupBg: "from-amber-950/30 via-stone-900 to-black border-amber-500/20",
    role: "Full-Stack Developer",
    timeline: "Nov 2025 - Dec 2025"
  },
  {
    id: "f1hub",
    title: "F1 Hub",
    category: "Formula 1 Platform",
    tagline: "Live telemetry dashboard, drag-and-drop comparison engine, and predictive analytics framework.",
    description: "A fast-paced, telemetry-driven analysis application for Formula 1 enthusiasts, combining real-time APIs with interactive historical data tables.",
    longDescription: "F1 Hub brings state-of-the-art telemetry aggregation to motorsport analytics. Featuring an interactive dual-car telemetry overlay chart, live session qualifying simulations, and driver performance matrices, this platform parses milliseconds of timing data into digestible visual trends. Perfect for simulating driver lineups and tire-degradation curves based on historic lap times.",
    url: "/projects/f1hub",
    metrics: [
      { label: "Concurrent telemetry feeds", value: "20 Cars" },
      { label: "API response latency", value: "45ms" },
      { label: "Aggregate data queries", value: "1.2M+" }
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "TypeScript", "Python", "D3.js"],
    features: [
      "Live race interactive dashboard mapping turn-by-turn sector speeds",
      "Multi-driver comparison grids where stats are loaded into visual radar matrices",
      "Predictive race model combining weather predictions, tire compound degradation, and historical safety car statistics",
      "Custom responsive charts plotting RPM, speed, and gear engagement per track coordinate"
    ],
    visualPrompt: "An ultra-premium red and black telemetry screen featuring complex high-frequency timing grids and elegant track wireframes in high contrast.",
    mockupBg: "from-red-950/30 via-neutral-900 to-black border-red-500/20",
    role: "Solo Creator & Data Scientist",
    timeline: "Aug 2025 - Oct 2025"
  },
  {
    id: "cinematch",
    title: "Cinematch",
    category: "Entertainment Platform",
    tagline: "A cinematic discovery engine with semantic natural-language recommendation queries.",
    description: "An immersive cinema catalog application that uses natural language reasoning to guide viewers of similar tastes toward award-winning narratives.",
    longDescription: "Designed with an expansive dark aesthetic inspired by Apple TV and Arc Browser, this movie ecosystem departs from algorithmic grid fatigue. Viewers prompt the platform using complete natural sentences (e.g. 'A melancholic retro sci-fi movie with beautiful synth soundtracks and dry humor') rather than static genre tags, generating highly nuanced cinematic journeys.",
    url: "/projects/cinematch",
    metrics: [
      { label: "Recommendation match rate", value: "94%" },
      { label: "Average session duration", value: "18.4 min" },
      { label: "Vector database crawl time", value: "70ms" }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Supabase", "motion"],
    features: [
      "Visual fluid grid with immersive animated backdrops that change color to match the selected movie poster",
      "Semantic-search pipeline querying high-dimensional vector embeddings of over 45k films",
      "Dynamic interactive watchlists featuring offline sync and instant shared canvas links"
    ],
    visualPrompt: "An immersive movie catalog detail overlay with rich dark violet color grading, premium typography, and glowing cinematic backdrops.",
    mockupBg: "from-violet-950/40 via-zinc-900 to-black border-violet-500/20",
    role: "Product Lead",
    timeline: "Jun 2025 - Jul 2025"
  },
  {
    id: "travel-planner",
    title: "Travel Planner",
    category: "AI Travel Platform",
    tagline: "Generative multi-city itinerary designer with local weather models and pricing analytics.",
    description: "A clean, highly intuitive travel compiler that creates day-by-day itineraries using geolocation APIs, real-time weather grids, and smart scheduling.",
    longDescription: "Travel Planner simplifies complex trip formatting by consolidating flights, lodging, local dining, and hourly activities into a comprehensive visual timeline. Utilizing Gemini AI to cross-reference traveler profiles with actual localized events and seasonal patterns, the application builds structured travel playbooks customized to specific target budgets.",
    url: "/projects/travel-planner",
    metrics: [
      { label: "Itineraries compiled", value: "148,000+" },
      { label: "Average generation time", value: "1.8s" },
      { label: "User satisfaction rating", value: "4.92 / 5" }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Google Maps Platform", "Vercel"],
    features: [
      "Intelligent weather-adaptation module suggesting alternative indoor activities in case of sudden tropical rainfall",
      "Dynamic collaborative itinerary canvases editable by up to eight friends concurrently",
      "Budget analysis gauges forecasting seasonal surge costs, local transport pricing, and meal index averages",
      "Interactive map overlays plotting turn-by-turn daily exploration routes based on walking distances"
    ],
    visualPrompt: "A high-fidelity travel dashboard illustrating step-by-step route lines, calendar timelines, and elegant location photography blocks with soft rounded borders.",
    mockupBg: "from-emerald-950/30 via-slate-900 to-black border-emerald-500/20",
    role: "Co-Founder & Technical Lead",
    timeline: "Mar 2025 - May 2025"
  },
  {
    id: "jjk-simulator",
    title: "Anime Simulator",
    category: "Gaming & AI",
    tagline: "An immersive text-based RPG simulator utilizing LLMs to generate dynamic Jujutsu Kaisen battles.",
    description: "A specialized conversational AI engine adapted into a fully interactive battle simulator, letting fans navigate the JJK universe.",
    longDescription: "Anime Simulator applies precise prompt engineering and structured generation to maintain strict narrative constraints mapped to the Jujutsu Kaisen lore. Players simulate domain expansions, cursed energy reserves, and nuanced character dialogue in a real-time responsive environment.",
    url: "/projects/jjk-simulator",
    metrics: [
      { label: "Active Players", value: "3,500+" },
      { label: "Battles Simulated", value: "85,000+" },
      { label: "Lore Accuracy", value: "98%" }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Supabase"],
    features: [
      "Dynamic battle generation logic adapting to player choices",
      "Real-time cursed energy resource management system",
      "Character-accurate conversational profiles powered by LLMs"
    ],
    visualPrompt: "A sleek gaming terminal interface featuring dark mystical purple accents, intense battle graphics, and flowing cursed energy particles.",
    mockupBg: "from-fuchsia-950/40 via-slate-900 to-black border-fuchsia-500/20",
    role: "Lead Developer",
    timeline: "Feb 2026 - Mar 2026"
  }
];

export const SKILLS: Skill[] = [
  {
    name: "AI Development",
    description: "Architecting server-side model triggers, optimizing multi-turn agent systems, and implementing high-dimensional vector embedding semantics.",
    icon: "Sparkles",
    level: 95
  },
  {
    name: "Python",
    description: "Automated data workflows, structural analysis libraries (pandas, numpy), and microservices built with FastAPI & Flask.",
    icon: "SquareTerminal",
    level: 90
  },
  {
    name: "Web Development",
    description: "Building light-weight React SPAs and Next.js products utilizing robust client state, tailwind structures, and seamless interaction hooks.",
    icon: "Globe",
    level: 98
  },
  {
    name: "Automation",
    description: "Developing robust cloud sync routines, cron pipelines, web scraping engines, and customized tool-chains to boost system operations.",
    icon: "Cpu",
    level: 88
  },
  {
    name: "SaaS Development",
    description: "Creating complete, modular user access frameworks, relational data schemas, and clean subscription models optimized for modern startups.",
    icon: "Layers",
    level: 92
  },
  {
    name: "Product Design",
    description: "Crafting digital assets, custom component hierarchies, typography balances, and precise micro-interactions to deliver Stripe-grade polish.",
    icon: "Compass",
    level: 94
  },
  {
    name: "AI-Accelerated Development",
    description: "Leveraging advanced foundational LLMs with lightning-fast execution pipelines to construct proof-of-concepts and iterate prototypes within hours.",
    icon: "Zap",
    level: 100
  }
];

export const TECH_STACK = [
  { name: "Python", category: "Backend & ML" },
  { name: "React", category: "Frontend Core" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Type-safety" },
  { name: "Tailwind CSS", category: "Design System" },
  { name: "Supabase", category: "Database & Auth" },
  { name: "Gemini AI", category: "AI Models" },
  { name: "GitHub", category: "Version Control" },
  { name: "Vercel", category: "Deployment" }
];
