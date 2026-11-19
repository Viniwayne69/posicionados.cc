import { CONFIG } from "@/config/site";
import { HERO } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { Ghost } from "@/components/ui/Ghost";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Symbol } from "@/components/ui/Symbol";
import { Words } from "@/components/ui/Words";

export function Hero() {
  return (
    <section id="topo" className="hero theme-dark" aria-labelledby="hero-title" data-hero>
      <div className="hero__bg" aria-hidden="true" />
      <Ghost className="ghost--hero" />

      <div className="hero__figure">
        <div className="sun sun--hero" aria-hidden="true" />
        <ImageSlot
          className="slot--cutout"
          src="/img/mulher.webp"
          alt="Silhueta de uma mulher em perfil contra o círculo terracota"
          width={1536}
          height={1154}
          priority
        />
      </div>

      <div className="hero__shade" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container hero__meta hero__meta--top">
        <span className="hero__corner" aria-hidden="true" />
        <span className="label hero__tagline">{HERO.top[1]}</span>
        <span className="label hero__corner">© {CONFIG.year}</span>
      </div>

      <div className="hero__content">
        <div data-reveal>
          <Symbol className="hero__mark" />
        </div>
        <h1 id="hero-title" className="hero__title" data-reveal="words" style={stagger(1)}>
          <Words text={HERO.lineOne} />
          <span className="hero__line">
            <Words text={HERO.lineTwoStart} from={3} />{" "}
            <strong className="em">
              <Words text={HERO.emphasis} from={5} />
            </strong>
          </span>
          <span className="hero__line">
            <Words text={HERO.lineThree} from={6} />
          </span>
        </h1>
      </div>

      <div className="container hero__meta hero__meta--bottom">
        <span aria-hidden="true" />
        <span className="hero__cue" aria-hidden="true" />
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
