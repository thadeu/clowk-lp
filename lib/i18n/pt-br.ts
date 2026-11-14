import type { Dictionary } from './en';

export const ptBr: Dictionary = {
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  languageName: 'Português',
  switchLabel: 'English',
  switchAria: 'View in English',

  site: {
    title: 'Clowk — Ferramentas pequenas que rodam nos seus servidores',
    description:
      'A Clowk faz ferramentas self-hosted: auth para login, ndb para busca em NDJSON, voodu para deploys, anway para jobs em background, cronota para NFS-e e 1billion para email.',
  },

  nav: {
    products: 'Produtos',
    family: 'Como se encaixam',
    docs: 'Docs',
    signIn: 'Entrar',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },

  footer: {
    tagline: 'Ferramentas pequenas que rodam nos seus servidores.',
    products: 'Produtos',
    docs: 'Docs',
    company: 'Empresa',
    support: 'Suporte',
    terms: 'Termos',
    rights: 'Todos os direitos reservados.',
  },

  home: {
    pill: 'Seis produtos · uma família · self-hosted',
    title: 'Ferramentas pequenas que rodam nos seus servidores.',
    lead: 'Login para qualquer stack, busca em NDJSON puro, deploys a partir de um arquivo HCL, jobs em background sem Redis, NFS-e agendada e, em breve, email. Cada uma faz uma coisa só, e todas funcionam bem juntas.',
    seeProducts: 'Ver os produtos',
    startAuth: 'Começar pelo auth',
    productsTitle: 'Os produtos',
    productsLead: 'Cada produto tem a sua página aqui e a sua própria documentação.',
    notPublic: 'Roda primeiro dentro dos apps da Clowk. Abre ao público depois.',
    about: (name: string) => `Sobre o ${name} →`,
    familyTitle: 'Usamos as nossas próprias ferramentas.',
    familyLead: 'O cronota é um app de verdade e roda em quatro dos produtos. Você pode combinar do mesmo jeito, ou usar só um.',
    runsOn: 'roda em',
    usedBy: { 'sign-in': 'login', deploys: 'deploys', jobs: 'jobs', email: 'email' },
    waysTitle: 'Um jeito de trabalhar',
    ways: [
      { title: 'Seus servidores', text: 'Rode cada produto em uma máquina que você controla. Instale com um comando.' },
      { title: 'Pequeno de propósito', text: 'Um binário ou um app, configurado em um arquivo. Nenhum cluster para cuidar.' },
      { title: 'Docs para pessoas e agentes', text: 'Páginas curtas em palavras simples, escritas para devs e para agentes de IA.' },
    ],
  },

  product: {
    breadcrumb: 'Produtos',
    by: 'by Clowk',
    github: 'Ver no GitHub',
    install: 'Instalar',
    features: 'O que você ganha',
    more: 'Mais da Clowk',
    questions: 'Perguntas',
    openCronota: 'Abrir o cronota ↗',
    readDocs: 'Ler a documentação',
  },

  code: {
    eyebrow: 'Integre em minutos',
    title: 'Do zero ao login em 5 linhas',
    lead: 'Funciona com a stack que você já usa. Nenhuma abstração nova para aprender.',
    more: 'Precisa de mais detalhes?',
    readDocs: 'Ler a documentação →',
  },

  sdk: {
    title: 'Um broker, todo runtime',
    leadBefore: 'Todos os pacotes dependem do',
    leadAfter: 'para verificar o token. Os pacotes de framework são camadas finas que adaptam o core às convenções de cada framework.',
    packages: {
      '@clowk/core': 'Base que roda em qualquer runtime. Verificação de JWT, cliente HTTP e recursos do SDK. Funciona em Node.js, Bun, Deno e Cloudflare Workers.',
      '@clowk/sdk': 'Pacote de conveniência para o seu app. Reexporta tudo do @clowk/core com um import mais limpo.',
      '@clowk/react': 'ClowkProvider, SignInButton, SignUpButton, SignOutButton e o hook useAuth. Baseado em redirect — sem UI embutida.',
      '@clowk/nextjs': 'Middleware no servidor para proteger rotas, helper auth() para Server Components, e os componentes React reexportados.',
      '@clowk/express': 'Middleware para Express. Extrai e verifica o JWT da query, do cookie ou do header Authorization.',
      '@clowk/hono': 'Middleware para Hono. O mesmo comportamento do Express, adaptado à API do Hono. Funciona em Workers, Bun, Deno e Node.js.',
    },
  },

  pricing: {
    eyebrow: 'Preços',
    title: 'Dois planos. Sem cobrança por usuário.',
    lead: 'Autenticação cobrada pelo que você constrói, não por quantas pessoas fazem login. O número de usuários nunca aparece na fatura.',
    mostTeams: 'Mais escolhido',
    questions: 'Dúvidas sobre os planos? Escreva para',
    plans: [
      {
        name: 'Free',
        tagline: 'Tudo o que você precisa para colocar login no ar.',
        price: '$0',
        cadence: 'para sempre',
        cta: 'Começar agora',
        features: [
          '1 app',
          '1 instância de produção',
          'Login com Google',
          'Email e senha',
          'Usuários ilimitados — sem cobrança por MAU',
          'Todos os SDKs: React, Next.js, Express, Hono, Rails',
          '1 endpoint de webhook',
        ],
      },
      {
        name: 'Pro',
        tagline: 'Para times que rodam mais de uma coisa.',
        price: 'Veja no app',
        cadence: 'por organização, por mês',
        cta: 'Assinar o Pro',
        features: [
          'Apps ilimitados',
          'Instâncias de produção ilimitadas',
          'Login com Google, GitHub, X e Apple',
          'Email e senha',
          'Usuários ilimitados — sem cobrança por MAU',
          'Todos os SDKs: React, Next.js, Express, Hono, Rails',
          'Endpoints de webhook ilimitados',
        ],
      },
    ],
  },

  docs: {
    menu: 'Menu',
    openSidebar: 'Abrir menu lateral',
    closeSidebar: 'Fechar menu lateral',
    back: 'Voltar para a Clowk',
  },

  notFound: {
    title: 'Página não encontrada',
    text: 'A página que você procura não existe ou mudou de lugar.',
    back: 'Voltar para o início',
  },

  terms: {
    title: 'Termos de Serviço — Clowk',
    description: 'Termos de serviço da Clowk, política de uso aceitável e informações legais.',
  },
};
