import { Fragment, type CSSProperties } from "react";

type WordsProps = {
  text: string;
  /** Índice da primeira palavra (continua a contagem de um trecho anterior no mesmo título) */
  from?: number;
  /** "mask": sobe de dentro de uma máscara (títulos). "fade": acende palavra a palavra (texto corrido). */
  mode?: "mask" | "fade";
};

/** Quantidade de palavras de um trecho, para continuar a contagem no trecho seguinte. */
export const countWords = (text: string) => text.split(" ").filter(Boolean).length;

/**
 * Divide um texto em palavras, cada uma com seu índice (--wi), para animar
 * em cascata no reveal (mask) ou acompanhando o scroll (fade). Renderizado no servidor,
 * então não há troca de DOM na hidratação.
 */
export function Words({ text, from = 0, mode = "mask" }: WordsProps) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => {
        const style = { "--wi": from + i } as CSSProperties;
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            {mode === "mask" ? (
              <span className="w" style={style}>
                <span className="w__i">{word}</span>
              </span>
            ) : (
              <span className="wf" style={style}>
                {word}
              </span>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
