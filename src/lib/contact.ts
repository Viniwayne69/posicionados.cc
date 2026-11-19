import { CONFIG } from "@/config/site";

/** Mensagem do botão geral */
export const GENERAL_MESSAGE =
  "Olá, vim pelo catálogo da Posicionados e quero conversar sobre meu projeto";

/** Mensagem do botão de pacote */
export const packageMessage = (name: string) =>
  `Olá, vim pelo catálogo da Posicionados e tenho interesse no pacote ${name}`;

const digits = (value: string) => value.replace(/\D/g, "");

/**
 * Monta o destino do botão de contato.
 * - whatsapp preenchido: wa.me com mensagem pré-preenchida
 * - whatsapp vazio: Instagram (fallback)
 * É resolvido na geração do HTML, então o href correto já existe sem JavaScript.
 */
export function contactHref(message: string = GENERAL_MESSAGE): string {
  const phone = digits(CONFIG.whatsapp);
  if (!phone) return CONFIG.instagram;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
