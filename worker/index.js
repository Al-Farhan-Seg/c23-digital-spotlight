// Explicit hostname allowlist — add one line per campaign launch.
// Unknown/unapproved hostnames (including www/jarah/roadmapsh, which are
// served elsewhere) must never reach this map's fallback path.
const HOSTNAME_TO_SLUG = {
  'c23.farhansegujja.com': 'c23',
  'nimu-timber.farhansegujja.com': 'nimu-timber',
  'nimu-capstone.farhansegujja.com': 'nimu-capstone',
  'nimu-capstonev2.farhansegujja.com': 'nimu-capstonev2',
  'nutking.farhansegujja.com': 'nutking',
  'modestmuse.farhansegujja.com': 'modestmuse',
  'wrist-mode.farhansegujja.com': 'wrist-mode',
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
    const response = await env.ASSETS.fetch(rewritten);

    // Cloudflare's default html_handling (auto-trailing-slash) can issue a
    // same-origin redirect to canonicalize a URL (e.g. /apply.html -> /apply,
    // or /index.html -> /). That decision is made against the slug-prefixed
    // path we just built, so its Location header comes back prefixed too
    // (e.g. /c23/apply) — a public URL none of our own pages ever generate.
    // Left as-is, the browser would follow it, hit this Worker again, and
    // get double-prefixed into /c23/c23/apply, which 404s. Strip the slug
    // back out of the Location before it reaches the client.
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('Location');
      if (location) {
        const redirectUrl = new URL(location, url.origin);
        const prefix = `/${slug}`;
        if (redirectUrl.pathname === prefix || redirectUrl.pathname.startsWith(`${prefix}/`)) {
          redirectUrl.pathname = redirectUrl.pathname.slice(prefix.length) || '/';
          const headers = new Headers(response.headers);
          headers.set('Location', redirectUrl.pathname + redirectUrl.search);
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }
      }
    }

    return response;
  },
};
