import { CONFIG } from "@/config/site";
import { HERO } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { Ghost } from "@/components/ui/Ghost";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Symbol } from "@/components/ui/Symbol";
import { Words, countWords } from "@/components/ui/Words";

export function Hero() {
  return (
    <section id="topo" className="hero theme-terra" aria-labelledby="hero-title" data-hero>
      <div className="hero__bg" aria-hidden="true" />
      <Ghost className="ghost--hero" />

      <div className="grain" aria-hidden="true" />

      <div className="container hero__meta hero__meta--top">
        <span className="hero__corner" aria-hidden="true" />
        <span className="label hero__tagline">{HERO.top[1]}</span>
        <span className="hero__corner" aria-hidden="true" />
      </div>

      <div className="container hero__main">
        <div className="hero__content">
          <div data-reveal>
            <Symbol className="hero__mark" />
          </div>
          <h1 id="hero-title" className="hero__title" data-reveal="words" style={stagger(1)}>
            <Words text={HERO.lineOne} />{" "}
            <strong className="em">
              <Words text={HERO.emphasis} from={countWords(HERO.lineOne)} />
            </strong>
          </h1>
        </div>

        <div className="hero__photo">
          <ImageSlot
            className="slot--portrait"
            src="/img/hero.webp"
            alt="Homem sentado numa cadeira, lendo um jornal que cobre o rosto, diante de um círculo de luz com o símbolo da Posicionados"
            width={1122}
            height={1402}
            priority
          />
        </div>
      </div>

      <div className="container hero__meta hero__meta--bottom">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <a
          className="label hero__link"
          href={CONFIG.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONFIG.instagramHandle}
        </a>
      </div>
    </section>
  );
}
