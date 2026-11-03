<?php

declare(strict_types=1);

/**
 * Memeriksa format nomor HP.
 *
 * @param string $noHp Nomor HP yang diperiksa.
 *
 * @return bool True bila diawali 08 dan total 10-13 digit, false bila tidak.
 */
function validNoHp(string $noHp): bool
{
    return preg_match('/^08[0-9]{8,11}$/', $noHp) === 1;
}

/**
 * Menghitung sisa kuota kelas untuk ditampilkan di form.
 *
 * @param int $kuota Kuota total kelas.
 * @param int $terisi Jumlah pendaftar yang sudah terdaftar di kelas itu.
 *
 * @return int Sisa kuota, tidak pernah negatif.
 */
function hitungSisaKuota(int $kuota, int $terisi): int
{
    // Lab 12: angka ini hanya untuk tampilan di form. max(0, ...) menjaga
    // sisa tidak tampil negatif bila data lama terisi melebihi kuota.
    // Keputusan kuota yang mengikat tetap di daftarkanDenganKuota()
    // (transaksi + FOR UPDATE), bukan di angka tampilan ini.
    return max(0, $kuota - $terisi);
}

/**
 * Memformat nomor bukti pendaftaran.
 *
 * @param int $tahun Tahun pendaftaran, mis. 2026.
 * @param int $id ID pendaftar di database.
 *
 * @return string Nomor bukti, mis. 'REG-2026-000123'.
 */
function formatNomorBukti(int $tahun, int $id): string
{
    return sprintf('REG-%d-%06d', $tahun, $id);
}
