<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

// Halaman pendaftaran publik: tanpa login (PBL Sprint 1 no. 5).

$pdo = getConnection();
$kelas = daftarKelas($pdo);
$lama = ['nama' => '', 'email' => '', 'no_hp' => '', 'alamat' => '', 'kelas_id' => 0];
$galat = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cekCsrf();
    $hasil = validasiPendaftar($_POST, $pdo, null);
    $lama = $hasil['data'];
    $galat = $hasil['galat'];

    if ($galat === []) {
        tambahPendaftar($pdo, $lama);
        setFlash('Pendaftaran berhasil. Terima kasih!');
        redirect('daftar.php');
    }
}

$judul = 'Pendaftaran Peserta';
$kembali = 'daftar.php';
require __DIR__ . '/../templates/header.php';
?>
<h1 class="h4 mb-3">Pendaftaran Peserta</h1>
<p class="text-muted">Formulir ini terbuka untuk peserta, tanpa login.</p>
<?php
require __DIR__ . '/_form.php';
require __DIR__ . '/../templates/footer.php';
