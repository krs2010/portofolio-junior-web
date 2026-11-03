// Penghubung DOM - Lab 4 Hari 5
// Mengimpor fungsi dari modul matematika.js (ES Module, wajib lewat server http://)
import { hitungRataRata, cariTertinggi, cariTerendah } from "./matematika.js";

const inputNilai = document.getElementById("input-nilai");
const tombolHitung = document.getElementById("hitung");
const pesanEl = document.getElementById("pesan");
const jumlahEl = document.getElementById("jumlah");
const rataRataEl = document.getElementById("rata-rata");
const tertinggiEl = document.getElementById("tertinggi");
const terendahEl = document.getElementById("terendah");

/** Menghitung statistik dari input (angka dipisahkan koma) dan menampilkannya ke halaman. */
function tampilkanHasil() {
  const potongan = inputNilai.value.split(",").map((teks) => teks.trim());
  const daftarNilai = potongan
    .filter((teks) => teks !== "")
    .map((teks) => Number(teks));

  if (daftarNilai.length === 0 || daftarNilai.some((n) => Number.isNaN(n))) {
    pesanEl.textContent =
      "Masukkan daftar angka yang dipisahkan koma, contoh: 80, 65, 90.";
    jumlahEl.textContent = "-";
    rataRataEl.textContent = "-";
    tertinggiEl.textContent = "-";
    terendahEl.textContent = "-";
    return;
  }

  pesanEl.textContent = "";
  jumlahEl.textContent = daftarNilai.length;
  rataRataEl.textContent = hitungRataRata(daftarNilai).toFixed(2);
  tertinggiEl.textContent = cariTertinggi(daftarNilai);
  terendahEl.textContent = cariTerendah(daftarNilai);
}

tombolHitung.addEventListener("click", tampilkanHasil);
inputNilai.addEventListener("input", tampilkanHasil);

// Hitung langsung saat halaman pertama dimuat
tampilkanHasil();
