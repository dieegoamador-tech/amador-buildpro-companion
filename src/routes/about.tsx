import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Users, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Amador BuildPro Inc." },
      {
        name: "description",
        content:
          "Family-owned renovation company with 5+ years of experience. Licensed, bonded and insured.",
      },
      { property: "og:title", content: "About Amador BuildPro Inc." },
      {
        property: "og:description",
        content: "5+ years of premium renovation craftsmanship.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, t: "Integrity", d: "Fixed quotes. No surprise change orders. Always." },
  { icon: Award, t: "Craftsmanship", d: "Senior trades on every job — no rotating subs." },
  { icon: Users, t: "Communication", d: "Daily site updates and a dedicated project manager." },
  { icon: Heart, t: "Care", d: "We protect your home like it's our own." },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            About us
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold max-w-3xl">
            Built by a family. Trusted by hundreds of homeowners.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Founded in 2022 by the Amador family, Amador BuildPro Inc. has grown from a two-man
            crew into one of the metro's most-trusted residential renovation contractors — without
            ever losing the small-shop attention to detail.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <h2 className="font-display text-3xl font-bold">Our story</h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              What started as a small family carpentry shop has become a full-service renovation
              firm completing 60+ projects a year. We grew the way we build — slowly, intentionally,
              and with relationships that last.
            </p>
            <p>
              Every Amador BuildPro project is led by a senior project manager and staffed by
              tradespeople with an average of 10+ years of experience. We self-perform carpentry,
              tile, and finish work — the trades where shortcuts show.
            </p>
            <p>
              Today, we're proud to be fully licensed, bonded, and insured, with a 4.9-star average
              rating from over 200 verified homeowner reviews.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.t} className="rounded-xl border border-border bg-card p-6">
              <v.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
