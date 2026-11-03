# Laporan Bug — Capstone Sprint 2 (Hari 11)

Format T7 modul. Semua temuan di bawah ini nyata dari
peninjauan kode proyek ini sebelum Sprint 2 (bukan dari
Lab 1 / Lab 2 — laporan kedua lab itu ada di
`docs/laporan-bug-lab-1.md` dan
`docs/laporan-bug-lab-2.md`).

Kolom **Hasil re-test** sengaja ditulis apa adanya:
perbaikan sudah diterapkan di kode dan sudah dicek
keseimbangan kurungnya, tapi eksekusi di XAMPP / MySQL
belum bisa dilakukan di VM ini (PHP tidak tersedia di
sini). Jalankan langkah reproduksi setelah upload, lalu
ubah statusnya menjadi Lolos / Gagal.

## Temuan

### B-01 — Proteksi halaman admin tidak penuh

| Kolom | Isi |
|---|---|
| Jenis | Logic / keamanan (otorisasi) |
| Tingkat keparahan | Tinggi |
| Lokasi | `public/tambah.php`, `public/hapus.php`, `public/cetak.php` (sebelum Sprint 2) |
| Langkah reproduksi | Tanpa login, buka langsung `tambah.php` / `cetak.php?id=1`, atau POST ke `hapus.php` dengan token CSRF yang didapat dari form publik |
| Hasil diharapkan vs aktual | Diharapkan: diarahkan ke `login.php`. Aktual sebelum perbaikan: halaman terbuka / data bisa dihapus (guard hanya ada di `index.php` dan `ubah.php`) |
| Pesan / kode error | Tidak ada error — justru itu masalahnya: tidak ada penolakan sama sekali |
| Penyebab | Guard login hanya ditulis di 2 halaman admin, tidak di 3 halaman lainnya |
| Perbaikan | `wajibLogin()` di `src/auth.php`, dipanggil tepat setelah `require bootstrap.php` di `index.php`, `tambah.php`, `ubah.php`, `hapus.php`, dan `cetak.php`. `daftar.php` sengaja tetap publik. Versi opt-in lama di `files/hapus.php` kini tergantikan oleh perbaikan resmi ini |
| Hasil re-test | Belum dijalankan di XAMPP — jalankan TC-15 di `docs/kasus-uji.md` |

### B-02 — Logout lewat GET tanpa token CSRF

| Kolom | Isi |
|---|---|
| Jenis | Logic / keamanan (CSRF) |
| Tingkat keparahan | Sedang |
| Lokasi | `public/logout.php` dan `templates/header.php` (sebelum Sprint 2) |
| Langkah reproduksi | Sebagai admin yang sedang login, klik tautan `logout.php` (GET) — atau buka URL-nya langsung |
| Hasil diharapkan vs aktual | Diharapkan: logout hanya lewat POST bertoken. Aktual sebelum perbaikan: GET saja sudah menghancurkan sesi, jadi admin bisa di-logout paksa lewat tautan jebakan |
| Pesan / kode error | Tidak ada penolakan |
| Penyebab | `logout.php` lama tidak memeriksa metode maupun token; navbar memakai tautan `<a>` |
| Perbaikan | `logout.php` sekarang: bukan POST → HTTP 405, lalu `cekCsrf()`, lalu `logout()`, redirect `login.php`. Tombol di navbar diubah menjadi form POST bertoken dengan label `Keluar` (menggantikan tautan `Logout`) |
| Hasil re-test | Belum dijalankan di XAMPP — logout lewat tombol navbar harus berhasil; buka `logout.php` langsung (GET) harus 405 |

### B-03 — Login tanpa pembatasan percobaan

| Kolom | Isi |
|---|---|
| Jenis | Logic / keamanan (autentikasi) |
| Tingkat keparahan | Sedang |
| Lokasi | `public/login.php` (sebelum Sprint 2) |
| Langkah reproduksi | Di `login.php`, kirim sandi salah berulang-ulang |
| Hasil diharapkan vs aktual | Diharapkan: setelah 5 kali salah, percobaan dibatasi. Aktual sebelum perbaikan: tidak ada batas sama sekali, percobaan bisa diulang tanpa henti |
| Pesan / kode error | Pesan gagalnya sudah umum (`Username atau kata sandi salah.`) — bagian itu sudah benar dan dipertahankan |
| Penyebab | Tidak ada penghitung gagal login di sesi |
| Perbaikan | `login.php` sekarang memakai `prosesLogin()` dari `src/auth.php` dan penghitung `$_SESSION['gagal_login']`: ≥ 5 kali → `Terlalu banyak percobaan. Coba lagi nanti.`; berhasil → penghitung dihapus. Catatan modul: pembatasan berbasis sesi ini hanya latihan — produksi memerlukan pembatasan berbasis IP / akun, karena penyerang bisa membuang sesi |
| Hasil re-test | Belum dijalankan di XAMPP — jalankan TC-14 di `docs/kasus-uji.md` |

### B-04 — Pendaftaran tanpa cek kuota (bisa melampaui kuota)

| Kolom | Isi |
|---|---|
| Jenis | Logic (race condition) |
| Tingkat keparahan | Tinggi |
| Lokasi | `public/daftar.php` (sebelum Sprint 2) |
| Langkah reproduksi | Set kuota sebuah kelas sama dengan jumlah pendaftarnya (mis. Web: kuota 5, terisi 5), lalu daftar ke kelas itu lewat `daftar.php` |
| Hasil diharapkan vs aktual | Diharapkan: ditolak `Kelas sudah penuh.` dan data tidak tersimpan. Aktual sebelum perbaikan: langsung `tambahPendaftar` tanpa cek apa pun, jadi pendaftar ke-6 tetap tersimpan |
| Pesan / kode error | Tidak ada penolakan |
| Penyebab | Tidak ada pembacaan kuota, tidak ada transaksi, tidak ada penguncian baris — dua pendaftar bersamaan pada kuota tersisa 1 juga bisa sama-sama lolos |
| Perbaikan | `KuotaPenuhException` + `daftarkanDenganKuota()` di `src/pendaftar.php`: transaksi, `SELECT kuota ... FOR UPDATE`, hitung pendaftar, lempar `Kelas sudah penuh.` bila terisi ≥ kuota, baru `tambahPendaftar`, lalu commit (rollback bila gagal). `daftar.php` menangkap pengecualian itu menjadi galat `kelas_id`. Sesuai modul, cek kuota ini diterapkan di `daftar.php` (publik); `tambah.php` admin di Sprint 2 ini belum dicek kuota — hanya ditambah guard login |
| Hasil re-test | Belum dijalankan di XAMPP — jalankan TC-12 di `docs/kasus-uji.md`, lalu kembalikan kuota Web ke 30 |

### B-05 — Pilihan kelas tidak menampilkan sisa kuota

| Kolom | Isi |
|---|---|
| Jenis | Logic (UX / informasi) |
| Tingkat keparahan | Rendah |
| Lokasi | `public/_form.php` dan `src/pendaftar.php` `daftarKelas()` (sebelum Sprint 2) |
| Langkah reproduksi | Buka `daftar.php` / `tambah.php` / `ubah.php`, lihat dropdown kelas |
| Hasil diharapkan vs aktual | Diharapkan: tiap kelas menampilkan sisa kuotanya. Aktual sebelum perbaikan: hanya nama kelas, pendaftar tidak tahu kelas sudah penuh sampai submit |
| Pesan / kode error | — |
| Penyebab | `daftarKelas()` hanya mengambil `id` dan `nama_kelas`; tidak ada kuota maupun jumlah terisi |
| Perbaikan | `daftarKelas()` sekarang mengambil `kuota` dan `COUNT(p.id) AS terisi` (LEFT JOIN), dan `_form.php` menampilkan `Nama Kelas (sisa X)` memakai `hitungSisaKuota()` dari Lab 4. Opsi kelas penuh sengaja **tidak** dinonaktifkan, supaya uji kuota penuh (TC-12) tetap bisa dilakukan lewat UI. Dengan data latihan, tampilannya: Web Programming (sisa 25), Desain Grafis (sisa 21), Bahasa Inggris (sisa 20) |
| Hasil re-test | Belum dijalankan di XAMPP — buka `daftar.php` dan cocokkan angka sisa dengan hitungan di atas |

### B-06 — Logika login tersebar di halaman, tidak bisa dipakai ulang

| Kolom | Isi |
|---|---|
| Jenis | Logic (struktur kode) |
| Tingkat keparahan | Rendah |
| Lokasi | `public/login.php` (sebelum Sprint 2) |
| Langkah reproduksi | Baca `login.php` lama: query admin, `password_verify`, `session_regenerate_id`, dan simpan sesi semuanya inline di halaman, dengan nama field `password` yang berbeda dari modul (`sandi`) |
| Hasil diharapkan vs aktual | Diharapkan: satu tempat untuk autentikasi yang dipakai semua halaman. Aktual sebelum perbaikan: tiap halaman yang butuh login harus menulis ulang cek sesinya sendiri (dan itulah yang membuat B-01 terjadi) |
| Pesan / kode error | — |
| Penyebab | Belum ada modul autentikasi terpisah |
| Perbaikan | `src/auth.php` baru: `cariAdmin()`, `prosesLogin()` (query berparameter, `password_verify`, `session_regenerate_id(true)`), `wajibLogin()`, `logout()`; dimuat dari `src/bootstrap.php` lewat `require_once` sesuai modul. `login.php` sekarang memakai `prosesLogin()` dan field `sandi` sesuai modul. Yang dipertahankan dari versi Hari 9: redirect bila sudah login, pesan `Anda sudah logout.` bila `?status=logout`, nilai username yang diketik ulang, dan penyimpanan `admin_username` di sesi (modul hanya menyimpan `admin_id`) |
| Hasil re-test | Belum dijalankan di XAMPP — jalankan TC-13 dan TC-14 di `docs/kasus-uji.md` |

## Kebersihan hasil debugging

- `grep` di `src/`, `public/`, `templates/`, dan `database/`:
  tidak ada `var_dump`, `print_r`, `console.log`, maupun
  `debugger` yang tersisa.
- `bug-keranjang.js` (Lab 1, di root proyek, bukan bagian
  Capstone) dikecualikan dengan alasan: `console.log`-nya
  adalah output program itu sendiri, `console.assert`-nya
  pencegah regresi.
- Untuk uji akhir, set `'debug' => false` di
  `config/config.php` lokal (lihat persiapan di
  `docs/kasus-uji.md`). Berkas `config.php` tidak diubah
  asisten dan tidak dikirim, karena berisi konfigurasi
  database lokal.
