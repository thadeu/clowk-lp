import { defineI18n } from 'fumadocs-core/i18n';

export const docsI18n = defineI18n({
  languages: ['en', 'pt-br'],
  defaultLanguage: 'en',
  hideLocale: 'default-locale',
  parser: 'dot',
});

export const docsTranslations = {
  en: {},
  'pt-br': {
    search: 'Buscar',
    searchNoResult: 'Nenhum resultado',
    toc: 'Nesta página',
    tocNoHeadings: 'Sem títulos',
    lastUpdate: 'Atualizado em',
    chooseLanguage: 'Escolha um idioma',
    nextPage: 'Próxima página',
    previousPage: 'Página anterior',
    chooseTheme: 'Tema',
    editOnGithub: 'Editar no GitHub',
  },
};
