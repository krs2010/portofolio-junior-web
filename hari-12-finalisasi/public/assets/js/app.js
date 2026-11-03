/**
 * Handler utama halaman, dijalankan setelah DOM siap.
 *
 * Memasang tiga hal: toast flash (bila ada elemen #flash), konfirmasi
 * hapus untuk setiap form .form-hapus, dan DataTables untuk tabel
 * #tabelPendaftar (bila ada dan jQuery tersedia).
 *
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  // Notifikasi flash (toast)
  const flash = document.getElementById("flash");
  if (flash) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: flash.dataset.pesan,
      showConfirmButton: false,
      timer: 3000,
    });
  }

  // Konfirmasi hapus
  /**
   * Memasang konfirmasi hapus pada satu form hapus.
   *
   * @param {HTMLFormElement} form - Form hapus, namanya diambil dari
   *   atribut data-nama untuk ditampilkan di dialog konfirmasi.
   * @returns {void}
   */
  document.querySelectorAll(".form-hapus").forEach((form) => {
    /**
     * Menahan submit form, lalu menampilkan dialog konfirmasi.
     * Form hanya benar-benar dikirim bila pengguna menekan 'Ya, hapus'.
     *
     * @param {SubmitEvent} event - Event submit form yang ditahan.
     * @returns {void}
     */
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      Swal.fire({
        title: "Hapus data?",
        text: `Data ${form.dataset.nama} akan dihapus permanen.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
      }).then(
        /**
         * Melanjutkan submit hanya bila dialog dikonfirmasi.
         *
         * @param {object} hasil - Hasil dialog SweetAlert2;
         *   properti isConfirmed bernilai true bila pengguna
         *   menekan 'Ya, hapus'.
         * @returns {void}
         * @example
         * // hasil.isConfirmed === true  -> form.submit()
         * // hasil.isConfirmed === false -> tidak terjadi apa-apa
         */
        (hasil) => {
          if (hasil.isConfirmed) form.submit();
        },
      );
    });
  });

  // DataTables (Lab 4)
  const tabel = document.getElementById("tabelPendaftar");
  if (tabel && window.jQuery) {
    window.jQuery(tabel).DataTable({
      pageLength: 10,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/id.json",
      },
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  }
});
