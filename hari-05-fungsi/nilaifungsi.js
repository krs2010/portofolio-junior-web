/**
 * Modul Pengolah Nilai Sederhana (nilai-fungsi.js)
 */

const BATAS_LULUS = 70;

/**
 * Menghitung rata-rata dari array nilai.
 * @param {number[]} daftar - Array berisi angka nilai.
 * @returns {number} Rata-rata nilai, atau 0 jika array kosong.
 */
function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, n) => jumlah + n, 0) / daftar.length;
}

/**
 * Mencari nilai tertinggi.
 * @param {number[]} daftar - Array berisi angka nilai.
 * @returns {number|null} Nilai tertinggi, atau null jika array kosong.
 */
function cariTertinggi(daftar) {
  return daftar.length === 0 ? null : Math.max(...daftar);
}

/**
 * Mencari nilai terendah.
 * @param {number[]} daftar - Array berisi angka nilai.
 * @returns {number|null} Nilai terendah, atau null jika array kosong.
 */
function cariTerendah(daftar) {
  return daftar.length === 0 ? null : Math.min(...daftar);
}

/**
 * Menentukan huruf grade (A, B, C, D).
 * @param {number} nilai - Nilai angka.
 * @returns {string} Grade huruf.
 */
function tentukanGrade(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  return "D";
}

/**
 * Menentukan status kelulusan.
 * @param {number} nilai - Nilai angka.
 * @returns {string} 'Lulus' atau 'Tidak lulus'.
 */
function tentukanStatus(nilai) {
  return nilai >= BATAS_LULUS ? "Lulus" : "Tidak lulus";
}

/**
 * Memeriksa validitas nilai (angka 0-100).
 * @param {number} nilai - Nilai yang diperiksa.
 * @returns {boolean} True jika valid.
 */
function nilaiValid(nilai) {
  return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

// Prosedur Tampilan
function tampilkanMenu() {
  console.log("=== PENGOLAH NILAI ===");
}

function tampilkanLaporan(nama, daftar) {
  console.log(`\nNama: ${nama}`);
  console.log(`Nilai: ${daftar.join(", ")}`);
  console.log(`Rata-rata: ${hitungRataRata(daftar)}`);
  console.log(`Tertinggi: ${cariTertinggi(daftar)}`);
  console.log(`Terendah: ${cariTerendah(daftar)}`);
  console.log(`Grade: ${tentukanGrade(hitungRataRata(daftar))}`);
  console.log(`Status: ${tentukanStatus(hitungRataRata(daftar))}`);
}

// Pengujian Unit (console.assert)
console.assert(hitungRataRata([80, 90]) === 85, "rata-rata 80,90 harus 85");
console.assert(hitungRataRata([]) === 0, "rata-rata array kosong harus 0");
console.assert(cariTertinggi([80, 90]) === 90, "tertinggi harus 90");
console.assert(cariTertinggi([]) === null, "tertinggi array kosong harus null");
console.assert(cariTerendah([80, 90]) === 80, "terendah harus 80");
console.assert(cariTerendah([]) === null, "terendah array kosong harus null");
console.assert(tentukanGrade(85) === "A", "nilai 85 harus A");
console.assert(tentukanGrade(69) === "C", "nilai 69 harus C");
console.assert(tentukanStatus(70) === "Lulus", "nilai 70 harus Lulus");
console.assert(nilaiValid(101) === false, "101 tidak valid");
console.assert(nilaiValid(80) === true, "80 harus valid");

// Jalankan Fungsi Utama
function main() {
  tampilkanMenu();
  tampilkanLaporan("Budi", [80, 90, 70]);
}

main();
