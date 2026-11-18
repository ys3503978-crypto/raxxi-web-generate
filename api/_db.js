import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error('Konfigurasi server belum lengkap: periksa SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di Vercel.');
}

export const db = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export async function isAdmin(req) {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) return false;

  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) return false;

  const { data: row, error: lookupError } = await db
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();

  return !lookupError && !!row;
}
