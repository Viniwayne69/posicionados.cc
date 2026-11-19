# Posicionados · Catálogo

Landing page de catálogo de serviços da Posicionados (Brand Agency · Brand Content).
Next.js (App Router) + TypeScript, CSS próprio com tokens, exportado como site 100% estático.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # gera a pasta /out (estática)
npm run start      # serve a pasta /out localmente
npm run typecheck
```

A pasta `out/` sobe em qualquer hospedagem estática (Vercel, Netlify, S3, Hostinger).

Os scripts usam `--webpack` porque o Turbopack do Next 16 não resolveu a fonte do Google (`next/font`) no ambiente de teste. A fonte é baixada no build e servida junto do site.

## Como trocar

**Imagens:** coloque os arquivos em `public/img/` com os nomes listados em [`public/img/README.md`](public/img/README.md). Os prompts para gerar as imagens estão em [`PROMPTS-IMAGENS.md`](PROMPTS-IMAGENS.md).

**Contato:** edite `src/config/site.ts`.
- `whatsapp`: somente dígitos com DDI, ex. `"5581999999999"`. Vazio = todos os botões levam ao Instagram.
- `instagram`, `siteUrl` e `year` também ficam ali. O WhatsApp também pode vir da variável `NEXT_PUBLIC_WHATSAPP`.

**Textos e valores:**
- Pacotes e preços: `src/content/packages.ts`
- Condições comerciais: `src/content/conditions.ts`
- Demais seções, menu e rodapé: `src/content/sections.ts`

**Logo e símbolo:** os arquivos oficiais (extraídos do Brand Book 2024) ficam em `public/svg/`: `symbol.svg`, `logo-horizontal.svg`, `wordmark.svg` e `wordmark-stack.svg`. Para trocar, substitua o arquivo mantendo `fill="currentColor"`. Cabeçalho, hero, rodapé e favicon leem esses arquivos. Não gire, incline nem redesenhe o logo (regras do Brand Book). Tamanho mínimo online: 45 px de altura.

**Peças de xadrez 3D (seção Processo):** modelos do "Chess Set" do Poly Haven, por Riley Queen, licença CC0 (https://polyhaven.com/a/chess_set). O arquivo usado pelo site é `public/models/chess-pieces.glb` (cinco peças, comprimido, ~90 KB). Para gerar de novo: baixe `chess_set_1k.gltf` e `chess_set.bin` do Poly Haven numa pasta e rode `node scripts/build-chess-model.mjs <pasta>/chess_set_1k.gltf`. A renderização fica em `src/lib/chess3d.ts` (Three.js, carregado só quando a seção se aproxima da tela).

**Cores, fontes e espaçamentos:** `src/styles/tokens.css`. Esta página é a identidade para **clientes**: só terracota e bege, com detalhes em branco, sem preto. Terracota da marca `#B9705A` em títulos grandes e linhas; terracota profundo `#8C4D3A` nas seções cheias (texto creme); tinta `#6E3A2B` e terracota médio `#8F503D` no texto sobre bege. A versão para profissionais de comunicação (preto e branco) fica fora deste projeto. Fonte Manrope em pesos 300, 400 e 500.

## Estrutura

```
src/
  app/            layout, página, favicon, robots, sitemap
  components/
    sections/     uma seção por arquivo (Hero, Concept, Presence...)
    behavior/     componentes com interação (cabeçalho, menu, acordeões)
    ui/           peças reutilizáveis (Logo, Symbol, ImageSlot, ContactLink)
  config/         CONFIG de contato e SEO
  content/        toda a copy, separada do layout
  lib/            helpers (contato, símbolo)
  styles/         tokens, base, layout, components, responsive
public/           imagens e símbolo
```
