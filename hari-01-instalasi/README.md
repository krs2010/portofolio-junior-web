# Hari 1 — Instalasi dan Tes Lingkungan

Hari pertama digunakan untuk memastikan lingkungan dasar pengembangan web sudah siap: browser, Node.js, dan PHP melalui server lokal.

## Isi folder

- `index.html` — halaman sederhana untuk mengecek bahwa HTML terbuka di browser dan menampilkan informasi browser.
- `test.js` — skrip untuk mengecek versi Node.js dan informasi sistem operasi.
- `test.php` — halaman untuk mengecek versi PHP serta informasi server lokal.

## Cara menjalankan

### 1. Cek halaman HTML

Buka `index.html` langsung menggunakan browser. Halaman akan menampilkan tulisan **Halo, Dunia Web!** dan informasi browser.

### 2. Cek Node.js

Buka terminal di folder ini, lalu jalankan:

```bash
node test.js
```

Jika berhasil, terminal menampilkan versi Node.js, informasi sistem operasi, dan pesan bahwa instalasi Node.js berhasil.

### 3. Cek PHP melalui XAMPP

Pastikan Apache sudah berjalan di XAMPP, lalu buka alamat berikut di browser:

```text
http://localhost/portofolio-junior-web/hari-01-instalasi/test.php
```

Halaman akan menampilkan status instalasi, versi PHP, informasi server, metode request, dan waktu server.

## Hasil yang diharapkan

Ketiga tes berjalan tanpa error. Jika tes PHP tidak bisa dibuka, pastikan folder proyek berada di dalam direktori `htdocs` dan Apache sedang berjalan.
