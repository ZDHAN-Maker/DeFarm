document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addPanenModal');
  const addBtn = document.getElementById('addHarvestButton');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('panenForm');
  const tableBody = document.querySelector('table tbody');

  let rowNumber = tableBody.rows.length;

  // Buka modal
  addBtn.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  // Tutup modal
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Tutup modal jika klik di luar konten
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Tambahkan laporan panen ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const tanggal = document.getElementById('panenDate').value;
    const nama = document.getElementById('plantName').value;
    const jenis = document.getElementById('plantType').value;
    const jumlah = document.getElementById('harvestAmount').value;
    const satuan = document.getElementById('harvestUnit').value;

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${tanggal}</td>
      <td>${nama}</td>
      <td>${jenis}</td>
      <td>${jumlah}</td>
      <td>${satuan}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(newRow);

    form.reset();
    modal.style.display = 'none';

    alert('Laporan panen berhasil ditambahkan!');
    addActionEvents(newRow);
  });

  // Tambahkan event listener tombol delete
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const namaTanaman = row.cells[2].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus laporan panen: ${namaTanaman}?`)) {
        row.remove();
        alert(`Laporan panen ${namaTanaman} telah dihapus`);
        updateRowNumbers();
      }
    });
  }

  // Tambahkan event ke baris awal (jika data sudah ada)
  document.querySelectorAll('table tbody tr').forEach(addActionEvents);

  // Perbarui nomor urut
  function updateRowNumbers() {
    rowNumber = 0;
    document.querySelectorAll('table tbody tr').forEach((row) => {
      rowNumber += 1;
      row.cells[0].textContent = rowNumber;
    });
  }
});
