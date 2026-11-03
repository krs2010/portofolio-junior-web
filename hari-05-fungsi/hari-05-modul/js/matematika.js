// Modul matematika - Lab 4 Hari 5 (ES Module)
// Fungsi-fungsi murni dari Lab 1, dipindah ke berkas terpisah dan diekspor.

/**
 * Menghitung rata-rata dari daftar nilai.
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number} Rata-rata, atau 0 bila array kosong.
 */
export function hitungRataRata(daftarNilai) {
  if (daftarNilai.length === 0) return 0;
  const jumlah = daftarNilai.reduce((total, nilai) => total + nilai, 0);
  return jumlah / daftarNilai.length;
}

/**
 * Mencari nilai tertinggi dari daftar nilai.
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number|null} Nilai tertinggi, atau null bila array kosong.
 */
export function cariTertinggi(daftarNilai) {
  return daftarNilai.length === 0 ? null : Math.max(...daftarNilai);
}

/**
 * Mencari nilai terendah dari daftar nilai.
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number|null} Nilai terendah, atau null bila array kosong.
 */
export function cariTerendah(daftarNilai) {
  return daftarNilai.length === 0 ? null : Math.min(...daftarNilai);
}
