<?php /* templates/header.php */ ?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($judul ?? 'Pendaftaran Pelatihan') ?></title>
</head>

<body>
    <header>
        <h1>Pendaftaran Pelatihan</h1>
        <nav><a href="index.php">Daftar</a> | <a href="tambah.php">Tambah</a><?php if (isset($_SESSION['admin_id'])): ?> | <a href="logout.php">Logout</a><?php endif; ?></nav>
    </header>
    <main>
        <?php if ($pesan = ambilFlash()): ?>
            <p role="status"><?= e($pesan) ?></p>
        <?php endif; ?>