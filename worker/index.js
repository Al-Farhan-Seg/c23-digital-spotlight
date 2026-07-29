// Explicit hostname allowlist — add one line per campaign launch.
// Unknown/unapproved hostnames (including www/jarah/roadmapsh, which are
// served elsewhere) must never reach this map's fallback path.
const HOSTNAME_TO_SLUG = {
  'c23.farhansegujja.com': 'c23',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const slug = HOSTNAME_TO_SLUG[url.hostname];

    if (!slug) {
      return new Response('Not found', { status: 404 });
    }

    const rewritten = new Request(
      new URL(`/${slug}${url.pathname}${url.search}`, url.origin),
      request
    );
    return env.ASSETS.fetch(rewritten);
  },
};
