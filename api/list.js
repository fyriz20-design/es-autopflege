// api/list.js — Alle Bilder aus dem Blob Store auflisten
// Aufruf: GET /api/list

const { list } = require('@vercel/blob');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET erlaubt' });
  }

  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_SECRET && token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  try {
    const { blobs } = await list({
      prefix: 'gallery/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ blobs });
  } catch (err) {
    console.error('Blob List Fehler:', err);
    return res.status(500).json({ error: err.message });
  }
};
