/** Pacotes da esteira de captação. Edite textos e valores aqui. */
export type Package = {
  id: string;
  name: string;
  price: string;
  summary: string;
  opening: string;
  text: string[];
  deliverables: string[];
  studioTime: string;
  audience: string;
  featured?: boolean;
};

export const FEATURED_LABEL = "Mais escolhido";

export const PACKAGES: Package[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 1.500",
    summary: "2 Reels, 1 carrossel, 6 fotografias, até 2h",
    opening: "O lançamento merece ser percebido",
    text: ["Para apresentar um produto, coleção ou novidade com conteúdo visual à altura"],
    deliverables: [
      "2 Reels editados",
      "1 carrossel de apresentação ou lançamento",
      "6 fotografias tratadas",
      "Direção criativa",
      "Planejamento de pautas",
      "Roteiros audiovisuais",
      "Legendas e chamadas para ação",
    ],
    studioTime: "até 2 horas",
    audience: "lançamentos, produtos, coleções e novidades",
  },
  {
    id: "signature",
    name: "Signature",
    price: "R$ 2.500",
    summary: "3 Reels, 2 carrosséis, 8 fotografias, até 4h",
    opening: "Por trás de toda marca, existe alguém que acredita nela",
    text: [
      "Pessoas se conectam com pessoas. O Signature mostra quem constrói a marca: histórias, personalidade e diferenciais",
    ],
    deliverables: [
      "3 Reels editados",
      "2 carrosséis estratégicos",
      "8 fotografias tratadas",
      "Direção editorial",
      "Planejamento de conteúdo",
      "Roteiros audiovisuais",
      "Legendas e chamadas para ação",
    ],
    studioTime: "até 4 horas",
    audience:
      "marcas pessoais e comerciais, empresários e fundadores",
  },
  {
    id: "signature-black",
    name: "Signature Black",
    price: "R$ 3.800",
    summary: "4 Reels, 3 carrosséis, 12 fotografias, até 4h",
    opening: "O reconhecimento começa naquilo que a marca representa",
    text: [
      "Aprofunda a imagem de quem lidera a marca, com narrativas que reforçam autoridade e percepção de valor",
    ],
    deliverables: [
      "4 Reels editados",
      "3 carrosséis estratégicos",
      "12 fotografias tratadas",
      "Direção estratégica de conteúdo",
      "Planejamento de narrativas",
      "Roteiros audiovisuais",
      "Direcionamento de linguagem digital",
      "Legendas e chamadas para ação",
    ],
    studioTime: "até 4 horas",
    audience:
      "marcas que querem consolidar presença e autoridade",
    featured: true,
  },
  {
    id: "branding-strategy",
    name: "Branding Strategy",
    price: "R$ 5.000",
    summary: "5 Reels, 4 carrosséis, 15 fotografias, até 8h",
    opening: "A estratégia de marca em imagem e movimento",
    text: [
      "Produção audiovisual guiada pela estratégia da marca, com captação mais ampla e coerência entre identidade, discurso e percepção",
    ],
    deliverables: [
      "5 Reels editados",
      "4 carrosséis estratégicos",
      "15 fotografias tratadas",
      "Direção criativa alinhada à estratégia da marca",
      "Conceito narrativo da produção",
      "Planejamento de conteúdo",
      "Roteiros audiovisuais",
      "Direcionamento de linguagem e comunicação digital",
      "Legendas e chamadas para ação",
    ],
    studioTime: "até 8 horas",
    audience:
      "marcas em crescimento, expansão ou reposicionamento",
  },
];
