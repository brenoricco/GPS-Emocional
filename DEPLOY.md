# Deploy do GPS Emocional no Railway

Guia passo-a-passo pra subir o app em produção.

## Estratégia de banco

- **Dev local**: SQLite (`prisma/schema.prisma`, arquivo `prisma/dev.db`)
- **Produção (Railway)**: PostgreSQL (`prisma/schema.production.prisma`, gerado automaticamente)

Quando você editar `prisma/schema.prisma` (dev), rode:
```bash
pnpm db:sincronizar-prod
```
Isso atualiza `prisma/schema.production.prisma` (mesmo schema, provider postgresql). Commite os dois.

## Pré-requisitos

- Conta em https://railway.app
- Repositório no GitHub com o código atualizado
- API keys: Groq, Resend, Google OAuth

## Passos

### 1. Criar projeto Railway

1. Acesse https://railway.app
2. **+ New Project → Deploy from GitHub repo** → selecione o repo do GPS Emocional
3. Railway detecta Next.js, usa NIXPACKS e lê `railway.toml`

### 2. Adicionar PostgreSQL

1. Dentro do projeto, **+ New → Database → Add PostgreSQL**
2. Railway provisiona Postgres e gera `DATABASE_URL` automaticamente
3. No serviço do app, vá em **Variables → Raw Editor** e referencie:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

### 3. Variáveis de ambiente

No serviço do app, **Variables**:

```bash
# Aplicação
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://gpsemocional.up.railway.app

# Auth.js — GERE NOVOS valores pra produção (não reuse dev)
AUTH_SECRET=<gere com: openssl rand -base64 32>
AUTH_URL=https://gpsemocional.up.railway.app
AUTH_TRUST_HOST=true

# Google OAuth (crie credenciais novas pra prod no Google Cloud Console)
# Redirect URI exato: https://gpsemocional.up.railway.app/api/auth/callback/google
AUTH_GOOGLE_ID=<google_client_id>
AUTH_GOOGLE_SECRET=<google_client_secret>

# Resend (verifique seu domínio em resend.com → Domains)
RESEND_API_KEY=<re_...>
EMAIL_REMETENTE="GPS Emocional <ola@gpsemocional.com.br>"

# Groq Cloud — REVOGUE a chave de dev (exposta em chat) e gere nova
GROQ_API_KEY=<gsk_...>
IA_MODELO_PADRAO=meta-llama/llama-4-scout-17b-16e-instruct
IA_MODELO_ANALISE=qwen/qwen3-32b

# Criptografia (LGPD Art. 11) — GERE NOVA chave pra prod e GUARDE em local seguro
# Atenção: trocar essa chave depois inviabiliza decifrar dados existentes
CHAVE_CRIPTOGRAFIA_CONTEUDO=<gere com: openssl rand -base64 32>
```

### 4. Deploy

Railway lê `railway.toml`:
- **buildCommand**: instala deps → sincroniza schema prod → gera Prisma Client → aplica schema no Postgres (`db push`) → roda seed (8 temas + 7 sessões Rejane) → builda Next.js com output standalone
- **startCommand**: `pnpm start`
- **healthcheck**: `/api/saude` (timeout 60s)

Acompanhe em **Deployments → Build Logs**.

### 5. Domínio

- **Settings → Domains → Generate Domain** pra `gpsemocional.up.railway.app` gratuito, ou
- **+ Custom Domain** pra `gpsemocional.com.br` (configurar CNAME no DNS)

Após domínio personalizado, atualize:
- `NEXT_PUBLIC_APP_URL`
- `AUTH_URL`
- Google OAuth redirect URI

## Antes do primeiro acesso público

- [ ] `AUTH_SECRET` único pra prod
- [ ] `CHAVE_CRIPTOGRAFIA_CONTEUDO` único pra prod (NÃO trocar depois!)
- [ ] **Revogar chave Groq antiga** (exposta em chat) e gerar nova
- [ ] Credenciais Google OAuth próprias pra prod
- [ ] Domínio Resend verificado e `EMAIL_REMETENTE` ajustado
- [ ] Visitar `/api/saude` e ver `{ status: "ok" }`
- [ ] Testar registro com magic link real
- [ ] Testar Google OAuth real
- [ ] Validar PWA: Application → Service Workers + Manifest no DevTools

## Custos estimados

- **Railway Hobby**: $5/mês ($5 de crédito)
- **Postgres free tier**: até ~500MB de armazenamento
- **Resend free tier**: 3k emails/mês
- **Groq free tier**: rate limits generosos
- **Domínio .com.br**: ~R$ 40/ano

**Total mensal MVP**: ~$5-10 USD + domínio.

## Atualizando o app

A cada push pra `main`:
1. Railway detecta automaticamente
2. Roda buildCommand
3. `db push` sincroniza schema (sem migration tracking — é OK pra MVP)
4. Seed roda toda vez (upserts idempotentes)
5. Deploy substitui versão anterior

## Pós-deploy — próximos passos

- Adicionar Sentry/PostHog pra erro tracking
- Migrar de `db push` pra `migrate deploy` quando schema estabilizar
- Implementar Web Push real (VAPID) pra notificações
- Backup automático do Postgres (Railway tem snapshot diário)
