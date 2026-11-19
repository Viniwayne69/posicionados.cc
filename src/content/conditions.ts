/** Condições comerciais. Cada grupo vira um acordeão. */

export const CONDITIONS_INTRO = {
  titleStart: "Tudo combinado com",
  emphasis: "clareza",
};

export type ConditionBlock =
  | { type: "list"; items: string[] }
  | { type: "text"; paragraphs: string[] }
  | { type: "rows"; rows: [string, string][] }
  | { type: "notes"; paragraphs: string[] }
  | { type: "lead"; text: string };

export type ConditionGroup = {
  id: string;
  title: string;
  blocks: ConditionBlock[];
};

export const CONDITIONS: ConditionGroup[] = [
  {
    id: "producao",
    title: "Condições de produção",
    blocks: [
      {
        type: "list",
        items: [
          "Os pacotes incluem somente as entregas descritas em cada modalidade",
          "O estúdio é reservado com antecedência",
          "A reserva é confirmada com sinal de 50%",
          "O restante é pago até a data da produção",
          "Entregas extras podem ser contratadas sob orçamento",
          "Mudanças fora da direção aprovada podem ter custo adicional",
          "Os prazos variam com o volume e a complexidade",
          "Produções externas e demandas especiais são orçadas à parte",
        ],
      },
    ],
  },
  {
    id: "estrutura",
    title: "Estrutura adicional",
    blocks: [
      {
        type: "text",
        paragraphs: [
          "A locação contempla o espaço e os equipamentos disponibilizados pelo Studio Mob",
          "Fotógrafo, maquiador, beauty artist, styling, casting e demais profissionais adicionais não estão incluídos e poderão ser contratados conforme a necessidade da produção",
        ],
      },
    ],
  },
  {
    id: "cancelamento",
    title: "Cancelamento e reagendamento",
    blocks: [
      {
        type: "rows",
        rows: [
          [
            "Mais de 48 horas de antecedência",
            "Cancelamento ou reagendamento sem taxa, com crédito do sinal válido por 60 dias",
          ],
          ["Entre 48 e 24 horas", "Taxa de 30% do valor contratado"],
          ["Menos de 24 horas ou ausência", "Taxa de 50% do valor contratado"],
        ],
      },
      {
        type: "notes",
        paragraphs: [
          "O tempo contratado começa a contar no horário previamente agendado",
          "Períodos excedentes dependem de disponibilidade e são cobrados adicionalmente",
        ],
      },
    ],
  },
  {
    id: "direito-de-uso",
    title: "Direito de uso",
    blocks: [
      {
        type: "text",
        paragraphs: [
          "Os materiais desenvolvidos pela Posicionados poderão integrar permanentemente o repertório institucional da agência",
          "A autorização para utilização dos materiais como cases e portfólio é vitalícia, sem limitação de prazo, contemplando:",
        ],
      },
      {
        type: "list",
        items: [
          "Portfólio institucional",
          "Site e redes sociais",
          "Apresentações comerciais",
          "Materiais institucionais e promocionais",
          "Premiações e apresentações profissionais",
        ],
      },
      {
        type: "notes",
        paragraphs: [
          "Essa autorização não transfere a propriedade intelectual da marca contratante nem permite a comercialização ou sublicenciamento de sua imagem a terceiros",
          "Materiais de terceiros permanecem sujeitos às respectivas autorizações e licenças",
        ],
      },
    ],
  },
];
