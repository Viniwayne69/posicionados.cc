"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  /** Conteúdo do botão (o ícone +/− é adicionado automaticamente) */
  header: ReactNode;
  panel: ReactNode;
  featured?: boolean;
};

type AccordionGroupProps = {
  items: AccordionItem[];
  /** Prefixo de ids únicos (aria-controls / aria-labelledby) */
  idPrefix: string;
  /** Classe do botão: define o layout do cabeçalho de cada linha */
  triggerClassName: string;
  className?: string;
};

/**
 * Acordeão acessível: botão com aria-expanded/aria-controls, um painel aberto por vez,
 * setas/Home/End entre linhas e animação de altura via grid-template-rows (0fr → 1fr).
 */
export function AccordionGroup({
  items,
  idPrefix,
  triggerClassName,
  className = "",
}: AccordionGroupProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    triggers.current[next]?.focus();
  };

  return (
    <div className={`acc ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `${idPrefix}-trigger-${item.id}`;
        const panelId = `${idPrefix}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`acc__item${item.featured ? " acc__item--featured" : ""}`}
          >
            <h3 className="acc__heading">
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                className={`acc__trigger ${triggerClassName}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.header}
                <span className="acc__icon" aria-hidden="true" />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="acc__panel"
              data-open={isOpen}
              inert={!isOpen}
            >
              <div className="acc__clip">
                <div className="acc__content">{item.panel}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
