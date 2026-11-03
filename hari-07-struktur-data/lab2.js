// Lab 2 - Tree dan Graph
// Hari 7: Struktur Data II
// Cara jalan: simpan file ini sefolder dengan structures.js
// dan package.json, lalu jalankan: node Lab2.js

import { BinarySearchTree } from "./structures.js";

// 1. Tree: struktur folder, cetakPohon, hitungNode, cariNode
const folder = {
  nama: "proyek",
  anak: [
    { nama: "css", anak: [] },
    {
      nama: "js",
      anak: [{ nama: "app.js", anak: [] }],
    },
  ],
};

function cetakPohon(node, tingkat = 0) {
  console.log("  ".repeat(tingkat) + node.nama);
  for (const anak of node.anak) {
    cetakPohon(anak, tingkat + 1);
  }
}

function hitungNode(node) {
  let total = 1;
  for (const anak of node.anak) {
    total += hitungNode(anak);
  }
  return total;
}

// Mencari node secara rekursif, mengembalikan jalur lengkap.
// Bila tidak ditemukan, mengembalikan null.
function cariNode(node, nama, jalur = "") {
  const jalurBaru = jalur === "" ? node.nama : jalur + "/" + node.nama;
  if (node.nama === nama) {
    return jalurBaru;
  }
  for (const anak of node.anak) {
    const hasil = cariNode(anak, nama, jalurBaru);
    if (hasil !== null) {
      return hasil;
    }
  }
  return null;
}

console.log("1. Struktur folder:");
cetakPohon(folder);
console.log("Jumlah node:", hitungNode(folder));
console.log("cariNode app.js:", cariNode(folder, "app.js"));
console.log("cariNode js:", cariNode(folder, "js"));
console.log("cariNode css:", cariNode(folder, "css"));
console.log("cariNode proyek:", cariNode(folder, "proyek"));
console.log("cariNode style.css (tidak ada):", cariNode(folder, "style.css"));

// 2. Binary Search Tree
// Gambar pohon hasilnya:
//         50
//        /  \
//      30    70
//     / \   / \
//   20  40 60  80
console.log("\n2. Binary Search Tree:");
const bst = new BinarySearchTree();
const dataBst = [50, 30, 70, 20, 40, 60, 80];
for (const nilai of dataBst) {
  bst.insert(nilai);
}
console.log("Data dimasukkan:", dataBst);
console.log("inOrder (terurut):", bst.inOrder());
console.log("has(60):", bst.has(60));
console.log("has(65):", bst.has(65));

// 3. Graph: jaringan 6 kota (adjacency list, sisi tidak berarah)
const graf = {
  Jakarta: ["Bandung", "Semarang"],
  Bandung: ["Jakarta", "Yogyakarta"],
  Semarang: ["Jakarta", "Surabaya"],
  Yogyakarta: ["Bandung", "Surabaya", "Malang"],
  Surabaya: ["Semarang", "Yogyakarta"],
  Malang: ["Yogyakarta"],
};

// BFS (melebar) memakai Queue: urutan kunjungan lapis demi lapis
function bfs(graf, mulai) {
  const dikunjungi = new Set([mulai]);
  const antrean = [mulai];
  const urutan = [];
  while (antrean.length > 0) {
    const simpul = antrean.shift();
    urutan.push(simpul);
    for (const tetangga of graf[simpul]) {
      if (!dikunjungi.has(tetangga)) {
        dikunjungi.add(tetangga);
        antrean.push(tetangga);
      }
    }
  }
  return urutan;
}

// DFS (mendalam) memakai rekursi (Stack pemanggilan)
function dfs(graf, simpul, dikunjungi = new Set()) {
  dikunjungi.add(simpul);
  for (const tetangga of graf[simpul]) {
    if (!dikunjungi.has(tetangga)) {
      dfs(graf, tetangga, dikunjungi);
    }
  }
  return [...dikunjungi];
}

// Jarak terpendek dengan BFS: jumlah sisi dari asal ke tujuan.
// Asal sama dengan tujuan = 0, tidak terjangkau = -1.
function jarakTerpendek(graf, asal, tujuan) {
  if (asal === tujuan) {
    return 0;
  }
  if (graf[asal] === undefined || graf[tujuan] === undefined) {
    return -1;
  }
  const dikunjungi = new Set([asal]);
  const antrean = [[asal, 0]];
  while (antrean.length > 0) {
    const [simpul, jarak] = antrean.shift();
    for (const tetangga of graf[simpul]) {
      if (tetangga === tujuan) {
        return jarak + 1;
      }
      if (!dikunjungi.has(tetangga)) {
        dikunjungi.add(tetangga);
        antrean.push([tetangga, jarak + 1]);
      }
    }
  }
  return -1;
}

console.log("\n3. Graf 6 kota:");
console.log("BFS dari Jakarta:", bfs(graf, "Jakarta"));
console.log("DFS dari Jakarta:", dfs(graf, "Jakarta"));
console.log(
  "jarakTerpendek Jakarta -> Malang:",
  jarakTerpendek(graf, "Jakarta", "Malang"),
  "sisi",
);
console.log(
  "jarakTerpendek Jakarta -> Surabaya:",
  jarakTerpendek(graf, "Jakarta", "Surabaya"),
  "sisi",
);
console.log(
  "jarakTerpendek Jakarta -> Jakarta:",
  jarakTerpendek(graf, "Jakarta", "Jakarta"),
  "sisi",
);
console.log(
  "jarakTerpendek Malang -> Jakarta:",
  jarakTerpendek(graf, "Malang", "Jakarta"),
  "sisi",
);
console.log(
  "jarakTerpendek Jakarta -> Medan (tidak ada):",
  jarakTerpendek(graf, "Jakarta", "Medan"),
);
