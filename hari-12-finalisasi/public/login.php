<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

// Sudah login: langsung ke daftar. (Dipertahankan dari login Hari 9.)
if (isset($_SESSION['admin_id'])) {
    redirect('index.php');
}

$galat = '';
$username = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cekCsrf();
    $gagal = $_SESSION['gagal_login'] ?? 0;

    if ($gagal >= 5) {
        $galat = 'Terlalu banyak percobaan. Coba lagi nanti.';
    } elseif (prosesLogin(getConnection(), trim((string) ($_POST['username'] ?? '')), (string) ($_POST['sandi'] ?? ''))) {
        unset($_SESSION['gagal_login']);
        redirect('index.php');
    } else {
        $_SESSION['gagal_login'] = $gagal + 1;
        $galat = 'Username atau kata sandi salah.';
    }

    $username = trim((string) ($_POST['username'] ?? ''));
}

$judul = 'Login Admin';
require __DIR__ . '/../templates/header.php';
?>
<div class="row justify-content-center">
    <div class="col-md-5">
        <div class="card">
            <div class="card-body">
                <h2 class="h4">Login Admin</h2>
                <?php if (($_GET['status'] ?? '') === 'logout'): ?>
                    <div class="alert alert-info">Anda sudah logout.</div>
                <?php endif; ?>
                <?php if ($galat !== ''): ?>
                    <div class="alert alert-danger"><?= e($galat) ?></div>
                <?php endif; ?>
                <form method="post">
                    <input type="hidden" name="csrf" value="<?= e(tokenCsrf()) ?>">
                    <div class="mb-3">
                        <label class="form-label" for="username">Username</label>
                        <input class="form-control" id="username" name="username" autocomplete="username" value="<?= e($username) ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="sandi">Kata sandi</label>
                        <input class="form-control" id="sandi" name="sandi" type="password" autocomplete="current-password">
                    </div>
                    <button class="btn btn-primary" type="submit">Masuk</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php require __DIR__ . '/../templates/footer.php'; ?>