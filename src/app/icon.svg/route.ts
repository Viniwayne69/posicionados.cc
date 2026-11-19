import { getSymbol } from "@/lib/symbol";

export const dynamic = "force-static";

/** Favicon gerado a partir de public/svg/symbol.svg (fonte única do símbolo). */
export function GET() {
  const { viewBox, inner } = getSymbol();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="#b9705a" color="#b9705a">${inner}</svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
