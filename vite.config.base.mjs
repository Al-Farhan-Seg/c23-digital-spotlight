// Shared Vite config merged into every site build/dev server.
// Keep this identical across sites; a site that genuinely needs to diverge
// (e.g. a Tailwind build) gets an optional sites/<slug>/vite.config.local.mjs
// that scripts/build-all.mjs and scripts/dev.mjs will merge on top via mergeConfig().
export const baseConfig = {
  // Root-relative asset paths: every site is served at its own subdomain root
  // by the Worker (see worker/index.js), so built HTML/JS must never bake in
  // a "/<slug>/" prefix — that prefix is an internal ASSETS lookup detail only.
  base: '/',
};
