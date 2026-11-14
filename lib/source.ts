import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { docsI18n } from '@/lib/i18n/docs';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n: docsI18n,
});
