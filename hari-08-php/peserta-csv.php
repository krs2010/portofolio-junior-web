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

$jalurCsv = $folderData . '/peserta.csv';

// Ekspor: tulis baris judul lalu satu baris per peserta.
$gagang = fopen($jalurCsv, 'w');
fputcsv($gagang, ['Nama', 'Kelas', 'Nilai']);

foreach ($peserta as $p) {
    fputcsv($gagang, [$p['nama'], $p['kelas'], $p['nilai']]);
}

fclose($gagang);

// Impor kembali: baris pertama adalah judul, jadi dilewati.
$impor = [];
$pesan = '';

if (!file_exists($jalurCsv)) {
    $pesan = 'Berkas peserta.csv tidak ditemukan.';
} else {
    $gagang = fopen($jalurCsv, 'r');
    fgetcsv($gagang);

    while (($baris = fgetcsv($gagang)) !== false) {
        $impor[] = ['nama' => $baris[0], 'kelas' => $baris[1], 'nilai' => $baris[2]];
    }

    fclose($gagang);
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Lab 4 - Peserta CSV</title>
</head>

<body>
    <h1>Lab 4 - Ekspor dan Impor CSV</h1>
    <?php if ($pesan !== ''): ?>
        <p><?= htmlspecialchars($pesan, ENT_QUOTES, 'UTF-8') ?></p>
    <?php endif; ?>

    <h2>Hasil Impor (<?= count($impor) ?> peserta)</h2>
    <table border="1">
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
        </tr>
        <?php foreach ($impor as $indeks => $p): ?>
            <tr>
                <td><?= $indeks + 1 ?></td>
                <td><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= $p['nilai'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
    <p>Data tersimpan di data/peserta.csv.</p>
</body>

</html>