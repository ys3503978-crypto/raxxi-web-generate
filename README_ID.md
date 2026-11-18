# RAXZI WEB GENERATE PRO

1. Isi `public/config.js` dengan Project URL dan Publishable Key (bukan Secret Key).
2. Jalankan `SUPABASE_SETUP.sql` di Supabase SQL Editor.
3. Supabase Authentication > Users: buat user admin memakai email/password. Salin UUID user.
4. Jalankan SQL: `INSERT INTO public.admin_users(user_id) VALUES ('UUID-USER-ADMIN');` ganti dengan UUID asli.
5. Upload seluruh isi ZIP ini ke root repository GitHub.
6. Import repository di Vercel. Tambahkan Environment Variables:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Secret Key baru (server-only, jangan pernah masuk file publik)
7. Redeploy Vercel. Website publik di `/`, panel admin di `/admin.html`.
8. Login admin dengan email/password user Supabase yang tadi dibuat. Tambah key dan atur WhatsApp dari panel.

PENTING: Jangan membagikan Secret Key, password database, atau password admin. Jangan membuat policy RLS publik pada ketiga tabel. Setiap key hanya diberikan sekali, lalu otomatis dinonaktifkan. Hapus key yang bocor dan rotasi Secret Key jika terekspos.