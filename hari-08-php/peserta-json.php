<?php

declare(strict_types=1);

$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

$folderData = __DIR__ . '/data';

if (!is_dir($folderData)) {
    mkdir($folderData, 0777, true);
}

$jalurJson = $folderData . '/peserta.json';
$pesan = '';

// 1. Simpan array peserta ke JSON.
file_put_contents($jalurJson, json_encode($peserta, JSON_PRETTY_PRINT));

// 2. Baca kembali. Berkas tidak ada atau JSON rusak ditangani, bukan dibiarkan error.
$terbaca = $peserta;

if (!file_exists($jalurJson)) {
    $pesan = 'Berkas peserta.json tidak ditemukan, memakai data awal.';
} else {
    $isi = file_get_contents($jalurJson);
    $hasil = json_decode($isi, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        $pesan = 'JSON rusak (' . json_last_error_msg() . '), memakai data awal.';
    } else {
        $terbaca = $hasil;
    }
}

// 3. Tambahkan satu peserta, lalu simpan ulang.
$terbaca[] = ['nama' => 'Dewi', 'kelas' => 'Data', 'nilai' => 75];
file_put_contents($jalurJson, json_encode($terbaca, JSON_PRETTY_PRINT));
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Lab 4 - Peserta JSON</title>
</head>

<body>
    <h1>Lab 4 - Simpan dan Baca JSON</h1>
    <?php if ($pesan !== ''): ?>
        <p><?= htmlspecialchars($pesan, ENT_QUOTES, 'UTF-8') ?></p>
    <?php endif; ?>

    <h2>Sebelum ditambah (<?= count($peserta) ?> peserta)</h2>
    <ul>
        <?php foreach ($peserta as $p): ?>
            <li><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?> - <?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?> (<?= $p['nilai'] ?>)</li>
        <?php endforeach; ?>
    </ul>

    <h2>Sesudah ditambah (<?= count($terbaca) ?> peserta)</h2>
    <ul>
        <?php foreach ($terbaca as $p): ?>
            <li><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?> - <?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?> (<?= $p['nilai'] ?>)</li>
        <?php endforeach; ?>
    </ul>
    <p>Data tersimpan di data/peserta.json.</p>
</body>

</html>