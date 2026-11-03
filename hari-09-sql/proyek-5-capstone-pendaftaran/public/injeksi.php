<?php

declare(strict_types=1);

// Lab 2 - Demonstrasi SQL Injection.
// HANYA untuk latihan di localhost. Versi berbahaya di bawah ini
// TIDAK BOLEH dipakai di CRUD asli, apalagi di hosting.
// Data di database ini hanya data contoh dari latihan.sql.

require_once __DIR__ . '/../src/bootstrap.php';

$pdo = getConnection();
$email = (string) ($_GET['email'] ?? '');
$hasilBerbahaya = [];
$hasilAman = [];

if ($email !== '') {
    // BERBAHAYA: input disambung langsung ke query.
    // ?email=x' OR '1'='1 membuat kondisi selalu benar,
    // sehingga semua baris tampil walau email itu tidak ada.
    $sqlBerbahaya = "SELECT id, nama, email FROM pendaftar WHERE email = '" . $email . "'";
    $hasilBerbahaya = $pdo->query($sqlBerbahaya)->fetchAll();

    // AMAN: prepared statement, data dikirim terpisah dari perintah SQL.
    // Input yang sama diperlakukan sebagai SATU nilai email utuh,
    // bukan sebagai kode SQL, jadi tidak ada baris yang cocok.
    $stmt = $pdo->prepare('SELECT id, nama, email FROM pendaftar WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $hasilAman = $stmt->fetchAll();
}

$judul = 'Demo SQL Injection';
require __DIR__ . '/../templates/header.php';
?>
<p><strong>Hanya latihan lokal.</strong> Coba buka dengan:
    <code>?email=x' OR '1'='1</code>
</p>
<form method="get">
    <label for="email">Email</label>
    <input id="email" name="email" value="<?= e($email) ?>">
    <button type="submit">Cari</button>
</form>
<?php if ($email !== ''): ?>
    <h2>Versi berbahaya: <?= count($hasilBerbahaya) ?> baris</h2>
    <?php foreach ($hasilBerbahaya as $b): ?>
        <p><?= e($b['nama']) ?> - <?= e($b['email']) ?></p>
    <?php endforeach; ?>
    <h2>Versi aman: <?= count($hasilAman) ?> baris</h2>
    <?php if ($hasilAman === []): ?>
        <p>Tidak ada data. Input diperlakukan sebagai nilai email, bukan kode SQL.</p>
    <?php else: ?>
        <?php foreach ($hasilAman as $b): ?>
            <p><?= e($b['nama']) ?> - <?= e($b['email']) ?></p>
        <?php endforeach; ?>
    <?php endif; ?>
    <h2>Kenapa versi aman tidak terpengaruh?</h2>
    <p>
        Pada prepared statement, placeholder <code>:email</code> hanya untuk nilai.
        Database menerima perintah SQL dan datanya secara terpisah, sehingga tanda
        petik dan <code>OR '1'='1</code> di dalam input tidak pernah dibaca sebagai
        perintah. Input itu hanya dicari apa adanya sebagai satu alamat email.
    </p>
<?php endif; ?>
<?php require __DIR__ . '/../templates/footer.php'; ?>