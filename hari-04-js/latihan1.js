// 1. Deklarasi variabel dan cetak dengan template literal
let nama = 'Yusuf R. Taulai';
let umur = 30;
let tinggiBadan = 1.77;
let statusAktif = true;

console.log(`Halo, nama saya ${nama}, umur ${umur} tahun, tinggi ${tinggiBadan}m, status aktif: ${statusAktif}`);

// 2. Cek tipe data dengan typeof
console.log(typeof('5' + 3));
console.log(typeof('5' * 3));
console.log(typeof(0.1 + 0.2));
console.log(Number(typeof('abc')))
console.log(typeof(10 / 3));
console.log(typeof(10 % 3));
console.log(typeof(2 ** 10));

// 3. Evaluasi ekspresi JS
console.log('\n--- Hasil Ekspresi ---');
console.log("'5' + 3    :", '5' + 3);       // '53' (penggabungan string)
console.log("'5' * 3    :", '5' * 3);       // 15 (konversi otomatis ke angka)
console.log('0.1 + 0.2  :', 0.1 + 0.2);     // 0.30000000000000004 (presisi IEEE 754)
console.log("Number('abc'):", Number('abc')); // NaN (Not a Number)
console.log('10 / 3     :', 10 / 3);        // 3.3333333333333335
console.log('10 % 3     :', 10 % 3);        // 1 (sisa bagi)
console.log('2 ** 10    :', 2 ** 10);       // 1024 (pangkat)

// 4. Perhitungan sederhana
console.log('\n--- Perhitungan ---');

// Luas dan keliling lingkaran (r = 7)
let r = 7;
let luas = Math.PI * r ** 2;
let keliling = 2 * Math.PI * r;
console.log(`Lingkaran (r=${r}): Luas = ${luas.toFixed(2)}, Keliling = ${keliling.toFixed(2)}`);

// Jumlah detik dalam 1 hari (24 jam * 60 menit * 60 detik)
const detikSatuHari = 24 * 60 * 60;
console.log(`Jumlah detik dalam 1 hari: ${detikSatuHari} detik`);

// Konversi Celsius ke Fahrenheit (F = C * 9/5 + 32)
const celsius = 30;
const fahrenheit = (celsius * 9 / 5) + 32;
console.log(`${celsius}°C = ${fahrenheit}°F`);