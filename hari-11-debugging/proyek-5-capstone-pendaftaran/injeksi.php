<?php
declare(strict_types=1);

// Memanggil file koneksi yang sudah ada (sesuaikan nama file jika berbeda)
require_once __DIR__ . '/config/database.php'; 

$pdo = getConnection();
$inputEmail = $_GET['email'] ?? '';

echo "<!DOCTYPE html><html lang='id'><head><meta charset='UTF-8'><title>Test SQL Injection</title></head><body style='font-family: Arial, sans-serif; padding: 20px;'>";
echo "<h1>Demonstrasi SQL Injection</h1>";
echo "<p>Input Payload: <strong><code>" . htmlspecialchars($inputEmail) . "</code></strong></p><hr>";

// ==========================================
// 1. VERSI BERBAHAYA (String Concatenation)
// ==========================================
echo "<h2>1. Versi Berbahaya (Tidak Aman)</h2>";
try {
    // Input digabungkan langsung ke dalam struktur query SQL
    $sqlRentan = "SELECT * FROM pendaftar WHERE email = '$inputEmail'";
    echo "<p>Query yang dieksekusi: <br><code>" . htmlspecialchars($sqlRentan) . "</code></p>";

    // Menggunakan query() langsung mengeksekusi string SQL yang sudah dimanipulasi
    $stmtRentan = $pdo->query($sqlRentan);
    $hasilRentan = $stmtRentan->fetchAll();

    echo "<p style='color: red;'>Ditemukan <strong>" . count($hasilRentan) . "</strong> data.</p>";
    echo "<ul>";
    foreach ($hasilRentan as $baris) {
        echo "<li>" . htmlspecialchars($baris['nama']) . " - " . htmlspecialchars($baris['email']) . "</li>";
    }
    echo "</ul>";
} catch (PDOException $e) {
    echo "<p style='color: red;'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "<hr>";

// ==========================================
// 2. VERSI AMAN (Prepared Statements)
// ==========================================
echo "<h2>2. Versi Aman (Prepared Statements)</h2>";
try {
    // Struktur SQL dipisahkan dari input menggunakan placeholder (?)[cite: 7]
    $sqlAman = "SELECT * FROM pendaftar WHERE email = ?";
    echo "<p>Query yang dieksekusi: <br><code>SELECT * FROM pendaftar WHERE email = ?</code> <em>(Binding Data Terpisah)</em></p>";

    // Input dikirim secara aman pada saat eksekusi
    $stmtAman = $pdo->prepare($sqlAman);
    $stmtAman->execute([$inputEmail]);
    $hasilAman = $stmtAman->fetchAll();

    echo "<p style='color: green;'>Ditemukan <strong>" . count($hasilAman) . "</strong> data.</p>";
    if (count($hasilAman) === 0) {
         echo "<p><em>Tidak ada data yang cocok dengan email tersebut.</em></p>";
    } else {
        echo "<ul>";
        foreach ($hasilAman as $baris) {
            echo "<li>" . htmlspecialchars($baris['nama']) . " - " . htmlspecialchars($baris['email']) . "</li>";
        }
        echo "</ul>";
    }
} catch (PDOException $e) {
    echo "<p style='color: red;'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "</body></html>";
//http://localhost/injeksi.php?email=x' OR '1'='1