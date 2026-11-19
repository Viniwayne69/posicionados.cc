import { CONFIG } from "@/config/site";
import { HERO } from "@/content/sections";
import { LogoHorizontal, Symbol } from "./Symbol";

/**
 * Logo oficial, discreto: 38 px de altura (o Brand Book indica 45 px como mínimo online).
 * Em telas estreitas só o símbolo.
 */
export function Logo() {
  return (
    <a className="logo" href="#topo" aria-label={`${CONFIG.brand}, início`}>
      <LogoHorizontal className="logo__full" />
      <Symbol className="logo__mark" />
      <span className="logo__tag" aria-hidden="true">
        {HERO.top[1]}
      </span>
    </a>
  );
}
