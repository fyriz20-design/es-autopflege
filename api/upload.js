// api/upload.js — Vercel Blob Server-Side Upload
// Erwartet: POST /api/upload?filename=meinbild.jpg
// Body: roher Binärstrom (Bilddatei)

const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  // CORS für Admin-Panel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  // Einfacher Token-Schutz (in Vercel → Environment Variables: ADMIN_SECRET setzen)
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_SECRET && token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).json({ error: 'Query-Parameter "filename" fehlt' });
  }

  // Dateiname bereinigen
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

  try {
    const blob = await put(`gallery/${safe}`, req, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({
      url: blob.url,
      filename: safe,
      size: blob.size,
    });
  } catch (err) {
    console.error('Blob Upload Fehler:', err);
    return res.status(500).json({ error: err.message });
  }
};
