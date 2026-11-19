import { Pieces3D } from "@/components/behavior/Pieces3D";
import { Ghost } from "@/components/ui/Ghost";
import { Words } from "@/components/ui/Words";
import { PROCESS } from "@/content/sections";

/**
 * Peças de xadrez em traço fino, da primeira à última etapa: peão, cavalo, bispo, torre e dama.
 * `d` = caminho, `c` = círculo [cx, cy, r], `eye` = ponto cheio (olho do cavalo).
 * Cada traço tem pathLength=1 para o desenho progressivo (stroke-dashoffset) acompanhar o scroll.
 */
type Part = { d?: string; c?: [number, number, number]; eye?: [number, number, number] };

const PIECES: Part[][] = [
  // Peão
  [
    { c: [12, 6.6, 2.7] },
    { d: "M9.6 10.6h4.8" },
    { d: "M10.6 10.6c0 3.2-1.9 5.2-3.1 8.4h9c-1.2-3.2-3.1-5.2-3.1-8.4" },
    { d: "M6 19h12M5.5 21.5h13" },
  ],
  // Cavalo
  [
    { d: "M7 21h10.5" },
    {
      d: "M8 21c0-3.1.6-5.2 2.5-7.4-1.1.4-2.2 1.1-3.4 1.9L5.4 13.7c-.3-1.4.3-2.5 1.6-3.6L10 6.6l.2-2.1 1.8 1.4c3.6.2 6.2 3.3 6.2 7.5 0 3-.5 5.6-.5 7.6",
    },
    { eye: [11.2, 9.3, 0.45] },
  ],
  // Bispo
  [
    { c: [12, 3.9, 1] },
    { d: "M12 6c3 2.1 4 4.6 4 6.6 0 1.4-1.5 2.4-4 2.4s-4-1-4-2.4C8 10.6 9 8.1 12 6z" },
    { d: "M13.6 9.4l-2.7 2.7" },
    { d: "M10.6 15c0 2-1 3.2-2.1 4h7c-1.1-.8-2.1-2-2.1-4" },
    { d: "M6.5 19h11M6 21.5h12" },
  ],
  // Torre
  [
    {
      d: "M7 3.8h2.3v1.8h1.6V3.8h2.2v1.8h1.6V3.8H17V8l-1.5 1.5v6.5L17 18H7l1.5-2V9.5L7 8z",
    },
    { d: "M5.5 18h13v3h-13z" },
  ],
  // Dama
  [
    { c: [6, 8, 0.9] },
    { c: [12, 5, 0.9] },
    { c: [18, 8, 0.9] },
    { d: "M6.4 9 8.5 17h7l2.1-8-3.6 3-2-6-2 6z" },
    { d: "M7.5 17h9v2.5h-9z" },
    { d: "M6.5 21.5h11" },
  ],
];

function Strokes({ parts, ink }: { parts: Part[]; ink?: boolean }) {
  const len = ink ? { pathLength: 1 } : {};
  return (
    <>
      {parts.map((p, i) => {
        if (p.d) return <path key={i} d={p.d} {...len} />;
        if (p.c) return <circle key={i} cx={p.c[0]} cy={p.c[1]} r={p.c[2]} {...len} />;
        if (p.eye) {
          return ink ? (
            <circle key={i} className="piece__eye" cx={p.eye[0]} cy={p.eye[1]} r={p.eye[2]} />
          ) : null;
        }
        return null;
      })}
    </>
  );
}

export function Process() {
  return (
    <section
      id="processo"
      className="section process theme-dark"
      aria-labelledby="process-title"
    >
      <div className="grain" aria-hidden="true" />
      <Ghost className="ghost--process" />

      <div className="container">
        <h2
          id="process-title"
          className="title process__title"
          data-reveal="words"
        >
          <Words text="Processo" /> <strong className="em"><Words text="criativo" from={1} /></strong>
        </h2>

        <ol className="process__steps">
          {PROCESS.steps.map((step, index) => {
            const parts = PIECES[index % PIECES.length];
            return (
              <li key={step.name} className="step">
                <svg
                  className="step__piece"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <g className="piece__ink">
                    <Strokes parts={parts} ink />
                  </g>
                </svg>
                <canvas className="step__canvas" data-piece={index} aria-hidden="true" />
                <h3 className="step__name">{step.name}</h3>
                <p className="step__text">{step.text}</p>
              </li>
            );
          })}
        </ol>
        <Pieces3D />
      </div>
    </section>
  );
}
