-- =====================================================
-- Script untuk memasukkan akun admin ke database
-- Password sudah di-hash dengan BCrypt (strength 10)
-- Compatible dengan Spring Security BCryptPasswordEncoder
-- =====================================================
--
-- Password plaintext: admin@sk4ned4
-- BCrypt hash (strength 10, generated):
--   $2b$10$KJ5CgQaIp67w1R8zXmgLpeFlGKaeUmGAJ2vadf.4rKQduYGHHCVc.
--
-- CATATAN: $2b$ dan $2a$ keduanya valid di Spring Security BCryptPasswordEncoder

-- Hapus data lama jika ada (opsional)
-- DELETE FROM admin WHERE email = 'admin@sekolah.sch.id';

-- Insert atau update akun admin
INSERT INTO admin (email, password)
VALUES (
    'admin@sekolah.sch.id',
    '$2b$10$KJ5CgQaIp67w1R8zXmgLpeFlGKaeUmGAJ2vadf.4rKQduYGHHCVc.'
)
ON CONFLICT (email) DO UPDATE
    SET password = EXCLUDED.password;

-- Verifikasi berhasil:
SELECT id, email, LEFT(password, 7) || '...' AS password_type FROM admin;
-- Kolom password_type seharusnya menampilkan: $2b$10$...
-- Ini menandakan password sudah benar di-hash dengan BCrypt

