/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * Único lugar para trocar contato, domínio e identificação.
 *
 * - whatsapp: somente dígitos com DDI, ex: "5581999999999"
 *   Vazio = todos os botões de contato levam ao Instagram.
 *   Também pode ser definido por variável de ambiente NEXT_PUBLIC_WHATSAPP.
 */
export const CONFIG = {
  instagram: "https://instagram.com/posicionados.cc",
  instagramHandle: "@posicionados.cc",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://posicionados.cc",
  brand: "Posicionados",
  year: 2026,
} as const;

export const SITE = {
  title: "Posicionados · Brand Agency | Catálogo de captação e conteúdo digital",
  description:
    "Catálogo de captação e conteúdo digital da Posicionados: Reels, carrosséis, fotografia e direção criativa para marcas que querem se destacar da multidão.",
} as const;
