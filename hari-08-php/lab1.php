<?php

declare(strict_types=1);

date_default_timezone_set('Asia/Jakarta');

// 2. Variabel: nama, umur, dan status
$nama = 'Defry Arhinsa';
$umur = 24;
$status = 'Peserta Diklat';

// 5. Kalender sederhana: nama hari berbahasa Indonesia
$hariIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
$hariIni = $hariIndonesia[(int) date('w')];
$tanggalHariIni = date('d-m-Y');
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>PHP Dasar - Hari 8</title>
</head>

<body>
    <h1>PHP Dasar</h1>

    <h2>Data Diri</h2>
    <p>Nama: <?= htmlspecialchars($nama, ENT_QUOTES, 'UTF-8') ?></p>
    <p>Umur: <?= $umur ?> tahun</p>
    <p>Status: <?= htmlspecialchars($status, ENT_QUOTES, 'UTF-8') ?></p>
    <pre><?php var_dump($nama); ?></pre>
    <pre><?php var_dump($umur); ?></pre>
    <pre><?php var_dump($status); ?></pre>

    <h2>Tabel Perkalian 1 sampai 10</h2>
    <table border="1">
        <tr>
            <th>x</th>
            <?php for ($i = 1; $i <= 10; $i++): ?>
                <th><?= $i ?></th>
            <?php endfor; ?>
        </tr>
        <?php for ($i = 1; $i <= 10; $i++): ?>
            <tr>
                <th><?= $i ?></th>
                <?php for ($j = 1; $j <= 10; $j++): ?>
                    <td><?= $i * $j ?></td>
                <?php endfor; ?>
            </tr>
        <?php endfor; ?>
    </table>

    <h2>Bilangan Ganjil / Genap 1 sampai 20</h2>
    <ul>
        <?php for ($i = 1; $i <= 20; $i++): ?>
            <li><?= $i ?> = <?= ($i % 2 === 0) ? 'Genap' : 'Ganjil' ?></li>
        <?php endfor; ?>
    </ul>

    <h2>FizzBuzz 1 sampai 30</h2>
    <ul>
        <?php for ($i = 1; $i <= 30; $i++): ?>
            <li>
                <?php
                if ($i % 3 === 0 && $i % 5 === 0) {
                    echo 'FizzBuzz';
                } elseif ($i % 3 === 0) {
                    echo 'Fizz';
                } elseif ($i % 5 === 0) {
                    echo 'Buzz';
                } else {
                    echo $i;
                }
                ?>
            </li>
        <?php endfor; ?>
    </ul>

    <h2>Konversi Nilai ke Grade</h2>
    <table border="1">
        <tr>
            <th>Nilai</th>
            <th>Grade</th>
        </tr>
        <?php foreach ([90, 78, 60, 40] as $nilai): ?>
            <?php
            $grade = match (true) {
                $nilai >= 85 => 'A',
                $nilai >= 70 => 'B',
                $nilai >= 55 => 'C',
                default => 'D',
            };
            ?>
            <tr>
                <td><?= $nilai ?></td>
                <td><?= $grade ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h2>Kalender Sederhana</h2>
    <p>Hari ini: <?= htmlspecialchars($hariIni, ENT_QUOTES, 'UTF-8') ?>, <?= $tanggalHariIni ?></p>
</body>

</html>