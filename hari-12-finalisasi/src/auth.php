<?php

/**
 * Modul : Auth (src/auth.php)
 * ID Modul : MOD-AUT-001
 * Deskripsi : Autentikasi admin berbasis sesi dan password_hash.
 * Dependensi: config/database.php (PDO), src/helpers.php
 *
 * @package PendaftaranPelatihan
 * @author Defry Arhinsa
 * @version 1.0.1
 * @since 1.0.0
 */

declare(strict_types=1);

/**
 * Mengambil satu admin berdasarkan username.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $username Username yang dicari, harus sama persis.
 *
 * @return array<string, mixed>|null Baris admin (id, username, password_hash),
 *   atau null bila username tidak ditemukan.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function cariAdmin(PDO $pdo, string $username): ?array
{
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin WHERE username = :u');
    $stmt->execute(['u' => $username]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

/**
 * Memproses login admin.
 *
 * Username yang tidak ada dan sandi yang salah sama-sama mengembalikan
 * false, supaya penyerang tidak bisa menebak username yang ada.
 * Bila berhasil, ID sesi diregenerasi dan sesi admin diisi.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $username Username, sudah di-trim oleh pemanggil.
 * @param string $sandi Kata sandi mentah dari form; tidak pernah disimpan,
 *   hanya diverifikasi dengan password_verify().
 *
 * @return bool True bila login berhasil, false bila username tidak ada
 *   atau sandi salah.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function prosesLogin(PDO $pdo, string $username, string $sandi): bool
{
    $admin = cariAdmin($pdo, $username);

    // Lab 12: sengaja tidak dibedakan — username tidak ada dan sandi salah
    // sama-sama false, supaya penyerang tidak bisa menebak username yang ada.
    if ($admin === null || !password_verify($sandi, $admin['password_hash'])) {
        return false;
    }

    // Lab 12: regenerasi ID sesi saat login agar ID sesi lama (mis. yang
    // sudah diketahui penyerang sebelum login) tidak bisa dipakai lagi.
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    // Dipertahankan dari login Hari 9 (modul hanya menyimpan admin_id).
    $_SESSION['admin_username'] = $admin['username'];

    return true;
}

/**
 * Memastikan pengunjung sudah login sebagai admin.
 *
 * Bila belum login, pengunjung dialihkan ke login.php dan skrip berhenti
 * (lewat redirect(), bukan lewat exception).
 *
 * @return void
 */
function wajibLogin(): void
{
    if (empty($_SESSION['admin_id'])) {
        redirect('login.php');
    }
}

/**
 * Mengeluarkan admin: mengosongkan sesi, menghapus cookie sesi,
 * dan menghancurkan sesi.
 *
 * @return void
 */
function logout(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }

    session_destroy();
}
