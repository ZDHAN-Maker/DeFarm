document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addSayurModal');
  const addBtn = document.getElementById('addSayurButton');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('sayurForm');
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

  // Tambahkan sayur ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('sayurName').value;
    const category = document.getElementById('sayurType').value;
    const stock = document.getElementById('sayurStock').value;
    const unit = document.getElementById('sayurUnit').value;

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${stock}</td>
      <td>${unit}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(newRow);

    form.reset();
    modal.style.display = 'none';

    alert('Sayur baru berhasil ditambahkan!');

    addActionEvents(newRow);
  });

  // Tambahkan event listener tombol delete
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const sayurName = row.cells[1].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus ${sayurName}?`)) {
        row.remove();
        alert(`${sayurName} telah dihapus`);
        updateRowNumbers();
      }
    });
  }

  // Tambahkan event ke baris awal
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
