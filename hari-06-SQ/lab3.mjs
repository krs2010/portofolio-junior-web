import { Stack } from './structures.js';

// 2. Uji dengan push tiga elemen, peek, pop sampai kosong, lalu pop pada stack kosong
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Pop:", stack.pop());
console.log("Pop:", stack.pop());
console.log("Pop pada Stack Kosong:", stack.pop());

console.log("-------------------");

// 3. Implementasikan validasi tanda kurung seimbang
function kurungSeimbang(teks) {
  const pasangan = { ')': '(', ']': '[', '}': '{' };
  const tumpukan = new Stack();
  
  for (const karakter of teks) {
    if ('([{'.includes(karakter)) {
      tumpukan.push(karakter);
    } else if (karakter in pasangan) {
      if (tumpukan.isEmpty() || tumpukan.pop() !== pasangan[karakter]) {
        return false;
      }
    }
  }
  return tumpukan.isEmpty();
}

console.log(kurungSeimbang('(a+b)*[c-d]')); // true
console.log(kurungSeimbang('(a+b]'));       // false
console.log(kurungSeimbang('((a)'));       // false
console.log(kurungSeimbang(''));           // true

// 4. Balik sebuah string memakai Stack, dan periksa palindrom
function balikString(str) {
  const tumpukan = new Stack();
  for (const karakter of str) {
    tumpukan.push(karakter);
  }
  let hasil = '';
  while (!tumpukan.isEmpty()) {
    hasil += tumpukan.pop();
  }
  return hasil;
}

function isPalindrom(str) {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleaned === balikString(cleaned);
}

console.log(balikString("hello")); // "olleh"
console.log(isPalindrom("racecar")); // true
console.log(isPalindrom("hello")); // false
