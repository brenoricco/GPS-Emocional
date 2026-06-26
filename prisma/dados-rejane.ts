/**
 * Conteúdo clínico autoral da Rejane — psicóloga/terapeuta consultora.
 *
 * Cada sessão segue a estrutura de 4 fases:
 *   1. Texto de Acolhimento (entrada poético-clínica)
 *   2. Mecânica interativa (referência via enum)
 *   3. Roteiro de áudio de hipnose (~5 min) em markdown
 *   4. Selo de âncora (frase de fechamento)
 *
 * Tom: feminino, poético-acolhedor, com firmeza nas sugestões.
 * Decisão Brenno (2026-06-25): manter este tom; toggle de gênero entra depois.
 */

import type { TipoMecanicaInterativa } from "@prisma/client";

export interface SessaoRejane {
  slug: string;
  titulo: string;
  textoAcolhimento: string;
  mecanicaInterativa: TipoMecanicaInterativa;
  seloAncora: string;
  roteiroAudioMarkdown: string;
  audioDuracaoSegundos: number;
}

// =============================================================================
// O PEITO LEVE — Ansiedade & Burnout
// =============================================================================

const ROTEIRO_PEITO_LEVE = `## Indução Física e Desaceleração (0:00 — 1:00)

Respire fundo mais uma vez... e ao soltar o ar, sinta as pálpebras pesadas. Muito pesadas. Seus ombros despencam... seus dedos das mãos se soltam... e cada músculo do seu corpo começa a entender que, agora, não há nada para resolver. Não há urgência. Apenas o som da minha voz e o ritmo tranquilo da sua respiração.

## A Metáfora do Céu e das Nuvens (1:00 — 3:00)

Imagine que a sua mente é como um imenso céu azul. Um céu vasto, calmo e silencioso. Os pensamentos acelerados, as preocupações e as cobranças são apenas nuvens escuras que passam por esse céu. Deixe que elas passem. Você não precisa segurar as nuvens. Você não é a tempestade, você é o céu. O céu sempre permanece limpo, azul e em paz por trás de qualquer nuvem.

## Reprogramação do Esgotamento (3:00 — 4:30)

A partir de agora, você se dá permissão para descansar. Você compreende que descansar não é desistir, é se recuperar. Você é o seu bem mais precioso. Sempre que a mente tentar acelerar, você voltará para este espaço de silêncio dentro de você. Você escolhe dar um passo de cada vez. Você está segura no tempo presente.

## Retorno Confortável (4:30 — 5:00)

Sinta uma energia renovada, leve e fresca subir pelos seus pés, pernas e peito. Traga consigo essa paz para o resto do seu dia. Quando se sentir pronta, abra os olhos devagar, sentindo-se desperta, tranquila e com o peito incrivelmente leve.`;

// =============================================================================
// O OLHAR PARA SI MESMA — Autoestima & Timidez
// =============================================================================

const ROTEIRO_OLHAR_PARA_SI = `## Indução e Centralização (0:00 — 1:00)

Respire fundo... sentindo o ar entrar e preencher o seu peito com espaço... e ao soltar o ar, solte as expectativas dos outros. Deixe que os olhos se fechem suavemente. Sinta o peso do seu corpo apoiado onde você está. Você está segura aqui. Não há nada a provar, não há ninguém a agradar neste momento. Apenas você, com você mesma.

## Encontro com a Essência (1:00 — 3:00)

Imagine que você caminha para dentro de si mesma, em um espaço de luz mansa e segura. No centro desse espaço, há um espelho antigo e dourado. Esse espelho não reflete a sua aparência física, ele reflete a sua alma, a sua essência pura. Olhe para esse reflexo. Veja a força oculta nos seus olhos. Sinta a presença daquela versão sua que é corajosa, que sabe o seu valor e que não tem medo de brilhar. Ela está aí dentro, esperando que você a abrace.

## Reprogramação e Empoderamento (3:00 — 4:30)

A partir de agora, cada palavra de dúvida que disserem sobre você perde o poder. Você se liberta da necessidade de aprovação externa. A sua aprovação é a única que importa. Você se autoriza a falar, a ocupar espaços e a ser vista. O seu valor é inquestionável. Você é suficiente, exatamente como é.

## Retorno (4:30 — 5:00)

Traga essa sensação de grandeza e segurança para o seu peito. Respire fundo mais uma vez, sentindo-se preenchida por essa força. No seu tempo, abra os olhos, pronta para caminhar pelo mundo de cabeça erguida.`;

// =============================================================================
// O CORAÇÃO INTEIRO — Término, Traição & Rejeição
// =============================================================================

const ROTEIRO_CORACAO_INTEIRO = `## Indução ao Acolhimento (0:00 — 1:00)

Respire fundo... e ao soltar o ar, sinta o seu peito se abrindo para este momento. Coloque uma de suas mãos sobre o seu coração. Sinta o bater dele... constante, fiel. Ele está aqui por você. Permita-se sentir o que precisa ser sentido agora. Não há pressa, não há julgamento. Você está em um espaço seguro para se curar.

## A Metáfora do Fio de Ouro (1:00 — 3:00)

Imagine que toda a energia que você depositou nessa relação, todas as expectativas e sonhos que pareciam ter se quebrado, começam a voltar para você agora. Visualize pequenos feixes de luz dourada saindo do passado e retornando para o seu peito, preenchendo os espaços vazios. Você não perdeu a sua capacidade de amar, ela continua guardada aí dentro. Você está se tornando inteira novamente.

## Reprogramação contra a Rejeição (3:00 — 4:30)

A partir de hoje, a rejeição do outro perde o poder de definir quem você é. A escolha de outra pessoa não diminui a sua preciosidade. Você se perdoa pelas expectativas criadas. Você se liberta da necessidade de respostas que nunca virão. O seu fechamento de ciclo acontece dentro de você, agora.

## Retorno (4:30 — 5:00)

Respire fundo, sentindo o peito mais leve, como se um peso enorme tivesse sido retirado dos seus ombros. Guarde essa sensação de retorno a si mesma. Lentamente, no seu tempo, abra os olhos, pronta para dar o próximo passo na sua jornada.`;

// =============================================================================
// A DOR DA AUSÊNCIA — Luto & Despedida
// =============================================================================

const ROTEIRO_DOR_DA_AUSENCIA = `## Indução ao Acolhimento Profundo (0:00 — 1:00)

Respire... no seu tempo. Não há pressa. Sinta o peso do seu corpo e deixe que as lágrimas, se quiserem vir, venham. Elas limpam a alma. Coloque sua mão sobre o peito. Você está viva, você está aqui, e você está segura neste exato instante. Apenas ouça o som da minha voz e deixe-se acolher.

## A Metáfora do Jardim Interno (1:00 — 3:00)

Imagine que você caminha por um jardim muito calmo e silencioso, onde o sol está se pondo com uma luz dourada e suave. No centro desse jardim, há um banco de madeira. Sente-se ali por um momento. E, na sua mente, permita-se visualizar a imagem daquela presença que hoje faz falta. Sinta o abraço que você gostaria de dar... sinta o olhar... e perceba que, embora o corpo físico não esteja aqui, o amor que uniu vocês é eterno. Esse amor não morre. Ele faz parte de quem você é.

## Sugestões de Aceitação e Paz (3:00 — 4:30)

Você se dá permissão hoje para soltar a culpa, os 'e se...' e as palavras que não foram ditas. Você se perdoa e perdoa o curso da vida. Você escolhe, a partir de agora, honrar a memória de quem se foi vivendo a sua vida com beleza, paz e alegria, sabendo que essa pessoa gostaria de ver o seu sorriso de volta. O amor permanece. A dor, aos poucos, se transforma em uma saudade mansa.

## Retorno Suave (4:30 — 5:00)

Abrace essa sensação de conexão e paz. Respire fundo, trazendo esse calor no peito de volta para a sua realidade. No seu tempo, bem devagar, abra os olhos, sentindo que você não está sozinha. O amor está guardado aí dentro.`;

// =============================================================================
// O MEU PRÓPRIO LAR — Solidão & Solitude
// =============================================================================

const ROTEIRO_MEU_PROPRIO_LAR = `## Indução ao Acolhimento Físico (0:00 — 1:00)

Respire profundamente... sinta o ar entrando frio pelas suas narinas... e saindo quente, aquecendo o seu corpo. Se quiser, cruze os seus braços ao redor do seu próprio peito, dando a si mesma um abraço apertado e seguro. Sinta o calor da sua própria pele. Você está aqui. Você é real. E você é o seu porto seguro neste exato momento.

## A Metáfora da Casa Aconchegante (1:00 — 3:00)

Imagine que você caminha por uma noite fria, mas logo adiante você avista uma linda casa de campo, com luzes douradas brilhando pelas janelas. Você abre a porta e entra. Lá dentro, uma lareira estala com um calor acolhedor. Há uma poltrona macia esperando por você. Sente-se. Esse lugar pertence a você. Essa casa é a sua mente consciente, limpa e segura. Aqui, você está protegida do frio do mundo exterior.

## Sugestões de Solitude (3:00 — 4:30)

Você compreende hoje que estar sozinha é, na verdade, uma oportunidade de ouvir a sua própria voz sem interferências. Você escolhe ser a sua melhor companhia. Você se perdoa pelas vezes em que buscou fora o amor que só você pode se dar. Você se pertence. O seu peito está preenchido, aquecido e em paz.

## Retorno Suave (4:30 — 5:00)

Respire fundo, trazendo esse calor da lareira interna de volta com você. Guarde essa sensação de que você é o seu próprio lar. Lentamente, no seu tempo, mexa os dedos, sinta o seu corpo e abra os olhos, sentindo-se completa e em paz.`;

// =============================================================================
// O SENTIDO DA VIDA — Crise Existencial & Propósito
// =============================================================================

const ROTEIRO_SENTIDO_DA_VIDA = `## Indução ao Desapego do Controle (0:00 — 1:00)

Respire... sinta o ar preencher não apenas o seu peito, mas expandir a sua mente. Solte a necessidade de ter todas as respostas agora. Permita-se não saber. Está tudo bem não ter o controle de tudo. Sinta o seu corpo pesado, ancorado na Terra, seguro e sustentado neste exato momento.

## A Metáfora do Farol e do Horizonte (1:00 — 3:00)

Imagine que você está no topo de uma montanha, no início de uma manhã bem calma. Há uma névoa suave lá embaixo, escondendo o caminho. Mas, em vez de medo, você sente uma curiosidade mansa. O sol começa a subir no horizonte, e os primeiros raios dourados começam a dissipar a névoa. Você percebe que não precisa enxergar todo o mapa da sua vida, você precisa apenas enxergar o seu próximo passo. E esse passo é iluminado pelo que você valoriza hoje.

## Sugestões de Criação de Sentido (3:00 — 4:30)

Você compreende hoje que é a autora da sua própria história. O sentido da vida está nas pequenas coisas: no calor de um café, em um sorriso sincero, no ato de ajudar alguém, na sua liberdade de escolher como responder ao mundo. Você se liberta da cobrança de ser perfeita. Você escolhe criar um dia bonito hoje, com os valores que você carrega no peito. Você se pertence e você faz a diferença apenas por existir.

## Retorno Inspirado (4:30 — 5:00)

Traga essa sensação de espaço e possibilidade de volta com você. Respire fundo, enchendo o peito de vida e de presença. No seu próprio tempo, vá mexendo o corpo suavemente e abra os olhos, sentindo-se desperta, conectada com o seu propósito e pronta para o seu próximo passo.`;

// =============================================================================
// MAPEAMENTO TEMA → SESSÃO
// =============================================================================

export const SESSOES_REJANE: Record<string, SessaoRejane> = {
  ansiedade: {
    slug: "peito-leve",
    titulo: "O Peito Leve",
    textoAcolhimento:
      "Pare por um instante. Sinta o ar entrando... e saindo. Você não precisa dar conta de tudo agora. O mundo pode esperar cinco minutos, mas você não pode. Este é o seu espaço seguro para desarmar a urgência, soltar os ombros e apenas ser. Você está segura aqui.",
    mecanicaInterativa: "BALAO_DA_CALMA",
    seloAncora:
      "Eu tenho o controle sobre o meu ritmo. Eu escolho a paz e dou um passo de cada vez.",
    roteiroAudioMarkdown: ROTEIRO_PEITO_LEVE,
    audioDuracaoSegundos: 300,
  },
  autoestima: {
    slug: "olhar-para-si",
    titulo: "O Olhar para Si Mesma",
    textoAcolhimento:
      "Olhe para dentro por um instante. Muitas vezes, a timidez e a insegurança são apenas armaduras que você criou para se proteger. Mas você não precisa mais se esconder. Você é segura, você é suficiente e o seu espaço no mundo é seu por direito. Permita-se ser vista.",
    mecanicaInterativa: "ESPELHO_DA_VERDADE",
    seloAncora:
      "Eu me vejo, eu me aceito e eu me permito brilhar sem medo.",
    roteiroAudioMarkdown: ROTEIRO_OLHAR_PARA_SI,
    audioDuracaoSegundos: 300,
  },
  timidez: {
    slug: "olhar-para-si",
    titulo: "O Olhar para Si Mesma",
    textoAcolhimento:
      "Olhe para dentro por um instante. Muitas vezes, a timidez e a insegurança são apenas armaduras que você criou para se proteger. Mas você não precisa mais se esconder. Você é segura, você é suficiente e o seu espaço no mundo é seu por direito. Permita-se ser vista.",
    mecanicaInterativa: "ESPELHO_DA_VERDADE",
    seloAncora:
      "Eu me vejo, eu me aceito e eu me permito brilhar sem medo.",
    roteiroAudioMarkdown: ROTEIRO_OLHAR_PARA_SI,
    audioDuracaoSegundos: 300,
  },
  traicao: {
    slug: "coracao-inteiro",
    titulo: "O Coração Inteiro",
    textoAcolhimento:
      "A dor de um coração partido não é sinal de fraqueza, é o eco de um amor que foi real. Mas o fim de uma história não é o fim do seu valor. Você não foi descartada, você foi liberada para viver o que realmente merece. Dê a si mesma o direito de recomeçar por inteiro.",
    mecanicaInterativa: "CORTAR_FIOS",
    seloAncora:
      "Eu sou inteira. O meu valor não depende da escolha de ninguém.",
    roteiroAudioMarkdown: ROTEIRO_CORACAO_INTEIRO,
    audioDuracaoSegundos: 300,
  },
  luto: {
    slug: "dor-da-ausencia",
    titulo: "A Dor da Ausência",
    textoAcolhimento:
      "Sinta o seu peito por um instante. A dor que você carrega é a prova de que houve muito amor. Não tente ser forte agora, apenas permita-se sentir. Nós não vamos esquecer quem partiu; vamos apenas encontrar um lugar seguro e quente dentro de você para guardar essa história, com paz.",
    mecanicaInterativa: "RESGATE_MEMORIAS",
    seloAncora:
      "O amor não termina com a distância. Eu guardo a nossa história em mim com paz e escolho continuar caminhando.",
    roteiroAudioMarkdown: ROTEIRO_DOR_DA_AUSENCIA,
    audioDuracaoSegundos: 300,
  },
  solidao: {
    slug: "meu-proprio-lar",
    titulo: "O Meu Próprio Lar",
    textoAcolhimento:
      "Feche os olhos por um instante e sinta a sua respiração. O vazio que você sente aí dentro não é um espaço abandonado; é um espaço sagrado esperando para ser preenchido pelo seu próprio amor. Você nunca está verdadeiramente sozinha quando aprende a ser o seu próprio lar.",
    mecanicaInterativa: "ACENDER_LUZ_INTERNA",
    seloAncora:
      "Eu sou o meu próprio lar. Eu me pertenço e encontro paz na minha própria presença.",
    roteiroAudioMarkdown: ROTEIRO_MEU_PROPRIO_LAR,
    audioDuracaoSegundos: 300,
  },
  "sentido-da-vida": {
    slug: "sentido-da-vida",
    titulo: "O Sentido da Vida",
    textoAcolhimento:
      "Não saber para onde ir não significa que você está perdida; significa que você está diante de uma página em branco, pronta para ser escrita por você. A vida não tem um sentido pronto que você precisa achar; você cria o sentido dela a cada escolha, a cada instante. Respire fundo e permita-se apenas estar aqui.",
    mecanicaInterativa: "CONECTAR_ESTRELAS",
    seloAncora:
      "Eu sou a autora do meu próprio destino. Eu crio o sentido da minha vida a cada passo, com paz e liberdade.",
    roteiroAudioMarkdown: ROTEIRO_SENTIDO_DA_VIDA,
    audioDuracaoSegundos: 300,
  },
};
