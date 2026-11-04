import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource/caveat/400.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { SmoothScroll } from "@/components/smooth-scroll";
import { THEME_SCRIPT } from "@/components/theme";

export const metadata: Metadata = {
  title: { default: "Alan Sahlan · Product designer", template: "%s · Alan Sahlan" },
  description: "Alan Sahlan is a product designer based in Bandung, working on component libraries and interfaces for international client projects at CADIT.",
  icons: { icon: "/images/design/blob-original.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SmoothScroll />
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
