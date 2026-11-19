import type { CSSProperties } from "react";
import { CONCEPT } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { Ghost } from "@/components/ui/Ghost";
import { Words, countWords } from "@/components/ui/Words";

const CONCEPT_WORDS = CONCEPT.text.reduce((n, t) => n + countWords(t), 0);

export function Concept() {
  return (
    <section className="section concept theme-cream" aria-labelledby="concept-title">
      <Ghost className="ghost--concept" />

      <div className="container concept__inner">
        <p className="label label--accent" data-reveal>
          {CONCEPT.label}
        </p>
        <h2
          id="concept-title"
          className="title concept__title"
          data-reveal="words"
          style={stagger(1)}
        >
          <Words text={CONCEPT.titleStart} />{" "}
          <strong className="em">
            <Words text={CONCEPT.emphasis} from={countWords(CONCEPT.titleStart)} />
          </strong>
        </h2>
        <div
          className="prose concept__text"
          data-scrub="0.9,0.35"
          style={{ "--wn": CONCEPT_WORDS } as CSSProperties}
        >
          {CONCEPT.text.map((line, i) => (
            <p key={line}>
              <Words
                text={line}
                mode="fade"
                from={CONCEPT.text.slice(0, i).reduce((n, t) => n + countWords(t), 0)}
              />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
