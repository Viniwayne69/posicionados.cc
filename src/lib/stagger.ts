import type { CSSProperties } from "react";

/** Atraso escalonado do reveal: cada nível soma 90ms (ver layout.css). */
export const stagger = (index: number): CSSProperties =>
  ({ "--i": index }) as CSSProperties;
