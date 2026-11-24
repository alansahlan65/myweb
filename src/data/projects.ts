export interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  image: string;
  alt: string;
  href: string | null;
}

export const projects: ProjectItem[] = [
  {
    slug: "paylecta",
    title: "Paylecta",
    year: "2025",
    category: "Fintech",
    summary: "Financial dashboard for small shops to track balances, preview invoices before sending, and manage payouts.",
    image: "/images/design/paylecta-preview.jpg",
    alt: "Paylecta financial dashboard on a laptop and mobile phone",
    href: "/projects/paylecta",
  },
  {
    slug: "aurelia",
    title: "Aurelia",
    year: "2025",
    category: "Hospitality",
    summary: "Bali villa booking experience built around trip plans so guests can compare stays and practical details upfront.",
    image: "/images/design/aurelia-preview.jpg",
    alt: "Aurelia resort booking website and mobile experience",
    href: null,
  },
  {
    slug: "pawfriend",
    title: "PawFriend",
    year: "2024",
    category: "Pet adoption",
    summary: "Pet adoption app and website that helps shelters share clear profiles and guides families through applying.",
    image: "/images/design/pawfriend-preview.jpg",
    alt: "PawFriend pet adoption website and mobile app",
    href: null,
  },
  {
    slug: "munchpal",
    title: "Munchpal",
    year: "2024",
    category: "Food sharing",
    summary: "Food-sharing app where neighbors list extra meals quickly before they go to waste.",
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
