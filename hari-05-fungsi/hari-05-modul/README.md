# Latihan Modul JavaScript

Folder ini berisi contoh penggunaan ES Module untuk memisahkan fungsi statistik ke dalam modul dan menghubungkannya dengan halaman web.

## Isi folder

- `index.html` — halaman latihan yang memuat `js/apps.js` sebagai modul.
- `js/matematika.js` — fungsi untuk menghitung rata-rata, nilai tertinggi, dan nilai terendah; fungsi-fungsi ini diekspor agar dapat diimpor.
- `js/apps.js` — contoh penghubung modul JavaScript dengan elemen halaman.

## Menjalankan

ES Module sebaiknya dijalankan melalui server lokal. Dengan Apache XAMPP aktif, buka:

```text
http://localhost/portofolio-junior-web/hari-05-fungsi/hari-05-modul/
```

Catatan: `apps.js` saat ini mencari elemen input, tombol, dan hasil statistik yang belum tersedia pada `index.html`, sehingga contoh halaman ini masih perlu dilengkapi sebelum antarmukanya dapat berjalan.
