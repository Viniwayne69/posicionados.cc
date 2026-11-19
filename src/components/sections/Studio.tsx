import { STUDIO } from "@/content/sections";
import { stagger } from "@/lib/stagger";
import { StudioGroups } from "@/components/behavior/StudioGroups";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Words } from "@/components/ui/Words";

export function Studio() {
  return (
    <section id="estudio" className="section studio theme-sand" aria-labelledby="studio-title">
      <div className="container">
        <div className="studio__intro">
          <div className="studio__arch" data-scrub="0.98,0.45">
            <ImageSlot
              className="slot--arch"
              src="/img/estudio-arco.webp"
              alt="Ambiente do Studio Mob, em Recife, com mobiliário e iluminação de estúdio"
              width={1024}
              height={1536}
            />
          </div>

          <div className="studio__copy">
            <h2 id="studio-title" className="title" data-reveal="words" style={stagger(1)}>
              <Words text="O estúdio onde sua marca é" />{" "}
              <strong className="em">
                <Words text="produzida" from={6} />
              </strong>
            </h2>
            <div className="prose" data-reveal style={stagger(2)}>
              {STUDIO.text.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal>
          <StudioGroups groups={STUDIO.groups} />
        </div>

        <div className="hours" data-reveal>
          <div className="hours__head">
            <h3 id="hours-title" className="hours__title">
              {STUDIO.hours.title}
            </h3>
            <p className="label">{STUDIO.hours.place}</p>
          </div>

          <table className="hours__table" aria-labelledby="hours-title">
            <tbody>
              {STUDIO.hours.rows.map(([day, time]) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="hours__notes">
            {STUDIO.hours.notes.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
