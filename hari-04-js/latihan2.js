/*
Penentu bilangan ganjil/genap dan positif/negatif/nol
0 start, let nilai, status 1, status 2
1. input nilai
2.if nilai( % 2)===0 {status1="genap"}else{status1="ganjil"}
3. cetak status1
4. if(nilai>0) {status2="positif"} else
    if(nilai<0) {status2="negatif"} else {status2="nol"}
5. cetak status
6. end
*/
let nilai = -5;
let status1, status2;       
if (nilai % 2 === 0) {
    status1 = "genap";
}       
else {
    status1 = "ganjil";
}   
if (nilai > 0) {
    status2 = "positif";
}   
else if (nilai < 0) {
    status2 = "negatif";
}
else {
    status2 = "nol";
}
console.log(`Bilangan ${nilai} adalah ${status1} dan ${status2}`);

/*
tarif parkir: 2 jam pertama: Rp3.000, tiap jam berikutnya: Rp2.000, maksimum: Rp15.000 per hari.
0. start
1. input durasi jam
2. sisajam=durasi jam%24
3. totalhari=(durasijam-sisahari)/24
4. if(sisajam<=2){bayar=3000}else{bayar=3000+(sisajam-2)*2000}
5. if(bayar>=15000){bayar=15000}
6. bayar=totalhari*15000+bayar
7.cetak (bayar)
8.end 
*/
let durasiJam = 30;
let sisaJam = durasiJam % 24;
let totalHari = (durasiJam - sisaJam) / 24;
let bayar;   
if (sisaJam <= 2) {
    bayar = 3000;
} else {
    bayar = 3000 + (sisaJam - 2) * 2000;
}
if (bayar >= 15000) {
    bayar = 15000;
}       
bayar = totalHari * 15000 + bayar;
console.log(`Total bayar parkir untuk durasi ${durasiJam} jam adalah Rp${bayar}`);
/*
Kalkulator sederhana menggunakan switch (+,-,*,/) dan penanganan pembagian dengan nol.
0. start
1. output ("menu pilihan(+,-,*,/)")
2. input (nilai1,nilai2,pilih)
3. switch(pilih)
    case 1 : hasil=nilai1+nilai2
    case 2 : hasil=nilai1-nilai2
    case 3 : hasil=nilai1*nilai2
    case 4 : if(nilai2===0){hasil="tidak terdefinisi"}else{hasil=nilai1/nilai2}
*/
let nilai1 = 10;
let nilai2 = 0;
let pilih = '/';
let hasil; 
if (pilih === '+') {
    hasil = nilai1 + nilai2;
}   
else if (pilih === '-') {
    hasil = nilai1 - nilai2;
}   
else if (pilih === '*') {
    hasil = nilai1 * nilai2;
}   
else if (pilih === '/') {
    if (nilai2 === 0) {
        hasil = "tidak terdefinisi";
    } else {
        hasil = nilai1 / nilai2;
    }   
}   
nilai1 = 10;
nilai2 = 0;
pilih = '/';
hasil;
console.log(`Hasil dari ${nilai1} ${pilih} ${nilai2} adalah: ${hasil}`);    
/*
Program penentu kategori BMI (berat / (tinggi *tinggi))
Kurang (<18,5), Normal (18,5-24,9),Lebih (25-29,9),Obesitas: (>30).
0. start, let berat, tinggi, BMI, status
1. input (berat,tinggi)
2. BMI = berat / (tinggi *tinggi)
3. if(BMI<18,5,"kurang";BMI=18,5-24,9,"Normal";BMI=25-29,9,"Obesitas")
4. cetak
5. end
*/
let berat = 82;
let tinggi = 1.75;
let BMI = berat / (tinggi * tinggi);
let status; 
if (BMI < 18.5) {
    status = "Kurang";
}   
else if (BMI >= 18.5 && BMI <= 24.9) {
    status = "Normal";
}   
else if (BMI >= 25 && BMI <= 29.9) {
    status = "Lebih";
}
else {
    status = "Obesitas";
}   
console.log(`BMI: ${BMI.toFixed(2)}, Kategori: ${status}`);