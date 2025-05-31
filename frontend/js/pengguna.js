document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addUserModal');
  const addBtn = document.getElementById('addUserButton');
  const closeBtn = modal.querySelector('.close-button');
  const form = document.getElementById('userForm');
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

  // Tambahkan pengguna ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const namaLengkap = document.getElementById('namaLengkap').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const status = document.getElementById('statusUser').value;
    const tanggalBergabung = document.getElementById('tanggalBergabung').value;

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${namaLengkap}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${role}</td>
      <td>${status}</td>
      <td>${tanggalBergabung}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(newRow);

    form.reset();
    modal.style.display = 'none';

    alert(`Pengguna ${namaLengkap} berhasil ditambahkan!`);
    addActionEvents(newRow);
  });

  // Tambahkan event listener tombol delete saja
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const namaUser = row.cells[1].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus pengguna: ${namaUser}?`)) {
        row.remove();
        alert(`Pengguna ${namaUser} telah dihapus`);
        updateRowNumbers();
      }
    });
  }

  addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = newName.value.trim();
  const value = newValue.value.trim();
  if (!name || !value) return;

  // Cek duplikat
  const isDuplicate = Array.from(tableBody.children).some(row => row.children[0].textContent === name);
  if (isDuplicate) {
    alert("Nama pengaturan sudah ada.");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${value}</td>
    <td><button class="action-btn edit"><i class="fas fa-edit"></i></button></td>
  `;
  tableBody.appendChild(row);
  addModal.style.display = "none";
});
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
