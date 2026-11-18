import { db } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method tidak diizinkan' });

  try {
    const { data, error } = await db.rpc('raxzi_claim_key');
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Key belum tersedia' });

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ key: data });
  } catch (error) {
    console.error('API generate error:', error);
    return res.status(500).json({ error: error.message || 'Kesalahan server' });
  }
}
