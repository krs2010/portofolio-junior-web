<?php

declare(strict_types=1);

$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

/**
 * Menghitung rata-rata nilai peserta.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $daftar
 */
function hitungRataRata(array $daftar): float
{
    if ($daftar === []) {
        return 0.0;
    }

    return array_sum(array_column($daftar, 'nilai')) / count($daftar);
}

/**
 * Mencari peserta dengan nilai tertinggi, atau null bila daftar kosong.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $daftar
 * @return array{nama: string, kelas: string, nilai: int}|null
 */
function cariTertinggi(array $daftar): ?array
{
    if ($daftar === []) {
        return null;
    }

    $tertinggi = $daftar[0];

    foreach ($daftar as $p) {
        if ($p['nilai'] > $tertinggi['nilai']) {
            $tertinggi = $p;
        }
    }

    return $tertinggi;
}

/**
 * Menyaring peserta yang nilainya mencapai batas kelulusan.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $peserta
 * @return array<int, array{nama: string, kelas: string, nilai: int}>
 */
function filterLulus(array $peserta, int $batas = 70): array
{
    return array_values(array_filter(
        $peserta,
        fn(array $p): bool => $p['nilai'] >= $batas
    ));
}

/**
 * Mengurutkan peserta berdasarkan nilai menurun.
 * Mengembalikan salinan, daftar asli tidak diubah.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $peserta
 * @return array<int, array{nama: string, kelas: string, nilai: int}>
 */
function urutkanNilai(array $peserta): array
{
    $salinan = $peserta;

    usort($salinan, fn(array $a, array $b): int => $b['nilai'] <=> $a['nilai']);

    return $salinan;
}

/**
 * Mengelompokkan peserta berdasarkan kelas.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $peserta
 * @return array<string, array<int, array{nama: string, kelas: string, nilai: int}>>
 */
function kelompokkanPerKelas(array $peserta): array
{
    $hasil = [];

    foreach ($peserta as $p) {
        $hasil[$p['kelas']][] = $p;
    }

    return $hasil;
}

function tentukanGrade(int $nilai): string
{
    return match (true) {
        $nilai >= 85 => 'A',
        $nilai >= 70 => 'B',
        $nilai >= 55 => 'C',
        default => 'D',
    };
}

$rataRata = hitungRataRata($peserta);
$tertinggi = cariTertinggi($peserta);
$lulus = filterLulus($peserta);
$terurut = urutkanNilai($peserta);
$perKelas = kelompokkanPerKelas($peserta);
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Lab 2 - Fungsi dan Array Asosiatif</title>
</head>

<body>
    <h1>Lab 2 - Fungsi dan Array Asosiatif</h1>

    <h2>Daftar Peserta</h2>
    <table border="1">
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
            <th>Grade</th>
        </tr>
        <?php foreach ($peserta as $indeks => $p): ?>
            <tr>
                <td><?= $indeks + 1 ?></td>
                <td><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= $p['nilai'] ?></td>
                <td><?= tentukanGrade($p['nilai']) ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h2>Ringkasan</h2>
    <p>Rata-rata nilai: <?= $rataRata ?></p>
    <?php if ($tertinggi !== null): ?>
        <p>Nilai tertinggi: <?= htmlspecialchars($tertinggi['nama'], ENT_QUOTES, 'UTF-8') ?> (<?= $tertinggi['nilai'] ?>)</p>
    <?php endif; ?>

    <h2>Peserta Lulus (batas 70)</h2>
    <table border="1">
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
            <th>Grade</th>
        </tr>
        <?php foreach ($lulus as $indeks => $p): ?>
            <tr>
                <td><?= $indeks + 1 ?></td>
                <td><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= $p['nilai'] ?></td>
                <td><?= tentukanGrade($p['nilai']) ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h2>Peserta Terurut (Nilai Menurun)</h2>
    <table border="1">
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
            <th>Grade</th>
        </tr>
        <?php foreach ($terurut as $indeks => $p): ?>
            <tr>
                <td><?= $indeks + 1 ?></td>
                <td><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($p['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= $p['nilai'] ?></td>
                <td><?= tentukanGrade($p['nilai']) ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h2>Peserta per Kelas</h2>
    <?php foreach ($perKelas as $kelas => $daftar): ?>
        <h3>Kelas <?= htmlspecialchars($kelas, ENT_QUOTES, 'UTF-8') ?></h3>
        <ul>
            <?php foreach ($daftar as $p): ?>
                <li><?= htmlspecialchars($p['nama'], ENT_QUOTES, 'UTF-8') ?> (<?= $p['nilai'] ?>)</li>
            <?php endforeach; ?>
        </ul>
    <?php endforeach; ?>
</body>

</html>