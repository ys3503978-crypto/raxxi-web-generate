import { db, isAdmin } from './_db.js';

export default async function handler(req, res) {
  try {
    if (!await isAdmin(req)) return res.status(401).json({ error: 'Akses admin ditolak' });

    if (req.method === 'GET') {
      const { data, error } = await db
        .from('generated_keys')
        .select('id,key_value,is_active,created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const key = String(req.body?.key_value || '').trim();
      if (!key) return res.status(400).json({ error: 'Key wajib diisi' });

      const { data, error } = await db
        .from('generated_keys')
        .insert({ key_value: key, is_active: true })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'DELETE') {
      const id = String(req.body?.id || '');
      if (!id) return res.status(400).json({ error: 'ID key wajib diisi' });
      const { error } = await db.from('generated_keys').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method tidak diizinkan' });
  } catch (error) {
    console.error('API keys error:', error);
    return res.status(500).json({ error: error.message || 'Kesalahan server' });
  }
}
