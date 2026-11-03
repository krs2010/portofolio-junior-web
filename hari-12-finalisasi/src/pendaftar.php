<?php

/**
 * Modul : Pendaftar (src/pendaftar.php)
 * ID Modul : MOD-PND-001
 * Deskripsi : Akses data, validasi, dan aturan kuota untuk pendaftar pelatihan.
 * Dependensi: config/database.php (PDO), src/helpers.php
 *
 * @package PendaftaranPelatihan
 * @author Defry Arhinsa
 * @version 1.1.1
 * @since 1.0.0
 */

declare(strict_types=1);

/**
 * Mengambil semua kelas beserta kuota dan jumlah pendaftarnya.
 *
 * @param PDO $pdo Koneksi database aktif.
 *
 * @return array<int, array<string, mixed>> Daftar kelas, tiap baris berisi
 *   id, nama_kelas, kuota, dan terisi; diurutkan berdasarkan nama kelas.
 *   Kelas yang belum ada pendaftarnya tetap tampil dengan terisi 0.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function daftarKelas(PDO $pdo): array
{
    // Sprint 2: sertakan kuota dan jumlah terisi, supaya _form.php
    // bisa menampilkan sisa kuota tiap kelas.
    // Kolom kuota sudah ada di database/skema.sql sejak Hari 9
    // (Web Programming 30, Desain Grafis 25, Bahasa Inggris 20
    // di database/latihan.sql).
    return $pdo->query('SELECT k.id, k.nama_kelas, k.kuota, COUNT(p.id) AS terisi
        FROM kelas k
        LEFT JOIN pendaftar p ON p.kelas_id = k.id
        GROUP BY k.id, k.nama_kelas, k.kuota
        ORDER BY k.nama_kelas')->fetchAll();
}

/**
 * Menghitung pendaftar yang namanya mengandung kata kunci.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $kata Kata kunci pencarian nama (boleh string kosong,
 *   artinya semua pendaftar dihitung).
 *
 * @return int Jumlah pendaftar yang cocok.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function hitungPendaftar(PDO $pdo, string $kata): int
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE nama LIKE :kata');
    $stmt->execute(['kata' => '%' . $kata . '%']);

    return (int) $stmt->fetchColumn();
}

/**
 * Mengambil satu halaman pendaftar berdasarkan pencarian nama.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $kata Kata kunci pencarian nama.
 * @param int $batas Jumlah baris per halaman.
 * @param int $offset Baris awal halaman (0 untuk halaman pertama).
 *
 * @return array<int, array<string, mixed>> Daftar pendaftar, tiap baris
 *   berisi id, nama, email, no_hp, dan nama_kelas; terbaru dulu.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function ambilPendaftar(PDO $pdo, string $kata, int $batas, int $offset): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, k.nama_kelas
        FROM pendaftar p
        JOIN kelas k ON k.id = p.kelas_id
        WHERE p.nama LIKE :kata
        ORDER BY p.id DESC
        LIMIT :batas OFFSET :offset';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':kata', '%' . $kata . '%');
    $stmt->bindValue(':batas', $batas, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll();
}

/**
 * Mengambil satu pendaftar berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar (minimal 1).
 *
 * @return array<string, mixed>|null Baris pendaftar, atau null bila tidak ditemukan.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function ambilPendaftarById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM pendaftar WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

/**
 * Memeriksa apakah email sudah dipakai pendaftar lain.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $email Email yang diperiksa (sudah di-lowercase oleh pemanggil).
 * @param int|null $kecualiId ID pendaftar yang dikecualikan dari pengecekan,
 *   null saat menambah (tidak ada yang dikecualikan).
 *
 * @return bool True bila email sudah dipakai pendaftar lain, false bila belum.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function emailSudahAda(PDO $pdo, string $email, ?int $kecualiId): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE email = :email AND id <> :id');
    $stmt->execute(['email' => $email, 'id' => $kecualiId ?? 0]);

    return (int) $stmt->fetchColumn() > 0;
}

/**
 * Memvalidasi masukan form pendaftar dan mengembalikan data bersih serta galat.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @param PDO $pdo Koneksi untuk memeriksa email ganda dan kelas.
 * @param int|null $idUbah ID pendaftar yang sedang diubah, null saat
 *   menambah.
 *
 * @return array{data: array<string, mixed>, galat: array<string, string>}
 *   `galat` kosong bila seluruh masukan valid.
 *
 * @throws PDOException Bila query pemeriksaan gagal; ditangani penangan
 *   global di bootstrap.php (halaman 500 generik).
 */
function validasiPendaftar(array $input, PDO $pdo, ?int $idUbah): array
{
    $data = [
        'nama' => trim((string) ($input['nama'] ?? '')),
        'email' => strtolower(trim((string) ($input['email'] ?? ''))),
        'no_hp' => trim((string) ($input['no_hp'] ?? '')),
        'alamat' => trim((string) ($input['alamat'] ?? '')),
        'kelas_id' => (int) ($input['kelas_id'] ?? 0),
    ];

    $galat = [];

    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    } elseif (emailSudahAda($pdo, $data['email'], $idUbah)) {
        $galat['email'] = 'Email sudah terdaftar.';
    }

    if (!preg_match('/^08[0-9]{8,11}$/', $data['no_hp'])) {
        $galat['no_hp'] = 'Nomor HP diawali 08 dan 10-13 digit.';
    }

    // ID dari PDO bisa berupa string, jadi samakan dulu ke int
    // sebelum perbandingan strict, supaya kelas yang valid tidak ditolak.
    $idKelas = array_map('intval', array_column(daftarKelas($pdo), 'id'));
    if (!in_array($data['kelas_id'], $idKelas, true)) {
        $galat['kelas_id'] = 'Pilih kelas yang tersedia.';
    }

    return ['data' => $data, 'galat' => $galat];
}

/**
 * Menambahkan satu pendaftar ke database.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param array<string, mixed> $d Data yang sudah tervalidasi: nama, email,
 *   no_hp, alamat, kelas_id.
 *
 * @return bool True bila INSERT berhasil, false bila gagal.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function tambahPendaftar(PDO $pdo, array $d): bool
{
    $sql = 'INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
        VALUES (:nama, :email, :no_hp, :alamat, :kelas_id)';

    return $pdo->prepare($sql)->execute($d);
}

/**
 * Mengubah data satu pendaftar.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar yang diubah (minimal 1).
 * @param array<string, mixed> $d Data yang sudah tervalidasi: nama, email,
 *   no_hp, alamat, kelas_id.
 *
 * @return bool True bila UPDATE berhasil, false bila gagal.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function ubahPendaftar(PDO $pdo, int $id, array $d): bool
{
    $sql = 'UPDATE pendaftar
        SET nama = :nama, email = :email, no_hp = :no_hp,
            alamat = :alamat, kelas_id = :kelas_id
        WHERE id = :id';

    return $pdo->prepare($sql)->execute($d + ['id' => $id]);
}

/**
 * Menghapus satu pendaftar dari database.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar yang dihapus (minimal 1).
 *
 * @return bool True bila DELETE berhasil, false bila gagal.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function hapusPendaftar(PDO $pdo, int $id): bool
{
    return $pdo->prepare('DELETE FROM pendaftar WHERE id = :id')->execute(['id' => $id]);
}

/**
 * Mengambil semua pendaftar beserta nama kelasnya, terbaru dulu.
 *
 * @param PDO $pdo Koneksi database aktif.
 *
 * @return array<int, array<string, mixed>> Daftar pendaftar, tiap baris
 *   berisi id, nama, email, no_hp, tgl_daftar, dan nama_kelas.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function ambilSemuaPendaftar(PDO $pdo): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
        FROM pendaftar p
        JOIN kelas k ON k.id = p.kelas_id
        ORDER BY p.id DESC';

    return $pdo->query($sql)->fetchAll();
}

/**
 * Mengambil data bukti pendaftaran satu pendaftar.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar (minimal 1).
 *
 * @return array<string, mixed>|null Baris bukti (id, nama, email, no_hp,
 *   tgl_daftar, nama_kelas), atau null bila tidak ditemukan.
 *
 * @throws PDOException Bila query gagal; ditangani penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function ambilBuktiPendaftar(PDO $pdo, int $id): ?array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
        FROM pendaftar p
        JOIN kelas k ON k.id = p.kelas_id
        WHERE p.id = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

// Sprint 2: kuota kelas dengan transaksi.
// Tanpa FOR UPDATE, dua pendaftar bersamaan pada kuota tersisa 1
// bisa sama-sama lolos (race condition). Baris kelas dikunci
// sampai transaksi selesai.
/**
 * Exception yang dilempar bila kelas yang dipilih sudah penuh.
 *
 * Pemulihan: tangkap exception ini di halaman form (daftar.php),
 * tampilkan pesannya sebagai galat di kolom kelas, dan minta peserta
 * memilih kelas lain. Jangan menampilkan halaman 500 untuk kasus ini.
 */
final class KuotaPenuhException extends RuntimeException {}

/**
 * Menambahkan pendaftar baru dengan pemeriksaan kuota kelas.
 *
 * Seluruh proses berjalan dalam satu transaksi dan baris kelas dikunci
 * (FOR UPDATE) agar dua pendaftar serentak tidak melebihi kuota.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param array<string, mixed> $data Data tervalidasi: nama, email, no_hp, alamat,
 *   kelas_id.
 *
 * @return void
 *
 * @throws KuotaPenuhException Bila jumlah pendaftar kelas sudah mencapai kuota.
 *   Pemulihan: tangkap di daftar.php, tampilkan pesan di kolom kelas, dan
 *   minta peserta memilih kelas lain.
 * @throws PDOException Bila terjadi kegagalan query; transaksi dibatalkan
 *   (rollback) dan exception dilempar ulang ke penangan global
 *   di bootstrap.php (halaman 500 generik).
 */
function daftarkanDenganKuota(PDO $pdo, array $data): void
{
    $pdo->beginTransaction();

    try {
        $stmt = $pdo->prepare('SELECT kuota FROM kelas WHERE id = :id FOR UPDATE');
        $stmt->execute(['id' => (int) $data['kelas_id']]);
        $kuota = (int) $stmt->fetchColumn();

        $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE kelas_id = :id');
        $stmt->execute(['id' => (int) $data['kelas_id']]);

        if ((int) $stmt->fetchColumn() >= $kuota) {
            throw new KuotaPenuhException('Kelas sudah penuh.');
        }

        tambahPendaftar($pdo, $data);
        $pdo->commit();
    } catch (Throwable $e) {
        // Lab 12: rollback agar tidak ada data tersimpan sebagian (mis. kuota
        // terhitung tapi pendaftar gagal tersimpan), lalu lempar ulang supaya
        // pemanggil bisa membedakan KuotaPenuhException dari galat lain.
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        throw $e;
    }
}
