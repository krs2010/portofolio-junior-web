<?php

declare(strict_types=1);

$jalurLog = __DIR__ . '/data/log.txt';

// Berkas belum ada (misalnya cari.php belum pernah dibuka): bukan error,
// tampilkan pesan saja.
$terakhir = [];

if (file_exists($jalurLog)) {
    $baris = file($jalurLog, FILE_IGNORE_NEW_LINES);
    $terakhir = array_slice(array_reverse($baris), 0, 20);
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Lab 4 - Log Pengunjung</title>
</head>

<body>
    <h1>Lab 4 - 20 Log Pengunjung Terakhir</h1>
    <p><a href="cari.php">Kembali ke pencarian</a></p>

    <?php if ($terakhir === []): ?>
        <p>Belum ada log pengunjung.</p>
    <?php else: ?>
        <ol>
            <?php foreach ($terakhir as $baris): ?>
                <li><?= htmlspecialchars($baris, ENT_QUOTES, 'UTF-8') ?></li>
            <?php endforeach; ?>
        </ol>
    <?php endif; ?>
</body>

</html>