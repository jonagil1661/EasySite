// Run this locally once to get your Spotify refresh token.
// Usage: node scripts/get-spotify-token.js
//
// Before running:
//   1. Create a Spotify app at https://developer.spotify.com/dashboard
//   2. Add http://localhost:8888/callback as a redirect URI in the app settings
//   3. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET below (or as env vars)

const http  = require('http');
const https = require('https');
const url   = require('url');

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID     || 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI  = 'http://localhost:8888/callback';
const SCOPE         = 'user-read-recently-played';
const PORT          = 8888;

if (CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET as env vars, or edit this file.');
  process.exit(1);
}

const authUrl =
  'https://accounts.spotify.com/authorize' +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPE)}`;

console.log('\nOpen this URL in your browser:\n');
console.log(authUrl);
console.log('\nWaiting for callback on http://localhost:8888/callback ...\n');

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  if (parsed.pathname !== '/callback') { res.end(); return; }

  const code = parsed.query.code;
  if (!code) { res.end('No code received.'); return; }

  const body =
    `grant_type=authorization_code` +
    `&code=${encodeURIComponent(code)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const tokenRes = await new Promise((resolve, reject) => {
    const r = https.request({
      hostname: 'accounts.spotify.com',
      path: '/api/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, resp => {
      let d = '';
      resp.on('data', c => d += c);
      resp.on('end', () => resolve(JSON.parse(d)));
    });
    r.on('error', reject);
    r.write(body);
    r.end();
  });

  if (!tokenRes.refresh_token) {
    res.end('Error: ' + JSON.stringify(tokenRes));
    console.error('\nError getting token:', tokenRes);
    server.close();
    return;
  }

  res.end('<h2>Success! You can close this tab.</h2>');
  console.log('\n✅ Got your refresh token:\n');
  console.log('SPOTIFY_REFRESH_TOKEN=' + tokenRes.refresh_token);
  console.log('\nAdd this as a GitHub secret named SPOTIFY_REFRESH_TOKEN.\n');
  server.close();
});

server.listen(PORT);
