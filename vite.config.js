import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    vitePluginSitemap({
      hostname: "https://yourdomain.com",
      routes: ["/", "/about", "/projects", "/contact"],
    }),
  ],
});
