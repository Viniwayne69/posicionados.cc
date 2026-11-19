import { CONFIG } from "@/config/site";
import { CTA_LABEL, FOOTER, HERO, NAV_LINKS } from "@/content/sections";
import { ContactLink } from "@/components/ui/ContactLink";
import { Ghost } from "@/components/ui/Ghost";
import { LogoHorizontal } from "@/components/ui/Symbol";

/**
 * Rodapé em três blocos claros: marca, navegação e contato.
 * Embaixo, uma linha com direitos, assinatura e voltar ao topo.
 */
export function Footer() {
  return (
    <footer className="footer theme-dark" aria-labelledby="footer-title">
      <Ghost className="ghost--footer" />

      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h2 id="footer-title" className="footer__logo">
              <LogoHorizontal />
              <span className="visually-hidden">{CONFIG.brand}</span>
            </h2>
            <p className="footer__tagline">{FOOTER.tagline}</p>
          </div>

          <nav className="footer__col" aria-label="Rodapé">
            <p className="label footer__heading">Navegação</p>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a className="footer__link" href={`#${link.id}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="label footer__heading">Contato</p>
            <ul className="footer__list">
              <li>
                <ContactLink className="footer__link">{CTA_LABEL}</ContactLink>
              </li>
              <li>
                <a
                  className="footer__link"
                  href={CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONFIG.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {CONFIG.year} {CONFIG.brand}
          </p>
          <p className="footer__sign">{HERO.top[1]}</p>
          <a className="footer__top-link" href="#topo">
            Voltar ao topo
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
