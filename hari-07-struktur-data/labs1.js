// Lab 1 - Linked List
// Hari 7: Struktur Data II
// Cara jalan: simpan file ini sefolder dengan structures.js
// dan package.json, lalu jalankan: node Lab1.js

import { LinkedList, LinkedQueue } from "./structures.js";

// 1. Uji LinkedList: addFirst, addLast, removeFirst, find, toArray
console.log("1. Uji LinkedList dasar:");
const daftar = new LinkedList();
daftar.addLast("B");
daftar.addFirst("A");
daftar.addLast("C");
console.log("Setelah addLast B, addFirst A, addLast C:", daftar.toArray());
console.log("peekFirst:", daftar.peekFirst());
console.log("size:", daftar.size());
console.log("isEmpty:", daftar.isEmpty());
console.log(
  "find B:",
  daftar.find(function (x) {
    return x === "B";
  }),
);
console.log(
  "find Z (tidak ada):",
  daftar.find(function (x) {
    return x === "Z";
  }),
);
console.log("removeFirst:", daftar.removeFirst());
console.log("Sisa daftar:", daftar.toArray());

// Kasus kosong
console.log("\nKasus kosong:");
const kosong = new LinkedList();
console.log("isEmpty:", kosong.isEmpty());
console.log("size:", kosong.size());
console.log("peekFirst:", kosong.peekFirst());
console.log("removeFirst:", kosong.removeFirst());
console.log("toArray:", kosong.toArray());
console.log("remove dari kosong:", kosong.remove("A"));

// Kasus satu elemen
console.log("\nKasus satu elemen:");
const satu = new LinkedList();
satu.addFirst("X");
console.log("Isi:", satu.toArray(), "| size:", satu.size());
console.log("removeFirst:", satu.removeFirst());
console.log(
  "Setelah dihapus, isEmpty:",
  satu.isEmpty(),
  "| size:",
  satu.size(),
);
console.log("removeFirst lagi (kosong):", satu.removeFirst());

// 2. Uji remove(data): kepala, tengah, ekor, tidak ada
console.log("\n2. Uji remove(data):");
const hapus = new LinkedList();
hapus.addLast("A");
hapus.addLast("B");
hapus.addLast("C");
hapus.addLast("D");
console.log("Awal:", hapus.toArray());

console.log("remove kepala A:", hapus.remove("A"), "->", hapus.toArray());
console.log("remove tengah C:", hapus.remove("C"), "->", hapus.toArray());
console.log("remove ekor D:", hapus.remove("D"), "->", hapus.toArray());
console.log("remove Z (tidak ada):", hapus.remove("Z"), "->", hapus.toArray());
console.log(
  "remove satu-satunya B:",
  hapus.remove("B"),
  "->",
  hapus.toArray(),
  "| isEmpty:",
  hapus.isEmpty(),
);
// Bukti tail sudah direset: tambah lagi setelah kosong harus jalan normal
hapus.addLast("E");
console.log("addLast E setelah kosong:", hapus.toArray());

// 3. Uji singkat LinkedQueue (dipakai di soal 4)
console.log("\n3. Uji LinkedQueue:");
const antrean = new LinkedQueue();
antrean.enqueue("A001");
antrean.enqueue("A002");
antrean.enqueue("A003");
console.log("Antrean:", antrean.toArray(), "| front:", antrean.front());
console.log("dequeue:", antrean.dequeue(), "->", antrean.toArray());
console.log("dequeue:", antrean.dequeue());
console.log("dequeue:", antrean.dequeue());
console.log(
  "dequeue saat kosong:",
  antrean.dequeue(),
  "| isEmpty:",
  antrean.isEmpty(),
);

// 4. Bandingkan Queue array (shift) dengan LinkedQueue, 100.000 elemen
console.log("\n4. Perbandingan kecepatan (100.000 elemen):");
const JUMLAH = 100000;

console.time("Queue array (shift)");
const antreanArray = [];
for (let i = 1; i <= JUMLAH; i++) {
  antreanArray.push(i);
}
while (antreanArray.length > 0) {
  antreanArray.shift();
}
console.timeEnd("Queue array (shift)");

console.time("LinkedQueue");
const antreanLinked = new LinkedQueue();
for (let i = 1; i <= JUMLAH; i++) {
  antreanLinked.enqueue(i);
}
while (!antreanLinked.isEmpty()) {
  antreanLinked.dequeue();
}
console.timeEnd("LinkedQueue");

console.log("\nKesimpulan: LinkedQueue jauh lebih cepat karena enqueue dan");
console.log("dequeue-nya O(1) (cuma pindah pointer head/tail), sedangkan");
console.log("array.shift() O(n) karena semua elemen sisanya harus digeser");
console.log("tiap kali dequeue, jadi totalnya O(n^2) untuk 100.000 elemen.");
