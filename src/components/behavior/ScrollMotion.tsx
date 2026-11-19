"use client";

import { useEffect } from "react";

/**
 * Motor de animação ligada ao scroll. Só calcula números e os entrega ao CSS
 * como variáveis (--hp, --p, --pd, --lit, --seg, --sp); todo o visual vive em motion.css.
 *
 * - Um único listener de scroll, agrupado em requestAnimationFrame.
 * - Só escreve no DOM quando o valor mudou.
 * - Não roda com prefers-reduced-motion (o CSS mostra o estado final).
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const fmt = (v: number) => Math.round(v * 1000) / 1000;

type Tracked = { el: HTMLElement; last: number };

function write(t: Tracked, name: string, value: number) {
  const v = fmt(value);
  if (v === t.last) return;
  t.last = v;
  t.el.style.setProperty(name, String(v));
}

export function ScrollMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const root = document.documentElement;

    // Progresso de elemento entrando na tela: data-scrub="inicio,fim" (frações da altura da tela)
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]")).map((el) => {
      const [s, e] = (el.dataset.scrub ?? "").split(",").map(Number);
      return {
        t: { el, last: -1 } as Tracked,
        start: Number.isFinite(s) && s ? s : 0.95,
        end: Number.isFinite(e) && e ? e : 0.4,
      };
    });

    // Profundidade: distância do centro do elemento ao centro da tela (-1 a 1)
    const depths: Tracked[] = Array.from(document.querySelectorAll<HTMLElement>("[data-pd]")).map(
      (el) => ({ el, last: -9 }),
    );

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const heroT: Tracked | null = hero ? { el: hero, last: -1 } : null;

    const timeline = document.querySelector<HTMLElement>("[data-timeline]");
    const steps = timeline ? (Array.from(timeline.children) as HTMLElement[]) : [];
    const stepT = steps.map((el) => ({ lit: { el, last: -1 } as Tracked, seg: { el, last: -1 } as Tracked }));

    let spLast = -1;
    let frame = 0;

    const tick = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      // Barra de progresso da página
      const max = root.scrollHeight - vh;
      const sp = fmt(max > 0 ? clamp(y / max) : 0);
      if (sp !== spLast) {
        spLast = sp;
        root.style.setProperty("--sp", String(sp));
      }

      // Hero: 0 no topo, 1 quando sai da tela
      if (heroT) write(heroT, "--hp", clamp(y / (vh * 0.9)));

      for (const s of scrubs) {
        const r = s.t.el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) {
          // Fora de vista: fixa no extremo mais próximo
          write(s.t, "--p", r.top > vh ? 0 : 1);
          continue;
        }
        write(s.t, "--p", clamp((vh * s.start - r.top) / (vh * (s.start - s.end))));
      }

      for (const d of depths) {
        const r = d.el.getBoundingClientRect();
        const dist = (r.top + r.height / 2 - vh / 2) / vh;
        if (Math.abs(dist) > 2.2) continue;
        write(d, "--pd", clamp(dist, -1.6, 1.6));
      }

      // Linha do tempo do processo: peças acendem em sequência
      if (timeline && steps.length) {
        const r = timeline.getBoundingClientRect();
        const wide = window.innerWidth >= 900;
        const n = steps.length;
        const progress = wide
          ? (vh * 0.82 - r.top) / (vh * 0.5)
          : (vh * 0.68 - r.top) / (r.height * 0.9);
        const t = clamp(progress) * (n - 0.5);
        stepT.forEach((s, i) => {
          write(s.lit, "--lit", clamp((t - i) * 2));
          write(s.seg, "--seg", clamp((t - i - 0.5) * 2));
        });
      }
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
    request();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("load", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
