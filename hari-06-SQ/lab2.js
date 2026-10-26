// Lab 2 - Map dan Set
// Hari 6: Struktur Data I

// 1. Hitung frekuensi kata memakai Map, tampilkan terurut dari yang paling sering
const kalimat = "saya belajar web saya suka web";
const kata = kalimat.split(" ");

const frekuensi = new Map();
for (const k of kata) {
  frekuensi.set(k, (frekuensi.get(k) || 0) + 1);
}

const frekuensiUrut = [...frekuensi.entries()].sort(function (a, b) {
  return b[1] - a[1];
});
console.log("1. Frekuensi kata (paling sering dulu):");
console.log(frekuensiUrut);

// 2. Hilangkan duplikat dari daftar email memakai Set
const email = [
  "sari@contoh.com",
  "budi@contoh.com",
  "sari@contoh.com",
  "citra@contoh.com",
  "budi@contoh.com",
];
const emailUnik = [...new Set(email)];
console.log("\n2. Daftar email sebelum (jumlah:", email.length + "):");
console.log(email);
console.log("Daftar email sesudah (jumlah:", emailUnik.length + "):");
console.log(emailUnik);

// 3. Cari irisan dua daftar peserta (kelas A dan kelas B) memakai Set
const kelasA = ["Sari", "Budi", "Dewi", "Eko"];
const kelasB = ["Budi", "Fajar", "Dewi", "Gita"];
const himpunanB = new Set(kelasB);
const irisan = kelasA.filter(function (nama) {
  return himpunanB.has(nama);
});
console.log("\n3. Kelas A:");
console.log(kelasA);
console.log("Kelas B:");
console.log(kelasB);
console.log("Irisan (ada di kedua kelas):");
console.log(irisan);

// 4. Fungsi adaDuplikat(daftar) versi Set
function adaDuplikat(daftar) {
  const terlihat = new Set();
  for (const x of daftar) {
    if (terlihat.has(x)) {
      return true;
    }
    terlihat.add(x);
  }
  return false;
}
console.log("\n4. Uji adaDuplikat:");
console.log("Array kosong:", adaDuplikat([]));
console.log("Satu elemen:", adaDuplikat(["Sari"]));
console.log("Elemen berulang:", adaDuplikat(["Sari", "Budi", "Sari"]));
console.log("Tanpa duplikat:", adaDuplikat(["Sari", "Budi", "Citra"]));
