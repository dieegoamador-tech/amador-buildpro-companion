import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/calculator", label: "Price Calculator" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-content-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <HardHat className="h-5 w-5 text-gold" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              Amador <span className="text-gold">BuildPro</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Inc. — Renovations
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </nav>

        <button
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                activeProps={{ className: "text-gold bg-accent" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-2 bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Link to="/contact" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
