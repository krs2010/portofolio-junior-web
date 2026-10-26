# Form Validator

Aplikasi formulir pendaftaran akun dengan validasi langsung saat pengguna mengisi kolom.

## Aturan validasi

- Nama minimal 3 karakter.
- Email harus memiliki format yang sesuai.
- Nomor HP diawali `08` dan terdiri dari 10–13 digit.
- Kata sandi minimal 8 karakter dan mengandung huruf serta angka.
- Konfirmasi kata sandi harus sama dengan kata sandi.

Tombol kirim aktif setelah semua kolom valid. Setelah formulir berhasil dikirim, halaman menampilkan ringkasan pendaftaran tanpa menampilkan kata sandi.

## Isi folder

- `index.html` — formulir pendaftaran.
- `css/style.css` — gaya tampilan formulir.
- `js/app.js` — interaksi formulir dan penampilan pesan validasi.
- `js/aturan.js` — fungsi-fungsi aturan validasi.

## Menjalankan

Karena aplikasi menggunakan ES Module, jalankan melalui server lokal. Dengan Apache XAMPP aktif, buka:

```text
http://localhost/portofolio-junior-web/hari-05-fungsi/proyek-2-kalkulator/validator/
```
