export type ProjectCategoryId = "all" | "web" | "mobile" | "systems";

export interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  tags: string[];
  filters: Exclude<ProjectCategoryId, "all">[];
  image: string;
  alt: string;
  href: string | null;
}

export const projectFilters: { id: ProjectCategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web app" },
  { id: "mobile", label: "Mobile app" },
  { id: "systems", label: "Design systems" },
];

export const projects: ProjectItem[] = [
  {
    slug: "paylecta",
    title: "Paylecta",
    year: "2025",
    category: "Fintech · Web & mobile",
    summary: "A financial dashboard for small shops to track balances, preview invoices before sending, and handle payouts on web and mobile.",
    tags: ["Product design", "Design system", "Responsive UI"],
    filters: ["web", "mobile", "systems"],
    image: "/images/design/paylecta-preview.jpg",
    alt: "Paylecta financial dashboard on a laptop and mobile phone",
    href: "/projects/paylecta",
  },
  {
    slug: "aurelia",
    title: "Aurelia",
    year: "2025",
    category: "Hospitality · Concept",
    summary: "A Bali villa booking concept built around trip plans, making it easier to compare stays and check practical details first.",
    tags: ["Product design", "Web & mobile", "Prototyping"],
    filters: ["web"],
    image: "/images/design/aurelia-preview.jpg",
    alt: "Aurelia resort booking website and mobile experience",
    href: null,
  },
  {
    slug: "pawfriend",
    title: "PawFriend",
    year: "2024",
    category: "Pet adoption · Consumer",
    summary: "A pet adoption app and site that helps shelters share clear profiles and guides families through applying.",
    tags: ["Product design", "User research", "Mobile & web"],
    filters: ["mobile"],
    image: "/images/design/pawfriend-preview.jpg",
    alt: "PawFriend pet adoption website and mobile app",
    href: null,
  },
  {
    slug: "munchpal",
    title: "Munchpal",
    year: "2024",
    category: "Food sharing · Consumer",
    summary: "A food-sharing app for neighbors to list extra meals quickly so good food doesn't go to waste.",
    tags: ["Product design", "Wireframing", "Mobile & web"],
    filters: ["mobile"],
    image: "/images/design/munchpal-preview.jpg",
    alt: "Munchpal food-sharing website and mobile app",
    href: null,
  },
];

export const paylectaToc = [
  { id: "overview", label: "Overview" },
  { id: "design-system", label: "Design system" },
  { id: "design-decisions", label: "Design decisions" },
  { id: "mobile", label: "Mobile" },
  { id: "reflection", label: "Reflection" },
] as const;
