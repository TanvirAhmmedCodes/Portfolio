import type { GithubRepo } from "./github";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  repo: string;
  demo?: string;
  language: string;
  category: "AI & Healthcare" | "AgriTech & IoT" | "Systems & Web" | "Learning & Tools";
  tags: string[];
  featured: boolean;
  order: number;
  highlight?: string;
  githubData?: Partial<GithubRepo>;
}

export const featuredProjectIds = [
  "AstroVitals",
  "Asclepius-Medical-Intelligence",
  "AgriDoc-Intelligence",
  "AgroResQ",
  "MedDoc-Prescriber",
  "AgroResQ-Web",
  "Smart-Crop-Care-Advisor",
  "Smart-Parking-System",
  "LABS-Practices",
  "Web-Development-Journey",
  "public-apis",
];

export const manualProjects: Project[] = [
  {
    id: "AstroVitals",
    title: "AstroVitals Neuro-Shield",
    tagline: "Autonomous Clinical Decision Support & Health Guardian for Astronauts",
    description:
      "Engineered for NASA Space Apps Challenge 2026 (Challenge 5). Autonomous clinical decision support platform monitoring astronaut physiological vitals in deep-space environments with real-time anomaly detection.",
    repo: "https://github.com/TanvirAhmmedCodes/AstroVitals",
    demo: "https://astrovitals.vercel.app",
    language: "JavaScript",
    tags: ["React", "NASA Space Apps 2026", "AI Diagnostics", "Tailwind CSS"],
    featured: true,
    category: "AI & Healthcare",
    order: 1,
    highlight: "NASA Space Apps 2026 Entry",
  },
  {
    id: "Asclepius-Medical-Intelligence",
    title: "Asclepius Medical Intelligence",
    tagline: "Local-First AI Clinical Diagnosis & RX Vision System",
    description:
      "Privacy-first medical intelligence platform powered by Google Gemini AI. Features clinical pathology reasoning, Bengali and English multi-language translation, and zero-cloud local data caching for rural clinics.",
    repo: "https://github.com/TanvirAhmmedCodes/Asclepius-Medical-Intelligence",
    language: "TypeScript",
    tags: ["TypeScript", "Gemini AI", "Hult Prize Semi-Finalist", "Local-First"],
    featured: true,
    category: "AI & Healthcare",
    order: 2,
    highlight: "Hult Prize 2026 Semi-Finalist",
  },
  {
    id: "AgriDoc-Intelligence",
    title: "AgriDoc Intelligence",
    tagline: "Offline-First Agronomy Platform & Disease Diagnosis",
    description:
      "Empowers rural farmers to diagnose crop pathologies via Gemini Vision API, participate in decentralized crop trade, and access biological asset records without active internet connectivity. Built for UN SDGs 1, 2, 8, 13.",
    repo: "https://github.com/TanvirAhmmedCodes/AgriDoc-Intelligence",
    language: "TypeScript",
    tags: ["TypeScript", "Offline-First", "Gemini Vision", "Agronomy"],
    featured: true,
    category: "AgriTech & IoT",
    order: 3,
    highlight: "UN SDG Innovation",
  },
  {
    id: "AgroResQ",
    title: "AgroResQ",
    tagline: "Disaster Relief Decision Support & Agricultural Recovery Engine",
    description:
      "A high-performance C++ algorithmic decision support system designed to optimize emergency resource distribution and guide soil rehabilitation following severe weather events and floods in Bangladesh.",
    repo: "https://github.com/TanvirAhmmedCodes/AgroResQ",
    language: "C++",
    tags: ["C++", "Decision Support", "Disaster Relief", "Algorithmic"],
    featured: true,
    category: "AgriTech & IoT",
    order: 4,
    highlight: "Core C++ Engine",
  },
  {
    id: "MedDoc-Prescriber",
    title: "MedDoc Prescriber",
    tagline: "AI Clinical Prescription & Documentation Intelligence",
    description:
      "Awarded 1st Runner Up at Hacktasyne 2025. Solves medical illegibility and documentation bottlenecks by structuring clinical consultations into instant, verifiable digital prescriptions.",
    repo: "https://github.com/TanvirAhmmedCodes/MedDoc-Prescriber",
    language: "TypeScript",
    tags: ["TypeScript", "Hacktasyne Runner Up", "Clinical AI", "React"],
    featured: true,
    category: "AI & Healthcare",
    order: 5,
    highlight: "1st Runner Up - Hacktasyne 2025",
  },
  {
    id: "AgroResQ-Web",
    title: "AgroResQ Web Platform",
    tagline: "Modern Web Interface for Agricultural Disaster Management",
    description:
      "Web frontend companion for the AgroResQ ecosystem, providing interactive GIS maps, relief request tracking, and responsive disaster coordination dashboards for humanitarian operators.",
    repo: "https://github.com/TanvirAhmmedCodes/AgroResQ-Web",
    language: "TypeScript",
    tags: ["TypeScript", "React", "GIS Mapping", "Tailwind CSS"],
    featured: false,
    category: "AgriTech & IoT",
    order: 6,
  },
  {
    id: "Smart-Crop-Care-Advisor",
    title: "Smart Crop Care Advisor",
    tagline: "Algorithmic Soil Moisture & Irrigation Decision Engine",
    description:
      "C-based irrigation calculation software that guides farmers on watering schedules based on soil moisture percentages, ambient temperature, and cultivation duration - requiring zero expensive hardware.",
    repo: "https://github.com/TanvirAhmmedCodes/Smart-Crop-Care-Advisor",
    language: "C",
    tags: ["C", "Embedded Logic", "Agriculture", "CLI"],
    featured: false,
    category: "AgriTech & IoT",
    order: 7,
  },
  {
    id: "Smart-Parking-System",
    title: "Smart Parking System",
    tagline: "Intelligent Space Allocation & Parking Automation",
    description:
      "Automated vehicle slot allocation and real-time occupancy management system built with TypeScript to reduce urban congestion in high-density metropolitan zones.",
    repo: "https://github.com/TanvirAhmmedCodes/Smart-Parking-System",
    language: "TypeScript",
    tags: ["TypeScript", "Automation", "IoT Integration"],
    featured: false,
    category: "Systems & Web",
    order: 8,
  },
  {
    id: "LABS-Practices",
    title: "LABS Practices & Algorithms",
    tagline: "Curated Algorithmic Implementations & Competitive Code",
    description:
      "Comprehensive repository of rigorous academic and competitive programming solutions spanning dynamic programming, graph traversal, trees, sorting algorithms, and pointer manipulation.",
    repo: "https://github.com/TanvirAhmmedCodes/LABS-Practices",
    language: "C++",
    tags: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
    featured: false,
    category: "Learning & Tools",
    order: 9,
    highlight: "3 Stars on GitHub",
  },
  {
    id: "Web-Development-Journey",
    title: "Web Development Journey",
    tagline: "Modern Frontend Architecture & Progressive Experiments",
    description:
      "An iterative technical journey documenting modular CSS architecture, responsive design patterns, DOM manipulation techniques, and modern JavaScript application patterns.",
    repo: "https://github.com/TanvirAhmmedCodes/Web-Development-Journey",
    language: "HTML",
    tags: ["HTML5", "CSS3", "JavaScript", "UI Architecture"],
    featured: false,
    category: "Learning & Tools",
    order: 10,
  },
  {
    id: "public-apis",
    title: "Public APIs Curated Directory",
    tagline: "Community Index of Free Developer Endpoints & Services",
    description:
      "Curated reference collection of public REST and GraphQL APIs categorized by machine learning, weather, healthcare, finance, and developer tools.",
    repo: "https://github.com/TanvirAhmmedCodes/public-apis",
    language: "Markdown",
    tags: ["APIs", "Open Data", "Developer Tools", "Community"],
    featured: false,
    category: "Learning & Tools",
    order: 11,
  },
];

export function getManualProject(id: string): Project | undefined {
  return manualProjects.find((p) => p.id === id);
}

export function isFeatured(repoName: string): boolean {
  return featuredProjectIds.slice(0, 4).includes(repoName);
}
