// api/delete.js — Bild aus dem Blob Store löschen
// Aufruf: DELETE /api/delete?url=https://...

const { del } = require('@vercel/blob');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Nur DELETE erlaubt' });
  }

  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_SECRET && token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Query-Parameter "url" fehlt' });
  }

  try {
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return res.status(200).json({ deleted: true, url });
  } catch (err) {
    console.error('Blob Delete Fehler:', err);
    return res.status(500).json({ error: err.message });
  }
};
