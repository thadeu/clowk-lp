import type { Product } from './products';

export type ProductText = Pick<Product, 'seoTitle' | 'seoDescription' | 'tagline' | 'summary' | 'bullets' | 'features' | 'faq'> & Partial<Pick<Product, 'installNote' | 'status' | 'primaryCta' | 'example'>>;

export const ptBr: Record<string, ProductText> = {
  auth: {
    seoTitle: 'auth by Clowk — broker de autenticação para qualquer stack',
    seoDescription:
      'O Clowk faz o fluxo OAuth com Google, GitHub, X e Apple e devolve um JWT assinado. Sem UI embutida, sem cobrança por MAU. SDKs para React, Next.js, Express, Hono e Rails.',
    tagline: 'Broker, não provedor. Login que fica fora da sua UI.',
    summary:
      'O Clowk faz o fluxo OAuth com Google, GitHub, X e Apple e entrega um JWT assinado ao seu app. Seu app mantém as próprias telas.',
    bullets: [
      'Login social, email e senha, magic links e TOTP',
      'JWT assinado que seu app verifica com JWKS',
      'Sem cobrança por MAU',
    ],
    installNote: 'SDKs JavaScript: npm install @clowk/sdk',
    primaryCta: { label: 'Comece grátis', href: 'https://app.clowk.in/sign-up' },
    features: [
      {
        title: 'Sem UI embutida',
        text: 'O Clowk roda todo o login no próprio domínio. Seu app redireciona e recebe um JWT de volta: sem formulários nem iframes nas suas páginas.',
      },
      {
        title: 'Qualquer stack',
        text: 'SDKs para React, Next.js, Express, Hono e Rails. O @clowk/core roda em Node.js, Bun, Deno e Workers.',
      },
      {
        title: 'Vários provedores',
        text: 'Google, GitHub, X e Apple, além de email e senha, magic links e TOTP.',
      },
      {
        title: 'Segurança por isolamento',
        text: 'Credenciais e tokens OAuth nunca tocam suas páginas. O fluxo roda no domínio do Clowk e devolve um JWT assinado.',
      },
      {
        title: 'Vários apps',
        text: 'Uma conta Clowk, vários apps. Cada app tem as próprias chaves, redirect URIs e usuários.',
      },
      {
        title: 'Sem cobrança por MAU',
        text: 'O plano Free tem o que você precisa para lançar o login. O número de usuários nunca aparece na fatura.',
      },
    ],
    faq: [
      {
        q: 'Qual a diferença entre o Clowk e o Clerk ou o Auth0?',
        a: 'O Clerk e o Auth0 mostram os formulários de login dentro do seu app. O Clowk faz o login por um redirect: seu app manda o usuário para o Clowk, o usuário entra, e seu app recebe um JWT assinado. Não há UI embutida para manter atualizada.',
      },
      {
        q: 'O que quer dizer broker?',
        a: 'Seu app → Clowk (faz o OAuth) → seu app (recebe um JWT assinado). O OAuth já redireciona o usuário, então uma UI embutida só adiciona um passo. O Clowk tira esse passo.',
      },
      {
        q: 'Quais provedores são suportados?',
        a: 'Google, GitHub, X e Apple, além de email e senha, magic links e TOTP.',
      },
      {
        q: 'O Clowk funciona fora do Rails?',
        a: 'Sim. @clowk/react, @clowk/nextjs, @clowk/express e @clowk/hono cobrem a maioria das stacks JavaScript, e o @clowk/core roda em Node.js, Bun, Deno e Cloudflare Workers.',
      },
      {
        q: 'O Clowk é grátis?',
        a: 'O plano Free tem o que você precisa para lançar o login. O Pro adiciona mais apps, instâncias, provedores e endpoints de webhook. Não há cobrança por MAU.',
      },
    ],
  },

  ndb: {
    seoTitle: 'ndb — a API do Elasticsearch e os filtros do MongoDB sobre NDJSON puro',
    seoDescription:
      'O ndb roda rotas do Elasticsearch e filtros do MongoDB sobre NDJSON puro. Um binário Go, sem JVM, sem cluster, sem schema. SDKs para Go, Ruby, Rails e TypeScript.',
    tagline: 'A API do Elasticsearch. Os filtros do MongoDB. Um binário Go.',
    summary:
      'O ndb roda as rotas que você conhece do Elasticsearch e a linguagem de consulta que você conhece do MongoDB sobre NDJSON puro. Um daemon, um diretório de dados. Sem JVM, sem cluster, sem schema.',
    bullets: [
      '_search, _count, _bulk e index patterns',
      'Filtros, updates e aggregate pipeline do MongoDB',
      'SDKs para Go, Ruby, Rails e TypeScript',
    ],
    installNote: 'Linux e macOS, amd64 e arm64',
    example: {
      caption: 'Busque as chamadas perdidas e ocupadas do último dia',
      code: `curl --unix-socket /run/ndb/ndb.sock \\
  http://ndb/calls/_search -d '{
  "query": {
    "status": { "$in": ["missed", "busy"] },
    "ts": { "$gte": "now-1d/d" }
  },
  "sort": { "ts": -1 },
  "limit": 50
}'`,
    },
    features: [
      {
        title: 'Rotas do Elasticsearch',
        text: '_search, _count, _bulk, _aggregate, _update_by_query e _delete_by_query, com index patterns como logs-2026-* e date math como now-7d/d.',
      },
      {
        title: 'Filtros do MongoDB',
        text: '$in, $gte, $regex, $elemMatch, $and e $or, updates com $set, $inc e $push, e um aggregate pipeline.',
      },
      {
        title: 'Outbox e streams',
        text: 'Um change feed com posições por consumidor, e streams no estilo Redis com grupos, retries e dead letter.',
      },
      {
        title: 'Dois modos de escrita',
        text: 'Os SDKs escrevem por um write-ahead log, ou seu app grava nos próprios arquivos NDJSON e o ndb acompanha.',
      },
      {
        title: 'O NDJSON é a verdade',
        text: 'Índices e segmentos colunares vêm dos seus dados. Apague tudo e o ndb monta de novo.',
      },
      {
        title: 'A mesma resposta em todo lugar',
        text: 'Os SDKs de Go, Ruby, Rails e TypeScript rodam os mesmos casos de teste que o daemon.',
      },
    ],
    faq: [
      { q: 'O ndb é um cluster?', a: 'Não. O ndb é um nó com um diretório de dados. Não há replicação nem sharding.' },
      { q: 'Preciso de JVM ou de schema?', a: 'Não. O ndb é um binário Go e lê NDJSON puro.' },
      { q: 'A API HTTP vai mudar?', a: 'A API HTTP é estável na 1.x. Rotas e chaves só mudam em uma versão major.' },
    ],
  },

  voodu: {
    seoTitle: 'voodu — PaaS self-hosted com um arquivo HCL e um voodu apply',
    seoDescription:
      'O voodu é um PaaS self-hosted no estilo Heroku. Um arquivo HCL descreve apps, ingress com TLS e serviços com estado. O voodu apply faz build, envia, roteia e troca a versão por SSH.',
    tagline: 'PaaS self-hosted. Um arquivo HCL. Um voodu apply.',
    summary:
      'Deploys no estilo Heroku nos seus próprios servidores. A CLI envia o build por SSH: sem commit, sem push, sem bare repo.',
    bullets: [
      'Apps, ingress com TLS, serviços com estado e backup',
      'Plugins para Postgres, Redis e mais',
      'Servidor no Linux, cliente no macOS',
    ],
    installNote: 'Modo servidor no Linux, modo cliente no macOS',
    features: [
      {
        title: 'Um arquivo HCL',
        text: 'Os manifestos descrevem o sistema em execução: apps, ingress com TLS e serviços com estado e backup.',
      },
      {
        title: 'Deploy sem commit',
        text: 'O voodu apply envia o contexto de build ao servidor por SSH. Sem commit, sem push, sem bare repo.',
      },
      {
        title: 'Build, envio, rota, troca',
        text: 'Um comando faz o build da imagem, sobe a nova release, move o tráfego e para a antiga.',
      },
      {
        title: 'Plugins',
        text: 'Serviços com estado, como Postgres e Redis, vêm como plugins, instalados com o servidor.',
      },
      {
        title: 'Seus próprios servidores',
        text: 'O instalador configura a CLI, o controller, o Docker e uma unit systemd em um servidor Linux.',
      },
      {
        title: 'Deploy por tag',
        text: 'Uma tag Git pode iniciar um deploy, então a tag é o registro do que está no ar.',
      },
    ],
    faq: [
      { q: 'Preciso de Kubernetes?', a: 'Não. O voodu roda em um servidor Linux comum com Docker.' },
      { q: 'Preciso fazer commit antes do deploy?', a: 'Não. A CLI envia o contexto de build direto ao servidor.' },
      { q: 'Em quais máquinas ele instala?', a: 'O servidor roda no Linux. No macOS o instalador configura só o cliente.' },
    ],
  },

  anway: {
    seoTitle: 'anway — background jobs para qualquer linguagem, um binário, sem Redis',
    seoDescription:
      'O anway é um servidor de background jobs para qualquer linguagem. Um binário com armazenamento em disco embutido, sem Redis. Envie um job do Rails e rode em Go.',
    tagline: 'Background jobs para qualquer linguagem. Um binário, sem Redis.',
    summary: 'Um app Rails envia email.send, e um worker Go executa. O armazenamento fica em disco, dentro do binário.',
    bullets: [
      'Filas com prioridade, retries com backoff e um dead set',
      'Cron, unique jobs e batches com callbacks',
      'SDKs para Ruby, Go e JavaScript',
    ],
    installNote: 'Binários para Linux e macOS em cada release',
    features: [
      { title: 'Qualquer linguagem', text: 'Envie um job em uma linguagem e rode em outra. Por exemplo, o Rails envia e o Go executa.' },
      { title: 'Sem Redis', text: 'Um binário com armazenamento em disco embutido. Nada mais para rodar.' },
      { title: 'Filas', text: 'Ordem por prioridade, pausa e retomada, e limite de vazão por fila.' },
      { title: 'Retries e dead set', text: 'Jobs agendados, retries com backoff, um dead set e MUTATE para alterá-los.' },
      { title: 'Cron e unique jobs', text: 'Cron, unique jobs e jobs que expiram, já inclusos.' },
      { title: 'Batches', text: 'Batches com callbacks e batches filhos, rastreio de jobs e um death hook.' },
    ],
    faq: [
      { q: 'Preciso de Redis?', a: 'Não. O anway guarda os jobs em disco, dentro do servidor.' },
      { q: 'Quais linguagens podem enviar e rodar jobs?', a: 'Há SDKs para Ruby, Go e JavaScript. Um job enviado em uma linguagem pode rodar em outra.' },
      { q: 'Como eu rodo?', a: 'Use a imagem Docker ou baixe um binário para Linux ou macOS nas releases.' },
    ],
  },

  cronota: {
    seoTitle: 'cronota — emita NFS-e com agendamento pelo Emissor Nacional',
    seoDescription:
      'O cronota emite NFS-e pelo Emissor Nacional: notas avulsas, modelos e agendamentos recorrentes com aprovação. Certificado A1 criptografado e auditado.',
    tagline: 'NFS-e com agendamento, pelo Emissor Nacional.',
    summary:
      'Para empresas no Brasil: notas avulsas, modelos e agendamentos recorrentes, com aprovação antes de cada nota se você quiser.',
    bullets: [
      'Modelos, rascunhos e cópia de qualquer nota',
      'Notas recorrentes com aprovação opcional',
      'Certificado A1 criptografado, cada abertura auditada',
    ],
    features: [
      { title: 'Notas', text: 'O mesmo formulário do Emissor Nacional. Comece de um modelo, copie qualquer nota ou salve um rascunho.' },
      { title: 'Agendamentos', text: 'Notas recorrentes, com aprovação opcional antes de cada emissão.' },
      { title: 'Live e Sandbox', text: 'Produção e produção restrita, trocadas no menu da conta.' },
      { title: 'Certificado A1', text: 'O PFX é criptografado, e cada abertura é auditada.' },
      { title: 'Sincronização com o ADN', text: 'Notas emitidas fora do cronota aparecem no app.' },
      { title: 'API e webhooks', text: 'API v1, webhooks, importação de XML, relatórios e membros da equipe.' },
    ],
    faq: [
      { q: 'Para quem é o cronota?', a: 'Para empresas no Brasil que emitem NFS-e pelo Emissor Nacional.' },
      { q: 'Posso conferir uma nota antes de ela sair?', a: 'Sim. Um agendamento pode pedir aprovação antes de cada nota.' },
      { q: 'Posso testar sem emitir notas reais?', a: 'Sim. Troque para Sandbox para usar a produção restrita.' },
    ],
  },

  '1billion': {
    seoTitle: '1billion — email transacional com servidor de email próprio',
    seoDescription:
      'O 1billion é o email transacional da Clowk, com servidor de email próprio, DKIM e uma API HTTP. Em desenvolvimento: roda primeiro dentro dos apps da Clowk e abre ao público depois.',
    tagline: 'Email transacional com servidor de email próprio.',
    summary:
      'Envie email do seu app com uma chamada HTTP. O 1billion coloca na fila, assina com DKIM e entrega por SMTP do próprio servidor.',
    bullets: [
      'Uma chamada HTTP por email, com API keys',
      'Workers de fila com retries, assinatura DKIM e SMTP',
      'Pago com créditos, sem mensalidade',
    ],
    status: 'Em desenvolvimento',
    example: {
      caption: 'Envie um email',
      code: `curl -X POST $BILLION_URL/send \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "from": "Acme <hi@acme.dev>",
  "to": ["you@example.com"],
  "subject": "Hello",
  "body": { "text": "Hello" }
}'`,
    },
    features: [
      { title: 'Servidor de email próprio', text: 'Um servidor de email em Go com API HTTP, workers de fila, SMTP e DKIM. Sem provedor de email terceiro.' },
      { title: 'Uma chamada HTTP', text: 'POST /send com uma API key. O console confere o pedido e responde na hora; o email sai em segundo plano.' },
      { title: 'Retries', text: 'Todo email passa por uma fila com retries antes de o servidor de email enviar.' },
      { title: 'Privado por design', text: 'O servidor de email não tem endereço público. Só o console fala com ele, pela rede privada.' },
      { title: 'Créditos, sem mensalidade', text: 'Você compra um pacote de créditos uma vez e usa até acabar.' },
      { title: 'Usado primeiro pelos nossos apps', text: 'O cronota foi feito para enviar email pelo 1billion. O acesso público abre depois.' },
    ],
    faq: [
      { q: 'Posso usar o 1billion agora?', a: 'Ainda não. O 1billion roda primeiro dentro dos apps da Clowk e abre ao público depois.' },
      { q: 'Como é cobrado?', a: 'Com créditos que você compra uma vez, sem mensalidade. Os preços ainda não são finais.' },
      { q: 'Ele usa outro provedor de email?', a: 'Não. O 1billion tem servidor de email próprio, com SMTP e DKIM próprios.' },
    ],
  },
};
