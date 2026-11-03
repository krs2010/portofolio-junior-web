// Penghubung DOM dan event - Kalkulator Proyek 2
import { hitung } from "./operasi.js";

const layarEl = document.getElementById("layar");
const papan = document.getElementById("papan");
const riwayatEl = document.getElementById("riwayat");

const MAKS_RIWAYAT = 5;

let layar = "0";
let angkaPertama = null;
let operator = null;
let siapReset = false;
const riwayat = [];

/** Menampilkan isi variabel layar ke elemen layar. */
function perbaruiLayar() {
  layarEl.textContent = layar;
}

/** Menampilkan ulang riwayat (maksimal 5 perhitungan terakhir). */
function perbaruiRiwayat() {
  riwayatEl.replaceChildren();
  for (const teks of riwayat) {
    const item = document.createElement("li");
    item.textContent = teks;
    riwayatEl.append(item);
  }
}

/**
 * Memasukkan satu digit angka atau titik desimal ke layar.
 * @param {string} digit Karakter '0'-'9' atau '.'.
 */
function masukkanAngka(digit) {
  if (siapReset) {
    layar = digit === "." ? "0." : digit;
    siapReset = false;
    return;
  }
  if (digit === "." && layar.includes(".")) return;
  if (layar === "0" && digit !== ".") {
    layar = digit;
  } else {
    layar += digit;
  }
}

/** Menghitung hasil operasi yang sedang berjalan, bila ada. */
function hitungHasil() {
  if (operator === null || angkaPertama === null) return;
  const angkaKedua = Number(layar);
  try {
    const hasil = hitung(operator, angkaPertama, angkaKedua);
    // toFixed(10) + Number membuang galat desimal, mis. 0.1 + 0.2 -> 0.3
    layar = String(Number(hasil.toFixed(10)));
    riwayat.unshift(`${angkaPertama} ${operator} ${angkaKedua} = ${layar}`);
    if (riwayat.length > MAKS_RIWAYAT) riwayat.pop();
    perbaruiRiwayat();
  } catch (error) {
    layar = error.message;
  }
  operator = null;
  angkaPertama = null;
  siapReset = true;
}

/**
 * Memilih operator; bila ada operasi sebelumnya yang belum selesai,
 * operasi itu dihitung dulu (hitung berantai).
 * @param {string} op Operator '+', '-', '*', atau '/'.
 */
function pilihOperator(op) {
  if (operator !== null && !siapReset) hitungHasil();
  angkaPertama = Number(layar);
  operator = op;
  siapReset = true;
}

/** Menghapus satu karakter terakhir di layar (tombol Backspace). */
function hapusSatu() {
  if (siapReset) return;
  layar = layar.length > 1 ? layar.slice(0, -1) : "0";
}

/** Mereset kalkulator ke keadaan awal (tombol C). */
function bersihkan() {
  layar = "0";
  angkaPertama = null;
  operator = null;
  siapReset = false;
}

// Event delegation: satu pendengar pada papan untuk semua tombol
papan.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  if (tombol.dataset.angka !== undefined) masukkanAngka(tombol.dataset.angka);
  else if (tombol.dataset.operator) pilihOperator(tombol.dataset.operator);
  else if (tombol.dataset.aksi === "sama") hitungHasil();
  else if (tombol.dataset.aksi === "hapus") bersihkan();
  perbaruiLayar();
});

// Tantangan: dukungan keyboard
document.addEventListener("keydown", (event) => {
  const tombol = event.key;
  if (/^[0-9.]$/.test(tombol)) masukkanAngka(tombol);
  else if (["+", "-", "*", "/"].includes(tombol)) pilihOperator(tombol);
  else if (tombol === "Enter" || tombol === "=") hitungHasil();
  else if (tombol === "Backspace") hapusSatu();
  else if (tombol === "Escape") bersihkan();
  else return;
  perbaruiLayar();
});

perbaruiLayar();
