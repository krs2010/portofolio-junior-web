// Lab 3 - Pencarian dan Pengurutan
// Hari 7: Struktur Data II
// Cara jalan: simpan file ini di folder hari-07-struktur-data,
// lalu jalankan: node Lab3.js
// Catatan: bagian 3 untuk 100.000 data paling lama, terutama
// bubbleSort, jadi tunggu sampai semua tabel selesai tercetak.

// Pencarian linear: O(n), tidak perlu terurut
function cariLinear(daftar, target) {
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i] === target) {
      return i;
    }
  }
  return -1;
}

// Pencarian biner: O(log n), WAJIB terurut
function cariBiner(daftarUrut, target) {
  let kiri = 0;
  let kanan = daftarUrut.length - 1;
  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (daftarUrut[tengah] === target) {
      return tengah;
    }
    if (daftarUrut[tengah] < target) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

// Bubble sort: O(n^2), sederhana untuk belajar.
// Menyalin dulu supaya array asli tidak berubah.
function bubbleSort(daftar) {
  const hasil = [...daftar];
  for (let i = 0; i < hasil.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < hasil.length - 1 - i; j++) {
      if (hasil[j] > hasil[j + 1]) {
        [hasil[j], hasil[j + 1]] = [hasil[j + 1], hasil[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) {
      break;
    }
  }
  return hasil;
}

// Merge sort: O(n log n), membagi lalu menggabungkan
function mergeSort(daftar) {
  if (daftar.length <= 1) {
    return daftar;
  }
  const tengah = Math.floor(daftar.length / 2);
  return gabung(
    mergeSort(daftar.slice(0, tengah)),
    mergeSort(daftar.slice(tengah)),
  );
}

function gabung(kiri, kanan) {
  const hasil = [];
  let i = 0;
  let j = 0;
  while (i < kiri.length && j < kanan.length) {
    hasil.push(kiri[i] <= kanan[j] ? kiri[i++] : kanan[j++]);
  }
  return hasil.concat(kiri.slice(i), kanan.slice(j));
}

// 1. Uji dengan array kosong, satu elemen, sudah terurut,
// terbalik, dan berisi duplikat
console.log("1. Uji pencarian dan pengurutan:");
const kasusUji = [
  { nama: "kosong", data: [] },
  { nama: "satu elemen", data: [5] },
  { nama: "sudah terurut", data: [1, 2, 3, 4, 5] },
  { nama: "terbalik", data: [5, 4, 3, 2, 1] },
  { nama: "berisi duplikat", data: [3, 1, 3, 2, 1] },
];
for (const kasus of kasusUji) {
  console.log(
    kasus.nama + ":",
    "bubbleSort =",
    bubbleSort(kasus.data),
    "| mergeSort =",
    mergeSort(kasus.data),
    "| asli tetap =",
    kasus.data,
  );
}

console.log("\nUji pencarian:");
const daftarCari = [10, 20, 30, 40, 50];
console.log("cariLinear [10,20,30,40,50] cari 30:", cariLinear(daftarCari, 30));
console.log("cariLinear cari 99 (tidak ada):", cariLinear(daftarCari, 99));
console.log("cariLinear array kosong cari 1:", cariLinear([], 1));
const daftarUrut = [1, 2, 3, 4, 5];
console.log("cariBiner [1,2,3,4,5] cari 4:", cariBiner(daftarUrut, 4));
console.log("cariBiner cari 99 (tidak ada):", cariBiner(daftarUrut, 99));
console.log("cariBiner array kosong cari 1:", cariBiner([], 1));
console.log("cariBiner satu elemen [7] cari 7:", cariBiner([7], 7));

// 2. Penghitung perbandingan pada bubbleSort dan insertionSort
function bubbleSortDenganHitung(daftar) {
  const hasil = [...daftar];
  let jumlahPerbandingan = 0;
  for (let i = 0; i < hasil.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < hasil.length - 1 - i; j++) {
      jumlahPerbandingan++;
      if (hasil[j] > hasil[j + 1]) {
        [hasil[j], hasil[j + 1]] = [hasil[j + 1], hasil[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) {
      break;
    }
  }
  return { hasil, jumlahPerbandingan };
}

// Insertion sort: O(n^2), baik untuk data hampir terurut
function insertionSortDenganHitung(daftar) {
  const hasil = [...daftar];
  let jumlahPerbandingan = 0;
  for (let i = 1; i < hasil.length; i++) {
    const kunci = hasil[i];
    let j = i - 1;
    while (j >= 0) {
      jumlahPerbandingan++;
      if (hasil[j] > kunci) {
        hasil[j + 1] = hasil[j];
        j--;
      } else {
        break;
      }
    }
    hasil[j + 1] = kunci;
  }
  return { hasil, jumlahPerbandingan };
}

console.log("\n2. Perbandingan bubbleSort vs insertionSort (1.000 data):");
// Data acak dibuat dengan rumus supaya hasilnya bisa diulang,
// bukan Math.random yang berubah tiap jalan.
const acak1000 = [];
for (let i = 0; i < 1000; i++) {
  acak1000.push((i * 37 + 11) % 1000);
}
const terurut1000 = [];
const terbalik1000 = [];
for (let i = 1; i <= 1000; i++) {
  terurut1000.push(i);
  terbalik1000.push(1001 - i);
}
const dataHitung = [
  { nama: "acak", data: acak1000 },
  { nama: "terurut", data: terurut1000 },
  { nama: "terbalik", data: terbalik1000 },
];
for (const item of dataHitung) {
  const bubble = bubbleSortDenganHitung(item.data);
  const insertion = insertionSortDenganHitung(item.data);
  console.log(
    item.nama + ":",
    "bubbleSort =",
    bubble.jumlahPerbandingan,
    "perbandingan",
    "| insertionSort =",
    insertion.jumlahPerbandingan,
    "perbandingan",
  );
}

// 3. Ukur bubbleSort vs mergeSort vs Array.sort
function buatDataAcak(jumlah) {
  const data = [];
  for (let i = 0; i < jumlah; i++) {
    data.push((i * 37 + 11) % jumlah);
  }
  return data;
}

function ukur(nama, fungsi, data) {
  const mulai = performance.now();
  fungsi(data);
  const selesai = performance.now();
  console.log(nama + ": " + (selesai - mulai).toFixed(2) + " ms");
  return selesai - mulai;
}

console.log("\n3. Waktu pengurutan (data acak):");
for (const jumlah of [10000, 100000]) {
  console.log("\n" + jumlah + " data:");
  const data = buatDataAcak(jumlah);
  ukur(
    "bubbleSort",
    function (d) {
      bubbleSort(d);
    },
    data,
  );
  ukur(
    "mergeSort ",
    function (d) {
      mergeSort(d);
    },
    data,
  );
  ukur(
    "Array.sort",
    function (d) {
      [...d].sort(function (a, b) {
        return a - b;
      });
    },
    data,
  );
}

console.log("\nPenjelasan Big-O:");
console.log("bubbleSort O(n^2) meledak saat data membesar: 10x data");
console.log(
  "berarti kira-kira 100x waktu, jadi paling lambat di 100.000 data.",
);
console.log("mergeSort dan Array.sort O(n log n) naiknya jauh lebih pelan,");
console.log("karena data dibagi-bagi dulu, bukan dibandingkan satu per satu");
console.log("berpasangan seperti bubbleSort.");
