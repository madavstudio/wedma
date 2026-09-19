import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createContactHandler, createResendTransport } from "./server/contact";
import siteConfig from "./config/site.json";
import { normaliseSiteUrl, siteMetadataPlugin } from "./scripts/site-metadata";
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const siteUrl = normaliseSiteUrl(
    env.SITE_URL || (vercelHost ? `https://${vercelHost}/` : siteConfig.url),
  );
  const handler = createContactHandler({
    send: createResendTransport(env),
    origin: env.CONTACT_ORIGIN,
  });
  return {
    base: new URL(siteUrl).pathname,
    define: { "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl) },
    plugins: [
      react(),
      siteMetadataPlugin(siteUrl),
      {
        name: "wedma-contact-api",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.split("?")[0] === "/api/contact")
              void handler(req, res);
            else next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.split("?")[0] === "/api/contact")
              void handler(req, res);
            else next();
          });
        },
      },
    ],
  };
});
