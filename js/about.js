// log.js

document.addEventListener("DOMContentLoaded", function () {
  const addLogButton = document.getElementById("addLogButton");
  const addLogModal = document.getElementById("addLogModal");
  const closeLogModal = document.getElementById("closeLogModal");
  const logForm = document.getElementById("logForm");
  const logTableBody = document.getElementById("logTableBody");

  // Tampilkan modal saat tombol "Tambah Catatan" diklik
  addLogButton.addEventListener("click", function () {
    addLogModal.style.display = "block";
  });

  // Sembunyikan modal saat tombol "×" diklik
  closeLogModal.addEventListener("click", function () {
    addLogModal.style.display = "none";
    logForm.reset(); // Reset form saat modal ditutup
  });

  // Tutup modal jika klik di luar isi modal
  window.addEventListener("click", function (event) {
    if (event.target === addLogModal) {
      addLogModal.style.display = "none";
      logForm.reset();
    }
  });

  // Tangani submit form
  logForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai input
    const item = document.getElementById("item").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const version = document.getElementById("version").value;
    const changes = document.getElementById("changes").value;

    // Hitung nomor baris
    const newRowNumber = logTableBody.rows.length + 1;

    // Buat elemen baris baru
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${newRowNumber}</td>
      <td>${item}</td>
      <td>${description}</td>
      <td>${date}</td>
      <td>${version}</td>
      <td>${changes}</td>
    `;

    // Tambahkan baris ke tabel
    logTableBody.appendChild(newRow);

    // Reset form & tutup modal
    logForm.reset();
    addLogModal.style.display = "none";
  });
});
