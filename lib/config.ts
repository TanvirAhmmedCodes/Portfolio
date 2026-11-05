export const personal = {
  name: "MD Tanvir Ahmmed",
  brand: "TANVIR",
  tagline: "Curiosity Beyond Limits.\nInnovation Without Boundaries.",
  secondaryTagline: "Curious by Nature. Builder by Choice.",
  title: "Computer Science & Engineering Student",
  subtitle: "Aspiring Software Engineer | AI & Technology Enthusiast | Creative Builder",
  location: "Mirpur, Dhaka, Bangladesh",
  email: "tanvirahmmed13579@gmail.com",
  shortBio:
    "I am a Computer Science student passionate about exploring technology, building innovative software, and turning creative ideas into meaningful solutions. My curiosity extends across Artificial Intelligence, Machine Learning, Data Science, Cybersecurity, Software Engineering, Web Development, and emerging technologies. I enjoy experimenting with AI, participating in competitions, building practical projects, and continuously exploring new possibilities. I believe technology should not only solve problems but also make the world a better place.",
  university: "Bangladesh University of Business & Technology (BUBT)",
  degree: "Bachelor of Science in Computer Science & Engineering",
  academicStatus: "2nd Year · 4th Semester",
  expectedGraduation: "July 2029",
  github: "TanvirAhmmedCodes",
  social: {
    github: "https://github.com/TanvirAhmmedCodes",
    linkedin: "https://www.linkedin.com/in/tanvir-ahmmed-codes/",
    facebook: "https://www.facebook.com/mehmed.al.tanvir",
    x: "https://x.com/Tanviir_Ahmmed",
    buyMeACoffee: "https://buymeacoffee.com/tanvirahmmedcodes",
  },
};

export interface Achievement {
  id: string;
  index: string;
  title: string;
  year: string;
  event: string;
  organizer: string;
  project: string;
  category: string;
  description: string;
  badge: string;
  reward?: string;
}

export const achievements: Achievement[] = [
  {
    id: "hacktasyne-2025",
    index: "01",
    title: "1st Runner Up",
    year: "2025",
    event: "Hacktasyne 2025",
    organizer: "BASIS Students' Forum, BUBT",
    project: "MedDoc Prescriber",
    category: "Smart Solutions, Simple Codes",
    badge: "Hackathon Award",
    reward: "Prize & Certificate",
    description:
      "Awarded 1st Runner Up for architecting MedDoc Prescriber - an AI-powered medical documentation and prescription intelligence system designed to streamline healthcare workflows.",
  },
  {
    id: "hult-prize-2026",
    index: "02",
    title: "Semi-Finalist",
    year: "2026",
    event: "Hult Prize 2026 - On-Campus",
    organizer: "Hult Prize Foundation / BUBT",
    project: "Asclepius Medical Intelligence",
    category: "Health & Wellbeing",
    badge: "Global Innovation",
    reward: "Semi-Finalist Certificate",
    description:
      "Selected as Semi-Finalist for developing Asclepius Medical Intelligence - a privacy-first, local-first medical AI supporting English and Bengali for rural healthcare accessibility.",
  },
];

export const skills = {
  programming: ["C", "C++", "JavaScript", "TypeScript", "Python"],
  web: ["HTML", "CSS", "React", "Node.js", "Express", "Tailwind CSS"],
  database: ["MongoDB"],
  tools: ["Git", "GitHub", "VS Code", "Linux"],
  exploration: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Software Engineering",
    "IoT",
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Recognition", href: "#achievements" },
  { label: "Arsenal", href: "#skills" },
  { label: "Code Trace", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const seo = {
  title: "MD Tanvir Ahmmed | Creative Technologist & CSE Student",
  description:
    "Explore the projects, achievements, and technical journey of MD Tanvir Ahmmed, a Computer Science student passionate about AI, software engineering, and emerging technologies.",
};
