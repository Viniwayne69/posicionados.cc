import { CONFIG } from "@/config/site";
import { CTA_LABEL, NAV_LINKS } from "@/content/sections";
import { contactHref } from "@/lib/contact";
import { MobileCta } from "@/components/behavior/MobileCta";
import { ScrollMotion } from "@/components/behavior/ScrollMotion";
import { SiteHeader } from "@/components/behavior/SiteHeader";
import { Closing } from "@/components/sections/Closing";
import { Concept } from "@/components/sections/Concept";
import { Conditions } from "@/components/sections/Conditions";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { Presence } from "@/components/sections/Presence";
import { Process } from "@/components/sections/Process";
import { Studio } from "@/components/sections/Studio";
import { ContactLink } from "@/components/ui/ContactLink";
import { Logo } from "@/components/ui/Logo";
import { SymbolSprite } from "@/components/ui/Symbol";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <SymbolSprite />
      <div className="scroll-progress" aria-hidden="true" />

      <SiteHeader
        logo={<Logo />}
        links={NAV_LINKS}
        cta={
          <ContactLink className="btn btn--sm">{CTA_LABEL}</ContactLink>
        }
        menuCta={<ContactLink className="btn">{CTA_LABEL}</ContactLink>}
        handle={
          <a
            className="menu__handle"
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONFIG.instagramHandle}
          </a>
        }
      />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Concept />
        <Presence />
        <Packages />
        <Studio />
        <Process />
        <Conditions />
        <Closing />
      </main>

      <Footer />

      <MobileCta href={contactHref()} label={CTA_LABEL} />
      <ScrollMotion />
    </>
  );
}
