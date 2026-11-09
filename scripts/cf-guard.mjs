// Runs before every Cloudflare build/deploy.
// OpenNext copies any .env / .env.local / .env.production file into the Worker
// bundle, so a local test file would ship its keys (and override the real ones
// set on Cloudflare). Refuse to build while one exists.
import { existsSync } from 'node:fs';

const risky = ['.env', '.env.local', '.env.production', '.env.production.local'].filter((f) => existsSync(f));

if (risky.length) {
  console.error(
    `\nStop: ${risky.join(', ')} would be copied into the Worker.\n` +
      'Rename it (for example to .env.local.off) before building, and keep real\n' +
      'keys only in Cloudflare > Settings > Variables and Secrets.\n' +
      'For local previews use .dev.vars (it is never bundled).\n'
  );
  process.exit(1);
}
