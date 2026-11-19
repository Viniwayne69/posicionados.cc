import { readFileSync } from "node:fs";
import path from "node:path";

export type SvgData = {
  viewBox: string;
  width: number;
  height: number;
  inner: string;
};

/** Arquivos oficiais da marca em public/svg (extraídos do Brand Book 2024). */
export type BrandSvg = "symbol" | "logo-horizontal" | "wordmark" | "wordmark-stack";

const cache = new Map<BrandSvg, SvgData>();

/**
 * Lê um SVG oficial de public/svg em tempo de build (fonte única de cada peça).
 * Extrai viewBox e conteúdo para montar os <symbol> usados em todo o site e no favicon.
 * Roda apenas no servidor / durante o build.
 */
export function getBrandSvg(name: BrandSvg): SvgData {
  const hit = cache.get(name);
  if (hit) return hit;

  const file = path.join(process.cwd(), "public", "svg", `${name}.svg`);
  const raw = readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");

  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 100";
  const [, , w, h] = viewBox.split(/\s+/).map(Number);
  const inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();

  const data = { viewBox, width: w || 100, height: h || 100, inner };
  cache.set(name, data);
  return data;
}

export const getSymbol = () => getBrandSvg("symbol");
