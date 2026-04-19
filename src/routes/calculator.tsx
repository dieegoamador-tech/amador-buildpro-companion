import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator as CalcIcon, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Price Calculator — Amador BuildPro Inc." },
      {
        name: "description",
        content:
          "Get an instant ballpark estimate for your kitchen, bathroom, flooring or painting project.",
      },
      { property: "og:title", content: "Renovation Price Calculator — Amador BuildPro" },
      {
        property: "og:description",
        content: "Transparent, instant ballpark pricing for your renovation project.",
      },
    ],
  }),
  component: CalculatorPage,
});

type ProjectKey = "kitchen" | "bathroom" | "flooring" | "painting";

const PROJECTS: Record<
  ProjectKey,
  {
    label: string;
    base: number;
    perSqft: number;
    minSqft: number;
    maxSqft: number;
    defaultSqft: number;
    unit: string;
    tiers: { key: string; label: string; mult: number; desc: string }[];
  }
> = {
  kitchen: {
    label: "Kitchen Remodel",
    base: 8000,
    perSqft: 180,
    minSqft: 80,
    maxSqft: 400,
    defaultSqft: 150,
    unit: "sqft",
    tiers: [
      { key: "standard", label: "Standard", mult: 1, desc: "Stock cabinets, laminate counters" },
      { key: "premium", label: "Premium", mult: 1.6, desc: "Semi-custom cabinets, quartz counters" },
      { key: "luxury", label: "Luxury", mult: 2.4, desc: "Custom cabinetry, stone & high-end appliances" },
    ],
  },
  bathroom: {
    label: "Bathroom Renovation",
    base: 5000,
    perSqft: 220,
    minSqft: 30,
    maxSqft: 200,
    defaultSqft: 60,
    unit: "sqft",
    tiers: [
      { key: "standard", label: "Standard", mult: 1, desc: "Tub/shower combo, basic fixtures" },
      { key: "premium", label: "Premium", mult: 1.5, desc: "Walk-in shower, designer tile" },
      { key: "luxury", label: "Luxury", mult: 2.2, desc: "Curbless shower, heated floors, double vanity" },
    ],
  },
  flooring: {
    label: "Flooring Installation",
    base: 800,
    perSqft: 9,
    minSqft: 100,
    maxSqft: 3000,
    defaultSqft: 600,
    unit: "sqft",
    tiers: [
      { key: "standard", label: "LVP", mult: 1, desc: "Luxury vinyl plank" },
      { key: "premium", label: "Engineered Wood", mult: 1.7, desc: "Engineered hardwood" },
      { key: "luxury", label: "Solid Hardwood / Tile", mult: 2.3, desc: "Solid wood or porcelain tile" },
    ],
  },
  painting: {
    label: "Interior / Exterior Painting",
    base: 600,
    perSqft: 3.5,
    minSqft: 200,
    maxSqft: 5000,
    defaultSqft: 1200,
    unit: "sqft",
    tiers: [
      { key: "standard", label: "Standard", mult: 1, desc: "1 coat, builder-grade paint" },
      { key: "premium", label: "Premium", mult: 1.4, desc: "2 coats, premium paint, light prep" },
      { key: "luxury", label: "Luxury", mult: 1.9, desc: "Full prep, repairs, designer paint" },
    ],
  },
};

const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function CalculatorPage() {
  const [project, setProject] = useState<ProjectKey>("kitchen");
  const cfg = PROJECTS[project];
  const [sqft, setSqft] = useState<number>(cfg.defaultSqft);
  const [tier, setTier] = useState<string>(cfg.tiers[1].key);

  const tierObj = cfg.tiers.find((t) => t.key === tier) ?? cfg.tiers[1];

  const estimate = useMemo(() => {
    const subtotal = (cfg.base + cfg.perSqft * sqft) * tierObj.mult;
    const low = Math.round((subtotal * 0.9) / 100) * 100;
    const high = Math.round((subtotal * 1.15) / 100) * 100;
    return { low, high };
  }, [cfg, sqft, tierObj]);

  function pickProject(p: ProjectKey) {
    setProject(p);
    setSqft(PROJECTS[p].defaultSqft);
    setTier(PROJECTS[p].tiers[1].key);
  }

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Instant ballpark
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Price Calculator</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Get a transparent ballpark range in seconds. Final pricing is confirmed after a free
            on-site consultation.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <CalcIcon className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold">Configure your project</h2>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">Project type</label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(PROJECTS) as ProjectKey[]).map((p) => (
                <button
                  key={p}
                  onClick={() => pickProject(p)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors text-left ${
                    project === p
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  {PROJECTS[p].label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-end justify-between">
              <label className="text-sm font-medium">
                Project size ({cfg.unit})
              </label>
              <span className="font-display text-2xl font-bold text-primary">{sqft} {cfg.unit}</span>
            </div>
            <Slider
              value={[sqft]}
              min={cfg.minSqft}
              max={cfg.maxSqft}
              step={10}
              onValueChange={(v) => setSqft(v[0])}
              className="mt-3"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>{cfg.minSqft}</span>
              <span>{cfg.maxSqft}</span>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-sm font-medium">Quality tier</label>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {cfg.tiers.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTier(t.key)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    tier === t.key
                      ? "border-gold bg-gold/10"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{t.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
            <p>
              Estimates are ballpark ranges based on typical scope. Site conditions, permits, and
              custom selections may adjust the final quote.
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-primary text-primary-foreground p-6 md:p-8 h-fit lg:sticky lg:top-24">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Estimated range
          </div>
          <div className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
            {formatUSD(estimate.low)}
            <span className="text-primary-foreground/60 mx-2 text-2xl font-normal">—</span>
            {formatUSD(estimate.high)}
          </div>
          <div className="mt-3 text-sm text-primary-foreground/70">
            {cfg.label} · {tierObj.label} · {sqft} {cfg.unit}
          </div>

          <div className="mt-6 space-y-2 border-t border-primary-foreground/15 pt-5 text-sm">
            <Row k="Base scope" v={formatUSD(cfg.base * tierObj.mult)} />
            <Row k={`Per ${cfg.unit}`} v={`${formatUSD(cfg.perSqft * tierObj.mult)} / ${cfg.unit}`} />
            <Row k="Tier multiplier" v={`× ${tierObj.mult.toFixed(1)}`} />
          </div>

          <Button
            asChild
            className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90"
            size="lg"
          >
            <Link to="/contact">Request a precise quote</Link>
          </Button>

          <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-primary-foreground/60">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            Calculations run securely in your browser
          </div>
        </aside>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-primary-foreground/70">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
