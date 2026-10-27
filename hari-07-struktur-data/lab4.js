var d = [80, 65, 90];
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
var r = f(d);
if (r == 80) {
  console.log("bagus");
}
function h(n) {
  var p = n * 0.11;
  return n + p;
}
function k(n) {
  var p = n * 0.11;
  return n + p;
}
console.log(g(r));
//buat versi baik dari kode di atas, misal dengan menambahkan komentar, memberi nama variabel yang jelas, dan memisahkan fungsi menjadi beberapa baris.
var scores = [80, 65, 90];

// Fungsi untuk menghitung rata-rata dari array
function calculateAverage(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

// Fungsi untuk menentukan grade berdasarkan nilai rata-rata
function determineGrade(averageScore) {
  if (averageScore >= 85) {
    return "A";
  } else if (averageScore >= 70) {
    return "B";
  } else if (averageScore >= 55) {
    return "C";
  } else {
    return "D";
  }
}

if (average == 80) {
  console.log("bagus");
}
var average = calculateAverage(scores);
console.log(determineGrade(average));
