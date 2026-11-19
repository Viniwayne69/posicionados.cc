import { CLOSING, CTA_LABEL } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { ContactLink } from "@/components/ui/ContactLink";
import { Ghost } from "@/components/ui/Ghost";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Words, countWords } from "@/components/ui/Words";

export function Closing() {
  return (
    <section id="contato" className="closing theme-dark" aria-labelledby="closing-title">
      <div className="grain" aria-hidden="true" />
      <Ghost className="ghost--closing" />

      <div className="closing__media" data-pd>
        <ImageSlot
          src="/img/fechamento.webp"
          alt="Cavalo de xadrez terracota em close, sobre fundo escuro"
          width={1536}
          height={1024}
        />
      </div>

      <div className="closing__body">
        <p className="label label--accent" data-reveal>
          {CLOSING.label}
        </p>
        <h2
          id="closing-title"
          className="title closing__title"
          data-reveal="words"
          style={stagger(1)}
        >
          <Words text={CLOSING.titleStart} />{" "}
          <strong className="em">
            <Words text={CLOSING.emphasis} from={countWords(CLOSING.titleStart)} />
          </strong>
          {CLOSING.titleEnd}
        </h2>
        <div className="prose closing__text" data-reveal style={stagger(2)}>
          {CLOSING.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div data-reveal style={stagger(3)}>
          <ContactLink className="btn">{CTA_LABEL}</ContactLink>
        </div>
      </div>
    </section>
  );
}
