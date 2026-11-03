<?php

declare(strict_types=1);

$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

$q = trim((string) ($_GET['q'] ?? ''));

// Log pengunjung: tiap membuka halaman ini, satu baris ditambahkan.
// Folder data/ dibuat dulu bila belum ada, supaya file_put_contents tidak gagal.
$folderData = __DIR__ . '/data';

if (!is_dir($folderData)) {
    mkdir($folderData, 0777, true);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '-';
$barisLog = date('Y-m-d H:i:s') . ' | ' . $ip . ' | ' . $q . PHP_EOL;
file_put_contents($folderData . '/log.txt', $barisLog, FILE_APPEND | LOCK_EX);

// Pencarian GET: sebagian nama, tanpa peka huruf besar-kecil.
// Kata kunci kosong cocok dengan semua nama (stripos mengembalikan 0, bukan false).
$hasil = array_values(array_filter(
    $peserta,
    fn(array $p): bool => stripos($p['nama'], $q) !== false
));
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Lab 4 - Pencarian Peserta</title>
</head>

<body>
    <h1>Lab 4 - Pencarian Peserta (GET)</h1>
    <form method="get">
        <label for="q">Cari nama</label>
        <input id="q" name="q" value="<?= htmlspecialchars($q, ENT_QUOTES, 'UTF-8') ?>">
        <button type="submit">Cari</button>
    </form>
    <p><a href="lihat-log.php">Lihat 20 log terakhir</a></p>

    <?php if ($hasil === []): ?>
        <p>Tidak ada peserta dengan nama yang mengandung "<?= htmlspecialchars($q, ENT_QUOTES, 'UTF-8') ?>".</p>
    <?php else: ?>
        <table border="1">
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Nilai</th>
            </tr>
            <?php foreach ($hasil as $indeks => $p): ?>
                <tr>
                    <td><?= $indeks + 1 ?></td>
                    <td><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= $p['nilai'] ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>
</body>

</html>