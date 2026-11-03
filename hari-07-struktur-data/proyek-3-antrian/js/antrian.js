// js/antrian.js - Logika antrean loket, tanpa DOM.
// Memakai LinkedQueue dari structures.js (enqueue/dequeue O(1)).

import { LinkedQueue } from "./structures.js";

export const AWALAN_NOMOR = "A";
export const MAKS_RIWAYAT_PANGGILAN = 5;

function formatNomor(angka) {
  return AWALAN_NOMOR + String(angka).padStart(3, "0");
}

export class AntreanLoket {
  #antrean = new LinkedQueue();
  #nomorTerakhir = 0;
  #riwayat = [];
  #dipanggil = null;
  #pesan = "";

  /** Mengambil nomor baru yang berurutan, mis. A001, A002. */
  ambilNomor() {
    this.#nomorTerakhir++;
    const nomor = formatNomor(this.#nomorTerakhir);
    this.#antrean.enqueue(nomor);
    this.#pesan = "";
    return nomor;
  }

  /**
   * Memanggil nomor berikutnya (FIFO).
   * Bila antrean kosong, pesan menjadi 'Antrean kosong'.
   */
  panggil() {
    if (this.#antrean.isEmpty()) {
      this.#pesan = "Antrean kosong";
      return null;
    }
    const nomor = this.#antrean.dequeue();
    this.#dipanggil = nomor;
    this.#pesan = "";
    this.#riwayat.push(nomor);
    if (this.#riwayat.length > MAKS_RIWAYAT_PANGGILAN) {
      this.#riwayat = this.#riwayat.slice(-MAKS_RIWAYAT_PANGGILAN);
    }
    return nomor;
  }

  /** Mengosongkan antrean dan memulai penomoran lagi dari A001. */
  reset() {
    this.#antrean.clear();
    this.#nomorTerakhir = 0;
    this.#riwayat = [];
    this.#dipanggil = null;
    this.#pesan = "";
  }

  /** Jumlah yang masih menunggu. */
  jumlahMenunggu() {
    return this.#antrean.size();
  }

  /** Daftar nomor yang masih menunggu. */
  daftarMenunggu() {
    return this.#antrean.toArray();
  }

  /** 5 nomor terakhir yang sudah dipanggil. */
  riwayatTerakhir() {
    return [...this.#riwayat];
  }

  /** Nomor terakhir yang dipanggil, atau null bila belum ada. */
  nomorDipanggil() {
    return this.#dipanggil;
  }

  /** Pesan untuk pengguna, mis. 'Antrean kosong', atau '' bila tidak ada. */
  pesan() {
    return this.#pesan;
  }
}
