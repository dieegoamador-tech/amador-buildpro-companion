import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Hammer,
  Sparkles,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-renovation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amador BuildPro Inc. — Premium Renovations & Construction" },
      {
        name: "description",
        content:
          "Licensed, bonded & insured renovation contractor specializing in kitchens, bathrooms, flooring and painting. Get an instant online quote.",
      },
      { property: "og:title", content: "Amador BuildPro Inc. — Premium Renovations" },
      {
        property: "og:description",
        content: "Craftsmanship homeowners trust. Free instant online quotes.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { v: "20+", l: "Years experience" },
  { v: "850+", l: "Projects completed" },
  { v: "100%", l: "Licensed & insured" },
  { v: "4.9★", l: "Client rating" },
];

const services = [
  {
    icon: Hammer,
    title: "Kitchen Remodels",
    desc: "Custom cabinetry, countertops, lighting and full layout redesigns.",
  },
  {
    icon: Sparkles,
    title: "Bathroom Renovations",
    desc: "Modern showers, tile work, vanities and luxury finishes.",
  },
  {
    icon: Award,
    title: "Flooring Installation",
    desc: "Hardwood, engineered wood, LVP and large-format tile.",
  },
  {
    icon: ShieldCheck,
    title: "Interior & Exterior Painting",
    desc: "Premium-grade paint, surface prep and warranty-backed finishes.",
  },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Luxury home renovation by Amador BuildPro Inc."
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <ShieldCheck className="h-3.5 w-3.5" /> Licensed · Bonded · Insured
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
              Renovations built on <span className="text-gold">trust</span>,
              <br /> finished with <span className="text-gold">precision</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl">
              Amador BuildPro Inc. delivers premium kitchen, bathroom, flooring and painting
              transformations — on time, on budget, and warrantied for a year.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/calculator">
                  <Calculator className="mr-1" /> Get an instant quote
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/services">
                  Explore services <ArrowRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {stats.map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-4 backdrop-blur"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              What we do
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Craftsmanship across every room.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-medium text-primary hover:text-gold inline-flex items-center gap-1"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-gold/60 hover:shadow-lg"
            >
              <div className="grid h-11 w-11 place-content-center rounded-lg bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/60">
        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Why Amador BuildPro
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              A general contractor that treats your home like our own.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We combine 20+ years of field experience with transparent pricing, daily site
              communication, and senior tradespeople on every job — no rotating subs, no hidden
              fees.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Free in-home consultation & detailed written quote",
                "Senior project manager assigned to every job",
                "Premium materials with manufacturer warranties",
                "1-year workmanship warranty, in writing",
                "Daily clean-up and protective floor coverings",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Clock, t: "On-time delivery", d: "92% of projects finish on or before schedule." },
              { icon: ShieldCheck, t: "Fully insured", d: "$2M general liability + workers' comp." },
              { icon: Award, t: "Top-rated", d: "4.9-star average from 200+ verified reviews." },
              { icon: Hammer, t: "Senior crew", d: "10+ year average tradesperson experience." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-card p-5">
                <c.icon className="h-6 w-6 text-gold" />
                <div className="mt-3 font-display font-semibold">{c.t}</div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-10 md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Ready to see what your project will cost?
              </h2>
              <p className="mt-3 text-primary-foreground/80 max-w-md">
                Use our instant Price Calculator for a transparent estimate, or chat with our AI
                assistant — anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/calculator">Open the calculator</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/contact">Talk to a specialist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
