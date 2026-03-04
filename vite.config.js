import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    vitePluginSitemap({
      hostname: "https://yourdomain.com",
      routes: [
        "/",
        "/about",
        "/portfolio",
        "/skills",
        "/experience",
        "/contact",
      ],
      exclude: ["/404"],
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: {
        "/": 1.0,
        "/about": 0.8,
        "/portfolio": 0.9,
        "/skills": 0.8,
        "/experience": 0.8,
        "/contact": 0.7,
      },
    }),
  ],
});
