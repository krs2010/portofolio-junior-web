// Penghubung DOM dan event - Form Validator Proyek 2
import {
  validasiNama,
  validasiEmail,
  validasiHp,
  validasiSandi,
  validasiKonfirmasi,
} from "./aturan.js";

const form = document.getElementById("form-daftar");
const tombolKirim = document.getElementById("kirim");
const ringkasan = document.getElementById("ringkasan");

// Peta nama kolom -> fungsi aturannya
const aturan = {
  nama: (nilai) => validasiNama(nilai),
  email: (nilai) => validasiEmail(nilai),
  hp: (nilai) => validasiHp(nilai),
  sandi: (nilai) => validasiSandi(nilai),
  konfirmasi: (nilai) => validasiKonfirmasi(nilai, form.elements.sandi.value),
};

/**
 * Menampilkan pesan kesalahan di bawah kolom dan menandai aria-invalid.
 * @param {string} nama Nama kolom.
 * @param {string} pesan Pesan kesalahan ('' bila valid).
 */
function tampilkanGalat(nama, pesan) {
  document.getElementById(`galat-${nama}`).textContent = pesan;
  form.elements[nama].setAttribute("aria-invalid", pesan ? "true" : "false");
}

/**
 * Memeriksa satu kolom dan menampilkan hasilnya.
 * @param {string} nama Nama kolom.
 * @returns {boolean} true bila kolom valid.
 */
function periksaField(nama) {
  const pesan = aturan[nama](form.elements[nama].value);
  tampilkanGalat(nama, pesan);
  return pesan === "";
}

/**
 * Memeriksa semua kolom tanpa menampilkan pesan.
 * @returns {boolean} true bila semua kolom valid.
 */
function semuaValid() {
  return Object.keys(aturan).every(
    (nama) => aturan[nama](form.elements[nama].value) === "",
  );
}

// Validasi saat mengetik
form.addEventListener("input", (event) => {
  const nama = event.target.name;
  if (nama in aturan) periksaField(nama);
  // Bila sandi berubah, konfirmasi yang sudah terisi harus diperiksa ulang
  if (nama === "sandi" && form.elements.konfirmasi.value !== "") {
    periksaField("konfirmasi");
  }
  tombolKirim.disabled = !semuaValid();
});

// Validasi saat dikirim
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const hasil = Object.keys(aturan).map(periksaField);
  if (!hasil.every(Boolean)) return;

  // Ringkasan ditampilkan dengan textContent dan tanpa kata sandi
  ringkasan.hidden = false;
  ringkasan.textContent = `Pendaftaran berhasil: ${form.elements.nama.value} (${form.elements.email.value})`;
  form.reset();
  tombolKirim.disabled = true;
});
