import { db, isAdmin } from './_db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await db
        .from('site_settings')
        .select('channel_url,whatsapp_number')
        .eq('id', true)
        .maybeSingle();

      if (error) throw error;
      return res.status(200).json(data || {});
    }

    if (!await isAdmin(req)) {
      return res.status(401).json({ error: 'Akses admin ditolak' });
    }

    if (req.method === 'POST') {
      const channel = String(req.body?.channel_url || '').trim();
      const phone = String(req.body?.whatsapp_number || '').replace(/\D/g, '');
      const { error } = await db
        .from('site_settings')
        .upsert({ id: true, channel_url: channel, whatsapp_number: phone }, { onConflict: 'id' });

      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method tidak diizinkan' });
  } catch (error) {
    console.error('API settings error:', error);
    return res.status(500).json({ error: error.message || 'Kesalahan server' });
  }
}
