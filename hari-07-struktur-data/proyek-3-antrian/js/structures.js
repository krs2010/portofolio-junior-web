// js/structures.js - Struktur data murni, tanpa DOM.
// Hari 7, Proyek 3: Simulator Antrean dan Riwayat.
// Dipakai oleh antrian.js (LinkedQueue) dan riwayat.js (Stack).
// Detail internal disembunyikan dengan private field (#).

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Singly linked list dengan head, tail, dan ukuran.
 * Sisip/hapus di ujung O(1), akses indeks O(n).
 */
export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  /** Menambah data di depan. */
  addFirst(data) {
    const node = new Node(data);
    node.next = this.#head;
    this.#head = node;
    if (this.#tail === null) {
      this.#tail = node;
    }
    this.#size++;
  }

  /** Menambah data di belakang. */
  addLast(data) {
    const node = new Node(data);
    if (this.#tail === null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
    }
    this.#tail = node;
    this.#size++;
  }

  /**
   * Menghapus dan mengembalikan data paling depan.
   * @returns {*} Data yang dihapus, atau undefined bila kosong.
   */
  removeFirst() {
    if (this.#head === null) {
      return undefined;
    }
    const data = this.#head.data;
    this.#head = this.#head.next;
    if (this.#head === null) {
      this.#tail = null;
    }
    this.#size--;
    return data;
  }

  /**
   * Melihat data paling depan tanpa menghapus.
   * @returns {*} Data paling depan, atau undefined bila kosong.
   */
  peekFirst() {
    return this.#head === null ? undefined : this.#head.data;
  }

  /** Menghapus semua node. */
  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  /** Jumlah node. */
  size() {
    return this.#size;
  }

  /** True bila tidak ada node. */
  isEmpty() {
    return this.#size === 0;
  }

  /** Isi list sebagai array, tanpa mengubah list. */
  toArray() {
    const hasil = [];
    let saatIni = this.#head;
    while (saatIni !== null) {
      hasil.push(saatIni.data);
      saatIni = saatIni.next;
    }
    return hasil;
  }
}

/**
 * Queue berbasis Linked List.
 * enqueue dan dequeue semuanya O(1).
 */
export class LinkedQueue {
  #daftar = new LinkedList();

  /** Menambah item di belakang antrean. */
  enqueue(item) {
    this.#daftar.addLast(item);
  }

  /**
   * Mengambil dan menghapus item paling depan (FIFO).
   * @returns {*} Item yang dipanggil, atau undefined bila kosong.
   */
  dequeue() {
    return this.#daftar.removeFirst();
  }

  /**
   * Melihat item paling depan tanpa menghapus.
   * @returns {*} Item paling depan, atau undefined bila kosong.
   */
  front() {
    return this.#daftar.peekFirst();
  }

  /** Mengosongkan antrean. */
  clear() {
    this.#daftar.clear();
  }

  /** Jumlah item yang menunggu. */
  size() {
    return this.#daftar.size();
  }

  /** True bila tidak ada yang menunggu. */
  isEmpty() {
    return this.#daftar.isEmpty();
  }

  /** Daftar yang menunggu, tanpa mengubah antrean. */
  toArray() {
    return this.#daftar.toArray();
  }
}

/**
 * Stack (LIFO): perubahan terakhir dibatalkan lebih dulu.
 * Semua operasi O(1).
 */
export class Stack {
  #items = [];

  /** Menaruh item di atas stack. */
  push(item) {
    this.#items.push(item);
  }

  /**
   * Mengambil dan menghapus item teratas.
   * @returns {*} Item teratas, atau undefined bila kosong.
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items.pop();
  }

  /**
   * Melihat item teratas tanpa menghapus.
   * @returns {*} Item teratas, atau undefined bila kosong.
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#items.length - 1];
  }

  /** Membuang item terbawah (dipakai saat riwayat melebihi batas). */
  buangTerlama() {
    this.#items.shift();
  }

  /** Mengosongkan stack. */
  clear() {
    this.#items = [];
  }

  /** Jumlah item di stack. */
  size() {
    return this.#items.length;
  }

  /** True bila stack kosong. */
  isEmpty() {
    return this.#items.length === 0;
  }
}
