// Aturan validasi murni (tanpa DOM) - Form Validator Proyek 2
// Setiap fungsi mengembalikan '' bila valid, atau pesan kesalahan bila tidak.

/**
 * Memvalidasi nama: minimal 3 karakter (spasi di tepi tidak dihitung).
 * @param {string} nilai Isi kolom nama.
 * @returns {string} '' bila valid, pesan kesalahan bila tidak.
 */
export function validasiNama(nilai) {
  return nilai.trim().length >= 3 ? "" : "Nama minimal 3 karakter.";
}

/**
 * Memvalidasi format email.
 * @param {string} nilai Isi kolom email.
 * @returns {string} '' bila valid, pesan kesalahan bila tidak.
 */
export function validasiEmail(nilai) {
  const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pola.test(nilai) ? "" : "Format email tidak valid.";
}

/**
 * Memvalidasi nomor HP Indonesia: diawali 08, total 10-13 digit.
 * @param {string} nilai Isi kolom nomor HP.
 * @returns {string} '' bila valid, pesan kesalahan bila tidak.
 */
export function validasiHp(nilai) {
  return /^08[0-9]{8,11}$/.test(nilai)
    ? ""
    : "Nomor HP diawali 08 dan 10-13 digit.";
}

/**
 * Memvalidasi kata sandi: minimal 8 karakter, kombinasi huruf dan angka.
 * @param {string} nilai Isi kolom kata sandi.
 * @returns {string} '' bila valid, pesan kesalahan bila tidak.
 */
export function validasiSandi(nilai) {
  const kuat =
    nilai.length >= 8 && /[0-9]/.test(nilai) && /[A-Za-z]/.test(nilai);
  return kuat ? "" : "Sandi minimal 8 karakter, kombinasi huruf dan angka.";
}

/**
 * Memvalidasi konfirmasi sandi: harus sama persis dengan kata sandi.
 * @param {string} nilai Isi kolom konfirmasi sandi.
 * @param {string} sandi Isi kolom kata sandi.
 * @returns {string} '' bila valid, pesan kesalahan bila tidak.
 */
export function validasiKonfirmasi(nilai, sandi) {
  return nilai === sandi ? "" : "Konfirmasi sandi tidak cocok.";
}
