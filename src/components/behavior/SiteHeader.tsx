"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { stagger } from "@/lib/stagger";

type NavLink = { readonly id: string; readonly label: string };

type SiteHeaderProps = {
  logo: ReactNode;
  links: readonly NavLink[];
  /** Botão de contato do cabeçalho (desktop) */
  cta: ReactNode;
  /** Botão de contato dentro do menu mobile */
  menuCta: ReactNode;
  /** Link do Instagram dentro do menu mobile */
  handle: ReactNode;
};

const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * Cabeçalho fixo: transparente sobre o hero, ganha fundo + blur ao rolar.
 * Destaca o link da seção visível e controla o menu mobile em tela cheia
 * (ESC, foco preso, rolagem do body bloqueada).
 */
export function SiteHeader({ logo, links, cta, menuCta, handle }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Estado do cabeçalho ao rolar
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Link ativo conforme a seção visível (faixa estreita no meio da tela)
  useEffect(() => {
    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  const close = useCallback(() => setOpen(false), []);

  // Menu aberto: bloqueia rolagem, prende foco, ESC fecha
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previousHtml = html.style.overflow;
    const previousBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    wasOpen.current = true;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (!panel.contains(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 64em)").matches) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      html.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
    };
  }, [open]);

  // Ao fechar, devolve o foco ao botão do menu
  useEffect(() => {
    if (!open && wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  // Link do menu: fecha o painel e rola até a seção depois de liberar o body
  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
      window.history.pushState(null, "", `#${id}`);
    }, 60);
  };

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="container header__inner">
        {logo}

        <nav className="header__nav" aria-label="Principal">
          {links.map((link) => (
            <a
              key={link.id}
              className="nav-link"
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__cta">{cta}</div>

        <button
          ref={toggleRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <span className="menu-btn__bars" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={panelRef}
        id="menu-mobile"
        className="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open}
        inert={!open}
      >
        <div className="menu__top">
          {logo}
          <button ref={closeRef} type="button" className="menu__close" onClick={close}>
            <span>Fechar</span>
            <span className="menu__x" aria-hidden="true" />
          </button>
        </div>

        <nav className="menu__nav" aria-label="Menu principal">
          {links.map((link, index) => (
            <a
              key={link.id}
              className="menu__link"
              href={`#${link.id}`}
              style={stagger(index)}
              aria-current={active === link.id ? "true" : undefined}
              onClick={(event) => goTo(event, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="menu__foot">
          {menuCta}
          {handle}
        </div>
      </div>
    </header>
  );
}
