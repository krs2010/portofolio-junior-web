<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

// Sudah login: langsung ke daftar.
if (isset($_SESSION['admin_id'])) {
    redirect('index.php');
}

$pdo = getConnection();
$username = '';
$galat = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cekCsrf();
    $username = trim((string) ($_POST['username'] ?? ''));
    $sandi = (string) ($_POST['password'] ?? '');

    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin WHERE username = :username');
    $stmt->execute(['username' => $username]);
    $admin = $stmt->fetch();

    if ($admin !== false && password_verify($sandi, $admin['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        setFlash('Login berhasil.');
        redirect('index.php');
    }

    $galat = 'Username atau kata sandi salah.';
}

$judul = 'Login Admin';
require __DIR__ . '/../templates/header.php';
?>
<?php if (($_GET['status'] ?? '') === 'logout'): ?>
    <p role="status">Anda sudah logout.</p>
<?php endif; ?>
<form method="post">
    <input type="hidden" name="csrf" value="<?= e(tokenCsrf()) ?>">
    <p>
        <label for="username">Username</label><br>
        <input id="username" name="username" value="<?= e($username) ?>">
    </p>
    <p>
        <label for="password">Kata Sandi</label><br>
        <input id="password" name="password" type="password">
    </p>
    <?php if ($galat !== ''): ?>
        <p role="alert"><?= e($galat) ?></p>
    <?php endif; ?>
    <button type="submit">Login</button>
</form>
<?php require __DIR__ . '/../templates/footer.php'; ?>