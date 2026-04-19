import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the virtual assistant for Amador BuildPro Inc., a professional renovation and construction company.

Your job is to answer questions from prospective clients in a clear, friendly, and professional tone.

You can answer questions about:
- Services offered: kitchen remodels, bathroom remodels, flooring installation, interior & exterior painting, general home renovation.
- Typical project process: free consultation, on-site assessment, detailed written quote, scheduling, execution with licensed crew, final walkthrough, warranty.
- Typical timelines (give realistic ranges, not exact promises): bathroom 2-4 weeks, kitchen 4-8 weeks, flooring 3-7 days per area, painting 2-5 days per room.
- Areas served: greater metropolitan area (residential and light commercial).
- Licensing & insurance: Amador BuildPro Inc. is fully licensed, bonded, and insured.
- Warranty: 1-year workmanship warranty on all completed work.
- How to request a free quote: use the on-site Price Calculator for an instant estimate, or visit the Contact page.

Important rules:
- Never invent specific prices. Direct pricing questions to the Price Calculator on the website or to a free consultation.
- Never promise specific start dates. Suggest scheduling a consultation.
- Never collect sensitive personal info (SSN, payment details). Name, email, phone, and project description are fine if the user volunteers them.
- If asked something unrelated to renovation or the company, politely steer the conversation back.
- Keep replies concise (2-5 short paragraphs max) and use light markdown when helpful.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
