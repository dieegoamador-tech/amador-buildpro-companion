import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Cloudflare plugin disabled — using Vercel preset for deployment.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: {
      preset: "vercel-edge",
    },
  },
});
