<?php
declare(strict_types=1);

$nilai = ['Sari' => 90, 'Budi' => 68, 'Citra' => 82, 'Dewi' => 70, 'Eko' => 60];

function hitungRataRata(array $daftar): float
{
    $total = 0;
    foreach ($daftar as $n) {
        //var_dump($n); //cek tipe data
        $total += $n;
    }
    return $total / (count($daftar));
}
function hitungLulus(array $daftar): int
{
    $lulus = 0;
    foreach ($daftar as $nama => $n) {
        if ($n >= 70) {
            $lulus++;
        }
    }
    return $lulus;
}

header('X-Debug: selesai');
echo 'Rata-rata: ' . hitungRataRata($nilai) . '<br>';
echo 'Lulus: ' . hitungLulus($nilai) . '<br>';
echo 'Nilai Eko: ' . $nilai['Eko'];