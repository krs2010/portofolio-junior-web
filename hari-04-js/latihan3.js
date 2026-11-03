/*Tabel perkalian 1 sampai 10 (perulangan bersarang).
 */
for (let i = 1; i <= 10; i++) {
  let baris = "";
  for (let j = 1; j <= 10; j++) {
    baris += i * j + "\t";
    console.log(`${i} x ${j} = ${i * j}`);
  }
  
}

// Segitiga bintang
for (let baris = 1; baris <= 5; baris++) {
  let teks = "";
  for (let k = 1; k <= baris; k++) {
    teks += "*";
  }
  console.log(teks);
}

console.log("");

// Piramida bintang
for (let baris = 1; baris <= 5; baris++) {
  let teks = "";
  for (let spasi = 1; spasi <= 5 - baris; spasi++) {
    teks += " ";
  }
  for (let k = 1; k <= 2 * baris - 1; k++) {
    teks += "*";
  }
  console.log(teks);
}

console.log("");

// Persegi angka
for (let baris = 1; baris <= 5; baris++) {
  let teks = "";
  for (let k = 1; k <= 5; k++) {
    teks += k + " ";
  }
  console.log(teks);
}

for (let i = 1; i <= 50; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

let angka = 4821;
let jumlah = 0;

while (angka > 0) {
  jumlah += angka % 10;
  angka = Math.floor(angka / 10);
}
console.log(jumlah);

/*Tebak Angka
 */
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const angkaRahasia = Math.floor(Math.random() * 100) + 1;
  let tebakan;

  do {
    tebakan = Number(await rl.question("Tebak angka (1-100): "));

    if (tebakan < angkaRahasia) {
      console.log("Terlalu rendah");
    } else if (tebakan > angkaRahasia) {
      console.log("Terlalu tinggi");
    } else {
      console.log("Benar! Angkanya " + angkaRahasia);
    }
  } while (tebakan !== angkaRahasia);

  rl.close();
}
main();
