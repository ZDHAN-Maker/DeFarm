document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addFruitModal');
  const addBtn = document.getElementById('addFruitButton');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('fruitForm');
  const tableBody = document.querySelector('table tbody');

  let rowNumber = tableBody.rows.length; // Hitung jumlah baris awal

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

  // Tambahkan buah ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('fruitName').value;
    const type = document.getElementById('fruitType').value;
    const quantity = document.getElementById('fruitQuantity').value;
    const price = document.getElementById('fruitPrice').value;

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${name}</td>
      <td>${type}</td>
      <td>${quantity}</td>
      <td>Rp ${price}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    // Tambah ke dalam tabel
    tableBody.appendChild(newRow);

    // Reset form dan tutup modal
    form.reset();
    modal.style.display = 'none';

    alert('Buah baru berhasil ditambahkan!');

    // Tambahkan event listener ke tombol delete
    addActionEvents(newRow);
  });

  // Tambahkan event listener untuk delete saja
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const fruitName = row.cells[1].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus ${fruitName}?`)) {
        row.remove();
        alert(`${fruitName} telah dihapus`);
        updateRowNumbers();
      }
    });
  }

  // Tambahkan event ke baris awal
  document.querySelectorAll('table tbody tr').forEach(addActionEvents);

  // Update nomor urut saat baris dihapus
  function updateRowNumbers() {
    rowNumber = 0;
    document.querySelectorAll('table tbody tr').forEach((row) => {
      rowNumber += 1;
      row.cells[0].textContent = rowNumber;
    });
  }
});
