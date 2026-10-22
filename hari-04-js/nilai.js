const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

// Deklarasi konstanta (tanpa magic number)
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;

const BATAS_GRADE_A = 85;
const BATAS_GRADE_B = 70;
const BATAS_GRADE_C = 55;

async function main() {
  const rl = readline.createInterface({ input, output });
  
  const daftarNama = [];
  const daftarNilai = [];
  let jalan = true;
  
  while (jalan) {
    console.log('\n===== PENGOLAH NILAI =====');
    console.log('1. Input nilai siswa');
    console.log('2. Tampilkan statistik');
    console.log('3. Tampilkan predikat per siswa');
    console.log('4. Keluar');
    
    const pilihan = await rl.question('Pilih menu (1-4): ');
    
    switch (pilihan) {
      case '1': {
        const nama = (await rl.question('Nama siswa: ')).trim();
        const nilai = Number(await rl.question('Nilai (0-100): '));
        
        // Validasi: nama tidak boleh kosong dan nilai harus angka antara 0-100
        if (nama === '' || Number.isNaN(nilai) || nilai < NILAI_MIN || nilai > NILAI_MAKS) {
          console.log('❌ Input tidak valid! Pastikan nama tidak kosong dan nilai berupa angka 0-100.');
        } else {
          daftarNama.push(nama);
          daftarNilai.push(nilai);
          console.log(`✅ Data siswa ${nama} berhasil ditambahkan.`);
        }
        break;
      }
      
      case '2': {
        // Cek jika data kosong
        if (daftarNilai.length === 0) {
          console.log('⚠️ Data siswa masih kosong. Silakan input data terlebih dahulu.');
          break;
        }
        
        // Inisialisasi variabel statistik dengan nilai dari elemen pertama
        let totalNilai = 0;
        let nilaiTertinggi = daftarNilai[0];
        let nilaiTerendah = daftarNilai[0];
        let jumlahLulus = 0;
        let jumlahTidakLulus = 0;
        
        // Perulangan untuk menghitung statistik
        for (let i = 0; i < daftarNilai.length; i++) {
          const nilai = daftarNilai[i];
          totalNilai += nilai;
          
          if (nilai > nilaiTertinggi) nilaiTertinggi = nilai;
          if (nilai < nilaiTerendah) nilaiTerendah = nilai;
          
          if (nilai >= BATAS_LULUS) {
            jumlahLulus++;
          } else {
            jumlahTidakLulus++;
          }
        }
        
        const rataRata = (totalNilai / daftarNilai.length).toFixed(2);
        
        console.log('\n--- STATISTIK NILAI ---');
        console.log(`Rata-rata Kelas    : ${rataRata}`);
        console.log(`Nilai Tertinggi    : ${nilaiTertinggi}`);
        console.log(`Nilai Terendah     : ${nilaiTerendah}`);
        console.log(`Jumlah Siswa Lulus : ${jumlahLulus} siswa`);
        console.log(`Siswa Tidak Lulus  : ${jumlahTidakLulus} siswa`);
        break;
      }
      
      case '3': {
        // Cek jika data kosong
        if (daftarNama.length === 0) {
          console.log('⚠️ Data siswa masih kosong. Silakan input data terlebih dahulu.');
          break;
        }
        
        console.log('\n--- DAFTAR PREDIKAT SISWA ---');
        // Perulangan dengan indeks untuk menampilkan data setiap siswa
        for (let i = 0; i < daftarNama.length; i++) {
          const nama = daftarNama[i];
          const nilai = daftarNilai[i];
          let grade = 'D';
          
          // Penentuan grade berdasarkan konstanta
          if (nilai >= BATAS_GRADE_A) {
            grade = 'A';
          } else if (nilai >= BATAS_GRADE_B) {
            grade = 'B';
          } else if (nilai >= BATAS_GRADE_C) {
            grade = 'C';
          }
          
          // Penentuan status kelulusan
          const status = nilai >= BATAS_LULUS ? 'Lulus' : 'Tidak Lulus';
          
          console.log(`${i + 1}. ${nama} | Nilai: ${nilai} | Grade: ${grade} | Status: ${status}`);
        }
        break;
      }
      
      case '4': {
        jalan = false;
        console.log('Terima kasih telah menggunakan program ini.');
        break;
      }
      
      default: {
        console.log('❌ Pilihan tidak valid. Silakan pilih angka 1-4.');
      }
    }
  }
  
  rl.close();
}

main();