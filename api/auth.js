// api/auth.js — Admin-Login prüfen
// Aufruf: POST /api/auth mit Header x-admin-token

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'x-admin-token');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST erlaubt' });

  if (!process.env.ADMIN_SECRET) {
    return res.status(500).json({ error: 'ADMIN_SECRET ist in Vercel nicht konfiguriert' });
  }

  if (req.headers['x-admin-token'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Falsches Passwort' });
  }

  return res.status(200).json({ ok: true });
};
