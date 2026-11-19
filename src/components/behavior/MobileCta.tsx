"use client";

import { useEffect, useState } from "react";

/**
 * Pílula fixa de contato (só mobile): aparece depois do hero
 * e some quando a seção de fechamento entra na tela.
 */
export function MobileCta({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const end = document.getElementById("contato");
    if (!hero || !end) return;

    let heroOut = false;
    let endIn = false;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroOut = !entry.isIntersecting;
        else endIn = entry.isIntersecting;
      }
      setVisible(heroOut && !endIn);
    });

    observer.observe(hero);
    observer.observe(end);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className="btn mobile-cta"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-visible={visible}
      inert={!visible}
    >
      {label}
    </a>
  );
}
