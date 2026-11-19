import { getBrandSvg, type BrandSvg } from "@/lib/symbol";

const PIECES: BrandSvg[] = ["symbol", "logo-horizontal", "wordmark", "wordmark-stack"];

type PieceProps = { className?: string };

function Piece({ name, className }: PieceProps & { name: BrandSvg }) {
  const { viewBox } = getBrandSvg(name);
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true" focusable="false">
      <use href={`#brand-${name}`} />
    </svg>
  );
}

/** Símbolo da marca (P + pin). Todo uso passa pelo sprite montado de public/svg. */
export const Symbol = (props: PieceProps) => <Piece name="symbol" {...props} />;
/** Logo horizontal oficial: símbolo + "Posicionados". */
export const LogoHorizontal = (props: PieceProps) => <Piece name="logo-horizontal" {...props} />;
/** Nome "Posicionados" em uma linha (lettering oficial). */
export const Wordmark = (props: PieceProps) => <Piece name="wordmark" {...props} />;
/** Nome em três linhas: Posi / ciona / dos. */
export const WordmarkStack = (props: PieceProps) => <Piece name="wordmark-stack" {...props} />;

/** Sprite com todos os <symbol> da marca. Renderizado uma vez no topo da página. */
export function SymbolSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      {PIECES.map((name) => {
        const { viewBox, inner } = getBrandSvg(name);
        return (
          <symbol
            key={name}
            id={`brand-${name}`}
            viewBox={viewBox}
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        );
      })}
    </svg>
  );
}
