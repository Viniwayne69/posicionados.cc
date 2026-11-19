import { CONFIG } from "@/config/site";
import { HERO } from "@/content/sections";
import { LogoHorizontal, Symbol } from "./Symbol";

/**
 * Logo oficial. Tamanho mínimo online do Brand Book: símbolo 45 px de altura,
 * logo completo 45 px de altura (≈306 px de largura). Em telas estreitas só o símbolo.
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
