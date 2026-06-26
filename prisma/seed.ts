/* eslint-disable no-console */
import { PrismaClient, type StatusTema } from "@prisma/client";

import { SESSOES_REJANE } from "./dados-rejane";

/**
 * Seed dos 10 temas do GPS Emocional + Sessões clínicas da Rejane.
 *
 * 7 temas DISPONIVEL (com material clínico real)
 * 3 temas EM_BREVE (aguardando material)
 *
 * Idempotente: rodar múltiplas vezes não duplica.
 */

const db = new PrismaClient();

interface SementeTema {
  slug: string;
  nome: string;
  subtituloModulo?: string;
  descricaoCurta: string;
  descricaoLonga: string;
  regiaoMapaSlug: string;
  corPrincipal: string;
  iconeSlug: string;
  ordemExibicao: number;
  premium: boolean;
  status: StatusTema;
}

const TEMAS: SementeTema[] = [
  {
    slug: "ansiedade",
    nome: "Ansiedade",
    subtituloModulo: "O Peito Leve",
    descricaoCurta:
      "Pensamento acelerado, peito apertado, futuro que não chega.",
    descricaoLonga:
      "A ansiedade é o corpo se preparando pra um perigo que ainda não chegou. Aqui vamos desacelerar o pensamento, devolver ar pro peito e separar medo real de medo imaginado.",
    regiaoMapaSlug: "tempestade-do-mar",
    corPrincipal: "oceano-500",
    iconeSlug: "tempestade",
    ordemExibicao: 1,
    premium: false,
    status: "DISPONIVEL",
  },
  {
    slug: "autoestima",
    nome: "Autoestima",
    subtituloModulo: "O Olhar para Si Mesma",
    descricaoCurta:
      "Voz crítica interna, autocomparação, sentir que não basta.",
    descricaoLonga:
      "Autoestima não é se achar a melhor — é deixar de se achar a pior. Vamos suavizar a voz crítica, reconstruir narrativa pessoal e treinar autocompaixão como músculo.",
    regiaoMapaSlug: "praia-ao-amanhecer",
    corPrincipal: "brisa-400",
    iconeSlug: "sol-nascente",
    ordemExibicao: 2,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "timidez",
    nome: "Timidez",
    subtituloModulo: "O Olhar para Si Mesma",
    descricaoCurta:
      "Evitação social, autoconsciência excessiva, voz baixa.",
    descricaoLonga:
      "Timidez não é falha — é hipervigilância social. Vamos diminuir o monitoramento interno e construir confiança em conversas que importam.",
    regiaoMapaSlug: "enseada-escondida",
    corPrincipal: "brisa-300",
    iconeSlug: "enseada",
    ordemExibicao: 3,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "traicao",
    nome: "Traição",
    subtituloModulo: "O Coração Inteiro",
    descricaoCurta: "Confiança quebrada, autoimagem fraturada, futuro incerto.",
    descricaoLonga:
      "Traição não é só perda do outro — é perda da versão de você que confiava. Aqui vamos navegar negação, raiva, barganha, tristeza e aceitação no seu tempo.",
    regiaoMapaSlug: "naufragio",
    corPrincipal: "oceano-700",
    iconeSlug: "naufragio",
    ordemExibicao: 4,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "luto",
    nome: "Luto",
    subtituloModulo: "A Dor da Ausência",
    descricaoCurta: "Perda de pessoa, vínculo, fase, identidade.",
    descricaoLonga:
      "Luto não é só pela morte. É por tudo que termina. Aqui vamos acolher a saudade sem corrida pra superá-la, e descobrir quem você se torna depois.",
    regiaoMapaSlug: "mar-aberto-cinzento",
    corPrincipal: "areia-500",
    iconeSlug: "onda-cinza",
    ordemExibicao: 5,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "solidao",
    nome: "Solidão",
    subtituloModulo: "O Meu Próprio Lar",
    descricaoCurta: "Vazio, isolamento, ser a própria companhia.",
    descricaoLonga:
      "Solidão é diferente de solitude. Aqui vamos transformar isolamento em encontro consigo, e fazer da própria presença um lar acolhedor.",
    regiaoMapaSlug: "refugio-interno",
    corPrincipal: "areia-500",
    iconeSlug: "casa-lareira",
    ordemExibicao: 6,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "sentido-da-vida",
    nome: "Sentido da Vida",
    subtituloModulo: "O Sentido da Vida",
    descricaoCurta: "Vazio existencial, busca por propósito.",
    descricaoLonga:
      "Quando a vida perde a cor e o porquê some, a saída não é encontrar o sentido — é construí-lo. Vamos reconectar com valores e descobrir o próximo passo.",
    regiaoMapaSlug: "constelacao",
    corPrincipal: "oceano-600",
    iconeSlug: "constelacao",
    ordemExibicao: 7,
    premium: true,
    status: "DISPONIVEL",
  },
  {
    slug: "relacionamento-toxico",
    nome: "Relacionamento Tóxico",
    descricaoCurta:
      "Ciclo de violência, gaslighting, dependência. Reconhecer pra sair.",
    descricaoLonga:
      "Quando o vínculo machuca mais do que cuida, mas você não consegue sair. Conteúdo clínico em construção.",
    regiaoMapaSlug: "redemoinho",
    corPrincipal: "coral-500",
    iconeSlug: "redemoinho",
    ordemExibicao: 8,
    premium: true,
    status: "EM_BREVE",
  },
  {
    slug: "procrastinacao",
    nome: "Procrastinação",
    descricaoCurta:
      "Adiamento como autocuidado fingido. Tarefa cresce, energia some.",
    descricaoLonga:
      "Procrastinação raramente é preguiça — é regulação emocional disfarçada. Conteúdo clínico em construção.",
    regiaoMapaSlug: "aguas-paradas",
    corPrincipal: "areia-400",
    iconeSlug: "aguas-paradas",
    ordemExibicao: 9,
    premium: true,
    status: "EM_BREVE",
  },
  {
    slug: "trauma-infancia",
    nome: "Trauma de Infância",
    descricaoCurta:
      "Família disfuncional, abandono, abuso. O passado que ainda governa.",
    descricaoLonga:
      "Trauma complexo na infância marca corpo, vínculo e identidade. Conteúdo clínico em construção, com cuidado trauma-informed.",
    regiaoMapaSlug: "profundezas",
    corPrincipal: "oceano-800",
    iconeSlug: "profundezas",
    ordemExibicao: 10,
    premium: true,
    status: "EM_BREVE",
  },
];

async function popular(): Promise<void> {
  console.log("Iniciando seed dos temas + sessões da Rejane...\n");

  for (const temaSemente of TEMAS) {
    const tema = await db.tema.upsert({
      where: { slug: temaSemente.slug },
      create: temaSemente,
      update: temaSemente,
    });

    console.log(
      `  Tema: ${tema.nome}${tema.subtituloModulo ? ` (${tema.subtituloModulo})` : ""} — ${tema.status}`,
    );

    const sessaoRejane = SESSOES_REJANE[tema.slug];
    if (!sessaoRejane) {
      console.log(`    (sem sessão — em breve)`);
      continue;
    }

    const dadosSessao = {
      slug: sessaoRejane.slug,
      titulo: sessaoRejane.titulo,
      textoAcolhimento: sessaoRejane.textoAcolhimento,
      mecanicaInterativa: sessaoRejane.mecanicaInterativa,
      seloAncora: sessaoRejane.seloAncora,
      roteiroAudioMarkdown: sessaoRejane.roteiroAudioMarkdown,
      audioDuracaoSegundos: sessaoRejane.audioDuracaoSegundos,
      audioUrl: null,
      ordem: 1,
      requisitoPremium: tema.premium,
      ativo: true,
      temaId: tema.id,
    };

    await db.sessao.upsert({
      where: {
        temaId_slug: { temaId: tema.id, slug: sessaoRejane.slug },
      },
      create: dadosSessao,
      update: dadosSessao,
    });
    console.log(
      `    ↳ Sessão: ${sessaoRejane.titulo} (${sessaoRejane.mecanicaInterativa})`,
    );
  }

  console.log(`\nSeed concluído. ${TEMAS.length} temas processados.`);
}

popular()
  .catch((erro: unknown) => {
    console.error("Erro ao popular o banco:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
