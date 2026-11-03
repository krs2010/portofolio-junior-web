<?php /* templates/header.php */ ?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($judul ?? 'Pendaftaran Pelatihan') ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
</head>

<body class="bg-light">
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">Pendaftaran Pelatihan</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Buka menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.php">Daftar</a></li>
                    <li class="nav-item"><a class="nav-link" href="tambah.php">Tambah</a></li>
                    <?php if (isset($_SESSION['admin_id'])): ?>
                        <li class="nav-item">
                            <form method="post" action="logout.php" class="d-inline">
                                <input type="hidden" name="csrf" value="<?= e(tokenCsrf()) ?>">
                                <button type="submit" class="btn btn-link nav-link">Keluar</button>
                            </form>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>
    <main class="container py-4">
        <?php if ($pesan = ambilFlash()): ?>
            <div id="flash" class="d-none" data-pesan="<?= e($pesan) ?>"></div>
        <?php endif; ?>