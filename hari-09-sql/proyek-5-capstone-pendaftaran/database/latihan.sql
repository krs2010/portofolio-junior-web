-- Modul Hari 9 - Lab 1: database/latihan.sql
-- Jalankan SETELAH database/skema.sql diimpor.
-- Urutan penting: jalankan nomor 1-6 dulu, baru 7-8,
-- karena 7 mengubah data dan 8 menghapus data.
-- Nomor 9 dan 10 jalankan masing-masing SENDIRI (satu query saja),
-- karena keduanya sengaja error dan phpMyAdmin berhenti di error pertama.

USE db_pelatihan;

-- Isi data: 3 kelas, 9 pendaftar.
-- Kelas id 3 (Bahasa Inggris) sengaja dikosongkan,
-- supaya soal nomor 6 ada hasilnya.
INSERT INTO kelas (nama_kelas, kuota) VALUES
    ('Web Programming', 30),
    ('Desain Grafis', 25),
    ('Bahasa Inggris', 20);

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id) VALUES
    ('Supri', 'supri@contoh.com', '081234567490', 'Surakarta', 2),
    ('Pri supri', 'prisupri@contoh.com', '085234567891', 'Solo', 1),
    ('sajiem', 'sajiem@contoh.com', '081234537892', 'Karanganyar', 1),
    ('Suliyem', 'suliyem@contoh.com', '081237567893', 'Surakarta', 2),
    ('Paijo', 'paijo@contoh.com', '081234567294', 'Solo', 2),
    ('Gatot', 'gatot@contoh.com', '081234567495', 'Klaten', 2),
    ('Pucol', 'pucol@contoh.com', '081234567196', 'Surakarta', 1),
    ('Panjul', 'panjul@contoh.com', '081234527897', 'Boyolali', 2),
    ('Lisa', 'lisa@contoh.com', '081234567893', 'Sukoharjo', 1);

-- 1. Semua pendaftar diurutkan nama A-Z
SELECT id, nama, email FROM pendaftar ORDER BY nama ASC;

-- 2. 5 pendaftar terbaru
SELECT id, nama, email, tgl_daftar FROM pendaftar
    ORDER BY tgl_daftar DESC, id DESC LIMIT 5;

-- 3. Pendaftar yang namanya mengandung "an"
SELECT id, nama, email FROM pendaftar WHERE nama LIKE '%an%';

-- 4. Nama pendaftar beserta nama kelas (JOIN)
SELECT p.nama, k.nama_kelas
    FROM pendaftar p
    JOIN kelas k ON k.id = p.kelas_id;

-- 5. Jumlah pendaftar per kelas (GROUP BY)
SELECT k.nama_kelas, COUNT(p.id) AS jumlah
    FROM kelas k
    LEFT JOIN pendaftar p ON p.kelas_id = k.id
    GROUP BY k.id, k.nama_kelas;

-- 6. Kelas yang belum memiliki pendaftar (LEFT JOIN ... IS NULL)
SELECT k.nama_kelas
    FROM kelas k
    LEFT JOIN pendaftar p ON p.kelas_id = k.id
    WHERE p.id IS NULL;

-- 7. Ubah nomor HP satu pendaftar (dengan WHERE)
UPDATE pendaftar SET no_hp = '081111111111' WHERE id = 4;

-- 8. Hapus satu pendaftar
DELETE FROM pendaftar WHERE id = 9;

-- 9. Coba masukkan email ganda: harus error 1062 Duplicate entry
INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
    VALUES ('Sari Lain', 'sari@contoh.com', '081234567899', 'Surakarta', 1);

-- 10. Coba hapus kelas yang masih memiliki pendaftar:
--     harus error 1451 (foreign key)
DELETE FROM kelas WHERE id = 1;
