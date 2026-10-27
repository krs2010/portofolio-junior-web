// js/app.js - Penghubung DOM untuk antrean dan editor.
// Logika bisnis ada di antrian.js dan riwayat.js, bukan di sini.

import { AntreanLoket } from "./antrian.js";
import { RiwayatEditor, MAKS_RIWAYAT } from "./riwayat.js";

const KUNCI_CACATAN = "proyek3-catatan-terakhir";

const antrean = new AntreanLoket();
const riwayat = new RiwayatEditor();

const dipanggilEl = document.getElementById("dipanggil");
const jumlahEl = document.getElementById("jumlah");
const daftarEl = document.getElementById("daftar");
const riwayatPanggilanEl = document.getElementById("riwayat-panggilan");
const editorEl = document.getElementById("editor");
const tombolUndo = document.getElementById("undo");
const tombolRedo = document.getElementById("redo");
const infoRiwayatEl = document.getElementById("info-riwayat");

function isiDaftar(el, daftar) {
  el.textContent = "";
  for (const item of daftar) {
    const li = document.createElement("li");
    li.textContent = item;
    el.append(li);
  }
}

function tampilkanAntrean() {
  const pesan = antrean.pesan();
  dipanggilEl.textContent =
    pesan === "" ? antrean.nomorDipanggil() || "-" : pesan;
  jumlahEl.textContent = antrean.jumlahMenunggu();
  isiDaftar(daftarEl, antrean.daftarMenunggu());
  isiDaftar(riwayatPanggilanEl, antrean.riwayatTerakhir());
}

function tampilkanEditor() {
  tombolUndo.disabled = !riwayat.bisaUndo();
  tombolRedo.disabled = !riwayat.bisaRedo();
  infoRiwayatEl.textContent =
    "Riwayat: " +
    riwayat.jumlahUndo() +
    " undo, " +
    riwayat.jumlahRedo() +
    " redo (maks " +
    MAKS_RIWAYAT +
    ")";
}

document.getElementById("ambil").addEventListener("click", () => {
  antrean.ambilNomor();
  tampilkanAntrean();
});

document.getElementById("panggil").addEventListener("click", () => {
  antrean.panggil();
  tampilkanAntrean();
});

document.getElementById("reset").addEventListener("click", () => {
  const setuju = confirm(
    "Reset antrean? Antrean dan riwayat panggilan akan dikosongkan, penomoran mulai lagi dari A001.",
  );
  if (!setuju) {
    return;
  }
  antrean.reset();
  tampilkanAntrean();
});

editorEl.addEventListener("input", () => {
  riwayat.catat(editorEl.value);
  localStorage.setItem(KUNCI_CACATAN, editorEl.value);
  tampilkanEditor();
});

tombolUndo.addEventListener("click", () => {
  editorEl.value = riwayat.undo();
  localStorage.setItem(KUNCI_CACATAN, editorEl.value);
  tampilkanEditor();
});

tombolRedo.addEventListener("click", () => {
  editorEl.value = riwayat.redo();
  localStorage.setItem(KUNCI_CACATAN, editorEl.value);
  tampilkanEditor();
});

// Muat catatan terakhir yang tersimpan, bila ada.
const catatanTersimpan = localStorage.getItem(KUNCI_CACATAN);
if (catatanTersimpan !== null) {
  editorEl.value = catatanTersimpan;
  riwayat.muat(catatanTersimpan);
}

tampilkanAntrean();
tampilkanEditor();
