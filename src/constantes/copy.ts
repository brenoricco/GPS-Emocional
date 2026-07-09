/**
 * Copy autoral — textos escritos e revisados pela consultora Rejane.
 * Não editar sem aval clínico dela via Brenno.
 * Fonte original: contexto/TELA *.docx
 */

import type { ModuloSlug } from "@/tipos/modulo";

export const BOAS_VINDAS = {
  saudacao: "Olá, estou muito feliz em ter você aqui.",
  respireBloco: "Respire fundo...",
  pergunta: "agora me conte: como você está se sentindo hoje?",
  cta: "Vamos lá",
} as const;

export const QUIZ = {
  cabecalho: "Quero te ouvir",
  pergunta: "Vamos lá, me conte como você está se sentindo hoje?",
  instrucao:
    "Toque no botão que mais se identifica com você neste momento.",
} as const;

export const ENCERRAMENTO = {
  titulo: "Por hoje, a sua jornada aqui terminou.",
  corpo:
    "Você olhou para dentro, cuidou das suas dores e escolheu acolher a sua história. Sinta orgulho de ter dedicado esse tempo para você.",
  lembrete:
    "Lembre-se: o seu GPS Emocional estará sempre aqui quando você precisar recalcular a rota ou apenas respirar em um lugar seguro. Volte para o seu dia levando a luz das suas estrelas guias.",
  cta: "Concluir Dia",
  ancoraFinal: "Sua mente é o seu lar. Cuide bem dela.",
} as const;

type CopyModulo = {
  titulo: string;
  acolhimento: string;
  instrucaoExercicio: string;
  mensagemPosExercicio: string;
  ancora: string;
};

export const COPY_POR_MODULO: Record<ModuloSlug, CopyModulo> = {
  "leveza-e-paz": {
    titulo: "Módulo 1 · Leveza e Paz",
    acolhimento:
      "Pare por um instante. Inspire, sinta o ar entrando... agora expire, sinta o ar saindo. Você não precisa dar conta de tudo. O mundo pode esperar cinco minutos, mas você não. Este é o seu espaço seguro, esqueça a urgência e solte o controle de tudo. Relaxe seus ombros e permita-se sentir essa paz. Você está segura aqui.",
    instrucaoExercicio:
      "Toque e segure o dedo no círculo para inspirar. Solte para expirar. Complete 3 ciclos.",
    mensagemPosExercicio:
      "Você respirou. Você desacelerou. Guarde essa sensação de leveza.",
    ancora:
      "Eu sou a autora do meu próprio destino. Eu crio o sentido da minha vida a cada passo, com paz e liberdade.",
  },
  "cura-do-coracao": {
    titulo: "Módulo 2 · A Cura do Coração",
    acolhimento:
      "A dor de um coração partido não é sinal de fraqueza, é o eco de um amor que foi real. Mas o fim de uma história não é o fim do seu valor. Você não foi descartada, você foi liberada para viver o que realmente merece. Dê a si mesma o direito de recomeçar por inteiro.",
    instrucaoExercicio:
      "Toque em cada pilar para reconstruí-lo dentro de você. Cada pedra que você posiciona é uma parte de si mesma que você acolhe de volta.",
    mensagemPosExercicio:
      "Seu templo interno é forte, impenetrável e brilha com a luz das estrelas. O erro do outro não define a sua fundação.",
    ancora: "Eu sou inteira. O meu valor não depende da escolha de ninguém.",
  },
  "rompendo-ciclos": {
    titulo: "Módulo 3 · Rompendo Ciclos e Resgatando Minha Força",
    acolhimento:
      "Olá. Que bom que você chegou até aqui. Se você sente que perdeu o seu brilho, que caminha pisando em ovos ou que o amor tem doído mais do que acolhido... respira fundo. Você não está louca. Você não é culpada. E, acima de tudo, você não está sozinha. Este é o seu espaço seguro, onde a sua voz tem valor e a sua paz é a única prioridade.",
    instrucaoExercicio:
      "Às vezes, carregamos mochilas cheias de pedras que o outro colocou nas nossas costas. Toque nos pesos abaixo que você quer deixar pelo caminho hoje.",
    mensagemPosExercicio:
      "Mochila mais leve. Olhe para trás por um segundo: veja aquelas pedras que você acabou de soltar. Elas não te pertencem mais. Cada 'não' que você diz para o que te machuca é um 'sim' gigante para a sua liberdade.",
    ancora:
      "A minha voz tem valor. A minha paz é minha prioridade. Eu retomo o controle da minha história.",
  },
  "resgatando-cores": {
    titulo: "Módulo 4 · Resgatando as Minhas Cores",
    acolhimento:
      "Olá. Que bom que você conseguiu abrir o aplicativo hoje. Eu sei que existem dias em que até o ato de respirar parece pesado, e está tudo bem se hoje for um desses dias. Aqui, você não precisa fingir que está bem. Não há cobranças, não há pressa. Se tudo o que você consegue fazer agora é ler estas palavras, isso já é o suficiente. Vamos, no seu tempo, dar um passo bem pequenininho juntas?",
    instrucaoExercicio:
      "Quando estamos cansados, o mundo parece perder a cor. Toque em uma das pequenas luzes abaixo para trazer um sopro de vida para o seu momento.",
    mensagemPosExercicio:
      "Viu só? Um micro-passo ainda é um passo. Você acabou de realizar algo por você hoje. Vá devagar, uma luz de cada vez.",
    ancora:
      "Eu não preciso dar conta de tudo hoje. Respeitar o meu cansaço também é um ato de amor.",
  },
  "resgate-do-valor": {
    titulo: "Módulo 5 · Resgate do Meu Valor",
    acolhimento:
      "Olá. Se hoje a sua mente está tentando te convencer de que você não é boa o suficiente, de que tudo dá errado ou de que as coisas boas não foram feitas para você... eu preciso que você faça uma pausa agora. Essa voz que te cobra e te diminui não é a sua voz real; ela é apenas o medo falando mais alto. Você não é os seus erros e você não precisa ser perfeita para ser valiosa.",
    instrucaoExercicio:
      "A autocrítica nos faz esquecer das nossas próprias vitórias. Escolha um dos pilares abaixo para resgatar hoje.",
    mensagemPosExercicio:
      "Reconhecendo o meu brilho: o seu valor é permanente. Ele não aumenta quando você acerta e nem diminui quando você falha. Você já é o suficiente pelo simples fato de existir.",
    ancora:
      "Eu não preciso ser perfeita para ter valor. Eu me acolho por inteiro, com a minha luz e as minhas sombras.",
  },
};

/**
 * Roteiros dos áudios de indução hipnótica.
 * NÃO exibidos na UI (decisão Rejane 2026-07 — agora que os áudios estão gravados).
 * Mantidos aqui como referência autoral para futura consulta/revisão clínica.
 */
export const ROTEIRO_HIPNOSE: Record<ModuloSlug, string> = {
  "leveza-e-paz": `Feche os olhos, se quiser, e continue respirando neste ritmo que você acabou de encontrar. Sinta cada expiração desfazendo um nó de tensão nos seus ombros, no seu peito, na sua mandíbula. O silêncio que existe entre uma respiração e outra é o seu lugar mais seguro. É ali que mora a sua paz. Volte pra ele sempre que precisar.`,
  "cura-do-coracao": `Quando alguém quebra a nossa confiança, parece que a nossa estrutura desaba. Mas feche os olhos por um instante e perceba: as paredes ao seu redor podem ter balançado, mas os alicerces de quem você é continuam intactos. Imagine-se agora reconstruindo um espaço sagrado dentro do seu peito. Cada tijolo de confiança que você coloca de volta, você não está colocando no outro — você está colocando em si mesma. Você volta a confiar na sua intuição, na sua capacidade de se proteger e de dar a volta por cima.`,
  "rompendo-ciclos": `Respire fundo e sinta o peso das palavras que outros colocaram em você começando a se soltar. Você não é a versão que o medo te contou. Você é forte, você é lúcida, você é livre para escolher. Cada passo que você dá a partir de hoje, mesmo o menor, é um passo em direção ao que é seu por direito: paz, respeito e amor de verdade.`,
  "resgatando-cores": `Respire devagar. Não precisa forçar nada. Só note o ar entrando e saindo, no ritmo que for possível hoje. Existe uma pequena centelha dentro de você que, mesmo em dias difíceis, continua acesa. Ela é discreta, mas está viva. Cada pequeno cuidado que você tem consigo mesma — beber um gole d'água, sentir o ar no rosto, esticar o corpo — alimenta essa centelha. Você não precisa acender uma fogueira hoje. Só cuide da faísca.`,
  "resgate-do-valor": `Feche os olhos e imagine sua versão mais serena olhando pra você agora. Ela sabe de tudo o que você já superou. Ela conhece a sua força escondida por trás do cansaço. Ela te diz, baixinho: você não precisa provar nada para ninguém. O seu valor não está no que você produz, no que você acerta ou no que os outros pensam. O seu valor é permanente. Você é o suficiente.`,
};
