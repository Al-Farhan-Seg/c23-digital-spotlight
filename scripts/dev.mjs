import { createServer, mergeConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseConfig } from '../vite.config.base.mjs';

const rootDir = resolve(fileURLToPath(import.meta.url), '../..');
const sitesDir = resolve(rootDir, 'sites');

const slug = process.argv[2];
const available = readdirSync(sitesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (!slug || !available.includes(slug)) {
  console.error(`Usage: npm run dev -- <slug>\nAvailable sites: ${available.join(', ')}`);
  process.exit(1);
}

const siteRoot = resolve(sitesDir, slug);
const localConfigPath = resolve(siteRoot, 'vite.config.local.mjs');
const localConfig = existsSync(localConfigPath)
  ? (await import(localConfigPath)).default
  : {};

const config = mergeConfig(mergeConfig(baseConfig, localConfig), {
  root: siteRoot,
});

const server = await createServer(config);
await server.listen();
server.printUrls();
