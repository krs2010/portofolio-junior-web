<?php

declare(strict_types=1);

/**
 * Mengamankan teks untuk ditampilkan di HTML.
 *
 * @param string|null $teks Teks mentah, null dianggap string kosong.
 *
 * @return string Teks yang sudah di-escape (tanda petik ikut di-escape).
 */
function e(?string $teks): string
{
    return htmlspecialchars($teks ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Mengalihkan browser ke halaman lain dan menghentikan skrip.
 *
 * @param string $url Tujuan redirect, mis. 'login.php'.
 *
 * @return never Fungsi ini tidak pernah kembali karena memanggil exit.
 */
function redirect(string $url): never
{
    header('Location: ' . $url);
    exit;
}

/**
 * Mengambil token CSRF dari sesi, membuatnya bila belum ada.
 *
 * @return string Token acak 64 karakter heksadesimal.
 */
function tokenCsrf(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

/**
 * Memeriksa token CSRF yang dikirim form POST.
 *
 * Token dibandingkan dengan hash_equals agar tidak bocor lewat
 * perbandingan waktu. Fungsi ini tidak melempar exception: bila token
 * tidak cocok, eksekusi dihentikan dengan status 403.
 * Pemulihan: muat ulang halaman form untuk mendapat token baru,
 * lalu kirim ulang.
 *
 * @return void
 */
function cekCsrf(): void
{
    $kiriman = (string) ($_POST['csrf'] ?? '');

    if (!hash_equals($_SESSION['csrf'] ?? '', $kiriman)) {
        http_response_code(403);
        exit('Permintaan tidak valid.');
    }
}

/**
 * Menyimpan satu pesan flash ke sesi untuk ditampilkan di halaman berikut.
 *
 * @param string $pesan Pesan yang akan ditampilkan sekali saja.
 *
 * @return void
 */
function setFlash(string $pesan): void
{
    $_SESSION['flash'] = $pesan;
}

/**
 * Mengambil pesan flash dari sesi dan langsung menghapusnya.
 *
 * Karena dihapus setelah dibaca, pesan hanya tampil sekali.
 *
 * @return string|null Pesan flash, atau null bila tidak ada pesan.
 */
function ambilFlash(): ?string
{
    $pesan = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);

    return $pesan;
}
