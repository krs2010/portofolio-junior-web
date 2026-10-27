// structures.js - LinkedList, LinkedQueue, Stack, dan Queue
// Hari 7: Struktur Data II (lanjutan Hari 6)
// LinkedList dan LinkedQueue disalin dari T1 modul.
// Stack dan Queue dari Hari 6 ditambahkan supaya satu berkas
// ini dipakai untuk semua lab Hari 7 dan Proyek 3.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  addFirst(data) {
    const node = new Node(data);
    node.next = this.#head;
    this.#head = node;
    if (this.#tail === null) {
      this.#tail = node;
    }
    this.#size++;
  }

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

  peekFirst() {
    return this.#head === null ? undefined : this.#head.data;
  }

  find(predikat) {
    let saatIni = this.#head;
    while (saatIni !== null) {
      if (predikat(saatIni.data)) {
        return saatIni.data;
      }
      saatIni = saatIni.next;
    }
    return undefined;
  }

  // Menghapus node PERTAMA yang bernilai data.
  // Mengembalikan true bila berhasil, false bila tidak ada.
  // Gambar pointer yang diubah:
  // - Kepala : head pindah ke node berikutnya.
  //           head lama terlepas, head baru = head.next lama.
  // - Tengah : node sebelumnya melompati node yang dihapus.
  //           sebelum.next = saatIni.next
  // - Ekor   : node sebelumnya jadi ekor baru.
  //           sebelum.next = null, tail = sebelum
  // - Tidak ada: tidak ada pointer yang diubah.
  remove(data) {
    if (this.#head === null) {
      return false;
    }
    // Kasus kepala
    if (this.#head.data === data) {
      this.#head = this.#head.next;
      if (this.#head === null) {
        this.#tail = null;
      }
      this.#size--;
      return true;
    }
    // Kasus tengah dan ekor
    let sebelum = this.#head;
    let saatIni = this.#head.next;
    while (saatIni !== null) {
      if (saatIni.data === data) {
        sebelum.next = saatIni.next;
        if (saatIni === this.#tail) {
          this.#tail = sebelum;
        }
        this.#size--;
        return true;
      }
      sebelum = saatIni;
      saatIni = saatIni.next;
    }
    // Tidak ada
    return false;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

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

// Queue berbasis Linked List: semua operasi O(1) dan
// detail internal tersembunyi di dalam LinkedList.
export class LinkedQueue {
  #daftar = new LinkedList();

  enqueue(item) {
    this.#daftar.addLast(item);
  }

  dequeue() {
    return this.#daftar.removeFirst();
  }

  front() {
    return this.#daftar.peekFirst();
  }

  isEmpty() {
    return this.#daftar.isEmpty();
  }

  size() {
    return this.#daftar.size();
  }

  toArray() {
    return this.#daftar.toArray();
  }
}

// Stack dari Hari 6: LIFO (Last In, First Out)
export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  // Stack kosong: kembalikan undefined, bukan error
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// Queue dari Hari 6: FIFO, versi head dan tail O(1).
// Memakai objek + penanda head/tail, bukan array.shift() yang O(n).
export class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  // Queue kosong: kembalikan undefined, bukan error
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  front() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.tail === this.head;
  }

  size() {
    return this.tail - this.head;
  }

  toArray() {
    const hasil = [];
    for (let i = this.head; i < this.tail; i++) {
      hasil.push(this.items[i]);
    }
    return hasil;
  }
}

// Binary Search Tree dari T2 modul Hari 7.
// Anak kiri lebih kecil, anak kanan lebih besar atau sama dari node.
// In-order menghasilkan data terurut.
class BstNode {
  constructor(nilai) {
    this.nilai = nilai;
    this.kiri = null;
    this.kanan = null;
  }
}

export class BinarySearchTree {
  #akar = null;

  insert(nilai) {
    const baru = new BstNode(nilai);
    if (this.#akar === null) {
      this.#akar = baru;
      return;
    }
    let saatIni = this.#akar;
    while (true) {
      if (nilai < saatIni.nilai) {
        if (saatIni.kiri === null) {
          saatIni.kiri = baru;
          return;
        }
        saatIni = saatIni.kiri;
      } else {
        if (saatIni.kanan === null) {
          saatIni.kanan = baru;
          return;
        }
        saatIni = saatIni.kanan;
      }
    }
  }

  has(nilai) {
    let saatIni = this.#akar;
    while (saatIni !== null) {
      if (nilai === saatIni.nilai) {
        return true;
      }
      saatIni = nilai < saatIni.nilai ? saatIni.kiri : saatIni.kanan;
    }
    return false;
  }

  inOrder() {
    const hasil = [];
    const telusuri = (node) => {
      if (node === null) {
        return;
      }
      telusuri(node.kiri);
      hasil.push(node.nilai);
      telusuri(node.kanan);
    };
    telusuri(this.#akar);
    return hasil;
  }
}
