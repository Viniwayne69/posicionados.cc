# Imagens do site

Coloque aqui os arquivos com **exatamente** estes nomes. Enquanto um arquivo não existir, o site mostra um placeholder tom sobre tom (nada quebra).

| Arquivo | Onde aparece | Formato |
| --- | --- | --- |
| `mulher.webp` | Hero (desktop e celular): silhueta da mulher **sem fundo**, por cima do círculo feito em CSS | WebP transparente, 1536×1154 (proporção fixa no código) |
| `estudio-arco.jpg` | Foto do estúdio, dentro da moldura em arco | JPG, 3:4, 900×1200 |
| `fechamento.jpg` | Fechamento (cavalo de xadrez em close, no terço esquerdo; metade direita escura e vazia). A foto ocupa a seção inteira no desktop | JPG, largo, 1600×1200 |
| `og.jpg` | Compartilhamento (Open Graph / Twitter) | JPG, 1200×630 |

Dicas
- JPG com qualidade 80 a 85, até ~300 KB cada.
- `mulher.webp` precisa de fundo transparente. Se trocar por outra imagem de proporção diferente, ajuste `aspect-ratio` em `.hero__figure` (`src/styles/components.css`) e `width`/`height` em `Hero.tsx`.
- O círculo terracota do hero é CSS, não faz parte da imagem. Se a imagem da mulher faltar, o círculo continua aparecendo.
