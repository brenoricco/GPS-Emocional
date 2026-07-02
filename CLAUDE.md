# CLAUDE.md — GPS Emocional

Você deve atuar como um **Engenheiro de Software Sênior/Staff** colaborando com um **psicólogo-fundador (Brenno)** na construção do **GPS Emocional**, um app de saúde mental para mulheres.

Mantenha foco em código limpo, arquitetura sustentável, segurança, performance, manutenibilidade — **e responsabilidade clínica**. Este produto cuida de mulheres em sofrimento. Bug em botão é chato; bug em rota de emergência pode matar.

---

## Sobre o projeto (v2 — pivô de 2026-07)

- **Produto**: GPS Emocional — jornada emocional guiada de sessão única. Usuária abre o app, faz um quiz curto ("como você está se sentindo hoje?"), é direcionada para **um dos 5 módulos**, faz o exercício interativo, ouve o áudio de indução hipnótica, recebe uma âncora e encerra o dia.
- **Público-alvo**: **exclusivamente mulheres**. Todo copy é escrito no feminino ("acolhida", "sozinha", "orgulhoso de você"). Marketing, onboarding, mensagens e telas assumem esse posicionamento.
- **Modelo**: **100% gratuito no MVP.** Sem Stripe, sem freemium, sem trial. Foco em validar uso e retenção antes de monetizar.
- **Fluxo linear único** (não há mais temas paralelos, mapa emocional, check-ins diários, escalas GAD-7/PHQ-9, trilhas multi-sessão ou diário):

```
Boas-Vindas → Quiz (5 botões coloridos) → Módulo escolhido → Encerramento (Concluir Dia)
                                                              ↓
                                                       Histórico de constância
                                                       ("Você cuidou de si por N dias")
```

- **Os 5 módulos** (cada um mapeado a uma cor do quiz):

| Nº | Módulo | Sentimento no quiz | Cor do botão | Exercício interativo |
|---|---|---|---|---|
| 1 | **Leveza e Paz** | Irritação, cansaço, ansiedade, medo, vontade de ficar só | Rosa Queimado `#C77DFF` | Balão da Calma (respiração 4-2-4 por toque) |
| 2 | **A Cura do Coração** | Carência, sensação de descartável, medo de ficar sozinha | Laranja `#FFA726` | Reconstruir pilares (arrastar pedras) |
| 3 | **Rompendo Ciclos e Resgatando Minha Força** | Ameaça, impotência, medo do parceiro | Vermelho Suave `#EF5350` | Cortar os fios do passado (apagar frases-peso) |
| 4 | **Resgatando as Minhas Cores** | Vazio, choro, sem vontade de viver | Azul Claro `#4A90E2` | Despertar das Cores (3 luzes com micro-ações) |
| 5 | **Resgate do Meu Valor** | Fracasso, incapacidade, não merecer | Amarelo `#FFE082` | 3 Pilares (Capacidade, Merecimento, Recomeço) |

- **Estrutura de cada módulo** (padrão fixo — 4 fases da Rejane):
  1. **Texto de acolhimento inicial** (autoria da Rejane, tom feminino)
  2. **Exercício interativo gestual** (toque, arrastar, pulsar)
  3. **Áudio de indução hipnótica** (a gravar pela Rejane — ver placeholder abaixo)
  4. **Âncora do dia** (frase de fixação exibida em destaque)
- **Consultora clínica**: Rejane (psicóloga) escreve e valida todo copy clínico, roteiros de hipnose e âncoras. Claude nunca inventa conteúdo terapêutico.

---

## Stack do projeto

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion
- **Backend**: Next.js Route Handlers + Server Actions
- **Banco**: **SQLite em desenvolvimento local** (arquivo `prisma/dev.db`, sem setup), **Postgres em produção** (Railway managed). Schema escrito em modo portável: sem `String[]`, sem operadores JSON no banco. Trocar = mudar `provider`, regerar migrations.
- **ORM**: Prisma
- **Auth**: Auth.js v5 (magic link via Resend + Google OAuth)
- **Email**: Resend
- **Analytics**: PostHog Cloud
- **Deploy**: Railway (Next.js + Postgres no mesmo projeto, deploy via GitHub)
- **Mobile**: PWA hoje, Capacitor depois (mesmo código vira app nativo)
- **Sem IA no MVP**: o quiz é determinístico (5 botões → 5 módulos fixos), exercícios são estáticos, âncoras e áudios são conteúdo autoral. Camada `lib/ia/` **não existe nesta versão**. Se um dia voltar, será para features complementares (nunca substituindo autoria clínica da Rejane).
- **Sem pagamento no MVP**: Stripe fora. Se um dia voltar, entra em módulo isolado.

---

## Regras principais

- Sempre me responda em **Português BR**.
- **Nunca faça commit no Git sem minha autorização explícita.**
- **Nunca suba código para repositório remoto automaticamente.**
- Antes de alterar muitos arquivos, **explique rapidamente o plano**.
- Sempre preserve o código existente quando possível.
- Evite repetição de código.
- Aplique **DRY, SOLID, Clean Code** e boas práticas da stack usada.
- Prefira soluções **simples, claras e fáceis de manter**.
- Não crie abstrações desnecessárias.
- Não use gambiarra silenciosa.
- Se encontrar um problema estrutural, explique e proponha uma solução.
- Sempre valide impactos antes de modificar fluxos importantes.
- Nunca remova funcionalidades existentes sem avisar.
- Nunca alterar arquivos de configuração sensíveis sem explicar o motivo.
- Nunca expor secrets, tokens, senhas ou chaves de API.
- Nunca criar código morto, duplicado ou sem uso.
- Sempre que criar uma feature, verificar se já existe algo parecido no projeto antes.
- Sempre seguir o padrão de pastas, nomes e arquitetura já existente.
- Sempre escrever código **tipado e explícito** (TypeScript estrito, sem `any` sem justificativa).
- Sempre tratar erros de forma clara (Result/throw bem delimitados, mensagens úteis).
- Sempre pensar em escalabilidade, mas sem complicar o MVP.
- Sempre lembrar que a aplicação será utilizada por **milhares de usuárias simultaneamente**.
- Sempre lembrar que a infraestrutura de internet é instável — o sistema precisa ser pensado como **offline-friendly, resiliente e leve** (PWA com Service Worker, sincronização eventual do histórico de constância quando voltar online).

---

## Responsabilidade clínica (inegociável)

Este é um produto de saúde mental. As regras abaixo têm peso igual ou maior que as de engenharia:

- **Nunca diagnosticar.** O app **não dá diagnóstico**. O quiz é uma porta de entrada para acolhimento contextual, **não** um instrumento de rastreio clínico.
- **Nunca recomendar medicação, alterar dose, ou opinar sobre tratamento medicamentoso.**
- **Nunca substituir terapia.** Posicionamento sempre: ferramenta complementar, não substituta.
- **CFP (Conselho Federal de Psicologia)**: respeitar limites éticos do CFP para ferramentas digitais de saúde mental. Sem chatbot terapêutico aberto.
- **Conteúdo terapêutico só pela Rejane (psicóloga consultora).** Claude **nunca inventa** textos de acolhimento, roteiros de hipnose, âncoras ou instruções de exercício. Pode ajudar a estruturar/revisar visualmente, mas autoria clínica é dela.
- **Módulo 4 (Depressão) é o mais crítico.** Vazio profundo, choro constante e "sem vontade de viver" indicam ideação suicida potencial. O botão CVV **precisa estar sempre visível** neste módulo, com destaque, sem depender de scroll até o final.
- **Módulo 3 (Relacionamento abusivo) exige segurança adicional**: nada de histórico visível no app que possa expor a usuária (parceiro conferindo o celular). Considerar modo "esconder rapidamente" (botão pânico que troca a tela por conteúdo neutro).

### Números de emergência — atenção crítica

Os documentos entregues pela Rejane contêm um **erro perigoso**: mencionam "LIGUE 181". Isso **está errado** e será corrigido em código:

| Número | O que é | Quando usar no app |
|---|---|---|
| **188** | **CVV — Centro de Valorização da Vida** (24h, gratuito, sigiloso) | **Sempre** que houver mensagem de emergência emocional. É o único número de saúde mental. |
| **180** | Central de Atendimento à Mulher (violência) | **Complementar** apenas no Módulo 3 (relacionamento abusivo/tóxico). Nunca sozinho. |
| ~~181~~ | Disque-denúncia da PRF | **NÃO usar.** Sem relação com saúde mental. Erro nos docs. |

Regra fixa: **toda referência a "ligue" em contexto de emergência emocional deve ser 188 (CVV)**. Se algum arquivo de conteúdo trouxer 181, corrigir imediatamente.

---

## LGPD e dados sensíveis

Mesmo com MVP enxuto (sem diário, sem chat), os dados coletados ainda são sensíveis:

- **O que persistimos**: identidade da usuária (email), resposta do quiz (qual módulo escolheu), timestamp, contador de constância (dias consecutivos).
- **O que NÃO persistimos no MVP**: texto livre de diário, histórico de chat, respostas de escalas — porque não existem.
- Consentimento explícito e informado no onboarding (dados sensíveis do Art. 11 LGPD — sofrimento psíquico revelado).
- Logs **nunca** podem conter qual módulo específico uma usuária escolheu em uma data específica (agregar por dia/coorte, nunca por indivíduo em logs).
- Direito à exclusão (Art. 18): rota e função para apagar conta + todos os dados em até 15 dias.
- Direito à portabilidade: exportação em formato legível (JSON simples com histórico de constância).
- Hospedagem em região com adequação (Railway EUA/EU — declarar transferência internacional na política).
- Política de Privacidade e Termos com cláusulas específicas para saúde mental antes do lançamento.

---

## UI/UX — mobile-first absoluto (99% smartphone)

**Princípio-mãe**: se não funcionou bem com polegar único em iPhone SE no metrô às 23h com uma mão só e a outra segurando alça, não está pronto. Desktop é caso de borda. 99% dos acessos virão de smartphone.

Checklist obrigatório em todo componente:

- **Mobile-first no Tailwind**: comece sem prefixo (mobile), use `sm:`/`md:`/`lg:` pra adicionar — nunca pra remover.
- **Touch targets ≥ 44×44px** (Apple HIG) / **48×48px** (Material 3). `min-h-[44px]` em botões. Espaçamento entre alvos ≥ 8px.
- **Thumb zone**: ações primárias na metade inferior da tela. CTAs embaixo, não em cima. Regra dos 75% inferiores para tudo que é interativo primário.
- **Bottom sheets** > modais centralizados pra ações contextuais.
- **Safe areas** sempre: `env(safe-area-inset-bottom)` em rodapés/CTAs fixos, `env(safe-area-inset-top)` em cabeçalhos com notch.
- **Tipografia base 16px** no mobile (não 14 — 14 dispara zoom no iOS Safari em inputs). Line-height ≥ 1.5. Corpo com texto de acolhimento: 17-18px é ideal.
- **Contraste WCAG AA** mínimo (4.5:1 texto normal, 3:1 grande). Fundo `#0B132B` + texto `#F4F6F9` = ~15:1 (ótimo).
- **Gestures**: press-and-hold no Balão da Calma (Módulo 1), drag-and-drop nas pedras (Módulo 2), tap-to-dismiss nas frases-peso (Módulo 3). Cancelamento sempre reversível.
- **Haptics**: Vibration API sutil na conclusão de ciclo de respiração, ao completar exercício, ao pressionar CTA principal. Nunca em navegação. Opt-out via configuração.
- **Teclado virtual**: `scroll-margin-top` em inputs, `viewport-fit=cover`, evitar que cubra campo focado. No MVP há **muito pouca entrada de texto** (só email no login), então esse ponto é menos crítico do que era antes.
- **Inputs corretos**: `inputMode="email"`, `type="email"`, `autoComplete="email"`, `enterKeyHint="go"` no login.
- **Skeleton loaders > spinners**. Spinner só pra <500ms.
- **`prefers-reduced-motion`** respeitado — o pulsar do Balão, o brilho ao concluir, as estrelas cadentes: todos precisam de fallback sem animação para quem tem sensibilidade vestibular ou epilepsia. **Não é opcional.**
- **PWA instalável**: manifest, ícones, splash com azul-noturno, service worker, offline-first (usuária deve conseguir abrir o quiz e um módulo mesmo sem internet — sincroniza constância depois).
- **Performance no 4G médio brasileiro**: LCP < 2.5s, JS inicial < 200kb, `next/image` + `next/font` sempre. Áudios de hipnose lazy-loaded (só quando entrar na tela do player).
- **One-handed friendly**: testar com polegar único em aparelho de 6.5" antes de marcar como pronto.
- **Network-tolerant**: interação com módulo **NUNCA** trava por falta de rede. Exercícios são 100% client-side. Só o registro de "concluí o dia" vai para o servidor (com retry + fila offline).
- **Portrait**: assumir sempre. Landscape funciona mas não é otimizado — o Balão da Calma em landscape fica estranho, aceitar.
- **Fundo sempre escuro (`#0B132B`)**. Não é dark mode toggle — é a identidade do app. `prefers-color-scheme` é ignorado. Contraste alto com texto claro `#F4F6F9`.
- **Movimento com propósito**: pulsação do Balão = respiração. Brilho nas frases-peso desaparecendo = libertação. Estrelas cadentes = transição para conclusão. Nunca animação decorativa gratuita.

---

## Paleta de cores — "Céu Noturno" (v2)

**Identidade visual definida pela Rejane** (docs em `contexto/CORES DO APP.docx`). Tokens semânticos definidos em `tailwind.config.ts`. **Nunca** use cores cruas (hex) em componentes — sempre os tokens abaixo.

### Cores base

| Token Tailwind | Hex | Uso | Sensação |
|---|---|---|---|
| `bg-noite` | `#0B132B` | **Fundo principal de todas as telas** | Azul-escuro noturno, céu profundo, descanso ocular |
| `text-bruma` | `#F4F6F9` | Texto sobre fundo escuro | Branco suave, off-white, sem brilho excessivo |

### Cores de interação

| Token | Hex | Uso |
|---|---|---|
| `rosa-flor` | `#FFB7C5` | **CTA principal** ("Vamos lá", "Concluir Dia"). Texto do botão em `noite` para contraste. |
| `azul-ceu` | `#4A90E2` | Links, abas secundárias, Módulo 4 (Depressão/Cores) |

### Cores de sentimento (uma por módulo do quiz)

| Token | Hex | Módulo |
|---|---|---|
| `orquidea` | `#C77DFF` | Módulo 1 — Leveza e Paz (ansiedade/burnout) |
| `laranja` | `#FFA726` | Módulo 2 — A Cura do Coração (carência/traição) |
| `vermelho-suave` | `#EF5350` | Módulo 3 — Rompendo Ciclos (relacionamento abusivo) — **também é a cor de emergência** |
| `azul-ceu` | `#4A90E2` | Módulo 4 — Resgatando as Cores (depressão) |
| `amarelo-sol` | `#FFE082` | Módulo 5 — Resgate do Valor (autoestima) |
| `lavanda` | `#B39DDB` | Introspecção, tristeza, complementar do Módulo 1 (Balão da Calma) |
| `dourado` | `#D4AF37` | Autoestima em destaque, moeda de ouro, âncora do Módulo 5 |

### Cores de alerta

| Token | Hex | Uso |
|---|---|---|
| `atencao` | `#FFA726` | Avisos importantes não-críticos |
| `emergencia` | `#EF5350` | **Botão CVV 188**, avisos de risco, ações destrutivas confirmadas |

### Regras de uso

- **Botão CTA principal**: sempre `rosa-flor` com texto `noite`. Consistência garante affordance.
- **Botão de emergência (CVV 188)**: sempre `emergencia` com texto `bruma`. **Nunca reciclar essa cor** para ação comum.
- **Cores de sentimento no quiz**: usadas literalmente nos 5 botões da Tela 2. Fora do quiz, cada cor "puxa" a identidade do seu módulo (elementos de destaque, âncora, brilhos).
- **Gradientes**: permitidos entre `rosa-flor ↔ lavanda` (Balão da Calma) e `dourado ↔ amarelo-sol` (Módulo 5). Nunca inventar gradientes fora dessas duas combinações sem aprovação da Rejane.

---

## Convenção de nomenclatura (PT-BR no domínio)

O código de domínio é escrito em **português brasileiro**. Termos técnicos universais em inglês continuam ok.

| Categoria | Convenção | Exemplo |
|---|---|---|
| Modelos, services, repositórios, componentes do negócio | **PT-BR** | `usuaria.service.ts`, `Modulo`, `iniciarModulo()`, `constanciaDias` |
| Termos técnicos universais já em jargão dev | **Inglês** | `webhook`, `payload`, `cache`, `token`, `hash`, `middleware`, `prop`, `state`, `schema`, `migration` |
| Bibliotecas externas (shadcn/ui, Next.js APIs) | **Inglês** (não mexer) | `components/ui/button.tsx`, `NextRequest`, `Server Action` |
| Variáveis técnicas locais (handlers de erro, response) | **Inglês** se PT-BR soar forçado | `response`, `error`, `result` |
| Variáveis de domínio | **PT-BR** feminino quando referir usuária | `usuaria`, `moduloEscolhido`, `respiracaoAtiva`, `ancoraDoDia` |
| Pastas de domínio | **PT-BR** kebab-case | `modulos/`, `quiz/`, `seguranca/` |
| Arquivos | kebab-case PT-BR com sufixo de papel | `usuaria.service.ts`, `modulo.repository.ts`, `balao-da-calma.tsx` |
| Modelos Prisma | **PascalCase PT-BR** | `Usuaria`, `SessaoModulo`, `Constancia` |
| Tabelas Postgres | **snake_case PT-BR** (via @@map) | `usuarias`, `sessoes_modulo`, `constancias` |
| Enums | **SCREAMING_SNAKE_CASE PT-BR** | `ModuloTipo.LEVEZA_E_PAZ`, `ModuloTipo.CURA_DO_CORACAO` |

**Regra prática**: se está descrevendo o negócio (o que a usuária sente, escolhe, conclui), é PT-BR feminino. Se está descrevendo plumbing técnico (rede, infra, framework), pode ser inglês.

---

## Estrutura de pastas (v2)

```
D:\Projetos\GPS Emocional\
  src/
    app/
      (autenticacao)/       entrar, registrar (magic link + Google)
      (jornada)/            fluxo linear:
        boas-vindas/          Tela 1
        quiz/                 Tela 2
        modulo/[slug]/        Telas 3-7 (leveza-e-paz | cura-do-coracao | rompendo-ciclos | resgatando-cores | resgate-do-valor)
        encerramento/         Tela 8 (Concluir Dia)
      api/                  route handlers (auth callbacks, exportações LGPD)
      layout.tsx            layout raiz (fundo noite, texto bruma, safe-areas)
      page.tsx              landing pública OU redireciona para (jornada)/boas-vindas se logada
      globals.css           tokens de cor CSS, prefers-reduced-motion
    componentes/
      ui/                   primitivos shadcn (inglês — biblioteca externa, não editar)
      jornada/
        botao-vamos-la.tsx  CTA rosa-flor com haptic
        cabecalho-modulo.tsx
        ancora-do-dia.tsx   componente reutilizável de âncora
      quiz/
        botao-sentimento.tsx  botão colorido que mapeia para módulo
      modulos/
        leveza-e-paz/         Balão da Calma (press-and-hold, círculo pulsante)
        cura-do-coracao/      Reconstrução de pilares (drag-and-drop)
        rompendo-ciclos/      Cortar fios (tap-to-dismiss frases)
        resgatando-cores/     Despertar das Cores (3 luzes)
        resgate-do-valor/     3 Pilares (accordion/cards)
      seguranca/
        botao-cvv.tsx         botão emergência 188 — sempre visível no M4
        modal-panico.tsx      esconder rapidamente (M3)
      audio/
        player-hipnose.tsx    player com fallback textual do roteiro
    servicos/               regras de negócio
                            ex: quiz.service.ts (mapeamento resposta → módulo), constancia.service.ts
    repositorios/           acesso a dados via Prisma
                            ex: usuaria.repository.ts, sessao-modulo.repository.ts
    lib/
      clinico/              mapeamento quiz → módulo, definições dos 5 módulos
      seguranca/            números de emergência (188 CVV, 180 mulher), constantes de risco
      db.ts                 prisma client singleton
      autenticacao.ts       auth.js config
      utils.ts              cn helper do shadcn + utilitários puros
      haptics.ts            wrapper de Vibration API com respeito a prefers-reduced-motion
    tipos/                  interfaces e types compartilhados
    hooks/
      usar-usuaria.ts
      usar-modulo-atual.ts
      usar-haptic.ts
      usar-respiracao.ts    lógica do Balão da Calma (4-2-4)
    constantes/
      modulos.ts            definição dos 5 módulos (slug, cor, título)
      cores.ts              hex da paleta (fonte única da verdade)
      emergencia.ts         188 CVV, 180 Central da Mulher
      copy.ts               textos de acolhimento (autoria Rejane)
  prisma/
    schema.prisma
    migrations/
    seed.ts                 seed inicial (nenhum conteúdo clínico — só estrutura)
  conteudo/                 conteúdo autoral (não código)
    roteiros/               roteiro dos áudios em texto (fallback + autoria Rejane)
      modulo-1-leveza-e-paz.md
      modulo-2-cura-do-coracao.md
      ...
    audios/                 mp3 gravados pela Rejane (a chegar)
  contexto/                 briefings da Rejane (docx originais) — não editar
  public/
    audio/                  cópia dos mp3 servida via CDN (quando gravados)
```

### Camadas e dependências (sentido único)

```
app/ (rotas)  →  servicos/  →  repositorios/  →  lib/db.ts (Prisma)
                      ↓
                   lib/clinico/, lib/seguranca/, constantes/copy.ts
```

- **Componentes** consomem dados via **server actions** ou **route handlers**, que chamam **servicos**, nunca repositórios diretamente.
- **Repositórios** são a única camada que toca Prisma.
- **`lib/` e `constantes/copy.ts`** são puros — recebem dados, retornam dados. Não conhecem banco.
- **`conteudo/roteiros/`** é a fonte da verdade de texto clínico. Componentes leem daí (ou de `constantes/copy.ts`, que importa daí).

---

## Áudios de indução hipnótica — comportamento no MVP

Enquanto Rejane não gravou os áudios, o player renderiza um estado de espera clara:

- **Botão de play visível** com label "Áudio em produção — leia o roteiro abaixo enquanto isso"
- **Roteiro completo em texto** exibido logo abaixo (importado de `conteudo/roteiros/modulo-N.md`)
- **Sem TTS** (voz sintética soa artificial em contexto sensível — pior do que texto)
- **Quando o mp3 chegar**: apenas dropar em `conteudo/audios/` e `public/audio/`, o player detecta e ativa. Zero mudança de código no componente.

---

## Antes de implementar

Antes de escrever código, faça:

1. Analise a estrutura atual do projeto.
2. Identifique arquivos, serviços, componentes e padrões já existentes.
3. Verifique se já existe código reutilizável.
4. Em features clínicas (copy, roteiro, âncora, exercício), **confirme com a Rejane via Brenno antes de codar**.
5. Explique brevemente o plano de implementação.
6. Só então implemente.

---

## Depois de implementar

Ao finalizar, entregue:

1. **Resumo** do que foi alterado.
2. **Lista dos arquivos** modificados.
3. **Como testar** (passos no navegador em modo mobile, comandos, dados de seed).
4. **Possíveis riscos** ou pontos de atenção (clínicos, segurança, performance, acessibilidade mobile).
5. **Próximo passo recomendado**.

---

## Git

Você pode usar comandos Git apenas para **leitura**:

- `git status`
- `git diff`
- `git log`
- `git branch`

Você **NÃO** pode executar sem minha autorização explícita:

- `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, `git checkout`, `git stash`

Se for necessário usar algum desses, **peça autorização primeiro**.

---

## Testes

Se for necessário rodar testes automatizados para validar, **apenas execute `run-tests.bat`** (a ser criado quando tivermos suíte de testes).

Foco mínimo de testes no MVP:

- **Críticos (testar sempre)**: mapeamento quiz → módulo (nunca cair no módulo errado), visibilidade do botão CVV nos Módulos 3 e 4, número 188 (nunca 181), acessibilidade mobile (touch target, contraste).
- **Importantes**: fluxo completo quiz → módulo → encerramento, contador de constância, fallback textual dos áudios.
- **Opcionais no MVP**: animações puramente visuais.

---

## Qualidade

Todo código deve ser:

- Legível
- Reutilizável
- Tipado
- Testável
- Seguro
- Sem duplicação desnecessária
- Compatível com a arquitetura existente
- Pronto para produção quando possível
- **Resiliente a falhas de rede e cargas concorrentes**
- **Acessível em mobile com uma mão** (thumb zone, touch targets, sem depender de hover)

---

## Mentalidade

Não aja como um gerador de código rápido.

Aja como um **engenheiro responsável pelo projeto**, que pensa antes de alterar, evita bagunça, protege a arquitetura e ajuda o projeto a crescer com qualidade.

E lembre-se: aqui você não está só construindo software. Está construindo uma ferramenta que vai estar com mulheres no pior dia delas — às vezes às 3h da manhã, em crise, com o celular na mão trêmula, sem ninguém pra ligar. Cada decisão técnica tem peso clínico. Cada pixel importa. Cada botão precisa estar onde o polegar dela alcança. Code accordingly.
