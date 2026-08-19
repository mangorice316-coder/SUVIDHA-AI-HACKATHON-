import localtunnel from 'localtunnel';
import fs from 'fs';

(async () => {
  try {
    const tunnel = await localtunnel({ port: 5173 });
    const url = tunnel.url;
    console.log(`\n========================================`);
    console.log(`PUBLIC TUNNEL URL: ${url}`);
    console.log(`========================================\n`);
    fs.writeFileSync('tunnel_url.txt', url);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Error starting tunnel:', err);
  }
})();
