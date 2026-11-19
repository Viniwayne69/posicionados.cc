import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { CONFIG, SITE } from "@/config/site";

// CSS na ordem: tokens, base, layout, componentes, responsivo
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/responsive.css";
import "@/styles/motion.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const OG_IMAGE = { url: "/img/og.jpg", width: 1200, height: 630, alt: "Posicionados · Brand Agency" };

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: SITE.title,
  description: SITE.description,
  applicationName: CONFIG.brand,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: CONFIG.brand,
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#222121",
  width: "device-width",
  initialScale: 1,
};

// Marca o <html> com .js antes da pintura: o reveal só esconde conteúdo quando há JS
const JS_FLAG = "document.documentElement.classList.add('js')";

// Reveal ao rolar (IntersectionObserver). Inline para funcionar antes da hidratação.
const REVEAL = `(function(){var els=document.querySelectorAll('[data-reveal]');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.setAttribute('data-revealed','')});return}var io=new IntersectionObserver(function(list){list.forEach(function(en){if(en.isIntersecting){en.target.setAttribute('data-revealed','');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});els.forEach(function(e){io.observe(e)})})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: REVEAL }} />
      </body>
    </html>
  );
}
