import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createContactHandler, createResendTransport } from "./server/contact";
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const handler = createContactHandler({
    send: createResendTransport(env),
    origin: env.CONTACT_ORIGIN,
  });
  return {
    plugins: [
      react(),
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
