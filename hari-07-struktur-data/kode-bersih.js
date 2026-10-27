// kode-bersih.js - Lab 4 Hari 7: versi bersih dari kode-buruk.js
// Prinsip: penamaan bermakna, const/let, ===, konstanta bernama,
// DRY (satu fungsi pajak), guard clause, tangani array kosong, JSDoc singkat.

const PAJAK = 0.11;
const BATAS_GRADE = { A: 85, B: 70, C: 55 };
const NILAI_BAGUS = 80;

/**
 * Menghitung rata-rata daftar nilai.
 * @param {number[]} daftarNilai - Daftar nilai.
 * @returns {number} Rata-rata, atau 0 bila daftar kosong.
 */
function hitungRataRata(daftarNilai) {
  if (daftarNilai.length === 0) return 0;
  const jumlah = daftarNilai.reduce((total, nilai) => total + nilai, 0);
  return jumlah / daftarNilai.length;
}

/**
 * Menentukan grade dari satu nilai.
 * @param {number} nilai - Nilai yang dinilai.
 * @returns {string} 'A', 'B', 'C', atau 'D'.
 */
function tentukanGrade(nilai) {
  if (nilai >= BATAS_GRADE.A) return "A";
  if (nilai >= BATAS_GRADE.B) return "B";
  if (nilai >= BATAS_GRADE.C) return "C";
  return "D";
}

/**
 * Menghitung harga setelah ditambah pajak.
 * @param {number} harga - Harga awal.
 * @returns {number} Harga setelah pajak.
 */
function hitungHargaDenganPajak(harga) {
  return harga * (1 + PAJAK);
}

const daftarNilai = [80, 65, 90];
const rataRata = hitungRataRata(daftarNilai);
console.log("Rata-rata:", rataRata);
console.log("Grade rata-rata:", tentukanGrade(rataRata));
console.log("Harga 100000 + pajak:", hitungHargaDenganPajak(100000));
console.log("Rata-rata daftar kosong:", hitungRataRata([]));
console.log(
  "Grade 85:",
  tentukanGrade(85),
  "| Grade 70:",
  tentukanGrade(70),
  "| Grade 55:",
  tentukanGrade(55),
  "| Grade 40:",
  tentukanGrade(40),
);
if (rataRata === NILAI_BAGUS) {
  console.log("bagus");
}
