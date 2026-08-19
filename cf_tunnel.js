import { startTunnel } from 'untun';
import fs from 'fs';

(async () => {
  try {
    const tunnel = await startTunnel({ port: 5173 });
    const url = await tunnel.getURL();
    console.log(`\n========================================`);
    console.log(`CLOUDFLARE PUBLIC TUNNEL URL: ${url}`);
    console.log(`========================================\n`);
    fs.writeFileSync('cf_url.txt', url);
  } catch (err) {
    console.error('Error starting untun tunnel:', err);
  }
})();
