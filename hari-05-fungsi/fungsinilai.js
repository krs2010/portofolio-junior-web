const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

// 1. Deklarasi Konstanta (Tanpa Magic Number)
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;

async function main() {
  const rl = readline.createInterface({ input, output });

  // Storage data siswa
  const daftarNama = [];
  const daftarNilai = [];

  let jalan = true;

  while (jalan) {
    console.log("\n===== PENGOLAH NILAI =====");
    console.log("1. Input nilai siswa");
    console.log("2. Tampilkan statistik");
    console.log("3. Tampilkan predikat per siswa");
    console.log("4. Keluar");

    const pilihan = (await rl.question("Pilih menu (1-4): ")).trim();

    switch (pilihan) {
      case "1": {
        // Menu 1: Input Nilai Siswa
        const nama = (await rl.question("Nama siswa: ")).trim();
        const nilaiInput = await rl.question("Nilai (0-100): ");
        const nilai = Number(nilaiInput);

        // Validasi input: Nama tidak boleh kosong dan Nilai harus berupa angka 0-100
        if (!nama) {
          console.log("❌ Error: Nama siswa tidak boleh kosong.");
        } else if (
          Number.isNaN(nilai) ||
          nilai < NILAI_MIN ||
          nilai > NILAI_MAKS ||
          nilaiInput.trim() === ""
        ) {
          console.log(
            `❌ Error: Nilai harus berupa angka antara ${NILAI_MIN} sampai ${NILAI_MAKS}.`,
          );
        } else {
          daftarNama.push(nama);
          daftarNilai.push(nilai);
          console.log(`✅ Berhasil menambahkan ${nama} dengan nilai ${nilai}.`);
        }
        break;
      }

      case "2": {
        // Menu 2: Tampilkan Statistik Kelas
        if (daftarNilai.length === 0) {
          console.log(
            "⚠️ Belum ada data siswa. Silakan input nilai terlebih dahulu.",
          );
        } else {
          let total = 0;
          let tertinggi = daftarNilai[0];
          let terendah = daftarNilai[0];
          let jumlahLulus = 0;
          let jumlahTidakLulus = 0;

          for (let i = 0; i < daftarNilai.length; i++) {
            const nilai = daftarNilai[i];
            total += nilai;

            if (nilai > tertinggi) tertinggi = nilai;
            if (nilai < terendah) terendah = nilai;

            if (nilai >= BATAS_LULUS) {
              jumlahLulus++;
            } else {
              jumlahTidakLulus++;
            }
          }

          const rataRata = total / daftarNilai.length;

          console.log("\n----- STATISTIK KELAS -----");
          console.log(`Jumlah Siswa       : ${daftarNilai.length}`);
          console.log(`Rata-rata Nilai    : ${rataRata.toFixed(2)}`);
          console.log(`Nilai Tertinggi    : ${tertinggi}`);
          console.log(`Nilai Terendah     : ${terendah}`);
          console.log(`Jumlah Lulus       : ${jumlahLulus}`);
          console.log(`Jumlah Tidak Lulus : ${jumlahTidakLulus}`);
        }
        break;
      }

      case "3": {
        // Menu 3: Tampilkan Predikat per Siswa
        if (daftarNama.length === 0) {
          console.log(
            "⚠️ Belum ada data siswa. Silakan input nilai terlebih dahulu.",
          );
        } else {
          console.log("\n----- DAFTAR PREDIKAT SISWA -----");
          for (let i = 0; i < daftarNilai.length; i++) {
            const nama = daftarNama[i];
            const nilai = daftarNilai[i];

            // Penentuan Grade
            let grade = "";
            if (nilai >= 85) {
              grade = "A";
            } else if (nilai >= 70) {
              grade = "B";
            } else if (nilai >= 55) {
              grade = "C";
            } else {
              grade = "D";
            }

            // Penentuan Status Kelulusan
            const status = nilai >= BATAS_LULUS ? "Lulus" : "Tidak Lulus";

            console.log(
              `${i + 1}. ${nama} | Nilai: ${nilai} | Grade: ${grade} | Status: ${status}`,
            );
          }
        }
        break;
      }

      case "4": {
        // Menu 4: Keluar
        jalan = false;
        console.log("Terima kasih telah menggunakan Aplikasi Pengolah Nilai!");
        break;
      }

      default:
        console.log("❌ Pilihan menu tidak valid. Silakan pilih 1-4.");
        break;
    }
  }

  rl.close();
}

main();

function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, n) => jumlah + n, 0) / daftar.length;
}
function cariTertinggi(daftar) {
  return daftar.length === 0 ? null : Math.max(...daftar);
}
function cariTerendah(daftar) {
  return daftar.length === 0 ? null : Math.min(...daftar);
}
function tentukanGrade(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  return "D";
}
function tentukanStatus(nilai) {
  return nilai >= BATAS_LULUS ? "Lulus" : "Tidak lulus";
}
function nilaiValid(nilai) {
  return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}
