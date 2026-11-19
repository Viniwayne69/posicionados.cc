import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100% estático: gera a pasta /out, que sobe em qualquer hospedagem
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: root,
};

export default nextConfig;
