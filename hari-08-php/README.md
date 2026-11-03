# Hari 8 — PHP Dasar

Folder ini berisi latihan PHP dasar dan proyek buku tamu dengan penyimpanan berkas JSON. Halaman PHP perlu dijalankan melalui server web yang mendukung PHP, seperti Apache dari XAMPP.

## Isi folder

- `lab1.php` — variabel, keluaran HTML, tabel perkalian, bilangan ganjil/genap, FizzBuzz, grade, dan kalender sederhana.
- `lab2.php` — fungsi dan array asosiatif untuk menghitung rata-rata, mencari nilai tertinggi, menyaring dan mengurutkan peserta, serta mengelompokkan peserta per kelas.
- `lab3.php` — kalkulator BMI dengan input `POST`, validasi berat dan tinggi, serta kategori hasil.
- `cari.php` — pencarian peserta dengan parameter `GET` dan pencatatan kunjungan ke `data/log.txt`.
- `lihat-log.php` — menampilkan 20 baris log pengunjung terakhir.
- `peserta-csv.php` — menulis daftar peserta ke `data/peserta.csv`, lalu membaca dan menampilkan kembali isinya.
- `peserta-json.php` — menyimpan, membaca, dan menambahkan data peserta dalam `data/peserta.json`. Setiap kali halaman ini dibuka, satu peserta contoh ditambahkan.
- `data/` — berkas CSV, JSON, dan log yang digunakan oleh latihan.
- `proyek-4-bukutamu/` — aplikasi buku tamu dengan validasi formulir, pencarian nama, dan penyimpanan ke JSON; lihat [README proyek](./proyek-4-bukutamu/readme.md).

## Menjalankan latihan

1. Pastikan PHP terpasang, atau aktifkan Apache di XAMPP.
2. Letakkan folder proyek di direktori web server, misalnya `C:\xampp\htdocs\portofolio-junior-web`.
3. Buka halaman yang ingin dicoba melalui browser:

```text
http://localhost/portofolio-junior-web/hari-08-php/lab1.php
http://localhost/portofolio-junior-web/hari-08-php/lab2.php
http://localhost/portofolio-junior-web/hari-08-php/lab3.php
http://localhost/portofolio-junior-web/hari-08-php/cari.php
http://localhost/portofolio-junior-web/hari-08-php/peserta-csv.php
http://localhost/portofolio-junior-web/hari-08-php/peserta-json.php
http://localhost/portofolio-junior-web/hari-08-php/proyek-4-bukutamu/
```

Jangan membuka berkas `.php` langsung sebagai berkas lokal; PHP harus diproses oleh server. Folder `data/` perlu dapat ditulisi oleh Apache agar latihan dapat memperbarui berkas CSV, JSON, dan log.

## Materi yang dipraktikkan

- Sintaks PHP, variabel, perulangan, percabangan, fungsi, dan array asosiatif.
- Menggabungkan PHP dengan HTML untuk menampilkan data.
- Mengambil dan memvalidasi input dari formulir `POST` serta parameter pencarian `GET`.
- Membaca dan menulis berkas CSV, JSON, dan log.
- Meng-escape teks sebelum ditampilkan sebagai HTML.
