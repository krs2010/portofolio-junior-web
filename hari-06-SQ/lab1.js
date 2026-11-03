// Lab 1 - Array dan Objek (Data Peserta)
// Hari 6: Struktur Data I

const peserta = [
  { id: 1, nama: "Sari", kelas: "Web", nilai: 90, aktif: true },
  { id: 2, nama: "Budi", kelas: "Web", nilai: 68, aktif: true },
  { id: 3, nama: "Citra", kelas: "Data", nilai: 82, aktif: false },
  { id: 4, nama: "Dewi", kelas: "Data", nilai: 77, aktif: true },
  { id: 5, nama: "Eko", kelas: "Web", nilai: 55, aktif: true },
  { id: 6, nama: "Fajar", kelas: "Data", nilai: 91, aktif: true },
  { id: 7, nama: "Gita", kelas: "Web", nilai: 73, aktif: false },
  { id: 8, nama: "Hadi", kelas: "Data", nilai: 64, aktif: true },
  { id: 9, nama: "Indah", kelas: "Web", nilai: 85, aktif: true },
  { id: 10, nama: "Joko", kelas: "Data", nilai: 70, aktif: false },
];

// 1. Tampilkan peserta aktif saja (filter)
const pesertaAktif = peserta.filter(function (p) {
  return p.aktif === true;
});
console.log("1. Peserta aktif:");
console.log(pesertaAktif);

// 2. Urutkan berdasarkan nama (sort dengan localeCompare)
// tanpa mengubah array asli: salin dulu dengan [...]
const pesertaUrutNama = [...peserta].sort(function (a, b) {
  return a.nama.localeCompare(b.nama);
});
console.log("\n2. Urut berdasarkan nama:");
console.log(pesertaUrutNama);
console.log("Array asli tetap (cek urutan pertama):", peserta[0].nama);

// 3. Cari peserta berdasarkan id (find) dan tangani bila tidak ditemukan
function cariPeserta(id) {
  const hasil = peserta.find(function (p) {
    return p.id === id;
  });
  if (hasil === undefined) {
    return "Peserta dengan id " + id + " tidak ditemukan.";
  }
  return hasil;
}
console.log("\n3. Cari id 2:");
console.log(cariPeserta(2));
console.log("Cari id 99 (tidak ada):");
console.log(cariPeserta(99));

// 4. Hitung jumlah peserta per kelas dengan objek penghitung
const jumlahPerKelas = {};
for (const p of peserta) {
  if (jumlahPerKelas[p.kelas] === undefined) {
    jumlahPerKelas[p.kelas] = 0;
  }
  jumlahPerKelas[p.kelas]++;
}
console.log("\n4. Jumlah peserta per kelas:");
console.log(jumlahPerKelas);

// 5. Tambah, ubah, dan hapus peserta (push, perubahan properti, filter)
// Dikerjakan pada salinan, supaya data asli untuk soal 6 tetap utuh.
// Salin tiap objeknya juga ({...p}), karena [...peserta] saja masih
// berbagi objek yang sama sehingga ubah nilai ikut mengubah data asli.
let daftar = peserta.map(function (p) {
  return { ...p };
});

// Tambah: push peserta baru
daftar.push({ id: 11, nama: "Kirana", kelas: "Web", nilai: 79, aktif: true });
console.log("\n5a. Setelah tambah Kirana (jumlah:", daftar.length + "):");
console.log(daftar[daftar.length - 1]);

// Ubah: ubah nilai Budi (id 2) dari 68 menjadi 78
const budi = daftar.find(function (p) {
  return p.id === 2;
});
budi.nilai = 78;
console.log("\n5b. Setelah ubah nilai Budi:");
console.log(budi);

// Hapus: hapus Citra (id 3) dengan filter
daftar = daftar.filter(function (p) {
  return p.id !== 3;
});
console.log("\n5c. Setelah hapus Citra (jumlah:", daftar.length + "):");
console.log(daftar);

// 6. Ubah array menjadi objek berindeks id (reduce)
// sehingga pencarian berdasar id menjadi O(1)
const pesertaById = peserta.reduce(function (obj, p) {
  obj[p.id] = p;
  return obj;
}, {});
console.log("\n6. Objek berindeks id:");
console.log(pesertaById);
console.log("Cari id 2 dengan O(1):", pesertaById[2]);
console.log(
  "Cari id 99 dengan O(1):",
  pesertaById[99] === undefined ? "Tidak ditemukan." : pesertaById[99],
);
