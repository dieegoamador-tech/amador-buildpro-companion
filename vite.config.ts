import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Cloudflare plugin disabled — using Vercel preset via Nitro
export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
});
