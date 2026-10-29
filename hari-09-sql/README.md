# Hari 9 — SQL dan Database

Folder ini berisi latihan dasar SQL dengan MySQL serta proyek capstone pendaftaran yang menggunakan PHP dan PDO.

## Isi folder

- `proyek-5-capstone-pendaftaran/database/skema.sql` — membuat database `db_pelatihan` beserta tabel `kelas`, `pendaftar`, dan `admin`.
- `proyek-5-capstone-pendaftaran/database/latihan.sql` — contoh data dan latihan `SELECT`, `WHERE`, `ORDER BY`, `LIKE`, `JOIN`, `GROUP BY`, `UPDATE`, dan `DELETE`. Dua query terakhir sengaja menghasilkan error untuk memperlihatkan batasan `UNIQUE` dan foreign key.
- `proyek-5-capstone-pendaftaran/config/` — contoh konfigurasi aplikasi dan koneksi database.
- `proyek-5-capstone-pendaftaran/public/` — halaman login admin, daftar/cari pendaftar, tambah, ubah, dan hapus data, serta demo SQL injection.
- `proyek-5-capstone-pendaftaran/src/` — koneksi awal aplikasi, helper, validasi, dan operasi data pendaftar.
- `proyek-5-capstone-pendaftaran/templates/` — template header dan footer.

## Menjalankan latihan SQL

1. Jalankan MySQL, misalnya dengan mengaktifkan MySQL di XAMPP.
2. Buka phpMyAdmin (`http://localhost/phpmyadmin`) atau klien MySQL lain.
3. Impor atau jalankan `proyek-5-capstone-pendaftaran/database/skema.sql`.
4. Setelah skema berhasil dibuat, jalankan `proyek-5-capstone-pendaftaran/database/latihan.sql`.

Di `latihan.sql`, jalankan soal 1–6 terlebih dahulu, kemudian soal 7–8 karena keduanya mengubah data. Soal 9 (email duplikat) dan 10 (menghapus kelas yang masih dipakai) memang dirancang untuk gagal; jalankan masing-masing secara terpisah.

## Menjalankan proyek pendaftaran

Pastikan Apache dan MySQL aktif di XAMPP, lalu:

1. Siapkan database dengan menjalankan `skema.sql` dan `latihan.sql` seperti langkah di atas.
2. Salin `proyek-5-capstone-pendaftaran/config/config.contoh.php` menjadi `config.php`, lalu sesuaikan host, nama database, username, dan kata sandi MySQL. Jangan membagikan konfigurasi yang berisi kredensial.
3. Buat akun admin pada tabel `admin`. Buat hash kata sandi menggunakan `public/hash.php` melalui PHP, lalu simpan username dan hash tersebut ke tabel. `hash.php` menghasilkan hash untuk kata sandi contoh `adminadmin`; ganti dengan kata sandi pilihan sendiri sebelum digunakan.
4. Buka aplikasi melalui:

```text
http://localhost/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/
```

Jalankan PHP melalui server web, bukan dengan membuka berkas PHP langsung. Pastikan PHP memiliki ekstensi PDO MySQL dan mbstring.

Contoh membuat akun setelah memperoleh hash kata sandi:

```sql
INSERT INTO admin (username, password_hash)
VALUES ('admin', '<hash-yang-dihasilkan>');
```

`public/hash.php` menggunakan kata sandi contoh yang tertulis di dalam file. Untuk akun dengan kata sandi pilihan sendiri, ubah nilai contoh tersebut sebelum membuat hash. Hapus atau batasi akses ke halaman pembuat hash setelah selesai.

## Materi yang dipraktikkan

- Membuat database, tabel, primary key, foreign key, indeks, dan aturan `UNIQUE`.
- Mengambil, menyaring, mengurutkan, menggabungkan, dan mengelompokkan data.
- Mengubah dan menghapus data serta memahami dampak constraint.
- Menghubungkan PHP ke MySQL menggunakan PDO dan prepared statements.
- Membuat alur CRUD pendaftar, validasi input, pencarian, autentikasi admin, dan perlindungan CSRF.
- Membandingkan query rentan dan prepared statement di halaman `public/injeksi.php`. Demo ini sengaja rentan dan hanya untuk database contoh di localhost; jangan gunakan atau publikasikan versi rentannya pada aplikasi sungguhan.
