# Dokumen Modul: Pendaftar

| Bagian | Isi |
|---|---|
| ID modul / berkas | MOD-PND-001 / `src/pendaftar.php` |
| Versi dan status | 1.1.1 / aktif |
| Penulis dan tanggal | Defry Arhinsa / 2026-11-03 (versi terbaru) |
| Kegunaan | Akses data, validasi, dan aturan kuota untuk pendaftar pelatihan |
| Dependensi | `config/database.php` (PDO), `src/helpers.php` (dipakai tidak langsung lewat pemanggil), `src/validasi.php` (aturan `hitungSisaKuota()` dipakai di form, bukan di modul ini) |
| Paket | PendaftaranPelatihan |

## Deskripsi dan kegunaan

Modul ini adalah satu-satunya tempat logika data pendaftar: mengambil daftar
kelas dan pendaftar, memvalidasi masukan form, menjalankan CRUD pendaftar,
mengambil data bukti pendaftaran, dan mendaftarkan peserta dengan pemeriksaan
kuota. Modul ini dipakai oleh halaman admin (`index.php`, `tambah.php`,
`ubah.php`, `hapus.php`, `cetak.php`) dan halaman pendaftaran publik
(`daftar.php`).

Yang TIDAK dilakukan modul ini: menampilkan HTML (itu tugas `public/` dan
`templates/`), memeriksa login admin (itu tugas `src/auth.php`), dan
memutuskan kuota dari angka tampilan form — keputusan kuota yang mengikat
hanya ada di `daftarkanDenganKuota()`.

## Fungsi publik

| Fungsi | Ringkasan |
|---|---|
| `daftarKelas()` | Semua kelas + kuota + jumlah terisi, untuk form dan tampilan sisa |
| `hitungPendaftar()` | Jumlah pendaftar yang namanya mengandung kata kunci |
| `ambilPendaftar()` | Satu halaman pendaftar berdasarkan pencarian nama |
| `ambilPendaftarById()` | Satu pendaftar berdasarkan ID, atau null bila tidak ada |
| `emailSudahAda()` | Cek email ganda, dengan pengecualian ID saat ubah |
| `validasiPendaftar()` | Validasi form → data bersih + galat per kolom |
| `tambahPendaftar()` | INSERT satu pendaftar |
| `ubahPendaftar()` | UPDATE satu pendaftar |
| `hapusPendaftar()` | DELETE satu pendaftar |
| `ambilSemuaPendaftar()` | Semua pendaftar + nama kelas, terbaru dulu (panel admin) |
| `ambilBuktiPendaftar()` | Data bukti satu pendaftar (untuk cetak PDF) |
| `daftarkanDenganKuota()` | Daftar dengan transaksi + kunci baris kelas (`FOR UPDATE`); melempar `KuotaPenuhException` bila penuh |
| `KuotaPenuhException` | Kelas exception untuk kasus kelas penuh (bukan galat sistem) |

Detail parameter, nilai kembalian, dan exception tiap fungsi ada di DocBlock
di atas fungsi yang bersangkutan di `src/pendaftar.php` (Lab 2), dan ringkasnya
di `docs/peta-modul.md` (Lab 1).

## Contoh pemakaian

```php
<?php
$pdo = getConnection();

// 1. Validasi dulu, jangan langsung simpan.
$hasil = validasiPendaftar($_POST, $pdo, null);
if ($hasil['galat'] !== []) {
    // Tampilkan $hasil['galat'] per kolom di form, jangan lanjut.
}

// 2. Simpan lewat jalur kuota (pendaftaran publik).
try {
    daftarkanDenganKuota($pdo, $hasil['data']);
} catch (KuotaPenuhException $e) {
    // Tampilkan pesan di kolom kelas, minta peserta pilih kelas lain.
    $galat['kelas_id'] = $e->getMessage();
}
```

Catatan pemakaian: `tambahPendaftar()` tanpa cek kuota hanya dipakai halaman
admin (`tambah.php`). Pendaftaran peserta (publik) wajib lewat
`daftarkanDenganKuota()`, bukan `tambahPendaftar()` langsung.

## Catatan keamanan

- Semua query memakai prepared statement; tidak ada input yang disambung
  langsung ke SQL di modul ini (demo berbahaya hanya ada di
  `public/injeksi.php`, khusus latihan localhost).
- `kelas_id` dari form di-cast ke int dan dicocokkan dengan daftar kelas
  yang ada sebelum disimpan.
- Email dicek ganda di `validasiPendaftar()`; saat ubah, email milik
  pendaftar itu sendiri dikecualikan lewat `$idUbah`.
- Kuota dicek di dalam transaksi dengan `FOR UPDATE`, supaya dua pendaftar
  serentak pada sisa kuota 1 tidak sama-sama lolos.

## Riwayat revisi

| Versi | Tanggal | Perubahan | Penulis |
|---|---|---|---|
| 1.0.0 | 2026-10-29 | CRUD pendaftar dan validasi dasar (Hari 9) | Defry Arhinsa |
| 1.1.0 | 2026-11-02 | Tambah `daftarkanDenganKuota()` dan `KuotaPenuhException`; `daftarKelas()` ikut menampilkan kuota dan jumlah terisi (Hari 11, Sprint 2) | Defry Arhinsa |
| 1.1.1 | 2026-11-03 | Penambahan DocBlock lengkap semua fungsi (Lab 2) dan komentar alasan Lab 1; tanpa perubahan logika, jadi naik PATCH saja | Defry Arhinsa |

Nomor versi di atas sudah disinkronkan dengan header berkas
`src/pendaftar.php` (`@version 1.1.1`, `@since 1.0.0`).
