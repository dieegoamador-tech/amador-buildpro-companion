import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Cloudflare plugin disabled — using Vercel preset via Nitro
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: {
      preset: "vercel"
    }
  }
});
