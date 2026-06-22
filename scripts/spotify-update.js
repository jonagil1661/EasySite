// Runs in GitHub Actions. Fetches recently played tracks and writes _data/spotify.json.
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getAccessToken() {
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(SPOTIFY_REFRESH_TOKEN)}`;
  const res = await request({
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  if (!res.body.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(res.body));
  return res.body.access_token;
}

async function getRecentlyPlayed(token) {
  const res = await request({
    hostname: 'api.spotify.com',
    path: '/v1/me/player/recently-played?limit=12',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (res.status !== 200) throw new Error('Failed to fetch recently played: ' + JSON.stringify(res.body));
  return res.body.items;
}

(async () => {
  const token = await getAccessToken();
  const items = await getRecentlyPlayed(token);

  // Dedupe by track ID, keep most recent play of each
  const seen = new Set();
  const tracks = [];
  for (const item of items) {
    const t = item.track;
    if (!t || seen.has(t.id)) continue;
    seen.add(t.id);
    tracks.push({
      name:     t.name,
      artist:   t.artists.map(a => a.name).join(', '),
      album:    t.album.name,
      albumArt: t.album.images[0]?.url || '',
      url:      t.external_urls.spotify,
    });
  }

  const out = { updated: new Date().toISOString(), tracks };
  const outPath = path.join(process.cwd(), '_data', 'spotify.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote ${tracks.length} tracks to _data/spotify.json`);
})();
