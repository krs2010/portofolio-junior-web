// kode-buruk.js - kode yang dibagikan instruktur untuk Lab 4 Hari 7
// SENGAJA dibiarkan buruk supaya bisa direview, jangan ditiru gayanya.
// Cara jalan: node kode-buruk.js
var d = [80, 65, 90];
var r = f(d);
function f(a) {
  var s = 0;
  for (var i = 0; i < a.length; i++) {
    s = s + a[i];
  }
  return s / a.length;
}
function g(x) {
  if (x >= 85) {
    return "A";
  } else {
    if (x >= 70) {
      return "B";
    } else {
      if (x >= 55) {
        return "C";
      } else {
        return "D";
      }
    }
  }
}
function h(n) {
  var p = n * 0.11;
  return n + p;
}
function k(n) {
  var p = n * 0.11;
  return n + p;
}
if (r == 80) {
  console.log("bagus");
}
console.log(g(r));
