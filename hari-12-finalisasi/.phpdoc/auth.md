# Dokumen Modul: Auth

| Bagian              | Isi                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------- |
| ID modul / berkas   | MOD-AUT-001 / `src/auth.php`                                                           |
| Versi dan status    | 1.0.1 / aktif                                                                          |
| Penulis dan tanggal | Defry Arhinsa / 2026-11-03 (versi terbaru)                                             |
| Kegunaan            | Autentikasi admin berbasis sesi dan `password_hash`                                    |
| Dependensi          | `config/database.php` (PDO, lewat `getConnection()`), `src/helpers.php` (`redirect()`) |
| Paket               | PendaftaranPelatihan                                                                   |

## Deskripsi dan kegunaan

Modul ini mengatur siapa yang boleh membuka halaman admin. Admin dicari dari
tabel `admin`, kata sandinya diverifikasi dengan `password_verify()`
(verifikasi terhadap `password_hash`, kata sandi mentah tidak pernah disimpan),
lalu sesi admin diisi. Halaman admin wajib memanggil `wajibLogin()` di awal;
halaman publik (`daftar.php`) tidak memakai modul ini.

Modul ini TIDAK mengatur: pembuatan admin (itu tugas CLI
`database/buat-admin.php`), penguncian setelah gagal berkali-kali (hitungan
`gagal_login >= 5` ada di `public/login.php`, bukan di `prosesLogin()`), dan
pemeriksaan CSRF (itu tugas `cekCsrf()` di `src/helpers.php`).

## Fungsi publik

| Fungsi          | Ringkasan                                                                      |
| --------------- | ------------------------------------------------------------------------------ |
| `cariAdmin()`   | Satu admin berdasarkan username, atau null bila tidak ada                      |
| `prosesLogin()` | Verifikasi username + sandi; bila cocok, regenerasi ID sesi dan isi sesi admin |
| `wajibLogin()`  | Pastikan sudah login; bila belum, redirect ke `login.php`                      |
| `logout()`      | Kosongkan sesi, hapus cookie sesi, hancurkan sesi                              |

Detail parameter, nilai kembalian, dan exception tiap fungsi ada di DocBlock
di atas fungsi yang bersangkutan di `src/auth.php` (Lab 2).

## Contoh pemakaian

```php
<?php
// Di awal halaman admin (mis. public/index.php):
wajibLogin();

// Di public/login.php, setelah cek CSRF:
if (prosesLogin(getConnection(), $username, $sandi)) {
    redirect('index.php');
}
// Bila false: tampilkan pesan generik, jangan bedakan
// 'username tidak ada' dan 'sandi salah'.

// Di public/logout.php, setelah cek metode POST dan CSRF:
logout();
redirect('login.php');
```

## Catatan keamanan

- Regenerasi ID sesi saat login (`session_regenerate_id(true)`), supaya ID
  sesi lama tidak bisa dipakai lagi setelah login (cegah session fixation).
- Pesan galat login generik: username tidak ada dan sandi salah sama-sama
  menghasilkan `false`, supaya penyerang tidak bisa menebak username yang ada.
- Logout hanya lewat POST dengan CSRF (`public/logout.php` menolak GET
  dengan 405), supaya logout tidak bisa dipicu lewat tautan biasa.
- Halaman admin yang lupa memanggil `wajibLogin()` akan terbuka tanpa login,
  jadi pemeriksaan ini harus selalu jadi baris pertama halaman admin.

## Riwayat revisi

| Versi | Tanggal    | Perubahan                                                                                                                                                                                     | Penulis       |
| ----- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 1.0.0 | 2026-11-02 | Modul auth pertama (Hari 11, Sprint 2): `cariAdmin()`, `prosesLogin()`, `wajibLogin()`, `logout()`; login memakai field `sandi`, redirect bila sudah login, username diketik ulang saat gagal | Defry Arhinsa |
| 1.0.1 | 2026-11-03 | Penambahan DocBlock lengkap semua fungsi (Lab 2) dan komentar alasan Lab 1; tanpa perubahan logika, jadi naik PATCH saja                                                                      | Defry Arhinsa |

Nomor versi di atas sudah disinkronkan dengan header berkas
`src/auth.php` (`@version 1.0.1`, `@since 1.0.0`).
