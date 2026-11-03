# Daftar Evaluasi Penggunaan Library Proyek

Dokumen ini berisi analisis kelayakan dan evaluasi untuk setiap *library* eksternal yang diintegrasikan ke dalam proyek pendaftaran pelatihan.

---

## 1. Bootstrap (Versi 5.3)
- **Kesesuaian kebutuhan:** Sangat sesuai. Memecahkan masalah pembuatan tata letak (*layout*) responsif dan komponen antarmuka (tombol, formulir, modal) tanpa perlu menulis kode CSS dari nol. Tidak ada fitur berlebihan karena kita hanya memanggil komponen yang diperlukan.
- **Lisensi:** MIT License. (Sangat kompatibel dan aman untuk aplikasi komersial tertutup).
- **Pemeliharaan:** Sangat aktif dipelihara oleh tim inti (Twitter/komunitas). Pembaruan dan perbaikan bug rutin dirilis.
- **Popularitas dan komunitas:** Merupakan *framework* CSS paling populer di dunia. Dokumentasi sangat lengkap, dengan ribuan contoh dan dukungan forum (StackOverflow).
- **Kompatibilitas:** Mendukung semua *browser* modern. Di versi 5, Bootstrap tidak lagi bergantung pada jQuery, sehingga menghindari konflik *library*.
- **Keamanan:** Riwayat keamanan sangat baik. Celah yang ditemukan (biasanya pada XSS di *tooltip*) langsung ditambal di pembaruan minor berikutnya.
- **Ukuran dan performa:** Sekitar 200KB (minified CSS & JS). Membutuhkan dependensi pihak ketiga `Popper.js` jika fitur *dropdown* atau *tooltip* digunakan.
- **Kemudahan migrasi:** **Sulit**. Jika suatu saat dihentikan, akan sangat sulit untuk pindah ke *framework* lain (seperti Tailwind) karena penamaan *class* Bootstrap sudah tertanam kuat di seluruh struktur HTML aplikasi.

## 2. SweetAlert2 (Versi 11)
- **Kesesuaian kebutuhan:** Sesuai. Digunakan murni untuk mempercantik notifikasi sistem (alert/confirm) agar lebih interaktif dan profesional dibandingkan bawaan browser (`window.alert`).
- **Lisensi:** MIT License. (Aman untuk komersial).
- **Pemeliharaan:** Sangat aktif dengan rilis mingguan/bulanan. Isu-isu di GitHub rutin direspons oleh pengembang utamanya.
- **Popularitas dan komunitas:** Sangat tinggi (jutaan unduhan per minggu di npm). Dokumentasi interaktif dan mudah dipahami.
- **Kompatibilitas:** Mendukung semua *browser* modern dan sangat cocok dengan Vanilla JS maupun framework modern. Tidak ada bentrok.
- **Keamanan:** Sangat aman. Mendukung perlindungan injeksi HTML pada konten *popup*-nya secara *default*.
- **Ukuran dan performa:** Sangat ringan (sekitar 20KB saat di-*gzip*). Bebas dari dependensi tambahan (*Zero dependencies*).
- **Kemudahan migrasi:** **Mudah**. Penggunaannya bersifat modular (hanya dipanggil saat fungsi tertentu berjalan) sehingga jika diganti dengan *library* notifikasi lain, perubahannya cukup terpusat pada file skrip logika *frontend*.

## 3. jQuery (Versi 3.7)
- **Kesesuaian kebutuhan:** Digunakan untuk mempermudah manipulasi DOM dan penanganan event AJAX. Terutama dibutuhkan sebagai prasyarat wajib untuk menjalankan library DataTables. 
- **Lisensi:** MIT License. (Aman untuk komersial).
- **Pemeliharaan:** Masih dipelihara secara aktif untuk keamanan dan perbaikan performa, meskipun sudah jarang ada penambahan fitur baru yang revolusioner.
- **Popularitas dan komunitas:** Masih sangat masif di ekosistem web warisan (*legacy*), dokumentasi dan ketersediaan *plugin* pihak ketiga tak terbatas.
- **Kompatibilitas:** Kompatibilitas ke *browser* lama sangat luar biasa.
- **Keamanan:** Versi 3.5 ke atas sudah sangat aman dan menambal celah *Cross-Site Scripting* (XSS) yang ada di versi lawas (1.x dan 2.x).
- **Ukuran dan performa:** Sekitar 30KB (*minified* dan *gzipped*). Performa cukup baik meski tidak secepat Vanilla JS murni.
- **Kemudahan migrasi:** **Sangat Sulit**. Jika seluruh interaksi antarmuka bergantung pada sintaks `$` jQuery, migrasi ke Vanilla JS atau framework reaktif (React/Vue) akan mengharuskan penulisan ulang nyaris 100% kode *frontend*.

## 4. DataTables (Versi 1.13)
- **Kesesuaian kebutuhan:** Sangat sesuai untuk menampilkan tabel pendaftar. Memecahkan masalah pencarian instan, pengurutan, dan paginasi *client-side* tanpa perlu bolak-balik me-muat *database*.
- **Lisensi:** MIT License.
- **Pemeliharaan:** Sangat aktif dipelihara oleh SpryMedia.
- **Popularitas dan komunitas:** Standar *de facto* untuk pembuatan tabel interaktif berbasis jQuery.
- **Kompatibilitas:** Membutuhkan **jQuery** sebagai dependensi utama. Sangat kompatibel untuk dipadukan dengan desain Bootstrap 5.
- **Keamanan:** Aman, asalkan data yang dilempar dari *server* melalui AJAX sudah dibersihkan (*sanitized*) sebelum dirender.
- **Ukuran dan performa:** Ukuran inti cukup sedang, tetapi akan membengkak jika kita menambahkan terlalu banyak ekstensi (seperti ekspor PDF/Excel bawaannya).
- **Kemudahan migrasi:** **Sulit**. API dan konfigurasi objek DataTables sangat spesifik, menggantinya dengan *library grid* lain akan memakan waktu penyesuaian yang lama.

## 5. Dompdf
- **Kesesuaian kebutuhan:** Sesuai untuk mencetak kartu pendaftaran. Dapat langsung mengonversi file templat HTML/CSS yang ada menjadi format PDF, sehingga tidak perlu mendesain dari nol menggunakan koordinat X/Y.
- **Lisensi:** LGPL (GNU Lesser General Public License). (Masih aman untuk proyek komersial tertutup selama library ini hanya dipanggil/ditautkan tanpa memodifikasi *source code* Dompdf itu sendiri).
- **Pemeliharaan:** Cukup aktif oleh komunitas. Update biasanya menyesuaikan versi PHP terbaru.
- **Popularitas dan komunitas:** Library PDF berbasis HTML paling populer di dunia PHP.
- **Kompatibilitas:** Kompatibel dengan versi PHP 7.1 hingga 8.x. Membutuhkan ekstensi PHP `mbstring` dan `dom` untuk aktif.
- **Keamanan:** Perlu perhatian khusus. Ada risiko keamanan jika membaca sumber eksternal (LFI/RFI). Konfigurasi `isRemoteEnabled` harus **selalu dimatikan** (diset *false*) untuk mencegah eksekusi skrip dari luar.
- **Ukuran dan performa:** Agak berat dan lambat saat memproses tabel atau halaman HTML yang sangat kompleks, membutuhkan memori RAM server yang lebih tinggi dibanding pembuatan PDF manual. Memiliki beberapa dependensi Composer.
- **Kemudahan migrasi:** **Sedang**. Jika bermigrasi ke mPDF atau wkhtmltopdf, kita "hanya" perlu sedikit merombak *file* HTML/CSS yang sudah ada agar cocok dengan aturan *rendering* library yang baru.

## 6. FPDF
- **Kesesuaian kebutuhan:** (Opsional/Alternatif). Memecahkan masalah pembuatan PDF secara terprogram dan manual yang ditujukan untuk efisiensi server. Tidak cocok untuk mendesain *layout* yang rumit/dinamis.
- **Lisensi:** Permisif (bebas digunakan untuk tujuan apa pun tanpa batasan ketat).
- **Pemeliharaan:** Jarang diperbarui karena statusnya sudah sangat stabil sejak belasan tahun lalu. Tidak banyak perbaikan yang diperlukan.
- **Popularitas dan komunitas:** Legendaris, dokumentasi situs aslinya sangat lengkap dengan banyak tutorial.
- **Kompatibilitas:** Mendukung hampir seluruh versi PHP lama hingga modern tanpa masalah kompatibilitas.
- **Keamanan:** Sangat aman. Tidak mengurai tag HTML kompleks sehingga terhindar dari injeksi skrip jahat.
- **Ukuran dan performa:** Sangat ringan dan sangat cepat! Penggunaan memori (*RAM footprint*) sangat rendah, dan file PDF yang dihasilkan jauh lebih padat ukurannya. Tidak ada dependensi eksternal.
- **Kemudahan migrasi:** **Sangat Sulit**. Karena kode dibuat baris demi baris menggunakan koordinat (contoh: `Cell(40,10,'Halo');`), jika di masa depan harus pindah ke *library* berbasis HTML, kodenya harus dibuang dan ditulis ulang secara visual.