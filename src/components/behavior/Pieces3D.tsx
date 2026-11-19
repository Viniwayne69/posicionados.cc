"use client";

import { useEffect } from "react";

/**
 * Carrega as peças 3D do Processo só quando a seção se aproxima da tela.
 * Até lá (ou se não houver WebGL), ficam as peças em traço SVG.
 */
export function Pieces3D() {
  useEffect(() => {
    const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>("canvas[data-piece]"));
    const host = canvases[0]?.closest<HTMLElement>(".process__steps");
    if (!host) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        import("@/lib/chess3d")
          .then(({ mountChess }) => {
            if (!cancelled) cleanup = mountChess(canvases, host);
          })
          .catch(() => {
            /* sem WebGL: continuam as peças em SVG */
          });
      },
      { rootMargin: "700px 0px" },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return null;
}
