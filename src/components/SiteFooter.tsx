import { Link } from "@tanstack/react-router";
import { HardHat, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-content-center rounded-md bg-background/10">
              <HardHat className="h-5 w-5 text-gold" />
            </span>
            <span className="font-display text-xl font-bold">
              Amador <span className="text-gold">BuildPro</span> Inc.
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            Premium renovation and construction services. Fully licensed, bonded, and insured —
            delivering craftsmanship homeowners trust.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Licensed · Bonded · Insured
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/calculator" className="hover:text-gold">Price Calculator</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> (647) 882-5443</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> jamadorperez8@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Serving all GTA, Toronto</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 text-xs text-primary-foreground/60 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Amador BuildPro Inc. All rights reserved.</span>
          <span>License #ABP-2024 · Insured by Hartford Construction</span>
        </div>
      </div>
    </footer>
  );
}
