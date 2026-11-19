import { Ghost } from "@/components/ui/Ghost";
import { PRESENCE } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { Words } from "@/components/ui/Words";

export function Presence() {
  return (
    <section
      id="presenca"
      className="section presence theme-terra"
      aria-labelledby="presence-title"
    >
      <div className="grain" aria-hidden="true" />
      <Ghost className="ghost--presence" />

      <div className="container">
        <header className="presence__head">
          <h2 id="presence-title" className="title" data-reveal="words" style={stagger(1)}>
            <Words text="Formatos que dão" />{" "}
            <strong className="em">
              <Words text="presença" from={3} />
            </strong>{" "}
            <Words text="à marca" from={4} />
          </h2>
        </header>

        <ul className="presence__grid">
          {PRESENCE.items.map((item, index) => (
            <li key={item.name} className="presence__item" data-reveal="tilt" style={stagger(index)}>
              <h3 className="presence__name">{item.name}</h3>
              <p className="presence__tagline">{item.tagline}</p>
              <p className="presence__text">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="presence__closing" data-reveal>
          <p>{PRESENCE.closing[0]}</p>
          <p>{PRESENCE.closing[1]}</p>
        </div>
      </div>
    </section>
  );
}
