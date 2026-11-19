/** Copy das seções (exceto pacotes e condições). Edite os textos aqui. */

export const NAV_LINKS = [
  { id: "presenca", label: "Presença" },
  { id: "pacotes", label: "Pacotes" },
  { id: "estudio", label: "Estúdio" },
  { id: "processo", label: "Processo" },
  { id: "condicoes", label: "Condições" },
] as const;

export const CTA_LABEL = "Falar com a Posicionados";

export const HERO = {
  top: ["Posicionados", "Brand Agency · Brand Content", "© 2026"],
  lineOne: "Torne sua marca",
  lineTwoStart: "a mais",
  emphasis: "atraente",
  lineThree: "do seu público",
  bottomLeft: "Posicionados",
};

export const CONCEPT = {
  label: "Captação & conteúdo digital",
  title: "Uma marca atraente tem luz própria",
  text: [
    "A Posicionados cria Reels, carrosséis e fotografias a partir da identidade da sua marca",
    "Da ideia à entrega, com direção criativa e produção em estúdio",
  ],
};

export const PRESENCE = {
  title: "Formatos que dão presença à marca",
  items: [
    {
      name: "Reels",
      tagline: "Movimento e conexão",
      text: "Vídeos que apresentam suas ideias e diferenciais",
    },
    {
      name: "Carrosséis",
      tagline: "Conteúdo e autoridade",
      text: "Conteúdo que explica a marca e reforça seu valor",
    },
    {
      name: "Fotografia",
      tagline: "Identidade e reconhecimento",
      text: "Imagens que traduzem a personalidade da marca",
    },
    {
      name: "Direção criativa",
      tagline: "Intenção em cada detalhe",
      text: "Pauta, roteiro e narrativa a partir da identidade da marca",
    },
  ],
  closing: [
    "Cada conteúdo nasce de uma intenção",
    "E permanece na memória de quem o vê",
  ],
};

export const PACKAGES_INTRO = {
  titleStart: "Um pacote para cada",
  emphasis: "momento da marca",
  subtitle: "Escolha o que combina com o momento que sua marca vive",
  closing: "O olhar demora no que foi feito com",
  closingEmphasis: "cuidado",
  notes: ["Projetos de branding e identidade visual são orçados à parte"],
  labels: {
    deliverables: "Entregas",
    studioTime: "Tempo de estúdio",
    audience: "Indicado para",
    cta: "Quero este pacote",
  },
};

export const STUDIO = {
  title: "O estúdio onde sua marca é produzida",
  text: [
    "As produções acontecem no Studio Mob, em Boa Viagem, Recife",
    "Estúdio criativo de 60 m², com iluminação, mobiliário e cenários para diferentes linguagens visuais",
  ],
  groups: [
    {
      id: "iluminacao",
      title: "Iluminação profissional",
      items: [
        "2 flashes Godox SK300 II",
        "1 flash Godox 160E",
        "Aputure Amaran 60W com balão chinês",
        "Ulanzi 200W",
      ],
    },
    {
      id: "mobiliario",
      title: "Acervo de mobiliário",
      items: [
        "Apple Box",
        "Bouclé Cube",
        "Black Bench",
        "Verdant Chair",
        "Director Chair",
        "Togo Solo",
        "Togo Trio",
      ],
    },
    {
      id: "fundos",
      title: "Fundos e composição",
      items: [
        "Fundo infinito",
        "11 opções de fundos coloridos",
        "Acervo decorativo para diferentes propostas visuais",
      ],
    },
    {
      id: "estrutura",
      title: "Estrutura de apoio",
      items: [
        "Área de descanso no térreo",
        "Primeiro andar destinado à produção",
        "Mesa e cadeira para maquiagem",
        "Provador",
        "Espelho grande",
      ],
    },
  ],
  hours: {
    title: "Horários de produção",
    place: "Studio Mob · Boa Viagem, Recife",
    rows: [
      ["Segunda a sexta", "09h às 21h"],
      ["Sábado", "09h às 15h"],
      ["Domingo", "fechado"],
    ] as [string, string][],
    notes: [
      "Os períodos são reservados conforme a modalidade contratada",
      "Locação e equipamentos do Studio Mob já estão incluídos no valor do pacote",
    ],
  },
};

export const PROCESS = {
  title: "Processo criativo",
  steps: [
    {
      name: "Leitura de marca",
      text: "Entendemos sua marca e o momento que ela vive",
    },
    {
      name: "Planejamento",
      text: "Definimos conceito, pautas e roteiros",
    },
    {
      name: "Captação",
      text: "Produzimos o conteúdo em estúdio, com direção",
    },
    {
      name: "Desdobramento",
      text: "Cada material vira Reels, carrossel e fotografia finalizados",
    },
    {
      name: "Entrega",
      text: "Tudo organizado e pronto para publicar",
    },
  ],
};

export const CLOSING = {
  label: "Próximo passo",
  titleStart: "O primeiro olhar começa em uma",
  emphasis: "conversa",
  titleEnd: "",
  text: [
    "Conte o momento da sua marca",
    "A Posicionados acompanha esse caminho, da ideia ao reconhecimento",
  ],
};

export const FOOTER = {
  title: "Posicionados · Brand Agency",
  tagline: "Construção de marcas, direção criativa, comunicação estratégica",
};
