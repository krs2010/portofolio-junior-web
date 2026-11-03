# Hari 6 — Struktur Data

Latihan hari keenam membahas pengolahan data dengan array, objek, `Map`, dan `Set`, serta struktur data Stack dan Queue.

## Isi folder

- `lab1.js` — filter dan urutkan data peserta, cari peserta berdasarkan ID, hitung jumlah per kelas, kelola data, dan buat indeks ID.
- `lab2.js` — hitung frekuensi kata dengan `Map`, hilangkan duplikat dengan `Set`, cari irisan data, dan deteksi duplikat.
- `lab3.mjs` — uji Stack, validasi tanda kurung, membalik teks, dan memeriksa palindrom.
- `lab4.js` — uji Queue dengan operasi `enqueue` dan `dequeue`.
- `structures.js` — definisi kelas `Stack` dan `Queue` yang digunakan oleh latihan lain.
- `index.html` — halaman latihan Stack yang menjalankan `lab3.mjs`.
- `editor.html` — editor teks sederhana dengan fitur Undo dan Redo.
- `antrian.html` — antarmuka antrean loket.
- `js/` — skrip antarmuka untuk editor dan antrean; lihat [README folder js](./js/README.md).

## Menjalankan latihan terminal

Node.js diperlukan. Dari folder proyek, jalankan:

```bash
cd hari-06-SQ
node lab1.js
node lab2.js
node lab3.mjs
node lab4.js
```

## Menjalankan halaman browser

Halaman menggunakan ES Module. Jalankan melalui server lokal, misalnya dengan Apache XAMPP aktif, lalu buka:

```text
http://localhost/portofolio-junior-web/hari-06-SQ/
http://localhost/portofolio-junior-web/hari-06-SQ/editor.html
http://localhost/portofolio-junior-web/hari-06-SQ/antrian.html
```

`index.html` menampilkan pengujian Stack di console browser. `editor.html` mencoba Undo/Redo, sedangkan `antrian.html` mencoba mengambil nomor dan memanggil antrean.
