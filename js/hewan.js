document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('addHewanModal');
  const addBtn = document.getElementById('addHarvestButton');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('hewanForm');
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

  // Tambahkan data hewan ke tabel
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const jenisHewan = document.getElementById('jenisHewan').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const beratBadan = document.getElementById('beratBadan').value;
    const status = document.getElementById('statusHewan').value;

    const usia = hitungUsia(tanggalLahir);

    rowNumber += 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${rowNumber}</td>
      <td>${jenisHewan}</td>
      <td>${tanggalLahir}</td>
      <td>${usia}</td>
      <td>${jenisKelamin}</td>
      <td>${beratBadan} Kg</td>
      <td>${status}</td>
      <td>
        <button class="action-btn delete"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(newRow);

    form.reset();
    modal.style.display = 'none';

    alert('Data hewan berhasil ditambahkan!');
    addActionEvents(newRow);
  });

  // Tambahkan event listener tombol delete
  function addActionEvents(row) {
    const deleteBtn = row.querySelector('.delete');

    deleteBtn.addEventListener('click', function () {
      const namaHewan = row.cells[1].textContent;
      if (confirm(`Apakah Anda yakin ingin menghapus data hewan: ${namaHewan}?`)) {
        row.remove();
        alert(`Data hewan ${namaHewan} telah dihapus`);
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

  // Hitung usia dari tanggal lahir
  function hitungUsia(tanggal) {
  const today = new Date();
  const lahir = new Date(tanggal);

  let tahun = today.getFullYear() - lahir.getFullYear();
  let bulan = today.getMonth() - lahir.getMonth();

  if (today.getDate() < lahir.getDate()) {
    bulan -= 1;
  }

  if (bulan < 0) {
    tahun -= 1;
    bulan += 12;
  }

  let usia = '';
  if (tahun > 0) {
    usia += `${tahun} tahun `;
  }
  if (bulan > 0 || tahun === 0) {
    usia += `${bulan} bulan`;
  }

  return usia.trim();
}

});
