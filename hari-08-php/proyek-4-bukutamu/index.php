<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$galat = [];
$lama = ['nama' => '', 'email' => '', 'pesan' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hasil = validasiTamu($_POST);
    $lama = $hasil['data'];
    $galat = $hasil['galat'];

    if ($galat === []) {
        if (simpanTamu($hasil['data'])) {
            // Pola PRG: arahkan ke GET supaya refresh tidak mengirim ulang form.
            header('Location: index.php?status=sukses');
            exit;
        }

        $galat['umum'] = 'Gagal menyimpan data. Silakan coba lagi.';
    }
}

$kata = trim((string) ($_GET['q'] ?? ''));
$daftarTamu = array_reverse(cariTamu(ambilSemuaTamu(), $kata));
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Buku Tamu</title>
</head>

<body>
    <h1>Buku Tamu</h1>

    <?php if (($_GET['status'] ?? '') === 'sukses'): ?>
        <p role="status">Terima kasih, pesan Anda sudah tersimpan.</p>
    <?php endif; ?>

    <?php if (isset($galat['umum'])): ?>
        <p role="alert"><?= e($galat['umum']) ?></p>
    <?php endif; ?>

    <form method="post" action="index.php">
        <p>
            <label for="nama">Nama</label><br>
            <input id="nama" name="nama" value="<?= e($lama['nama']) ?>">
            <?php if (isset($galat['nama'])): ?><span><?= e($galat['nama']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for="email">Email</label><br>
            <input id="email" name="email" type="email" value="<?= e($lama['email']) ?>">
            <?php if (isset($galat['email'])): ?><span><?= e($galat['email']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for="pesan">Pesan</label><br>
            <textarea id="pesan" name="pesan" rows="4"><?= e($lama['pesan']) ?></textarea>
            <?php if (isset($galat['pesan'])): ?><span><?= e($galat['pesan']) ?></span><?php endif; ?>
        </p>
        <button type="submit">Kirim</button>
    </form>

    <h2>Daftar Tamu</h2>
    <form method="get" action="index.php">
        <label for="q">Cari nama</label>
        <input id="q" name="q" value="<?= e($kata) ?>">
        <button type="submit">Cari</button>
    </form>

    <?php if ($daftarTamu === []): ?>
        <p>Belum ada data.</p>
    <?php else: ?>
        <?php foreach ($daftarTamu as $tamu): ?>
            <article>
                <h3><?= e($tamu['nama']) ?></h3>
                <p><small><?= e($tamu['waktu']) ?></small></p>
                <p><?= nl2br(e($tamu['pesan'])) ?></p>
            </article>
        <?php endforeach; ?>
    <?php endif; ?>
</body>

</html>