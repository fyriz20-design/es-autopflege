// api/upload.js — Vercel Blob Server-Side Upload
const { put } = require('@vercel/blob');

// Hilfsfunktion: Request-Body als Buffer einlesen
async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST erlaubt' });

  const filename = req.query.filename;
  if (!filename) return res.status(400).json({ error: 'filename fehlt' });

  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const contentType = req.headers['content-type'] || 'application/octet-stream';

  try {
    const body = await readBody(req);
    console.log('Upload:', safe, body.length, 'bytes, token:', process.env.BLOB_READ_WRITE_TOKEN ? 'vorhanden' : 'FEHLT');

    const blob = await put(`gallery/${safe}`, body, {
      access: 'public',
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ url: blob.url, filename: safe, size: blob.size });
  } catch (err) {
    console.error('Blob Fehler:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
