import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Bath, Layers, PaintBucket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Amador BuildPro Inc." },
      {
        name: "description",
        content:
          "Kitchen remodels, bathroom renovations, flooring installation and premium painting by Amador BuildPro Inc.",
      },
      { property: "og:title", content: "Services — Amador BuildPro Inc." },
      {
        property: "og:description",
        content: "Full-service residential renovation specialists.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: ChefHat,
    title: "Kitchen Remodels",
    blurb:
      "From cosmetic refreshes to full layout reconfigurations — we handle cabinetry, stone, plumbing and lighting under one contract.",
    bullets: [
      "Custom & semi-custom cabinetry",
      "Quartz, granite, and porcelain countertops",
      "Plumbing & electrical reroutes",
      "Designer lighting & under-cabinet LEDs",
    ],
  },
  {
    icon: Bath,
    title: "Bathroom Renovations",
    blurb:
      "Spa-level bathrooms with waterproofed showers, modern tile, and premium fixtures — built to last decades.",
    bullets: [
      "Curbless & walk-in showers",
      "Heated tile floors",
      "Custom vanities & double sinks",
      "Schluter waterproofing systems",
    ],
  },
  {
    icon: Layers,
    title: "Flooring Installation",
    blurb:
      "Hardwood, engineered wood, luxury vinyl plank and large-format tile — installed by certified flooring crews.",
    bullets: [
      "Solid & engineered hardwood",
      "Luxury vinyl plank (LVP)",
      "Porcelain & natural stone tile",
      "Subfloor leveling & moisture barriers",
    ],
  },
  {
    icon: PaintBucket,
    title: "Interior & Exterior Painting",
    blurb:
      "Sherwin-Williams and Benjamin Moore premium-grade products with full surface prep and a written warranty.",
    bullets: [
      "Drywall repair & skim coating",
      "Cabinet & trim refinishing",
      "Pressure washing & priming",
      "Low-VOC product options",
    ],
  },
];

function ServicesPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Our services
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold max-w-3xl">
            One contractor. Every detail of your renovation.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            We self-perform our core trades and personally manage every subcontractor — so quality
            never slips between hand-offs.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.title}
            className="rounded-2xl border border-border bg-card p-7 hover:border-gold/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-content-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
            </div>
            <p className="mt-4 text-muted-foreground">{s.blurb}</p>
            <ul className="mt-5 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-secondary/60 p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Not sure which service fits your project?
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Chat with our AI assistant in the corner, or get an instant ballpark with the Price
            Calculator.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/calculator">Try the calculator</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Book a consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
