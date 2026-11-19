import { FEATURED_LABEL, PACKAGES } from "@/content/packages";
import { PACKAGES_INTRO as INTRO } from "@/content/sections";
import { packageMessage } from "@/lib/contact";
import { stagger } from "@/lib/stagger";
import { AccordionGroup, type AccordionItem } from "@/components/behavior/AccordionGroup";
import { ContactLink } from "@/components/ui/ContactLink";
import { Words, countWords } from "@/components/ui/Words";

const items: AccordionItem[] = PACKAGES.map((pkg) => ({
  id: pkg.id,
  featured: pkg.featured,
  header: (
    <>
      <span className="pkg__main">
        {pkg.featured && <span className="pkg__flag">{FEATURED_LABEL}</span>}
        <span className="pkg__name">{pkg.name}</span>
        <span className="pkg__summary">{pkg.summary}</span>
      </span>
      <span className="pkg__price">{pkg.price}</span>
    </>
  ),
  panel: (
    <div className="pkg__panel">
      <div className="pkg__intro">
        <p className="pkg__opening">{pkg.opening}</p>
        <div className="pkg__text">
          {pkg.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="pkg__meta">
        <dl className="pkg__facts">
          <div>
            <dt className="label label--accent">{INTRO.labels.deliverables}</dt>
            <dd>
              <ul className="pkg__list">
                {pkg.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label label--accent">{INTRO.labels.studioTime}</dt>
            <dd>{pkg.studioTime}</dd>
          </div>
          <div>
            <dt className="label label--accent">{INTRO.labels.audience}</dt>
            <dd>{pkg.audience}</dd>
          </div>
        </dl>
        <div>
          <ContactLink className="text-link" message={packageMessage(pkg.name)}>
            {INTRO.labels.cta}
          </ContactLink>
        </div>
      </div>
    </div>
  ),
}));

export function Packages() {
  return (
    <section
      id="pacotes"
      className="section packages theme-cream"
      aria-labelledby="packages-title"
    >
      <div className="container">
        <header className="packages__head">
          <h2 id="packages-title" className="title" data-reveal="words" style={stagger(1)}>
            <Words text={INTRO.titleStart} />{" "}
            <strong className="em">
              <Words text={INTRO.emphasis} from={countWords(INTRO.titleStart)} />
            </strong>
          </h2>
          <p className="section-head__sub" data-reveal style={stagger(2)}>
            {INTRO.subtitle}
          </p>
        </header>

        <div data-reveal>
          <AccordionGroup items={items} idPrefix="pkg" triggerClassName="pkg__trigger" />
        </div>

        <div className="packages__closing" data-reveal>
          <p>
            {INTRO.closing} <strong className="em">{INTRO.closingEmphasis}</strong>
          </p>
        </div>

        <div className="packages__notes" data-reveal>
          {INTRO.notes.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
