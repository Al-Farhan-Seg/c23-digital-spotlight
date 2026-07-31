import { createServer, mergeConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseConfig } from '../vite.config.base.mjs';

const rootDir = resolve(fileURLToPath(import.meta.url), '../..');
const sitesDir = resolve(rootDir, 'sites');

const [slug, ...extraArgs] = process.argv.slice(2);
const available = readdirSync(sitesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const usage = `Usage: npm run dev -- <slug> [--host [address]]\nAvailable sites: ${available.join(', ')}`;

if (!slug || slug.startsWith('--') || !available.includes(slug)) {
  console.error(usage);
  process.exit(1);
}

// --host alone (or followed by another flag) means "expose on 0.0.0.0",
// same as Vite's own CLI; --host <address> pins it to a specific address.
// createServer() is the JS API, not the `vite` binary, so none of this is
// parsed for us — we have to read process.argv ourselves.
let host;
const hostIndex = extraArgs.indexOf('--host');
if (hostIndex !== -1) {
  const value = extraArgs[hostIndex + 1];
  host = value === undefined || value.startsWith('--') ? true : value;
}

const siteRoot = resolve(sitesDir, slug);
const localConfigPath = resolve(siteRoot, 'vite.config.local.mjs');
const localConfig = existsSync(localConfigPath)
  ? (await import(localConfigPath)).default
  : {};

const config = mergeConfig(mergeConfig(baseConfig, localConfig), {
  root: siteRoot,
  ...(host !== undefined ? { server: { host } } : {}),
});

const server = await createServer(config);
await server.listen();
server.printUrls();
