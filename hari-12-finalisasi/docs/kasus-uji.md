# Kasus Uji — Capstone Sprint 2 (Hari 11)

Format T6 modul. Halaman: `public/daftar.php` untuk
pendaftaran publik, `public/login.php` + halaman admin
(`index.php`, `tambah.php`, `ubah.php`, `hapus.php`,
`cetak.php`) untuk login dan proteksi.

## Persiapan sebelum menjalankan

1. Import `database/skema.sql` lalu `database/latihan.sql`
   (kelas sudah punya kolom `kuota`: Web Programming 30,
   Desain Grafis 25, Bahasa Inggris 20; data latihan:
   Web terisi 5, Desain terisi 4, Bahasa Inggris terisi 0).
2. Buat akun admin sekali, dari **root proyek** (bukan
   dari `public/`), dengan sandi buatan sendiri
   (minimal 8 karakter, jangan pakai contoh di modul
   untuk akun beneran):
   ```bash
   php database/buat-admin.php <username> <sandi-min-8-karakter>
   ```
   Kalau username sudah ada, akan error duplikat —
   pakai username lain.
3. Untuk uji akhir, set `'debug' => false` di
   `config/config.php` **lokal** lo (berkas ini tidak
   dikirim dan tidak diubah asisten, karena berisi
   konfigurasi database lo sendiri).
4. Jalankan uji regresi otomatis Lab 4 dulu:
   ```bash
   php tests/jalankan.php
   ```
   Harus `Semua uji lolos.` (17/17). Runner ini memuat
   `src/validasi.php` langsung, jadi tidak bentrok
   dengan `bootstrap.php` yang sekarang juga memuatnya
   (`require_once` mencegah pemuatan ganda).

Kolom **Hasil aktual** dan **Status** sengaja dibiarkan
`— / Belum dijalankan` — isi setelah dijalankan di
XAMPP, jangan diisi dari prediksi. Untuk tiap kasus,
isi kolom lain dengan data valid, kecuali kolom yang
sedang diuji.

## Tabel kasus uji (19 kasus)

| ID | Skenario | Masukan | Hasil diharapkan | Hasil aktual | Status |
|---|---|---|---|---|---|
| TC-01 | Pendaftaran valid | `daftar.php`: nama `Budi Santoso`, email baru yang belum ada, HP `0812345678`, alamat lengkap, kelas Web Programming | Tersimpan, flash `Pendaftaran berhasil. Simpan bukti Anda.`, redirect `daftar.php?status=sukses` | — | Belum dijalankan |
| TC-02 | Nama kosong | Nama dikosongkan, sisanya valid | Ditolak, pesan `Nama minimal 3 karakter.` | — | Belum dijalankan |
| TC-03 | Email kosong | Email dikosongkan, sisanya valid | Ditolak, pesan `Format email tidak valid.` | — | Belum dijalankan |
| TC-04 | HP kosong | HP dikosongkan, sisanya valid | Ditolak, pesan `Nomor HP diawali 08 dan 10-13 digit.` | — | Belum dijalankan |
| TC-05 | Alamat kosong | Alamat dikosongkan, sisanya valid | Tersimpan (alamat tidak divalidasi server-side di `validasiPendaftar` — ini perilaku kode saat ini, bukan penolakan) | — | Belum dijalankan |
| TC-06 | Kelas tidak dipilih | Kelas dibiarkan tidak dipilih, sisanya valid | Ditolak, pesan `Pilih kelas yang tersedia.` | — | Belum dijalankan |
| TC-07 | Email ganda | Email `sari@contoh.com` (sudah ada di data latihan), sisanya valid | Ditolak, pesan `Email sudah terdaftar.` | — | Belum dijalankan |
| TC-08 | HP 9 digit (batas bawah gagal) | HP `081234567`, sisanya valid | Ditolak, pesan `Nomor HP diawali 08 dan 10-13 digit.` | — | Belum dijalankan |
| TC-09 | HP 10 digit (batas bawah lolos) | HP `0812345678`, email baru, sisanya valid | Tersimpan, flash `Pendaftaran berhasil. Simpan bukti Anda.` | — | Belum dijalankan |
| TC-10 | HP 13 digit (batas atas lolos) | HP `0812345678901`, email baru, sisanya valid | Tersimpan, flash `Pendaftaran berhasil. Simpan bukti Anda.` | — | Belum dijalankan |
| TC-11 | HP 14 digit (batas atas gagal) | HP `08123456789012`, sisanya valid | Ditolak, pesan `Nomor HP diawali 08 dan 10-13 digit.` | — | Belum dijalankan |
| TC-12 | Kuota tepat penuh | Persiapan: `UPDATE kelas SET kuota = 5 WHERE id = 1;` (Web terisi 5). Lalu daftar ke Web dengan data valid dan email baru | Ditolak, pesan `Kelas sudah penuh.` di kolom kelas, data tidak tersimpan. Sesudah uji, kembalikan: `UPDATE kelas SET kuota = 30 WHERE id = 1;` | — | Belum dijalankan |
| TC-13 | Login benar | `login.php`: username dan sandi admin yang dibuat di persiapan | Redirect `index.php`, daftar terbuka, navbar menampilkan tombol `Keluar` | — | Belum dijalankan |
| TC-14 | Login salah | `login.php`: username benar, sandi salah (1 kali) | Tetap di login, pesan `Username atau kata sandi salah.` (tidak membocorkan mana yang salah). Setelah 5 kali salah berturut-turut: `Terlalu banyak percobaan. Coba lagi nanti.` | — | Belum dijalankan |
| TC-15 | Akses halaman admin tanpa login | Logout / sesi baru, lalu buka langsung `index.php`, `tambah.php`, `ubah.php?id=1`, `cetak.php?id=1`, dan POST `hapus.php`. Sebagai pembanding, buka `daftar.php` | Semua halaman admin diarahkan ke `login.php`. `daftar.php` tetap bisa dibuka (publik) | — | Belum dijalankan |
| TC-16 | Manipulasi id | Sudah login, buka `ubah.php?id=abc`, `ubah.php?id=-1`, `ubah.php?id=99999` | Masing-masing HTTP 404, pesan `Data tidak ditemukan.`, tanpa error mentah / stack trace | — | Belum dijalankan |
| TC-17 | XSS pada nama | `daftar.php`: nama `<script>alert(1)</script>`, sisanya valid | Tersimpan, tapi di `index.php` tampil sebagai teks (di-escape), tidak ada alert | — | Belum dijalankan |
| TC-18 | SQL Injection pada login dan pencarian | Login dengan username `' OR '1'='1` dan sandi sembarang; pencarian DataTables di `index.php` dengan `' OR '1'='1` | Login gagal dengan pesan umum (prepared statement, tidak bisa bypass). Pencarian tidak menjalankan SQL dari masukan itu dan tidak menampilkan dump data | — | Belum dijalankan |
| TC-19 | Hapus tanpa token | Sudah login, kirim POST `hapus.php` tanpa field `csrf` (hapus input hidden-nya). Sebagai pembanding, buka `hapus.php` dengan GET | Tanpa token: HTTP 403, pesan `Permintaan tidak valid.`, data tidak terhapus. GET: HTTP 405 | — | Belum dijalankan |

## Checklist re-test dan commit (modul)

| Butir | Status |
|---|---|
| Semua bug di laporan berstatus lolos re-test | Menunggu re-test di XAMPP (lihat `docs/laporan-bug.md`) |
| Tidak ada `var_dump`, `print_r`, `console.log`, atau `debugger` tersisa di `src/`, `public/`, `templates/` | Sudah dicek di VM: bersih. Pengecualian: `bug-keranjang.js` (Lab 1, bukan Capstone) — `console.log`-nya adalah output program itu sendiri dan `console.assert`-nya pencegah regresi, bukan sisa debug |
| Log Apache/PHP bebas Warning dan Notice | Cek di XAMPP setelah uji: `C:\xampp\apache\logs\error.log`, `C:\xampp\php\logs\php_error_log` |
| Halaman admin tidak dapat dibuka tanpa login | TC-15 di atas |
| Pesan error ke pengguna bersifat umum (tanpa detail teknis) | TC-14, TC-16, dan handler di `bootstrap.php` (`Terjadi kesalahan pada sistem. Silakan coba lagi.`) |
| Uji otomatis berjalan dan lolos | `php tests/jalankan.php` → `Semua uji lolos.` (17/17, konfirmasi di terminal PHP lo) |
| Commit | Di repo git lo sendiri (folder ini bukan repo git): `git add .` lalu `git commit -m 'Hari 11: Sprint 2 - login admin, kuota, kasus uji, laporan bug'` lalu `git push` |

Dokumen ini khusus Sprint 2. Dokumen Lab 4
(`docs/kasus-uji-lab-4.md`, 10 kasus manual) tetap
berdiri sendiri dan tidak ditimpa.
