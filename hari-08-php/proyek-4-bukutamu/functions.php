<?php

declare(strict_types=1);

const FILE_TAMU = __DIR__ . '/data/tamu.json';
const MAKS_PESAN = 500;

/**
 * Escape output HTML (mencegah XSS).
 */
function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

/**
 * Rapikan spasi: spasi berlebih di dalam teks jadi satu spasi, tepi dibuang.
 */
function bersihkanSpasi(string $teks): string
{
    return trim((string) preg_replace('/\s+/', ' ', $teks));
}

/**
 * Memvalidasi input buku tamu.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @return array{data: array<string, string>, galat: array<string, string>}
 */
function validasiTamu(array $input): array
{
    $data = [
        'nama' => bersihkanSpasi((string) ($input['nama'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'pesan' => trim((string) ($input['pesan'] ?? '')),
    ];

    $galat = [];

    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    }

    $panjang = mb_strlen($data['pesan']);

    if ($panjang === 0 || $panjang > MAKS_PESAN) {
        $galat['pesan'] = 'Pesan wajib diisi, maksimal ' . MAKS_PESAN . ' karakter.';
    }

    return ['data' => $data, 'galat' => $galat];
}

/**
 * Membaca semua tamu dari data/tamu.json.
 * Berkas belum ada atau isinya rusak: kembalikan daftar kosong.
 *
 * @return array<int, array<string, mixed>>
 */
function ambilSemuaTamu(): array
{
    if (!file_exists(FILE_TAMU)) {
        return [];
    }

    $isi = file_get_contents(FILE_TAMU);
    $daftar = json_decode($isi === false ? '[]' : $isi, true);

    return is_array($daftar) ? $daftar : [];
}

/**
 * Menyimpan satu tamu ke data/tamu.json.
 * Folder data/ dibuat otomatis bila belum ada.
 */
function simpanTamu(array $data): bool
{
    $folder = dirname(FILE_TAMU);

    if (!is_dir($folder) && !mkdir($folder, 0755, true)) {
        return false;
    }

    $daftar = ambilSemuaTamu();
    $data['id'] = $daftar === [] ? 1 : max(array_column($daftar, 'id')) + 1;
    $data['waktu'] = date('Y-m-d H:i:s');
    $daftar[] = $data;

    $json = json_encode($daftar, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    return $json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false;
}

/**
 * Menyaring daftar tamu berdasarkan sebagian nama (tanpa peka huruf besar-kecil).
 * Kata kunci kosong: kembalikan semua.
 *
 * @param array<int, array<string, mixed>> $daftar
 * @return array<int, array<string, mixed>>
 */
function cariTamu(array $daftar, string $kata): array
{
    if ($kata === '') {
        return $daftar;
    }

    return array_values(array_filter(
        $daftar,
        fn(array $tamu): bool => stripos($tamu['nama'], $kata) !== false
    ));
}
