"use client";

import { useEffect, useState } from "react";

type Group = { id: string; title: string; items: string[] };

/**
 * Grupos do estúdio: grade 2x2 no desktop (tudo visível, sem botões)
 * e acordeões no mobile. O modo é escolhido pelo tamanho da tela.
 */
export function StudioGroups({ groups }: { groups: Group[] }) {
  const [accordion, setAccordion] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 56.25em)");
    const sync = () => {
      setAccordion(!query.matches);
      setOpenId(null);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className="acc studio__groups">
      {groups.map((group) => {
        const isOpen = accordion ? openId === group.id : true;
        const triggerId = `studio-trigger-${group.id}`;
        const panelId = `studio-panel-${group.id}`;

        const list = (
          <ul className="studio__list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );

        return (
          <div key={group.id} className="acc__item">
            {accordion ? (
              <>
                <h3 className="acc__heading">
                  <button
                    id={triggerId}
                    type="button"
                    className="acc__trigger studio__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : group.id)}
                  >
                    <span className="studio__group-title">{group.title}</span>
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
                    <div className="acc__content">{list}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="studio__static-title">
                  <span className="studio__group-title">{group.title}</span>
                </h3>
                {list}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
