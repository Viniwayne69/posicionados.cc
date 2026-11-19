# Prompts das imagens (ChatGPT)

Objetivo: gerar imagens **idênticas** às da referência visual da Posicionados.

## Regra principal

Cada imagem tem um tipo:

| Imagem | Tipo | O que deve vir |
| --- | --- | --- |
| `mulher` (hero, hero-mobile e og) | **Só o elemento, sem fundo** | Apenas a mulher. Sem círculo, sem parede, sem cenário. O círculo terracota e o fundo grafite são feitos pelo site. |
| `estudio-arco.jpg` | Foto completa | A cena inteira do estúdio. |
| `fechamento.jpg` | Foto completa | O cavalo de xadrez terracota com o fundo grafite escuro. |

## Como usar

1. Abra **um chat novo do ChatGPT para cada imagem**.
2. Na **mesma mensagem**, anexe os arquivos indicados e cole o prompt. Referências na pasta `referencias-imagens/`.
3. As referências têm texto por cima. Os prompts mandam **remover** tudo isso.
4. Se vier diferente, não recomece: responda no mesmo chat com um dos **ajustes**.
5. Salve em PNG e me passe os arquivos. Eu recorto, removo o fundo da mulher, comprimo e salvo em `public/img/`.

Regra em todas: nenhum texto, logotipo, marca d'água, moldura ou borda dentro da imagem.

---

## 1. Mulher, só o elemento, sem fundo

Anexar: `ref-hero.png` e `ref-mulher-gerada-v1.png` (a mulher que você já gerou, para manter a mesma pessoa e a mesma pose)

Esta imagem serve para o hero do desktop, o hero do celular e o og. Não precisa de prompt separado para cada um.

```
Anexei duas imagens. A primeira é a referência da marca. A segunda é uma mulher que eu já gerei e que ficou ótima.

Quero SOMENTE A IMAGEM DA MULHER, como um recorte de elemento, igual à da segunda imagem: mesma mulher, mesma pose, mesmo perfil, mesmo coque solto com fios cacheados, mesma roupa escura de gola aberta. Mantenha o enquadramento dela de perfil, voltada para a DIREITA, queixo levemente erguido, olhos fechados, expressão serena.

NÃO quero cenário nenhum. Sem círculo, sem parede, sem vinheta, sem forma desfocada, sem sombra no chão, sem luz de fundo. O círculo terracota e o fundo grafite das imagens anexas serão feitos depois, em outro lugar, então NÃO podem aparecer aqui.

Fundo: totalmente LISO, uma cor única chapada creme-claro (#F3E9DD), idêntica em toda a imagem, sem gradiente, sem textura, sem grão, sem iluminação no fundo. Se você conseguir entregar PNG com fundo transparente, melhor. Se não conseguir, use esse fundo creme liso.

A mulher deve ser uma SILHUETA contraluz 100% escura, marrom-chocolate quase preto (#1E1512), chapada, sem brilho nem luz dentro dela, só o contorno nítido do perfil (testa, nariz, lábios, queixo, pescoço), do coque com os fios cacheados soltos e dos ombros. Os fios de cabelo precisam ficar finos e bem definidos contra o fundo claro.

Enquadramento: formato horizontal 3:2 (1536x1024). A mulher fica centralizada na horizontal, com bastante espaço livre dos dois lados (cerca de 25% de cada lado). O topo da cabeça fica a cerca de 8% da borda de cima. Os ombros descem em diagonal e são cortados pela borda de baixo da imagem.

Estilo: silhueta fotográfica limpa e nítida, sem aparência de ilustração ou 3D, sem desfoque, sem HDR.

Não inclua: texto, logotipo, marca d'água, círculo, cenário, moldura, borda, outras pessoas, joias, mãos.
```

Ajustes:
- "O fundo precisa ser uma cor única chapada, sem círculo, sem degradê e sem sombra. Só a mulher."
- "A mulher tem que ser silhueta toda escura, sem luz no rosto nem na roupa."
- "Mantenha exatamente a mesma mulher e a mesma pose da segunda imagem."

---

## 2. estudio-arco.jpg, foto completa (vertical, vai dentro da moldura em arco)

Anexar: `ref-estudio.png`

```
Anexei uma imagem de referência. Recrie essa mesma cena de forma IDÊNTICA, como uma foto COMPLETA de interiores cinematográfica, em formato VERTICAL (proporção 2:3, 1024x1536, alta resolução). Aqui eu quero a cena inteira, com o cenário, igual à referência. Mesma composição, mesmos objetos nas mesmas posições, mesma paleta, mesma luz. Deixe um pouco mais de parede lisa acima e de piso abaixo do que na referência, porque a imagem vai ser recortada em arco.

Não inclua nenhum texto, logotipo ou marca d'água.

A cena, exatamente como na referência:
- Um canto de estúdio criativo, todo em tons de bege, areia, creme e chocolate, quase monocromático e quente, com luz de fim de tarde entrando por uma janela fora de quadro.
- À ESQUERDA, uma planta grande e folhuda (folhas largas e brilhantes, como uma estrelízia ou palmeira tropical) num vaso de cerâmica cor de barro, em parte escondido atrás da mesa lateral.
- Em frente à planta, uma mesa lateral PRETA redonda, com base de pedestal que se alarga embaixo, e sobre ela uma pilha de 3 livros bege/creme.
- No CENTRO, uma poltrona bouclé creme, redonda e baixa, com encosto curvo envolvente e textura de tecido bouclé, almofada de assento fofa. Atrás dela, uma coluna lisa de gesso na cor bege-terra.
- Na parede à DIREITA, a sombra da janela projetada pela luz: uma grade de esquadrias em retângulos de luz dourada com a sombra de uma folha, e no alto da parede uma faixa de luz suave.
- À DIREITA, uma luminária de estúdio profissional (refletor tipo fresnel com abas, luz quente acesa) num tripé preto de rodas, com a lente brilhando em branco-quente.
- Em primeiro plano, na direita embaixo, a ponta de um banco baixo PRETO com borda arredondada, cortado pela moldura da imagem.
- Piso claro bege, com luz dourada no chão à esquerda.
- Paleta: bege #D9B99B, creme #EFE3D3, areia #C9A585, chocolate #5A3E2F, preto #1A1412.

Estilo: fotografia de arquitetura de interiores, cinematográfica, quente, suave, com grão sutil e profundidade de campo média, sem HDR, sem aparência de render 3D nem de ilustração.
```

Ajustes:
- "A poltrona precisa ser bouclé creme, redonda e baixa, no centro."
- "A luz da janela deve desenhar uma grade de sombras na parede da direita."
- "Tudo tem que ficar em tons bege, creme e chocolate, sem cores frias nem verde forte."

---

## 3. fechamento.jpg, foto completa (panorâmica), com o CAVALO

O Brand Book usa o **cavalo** de xadrez como conceito da marca (cavalo + letra P + pin). A referência `ref-xadrez.png` mostra uma rainha, então aqui a peça é trocada por um cavalo e o resto (luz, cor, composição) fica igual.

Anexar: `ref-xadrez.png`

```
Anexei uma imagem de referência. Recrie a MESMA composição, luz, paleta e atmosfera, mas troque a peça: em vez da rainha, a peça principal é um CAVALO de xadrez (a peça com cabeça e crina de cavalo, de perfil, voltado para a DIREITA). Formato horizontal 3:2 (1536x1024), alta resolução, com o cavalo ocupando toda a altura, como uma foto COMPLETA cinematográfica de produto, com o fundo.

IMPORTANTE: remova da referência TODO texto, botão, linha divisória e rótulos. A imagem final não pode ter nenhuma letra.

A cena:
- Uma peça de xadrez, o CAVALO, em close, no terço ESQUERDO da imagem (centro dele a cerca de 25% da largura). Ele ocupa praticamente toda a altura: as orelhas quase encostam no topo e a base é cortada pela borda de baixo. Cabeça e pescoço de cavalo com crina entalhada, perfil nítido, base larga e redonda.
- O cavalo é de madeira/resina fosca na cor terracota #B9705A (tom de argila), superfície lisa e suave, com luz quente suave vinda da esquerda e do alto desenhando um brilho macio nas curvas.
- Ao fundo, peças de xadrez (peões) fora de foco, bem desfocadas, na mesma cor terracota: duas à esquerda do cavalo e algumas poucas no centro, quase imperceptíveis.
- Embaixo, a superfície do tabuleiro escura, com um reflexo bem suave da peça.
- Fundo grafite escuro (#222121) que vai escurecendo até quase preto em direção à DIREITA. A metade direita da imagem fica escura, lisa e vazia, sem objetos, porque vai receber título e botão por cima. Fundo neutro, sem tom marrom.

Estilo: fotografia cinematográfica de produto, monocromática em terracota e grafite, profundidade de campo bem rasa (só o cavalo nítido), grão de filme sutil, sem HDR, sem aparência de render 3D.

Não inclua: texto, logotipo, marca d'água, moldura, borda, mãos, pessoas, rainha.
```

Ajustes:
- "A peça é um cavalo de xadrez, não uma rainha. Perfil voltado para a direita."
- "O cavalo ocupa toda a altura, no lado esquerdo, e a metade direita da imagem deve ficar vazia e escura."
- "O fundo é grafite neutro (#222121), sem marrom. A cor da peça é terracota #B9705A fosco, sem brilho metálico nem dourado."

---

## O que eu faço depois (você não precisa gerar)

- **hero-mobile e og:** eu monto a partir da mulher recortada, com o círculo e o fundo marrom feitos no site e na composição.
- **Remover o fundo da mulher** (se vier fundo creme liso): eu faço, deixando PNG/WebP transparente.
