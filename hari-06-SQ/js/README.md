# Skrip Antarmuka Hari 6

Folder ini berisi skrip browser yang menghubungkan struktur data dari folder induk dengan elemen HTML.

## Isi folder

- `editor.js` — menggunakan `Stack` untuk menyimpan riwayat perubahan teks dan menyediakan Undo/Redo.
- `antrian.js` — menggunakan `Queue` untuk mengambil nomor antrean, menampilkan daftar yang menunggu, dan memanggil nomor berikutnya.

Kedua skrip mengimpor kelas dari `../structures.js` dan dimuat oleh `editor.html` serta `antrian.html` melalui `type="module"`. Buka halaman-halaman tersebut lewat server lokal agar impor modul dapat berjalan.
