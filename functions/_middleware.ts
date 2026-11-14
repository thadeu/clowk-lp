/**
 * Cloudflare Pages middleware for the language of the site.
 *
 * English is the default. A visitor without a `lang` cookie whose IP is in a
 * Portuguese-speaking country is sent to the `/pt-br` page once. The language
 * switch sets the cookie, so the choice always wins over the IP. Crawlers are
 * never redirected: they read both versions through the hreflang links.
 *
 * Pages under `/pt-br` get `<html lang="pt-BR">`, because the static export
 * writes one root layout for every page.
 */

type Context = {
  request: Request & { cf?: { country?: string } };
  next: () => Promise<Response>;
};

const PREFIX = '/pt-br';
const PORTUGUESE = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);
const CRAWLER = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack/i;

function cookie(request: Request, name: string) {
  const match = request.headers.get('cookie')?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));

  return match?.[1];
}

function isPortuguesePath(pathname: string) {
  return pathname === PREFIX || pathname.startsWith(`${PREFIX}/`);
}

function isPage(pathname: string) {
  return !/\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith('.html');
}

function wantsPortuguese(request: Context['request']) {
  const choice = cookie(request, 'lang');

  if (choice) return choice === 'pt-br';

  if (CRAWLER.test(request.headers.get('user-agent') ?? '')) return false;

  return PORTUGUESE.has(request.cf?.country ?? '');
}

export async function onRequest({ request, next }: Context): Promise<Response> {
  const url = new URL(request.url);
  const portuguese = isPortuguesePath(url.pathname);

  if (!portuguese && request.method === 'GET' && isPage(url.pathname) && wantsPortuguese(request)) {
    return new Response(null, {
      status: 302,
      headers: { location: `${PREFIX}${url.pathname}${url.search}`, vary: 'cookie', 'cache-control': 'private, no-store' },
    });
  }

  const response = await next();

  if (!portuguese || !response.headers.get('content-type')?.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('html', { element: element => element.setAttribute('lang', 'pt-BR') })
    .transform(response);
}
