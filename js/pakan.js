document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addPakanModal');
  const addBtn = document.getElementById('addPakanButton');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('pakanForm');
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

  // Tambahkan pakan ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('pakanName').value;
    const type = document.getElementById('ternakType').value;
    const stock = document.getElementById('pakanStock').value;
    const unit = document.getElementById('pakanUnit').value;

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${name}</td>
      <td>${type}</td>
      <td>${stock}</td>
      <td>${unit}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(newRow);

    form.reset();
    modal.style.display = 'none';

    alert('Pakan baru berhasil ditambahkan!');

    addActionEvents(newRow);
  });

  // Tambahkan event listener tombol delete
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const pakanName = row.cells[1].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus ${pakanName}?`)) {
        row.remove();
        alert(`${pakanName} telah dihapus`);
        updateRowNumbers();
      }
    });
  }

  // Tambahkan event ke baris awal (jika ada data dari HTML langsung)
  document.querySelectorAll('table tbody tr').forEach(addActionEvents);

  // Perbarui nomor urut setelah baris dihapus
  function updateRowNumbers() {
    rowNumber = 0;
    document.querySelectorAll('table tbody tr').forEach((row) => {
      rowNumber += 1;
      row.cells[0].textContent = rowNumber;
    });
  }
});
