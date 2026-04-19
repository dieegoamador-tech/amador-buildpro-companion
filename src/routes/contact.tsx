import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Amador BuildPro Inc." },
      {
        name: "description",
        content:
          "Get in touch with Amador BuildPro Inc. for a free renovation consultation and detailed written quote.",
      },
      { property: "og:title", content: "Contact Amador BuildPro Inc." },
      {
        property: "og:description",
        content: "Free consultations. Detailed written quotes. Licensed & insured.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(30)
    .regex(/^[0-9+\-()\s]+$/, "Phone can only contain digits, spaces and ()-+"),
  project: z.string().trim().min(1, "Please choose a project type").max(80),
  message: z.string().trim().min(10, "Please add a brief description").max(1500),
});

const PROJECT_OPTIONS = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Flooring",
  "Interior painting",
  "Exterior painting",
  "Other",
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      project: String(fd.get("project") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert([raw]);
      if (error) throw error;
      
      setSuccess(true);
      toast.success("Request sent — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Get in touch
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            Let's plan your renovation.
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Tell us about your project. We'll respond within one business day to schedule a free
            on-site consultation and a detailed written quote.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          {success ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
              <h2 className="mt-4 font-display text-2xl font-bold">Thanks — message received!</h2>
              <p className="mt-2 text-muted-foreground">
                A senior project manager will reach out within one business day.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name" error={errors.name}>
                  <Input id="name" name="name" maxLength={100} autoComplete="name" required />
                </Field>
                <Field label="Email" id="email" error={errors.email}>
                  <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" required />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" id="phone" error={errors.phone}>
                  <Input id="phone" name="phone" type="tel" maxLength={30} autoComplete="tel" required />
                </Field>
                <Field label="Project type" id="project" error={errors.project}>
                  <select
                    id="project"
                    name="project"
                    required
                    defaultValue=""
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="" disabled>Select a project…</option>
                    {PROJECT_OPTIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Project description" id="message" error={errors.message}>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1500}
                  placeholder="Tell us about the space, scope, timeline and any inspiration…"
                  required
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-gold text-gold-foreground hover:bg-gold/90"
              >
                {submitting ? "Sending…" : (<><Send className="h-4 w-4" /> Request my free consultation</>)}
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                Your details are validated and sent securely. We never share contact info.
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <ContactCard icon={Phone} title="Call us" lines={["(555) 010-2024", "Mon–Sat · 8am–6pm"]} />
          <ContactCard
            icon={Mail}
            title="Email"
            lines={["hello@amadorbuildpro.com", "Replies within 1 business day"]}
          />
          <ContactCard
            icon={MapPin}
            title="Service area"
            lines={["Greater metro area", "Residential & light commercial"]}
          />
          <div className="rounded-2xl bg-primary text-primary-foreground p-6">
            <ShieldCheck className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-display text-lg font-semibold">
              Licensed · Bonded · Insured
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/75">
              License #ABP-2024 — $2M general liability and active workers' compensation coverage.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof Mail;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex gap-4">
      <div className="grid h-10 w-10 place-content-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div>
        <div className="font-display font-semibold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">{l}</div>
        ))}
      </div>
    </div>
  );
}
