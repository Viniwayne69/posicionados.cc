import { CONFIG } from "@/config/site";
import { FOOTER } from "@/content/sections";
import { Ghost } from "@/components/ui/Ghost";
import { Symbol, Wordmark, WordmarkStack } from "@/components/ui/Symbol";

export function Footer() {
  return (
    <footer className="footer theme-dark">
      <Ghost className="ghost--footer" />

      <div className="container">
        <Symbol className="footer__symbol" />

        <div className="footer__sign" role="img" aria-label={`${CONFIG.brand}, Brand Agency`}>
          <WordmarkStack className="footer__stack" />
          <span className="footer__line" aria-hidden="true" />
          <Wordmark className="footer__word" />
          <span className="footer__tag" aria-hidden="true">
            Brand Agency
          </span>
        </div>

        <div className="footer__grid">
          <div>
            <p className="label">{FOOTER.title}</p>
            <p className="footer__tagline">{FOOTER.tagline}</p>
          </div>
          <a
            className="label footer__handle"
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONFIG.instagramHandle}
          </a>
          <p className="label">
            © {CONFIG.year} {CONFIG.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
