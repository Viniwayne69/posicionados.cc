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
  lineOne: "Refine a presença da sua marca e amplie seu",
  emphasis: "valor percebido.",
  bottomLeft: "Posicionados",
};

export const CONCEPT = {
  label: "Captação & conteúdo digital",
  titleStart: "Sustente o posicionamento da sua marca em",
  emphasis: "cada ponto de contato.",
  text: [
    "Desenvolvemos conteúdos alinhados à estratégia e à identidade da sua marca, mantendo consistência visual, excelência na comunicação e relevância diante do público.",
    "Reels, carrosséis e fotografias. Da direção criativa à pós-produção.",
  ],
};

export const PRESENCE = {
  title: "Formatos que dão presença à marca",
  items: [
    {
      name: "Reels",
      tagline: "Presença e conexão",
      text: "Vídeos que comunicam os diferenciais da marca, despertam interesse e aproximam sua mensagem do público.",
    },
    {
      name: "Carrosséis",
      tagline: "Clareza e autoridade",
      text: "Conteúdos que organizam ideias, comunicam valor e fortalecem a percepção da marca.",
    },
    {
      name: "Fotografia",
      tagline: "Identidade e reconhecimento",
      text: "Imagens que traduzem a essência da marca e constroem uma identidade visual consistente.",
    },
    {
      name: "Direção criativa",
      tagline: "Estratégia em cada detalhe",
      text: "Da pauta ao roteiro, desenvolvemos narrativas alinhadas ao posicionamento, à identidade e aos objetivos da marca.",
    },
    {
      name: "Pós-produção",
      tagline: "Precisão e acabamento",
      text: "Edição, tratamento e finalização para garantir unidade visual, qualidade técnica e consistência em cada entrega.",
    },
  ],
  closing: [
    "Cada conteúdo comunica.",
    "Cada detalhe com precisão constrói percepção.",
  ],
};

export const PACKAGES_INTRO = {
  titleStart: "Produção audiovisual pensada para a",
  emphasis: "continuidade da sua marca.",
  subtitle:
    "Do lançamento de produtos à construção de autoridade e presença de marca, apresentamos soluções que acompanham os objetivos do seu projeto, com direção criativa e excelência em cada entrega.",
  closingStart: "O que sua marca",
  closingEmphasis: "comunica",
  closingEnd: "assim que você bate o olho nela?",
  notes: [
    "Por trás de todo negócio existe uma ideia que nasceu de alguém. Uma paixão que encontrou espaço para se tornar realidade. Mas será que a marca que você construiu transmite aquele mesmo sentimento que fez você começar?",
    "Aqui desenvolvemos a essência da sua marca como nosso foco principal. Os projetos de branding, gestão contínua e identidade visual serão orçados conforme sua necessidade caso sinta que a Posicionados agora é a sua linha de frente.",
  ],
  labels: {
    deliverables: "Entregas",
    studioTime: "Estúdio",
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
  instagram: {
    href: "https://www.instagram.com/oi_mob/",
    label: "Conhecer o Studio Mob no Instagram",
  },
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
