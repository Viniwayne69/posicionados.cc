import type { ReactNode } from "react";
import { contactHref } from "@/lib/contact";

/**
 * Botão/link de contato. O destino (WhatsApp ou Instagram) vem de CONFIG
 * e já sai resolvido no HTML, então funciona mesmo sem JavaScript.
 */
export function ContactLink({
  message,
  className,
  children,
}: {
  message?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={contactHref(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
