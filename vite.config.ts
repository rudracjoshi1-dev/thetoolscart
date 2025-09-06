

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Get the host from environment variables (Replit sets it)
const REPLIT_HOST = process.env.REPL_HOST || "";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: Number(process.env.PORT) || 5000,  // Replit expects 5000
    allowedHosts: REPLIT_HOST ? [REPLIT_HOST] : "all", // allow Replit host
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // keep for dev only
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
