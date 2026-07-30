import { build, mergeConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseConfig } from '../vite.config.base.mjs';

const rootDir = resolve(fileURLToPath(import.meta.url), '../..');
const sitesDir = resolve(rootDir, 'sites');

const slugs = readdirSync(sitesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => {
    const hasIndex = existsSync(resolve(sitesDir, slug, 'index.html'));
    if (!hasIndex) console.warn(`[build-all] skipping "${slug}": no index.html found`);
    return hasIndex;
  });

if (slugs.length === 0) {
  console.error('[build-all] no sites found in sites/ — nothing to build');
  process.exit(1);
}

const failures = [];

for (const slug of slugs) {
  const siteRoot = resolve(sitesDir, slug);
  const localConfigPath = resolve(siteRoot, 'vite.config.local.mjs');
  const localConfig = existsSync(localConfigPath)
    ? (await import(localConfigPath)).default
    : {};

  // Any *.html file directly in the site root becomes its own build entry
  // (e.g. index.html + apply.html) — flat files only, no subfolders, so
  // Cloudflare's html_handling never needs a directory-redirect for them.
  const htmlFiles = readdirSync(siteRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name);
  const input = Object.fromEntries(
    htmlFiles.map((file) => [basename(file, '.html'), resolve(siteRoot, file)])
  );

  const config = mergeConfig(mergeConfig(baseConfig, localConfig), {
    root: siteRoot,
    build: {
      outDir: resolve(rootDir, 'dist', slug),
      emptyOutDir: true,
      rollupOptions: { input },
    },
  });

  console.log(`[build-all] building "${slug}"...`);
  try {
    await build(config);
  } catch (err) {
    console.error(`[build-all] "${slug}" failed:`, err.message);
    failures.push(slug);
  }
}

if (failures.length > 0) {
  console.error(`[build-all] failed sites: ${failures.join(', ')}`);
  process.exit(1);
}

console.log(`[build-all] done — built ${slugs.length} site(s): ${slugs.join(', ')}`);
