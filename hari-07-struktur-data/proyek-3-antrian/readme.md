# Proyek 3: Simulator Antrean dan Riwayat

Layar antrean pasien dan editor catatan untuk sebuah klinik kecil.
Dibuat untuk Hari 7 diklat Junior Web Programmer (Struktur Data II dan Clean Code).

## Fitur

### A. Antrean Loket

- Tombol Ambil Nomor menghasilkan nomor berurutan: A001, A002, dan seterusnya.
- Tombol Panggil memanggil nomor berikutnya (FIFO) dan menampilkannya besar pada layar.
- Menampilkan jumlah antrean dan daftar yang menunggu.
- Riwayat 5 nomor terakhir yang dipanggil.
- Tombol Reset dengan konfirmasi; penomoran mulai lagi dari A001.
- Bila antrean kosong dan tombol Panggil ditekan, layar menampilkan "Antrean kosong".

### B. Editor Catatan dengan Undo/Redo

- Dua Stack (undoStack dan redoStack); tombol Undo/Redo nonaktif bila kosong.
- Riwayat dibatasi maksimal 50 langkah; penghitung riwayat ditampilkan.
- Mengetik setelah undo menghapus riwayat redo.
- Catatan terakhir tersimpan otomatis di localStorage browser dan dimuat lagi saat halaman dibuka.

## Cara menjalankan

Proyek ini memakai ES module, jadi **jangan dibuka dengan double-click file://** (module diblokir CORS).
Buka lewat server lokal, salah satu cara berikut:

1. Dengan XAMPP: salin folder `proyek-3-antrian` ke `C:\xampp\htdocs\`, lalu buka `http://localhost/proyek-3-antrian/`.
2. Dengan Python (dari dalam folder `proyek-3-antrian`): `python -m http.server 8000`, lalu buka `http://localhost:8000/`.
3. Dengan Node: `npx serve` dari dalam folder `proyek-3-antrian`.

## Struktur proyek

```
proyek-3-antrian/
index.html
css/style.css
js/
  structures.js  # Stack, LinkedList, LinkedQueue (tanpa UI)
  antrian.js     # logika antrean (memakai structures.js)
  riwayat.js     # logika undo/redo (memakai structures.js)
  app.js         # penghubung DOM
README.md
```

Struktur data berada di `structures.js` murni tanpa DOM dan memakai
private field untuk detail internal. Penamaan sesuai guideline, tanpa
magic number (MAKS_RIWAYAT = 50, AWALAN_NOMOR = 'A',
MAKS_RIWAYAT_PANGGILAN = 5), fungsi maksimal sekitar 20 baris,
dan method publik di `structures.js` dilengkapi JSDoc.

## Tabel alasan pemilihan struktur data

| Kebutuhan                    | Struktur dipilih       | Alasan                                   | Alternatif dan mengapa tidak dipilih |
| ---------------------------- | ---------------------- | ---------------------------------------- | ------------------------------------ |
| Antrean pasien               | LinkedQueue            | enqueue dan dequeue O(1)                 | Array + shift (O(n))                 |
| Riwayat undo/redo            | Stack                  | Perubahan terakhir dibatalkan lebih dulu | Queue (urutan salah)                 |
| Riwayat 5 panggilan terakhir | Array dibatasi panjang | Ukuran kecil, tampil berurutan           | Linked list (berlebihan)             |

## Kasus uji minimal

- Ambil 3 nomor (A001, A002, A003), lalu panggil 4 kali: panggilan ke-1 A001, ke-2 A002, ke-3 A003, ke-4 menampilkan "Antrean kosong".
- Ambil 7 nomor lalu panggil semuanya: riwayat yang tampil hanya 5 terakhir, yaitu A003, A004, A005, A006, A007.
- Reset saat antrean berisi: antrean kosong, riwayat kosong, dan nomor berikutnya kembali ke A001. Reset yang dibatalkan di dialog konfirmasi tidak mengubah apa-apa.
- Editor: ketik, lalu undo 3 kali, lalu redo 2 kali — teks kembali sesuai urutan perubahan.
- Editor: undo sekali, lalu ketik teks baru — tombol Redo menjadi nonaktif karena riwayat redo terhapus.
- Editor: lakukan lebih dari 50 perubahan — jumlah undo mentok di 50.

## Tangkapan layar

![Simulator Antrean dan Riwayat](screenshot.png)

Kondisi pada tangkapan layar: ambil 3 nomor, panggil 1 kali (sedang dipanggil A001, menunggu A002 dan A003, riwayat A001), editor berisi satu catatan dengan riwayat 1 undo.
