import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaylectaOpenerEmbed } from "@/components/paylecta-opener-embed";
import { ProjectToc } from "@/components/project-toc";
import { paylectaToc } from "@/data/projects";

export const metadata: Metadata = {
  title: "Paylecta",
  description: "Making daily finances feel simpler for small shops across 21 web screens and 30 iOS mobile screens.",
};

const goals = [
  {
    number: "01",
    title: "Show the health first",
    description: "Put balance, today's numbers, and pending alerts right at the top.",
  },
  {
    number: "02",
    title: "Catch mistakes early",
    description: "Preview invoices live and auto-fill payout details before you send.",
  },
  {
    number: "03",
    title: "Make it fit one hand",
    description: "Use modular cards so desktop flows fold cleanly onto a phone.",
  },
];

const colorSwatches = [
  { name: "Primary orange", hex: "#F8952D · 30% brand & main actions", swatch: "#F8952D" },
  { name: "Neutral canvas & ink", hex: "#F8F8F8 / #2B2B2B · 60% workspace", swatch: "#2B2B2B" },
  { name: "Status colors", hex: "#22C55E · #007EE5 · #DC0000 · 10% cues", swatch: "#007EE5" },
];

const mobileScreens = [
  {
    src: "/images/projects/paylecta/mobile-dashboard.png",
    alt: "Paylecta iOS dashboard showing balance card and daily transaction summary",
    label: "Dashboard",
    width: 338,
    height: 1200,
  },
  {
    src: "/images/projects/paylecta/mobile-invoices.png",
    alt: "Paylecta iOS invoices list with paid, unpaid, and overdue status tags",
    label: "Invoices",
    width: 393,
    height: 1086,
  },
  {
    src: "/images/projects/paylecta/mobile-payout-detail.png",
    alt: "Paylecta iOS payout detail view showing bank channel and settlement timeline",
    label: "Payout details",
    width: 393,
    height: 852,
  },
];

export default function PaylectaCaseStudyPage() {
  return (
    <div className="case-study-shell">
      <article className="case-study">
        <header className="case-hero">
          <div className="case-topbar">
            <Link href="/projects" className="case-back-link">
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Projects</span>
            </Link>
            <span className="case-project-name">Paylecta</span>
          </div>
          <PaylectaOpenerEmbed />
          <div className="case-hero-copy">
            <div className="case-title-block">
              <h1>Making daily finances feel simpler for small shops.</h1>
              <p className="case-subtitle">
                Paylecta is a web and mobile dashboard I designed to help small business owners
                check balances, send invoices, and track payouts without digging through clunky
                tables.
              </p>
            </div>
            <dl className="case-meta">
              <div className="case-meta-item">
                <dt>Role</dt>
                <dd className="case-meta-value">Solo Designer</dd>
                <dd className="case-meta-sub">UI &amp; Design System</dd>
              </div>
              <div className="case-meta-item">
                <dt>Timeline</dt>
                <dd className="case-meta-value">2025</dd>
                <dd className="case-meta-sub">4 weeks · Concept</dd>
              </div>
              <div className="case-meta-item">
                <dt>Scope</dt>
                <dd className="case-meta-value">Web &amp; iOS</dd>
                <dd className="case-meta-sub">51 screens total</dd>
              </div>
            </dl>
          </div>
        </header>

        <section id="overview" className="case-section" aria-labelledby="overview-heading">
          <div className="case-prose">
            <p className="case-eyebrow">Overview</p>
            <h2 id="overview-heading">Money tools shouldn&apos;t feel like doing taxes.</h2>
            <p>
              Running a small shop means checking balances, chasing late invoices, and requesting
              payouts almost every day. Most tools hide those basics inside gray tables that make
              quick checks feel heavy.
            </p>
            <p>
              I designed Paylecta as one calm place for web and mobile. Three simple rules guided
              every screen I made.
            </p>
          </div>
          <figure className="case-figure">
            <div className="case-stage case-stage-warm case-dashboard-stage">
              <div className="case-screen-frame case-screen-hero">
                <Image
                  src="/images/projects/paylecta/web-dashboard.png"
                  alt="Paylecta desktop dashboard showing Total Balance, transactions, revenue overview, and recent activity"
                  width={1440}
                  height={1279}
                  sizes="(max-width: 1000px) calc(100vw - 48px), 825px"
                  loading="eager"
                />
              </div>
            </div>
            <figcaption className="case-caption">
              The desktop dashboard. Everything a shop owner checks first thing in the morning.
            </figcaption>
          </figure>
          <div className="case-goals">
            {goals.map((goal) => (
              <div key={goal.number} className="case-goal-card">
                <span className="case-goal-num">{goal.number}</span>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="design-system" className="case-section" aria-labelledby="design-system-heading">
          <div className="case-prose">
            <p className="case-eyebrow">Design system</p>
            <h2 id="design-system-heading">Why I picked orange instead of gray.</h2>
            <p>
              Before drawing full pages, I built the buttons, inputs, tags, and cards first. Most
              finance dashboards stay cold and gray, so I used a 60-30-10 split with warm orange
              (#F8952D) to make daily checks feel friendlier. I was also a bit tired of Inter and
              Montserrat, so I chose Plus Jakarta Sans for clean numbers with softer curves.
            </p>
          </div>
          <div className="case-specimen-grid">
            <div className="case-specimen-card">
              <h3>60-30-10 color hierarchy</h3>
              <div className="case-ratio-bar" aria-label="60 percent neutral, 30 percent orange, 10 percent semantic color ratio">
                <span className="case-ratio-neutral" />
                <span className="case-ratio-orange" />
                <span className="case-ratio-semantic" />
              </div>
              <ul className="case-swatches">
                {colorSwatches.map((item) => (
                  <li key={item.name} className="case-swatch">
                    <span className="case-swatch-dot" style={{ backgroundColor: item.swatch }} aria-hidden="true" />
                    <div>
                      <span className="case-swatch-name">{item.name}</span>
                      <span className="case-swatch-hex">{item.hex}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="case-specimen-card case-type-card">
              <div className="case-type-top">
                <h3>Typography &amp; status badges</h3>
                <p className="case-font-name">Plus Jakarta Sans</p>
                <p className="case-font-specimen">$562,000.34 &nbsp;·&nbsp; Aa Bb Cc 123</p>
                <p className="case-font-scale">Display 40 · Section 24 · Body 16 · Table 13</p>
              </div>
              <div className="case-status-pills" aria-label="Paylecta semantic status tags">
                <span className="case-pill case-pill-ok">Success</span>
                <span className="case-pill case-pill-proc">Processing</span>
                <span className="case-pill case-pill-bad">Overdue</span>
              </div>
            </div>
          </div>
        </section>

        <section id="design-decisions" className="case-section" aria-labelledby="design-decisions-heading">
          <div className="case-prose">
            <p className="case-eyebrow">Design decisions</p>
            <h2 id="design-decisions-heading">Small choices that saved clicks every day.</h2>
          </div>

          <div className="case-block">
            <div className="case-prose">
              <h3>See the invoice before you hit send</h3>
              <p>
                Usually you fill out a long form and hope the PDF looks right after sending. Putting
                a live preview right next to the inputs lets you switch between PDF, Email, and
                Payment Page and catch typos early.
              </p>
            </div>
            <figure className="case-figure">
              <div className="case-stage">
                <div className="case-screen-frame">
                  <Image
                    src="/images/projects/paylecta/web-invoice-create.png"
                    alt="Paylecta create invoice screen with form inputs on the left and a live synced invoice preview on the right"
                    width={1440}
                    height={1279}
                    sizes="(max-width: 1000px) calc(100vw - 48px), 825px"
                    loading="eager"
                  />
                </div>
              </div>
              <figcaption className="case-caption">
                The live preview updates beside the form as you add items or discounts.
              </figcaption>
            </figure>
          </div>

          <div className="case-decision-row">
            <div className="case-stage case-decision-stage">
              <div className="case-screen-frame">
                <Image
                  src="/images/projects/paylecta/web-payouts.png"
                  alt="Paylecta payouts dashboard with available balance, payout totals, and table status tags"
                  width={1440}
                  height={1180}
                  sizes="(max-width: 860px) calc(100vw - 48px), 496px"
                  loading="eager"
                />
              </div>
            </div>
            <div className="case-decision-copy">
              <p className="case-micro-label">Payouts &amp; tables</p>
              <h3>Same top bar, every single page</h3>
              <p>
                I kept search, filters, and the main button in the exact same spot across Customers,
                Invoices, and Payouts. Once you learn one table, you know all of them.
              </p>
            </div>
          </div>

          <div className="case-pair-grid">
            <figure className="case-figure">
              <div className="case-stage case-pair-stage">
                <div className="case-screen-frame case-pair-frame">
                  <Image
                    src="/images/projects/paylecta/web-login.png"
                    alt="Paylecta desktop login screen with clean form layout on the right"
                    width={1440}
                    height={886}
                    sizes="(max-width: 720px) calc(100vw - 48px), 400px"
                    loading="eager"
                  />
                </div>
              </div>
              <figcaption className="case-caption">
                Login keeps the form on the right with no clutter in the way.
              </figcaption>
            </figure>

            <figure className="case-figure">
              <div className="case-stage case-pair-stage">
                <div className="case-screen-frame case-pair-frame case-pair-frame-top">
                  <Image
                    src="/images/projects/paylecta/web-customers.png"
                    alt="Paylecta customers table using green and red tags for active and inactive accounts"
                    width={1440}
                    height={1180}
                    sizes="(max-width: 720px) calc(100vw - 48px), 400px"
                    loading="eager"
                  />
                </div>
              </div>
              <figcaption className="case-caption">
                Green and red tags make active customers easy to spot in one glance.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="mobile" className="case-section" aria-labelledby="mobile-heading">
          <div className="case-prose">
            <p className="case-eyebrow">Mobile</p>
            <h2 id="mobile-heading">Same flows, sized for a thumb.</h2>
            <p>
              Because every web section started as an auto-layout card, moving to iOS didn&apos;t
              mean starting over. Cards stack into one column and buttons stay big enough to tap on
              the move.
            </p>
          </div>
          <div className="case-mobile-stage">
            {mobileScreens.map((screen) => (
              <figure key={screen.label} className="case-phone">
                <div className="case-phone-bezel">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    sizes="(max-width: 720px) 224px, 224px"
                    loading="eager"
                  />
                </div>
                <figcaption className="case-phone-label">{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="reflection" className="case-section" aria-labelledby="reflection-heading">
          <div className="case-prose">
            <p className="case-eyebrow">Reflection</p>
            <h2 id="reflection-heading">I focused too much on the happy paths.</h2>
            <p>
              Building components first really paid off. All 21 web screens and 30 mobile screens
              stayed consistent even as the flows grew.
            </p>
            <p>
              Looking back, I spent most of my time polishing full, tidy tables and skipped messy
              real-life states like empty onboarding, partial refunds, or stuck bank transfers. If I
              take this further, I want to sit with a few shop owners and test how these color tags
              hold up on a busy day.
            </p>
          </div>
        </section>

        <nav className="case-footer" aria-label="Project navigation">
          <Link href="/projects" className="case-footer-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="case-footer-label">
              <strong>Previous:</strong> All projects
            </span>
          </Link>
          <Link href="/projects#aurelia" className="case-footer-link case-footer-next">
            <span className="case-footer-label">
              <strong>Next project:</strong> Aurelia
            </span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>
      </article>

      <ProjectToc items={paylectaToc} />
    </div>
  );
}
