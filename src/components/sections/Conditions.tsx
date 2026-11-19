import {
  CONDITIONS,
  CONDITIONS_INTRO as INTRO,
  type ConditionBlock,
} from "@/content/conditions";
import { stagger } from "@/lib/stagger";
import { Words, countWords } from "@/components/ui/Words";
import { AccordionGroup, type AccordionItem } from "@/components/behavior/AccordionGroup";

function Block({ block }: { block: ConditionBlock }) {
  switch (block.type) {
    case "lead":
      return <p className="cond__lead">{block.text}</p>;
    case "text":
      return (
        <div className="cond__text">
          {block.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    case "list":
      return (
        <ul className="cond__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "rows":
      return (
        <ul className="cond__rows">
          {block.rows.map(([label, text]) => (
            <li key={label}>
              <strong>{label}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );
    case "notes":
      return (
        <div className="cond__notes">
          {block.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
  }
}

const items: AccordionItem[] = CONDITIONS.map((group) => ({
  id: group.id,
  header: <span className="cond__title">{group.title}</span>,
  panel: (
    <div className="cond__body">
      {group.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  ),
}));

export function Conditions() {
  return (
    <section
      id="condicoes"
      className="section conditions theme-cream"
      aria-labelledby="conditions-title"
    >
      <div className="container conditions__layout">
        <header className="conditions__head">
          <h2 id="conditions-title" className="title" data-reveal="words" style={stagger(1)}>
            <Words text={INTRO.titleStart} />{" "}
            <strong className="em">
              <Words text={INTRO.emphasis} from={countWords(INTRO.titleStart)} />
            </strong>
          </h2>
        </header>

        <div data-reveal style={stagger(2)}>
          <AccordionGroup items={items} idPrefix="cond" triggerClassName="cond__trigger" />
        </div>
      </div>
    </section>
  );
}
