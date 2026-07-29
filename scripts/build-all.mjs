import { build, mergeConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
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

  const config = mergeConfig(mergeConfig(baseConfig, localConfig), {
    root: siteRoot,
    build: {
      outDir: resolve(rootDir, 'dist', slug),
      emptyOutDir: true,
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
