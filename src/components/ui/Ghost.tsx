import { Symbol } from "./Symbol";

/**
 * Elemento gráfico da marca: o símbolo gigante, tom sobre tom, cortado pela borda
 * e levemente inclinado (como nas aplicações do Brand Book). Posição e tamanho vêm do CSS.
 */
export function Ghost({ className = "" }: { className?: string }) {
  return (
    <div className={`ghost ${className}`.trim()} aria-hidden="true" data-pd>
      <Symbol />
    </div>
  );
}
