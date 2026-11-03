// js/riwayat.js - Logika undo/redo editor, tanpa DOM.
// Memakai dua Stack dari structures.js.

import { Stack } from "./structures.js";

export const MAKS_RIWAYAT = 50;

export class RiwayatEditor {
  #undoStack = new Stack();
  #redoStack = new Stack();
  #teksSekarang = "";

  /**
   * Mencatat teks baru. Teks yang sama tidak dicatat dua kali,
   * dan riwayat redo dihapus karena ada perubahan baru.
   */
  catat(teksBaru) {
    if (teksBaru === this.#teksSekarang) {
      return;
    }
    this.#undoStack.push(this.#teksSekarang);
    if (this.#undoStack.size() > MAKS_RIWAYAT) {
      this.#undoStack.buangTerlama();
    }
    this.#redoStack.clear();
    this.#teksSekarang = teksBaru;
  }

  /**
   * Membatalkan perubahan terakhir.
   * @returns {string} Teks setelah undo (tetap bila undo kosong).
   */
  undo() {
    if (this.#undoStack.isEmpty()) {
      return this.#teksSekarang;
    }
    this.#redoStack.push(this.#teksSekarang);
    this.#teksSekarang = this.#undoStack.pop();
    return this.#teksSekarang;
  }

  /**
   * Mengulangi perubahan yang dibatalkan.
   * @returns {string} Teks setelah redo (tetap bila redo kosong).
   */
  redo() {
    if (this.#redoStack.isEmpty()) {
      return this.#teksSekarang;
    }
    this.#undoStack.push(this.#teksSekarang);
    this.#teksSekarang = this.#redoStack.pop();
    return this.#teksSekarang;
  }

  /** Memuat teks awal (mis. dari localStorage) tanpa masuk riwayat. */
  muat(teksAwal) {
    this.#teksSekarang = teksAwal;
  }

  /** Teks saat ini. */
  teksSekarang() {
    return this.#teksSekarang;
  }

  /** Jumlah langkah undo yang tersedia. */
  jumlahUndo() {
    return this.#undoStack.size();
  }

  /** Jumlah langkah redo yang tersedia. */
  jumlahRedo() {
    return this.#redoStack.size();
  }

  /** True bila ada yang bisa di-undo. */
  bisaUndo() {
    return !this.#undoStack.isEmpty();
  }

  /** True bila ada yang bisa di-redo. */
  bisaRedo() {
    return !this.#redoStack.isEmpty();
  }
}
