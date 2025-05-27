    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.getElementById('addPupukModal');
      const addBtn = document.getElementById('addPupukButton');
      const closeBtn = document.querySelector('.close-button');
      const form = document.getElementById('pupukForm');

      // Buka modal
      addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
      });

      // Tutup modal
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      // Handle form submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil nilai form
        const newData = {
          name: document.getElementById('pupukName').value,
          type: document.getElementById('jenisPupuk').value,
          quantity: document.getElementById('jumlahPupuk').value,
          unit: document.getElementById('satuanPupuk').value,
          note: document.getElementById('keterangan').value
        };

        // Tambahkan ke tabel
        addToTable(newData);
        modal.style.display = 'none';
        form.reset();
      });

      function addToTable(data) {
        const tbody = document.querySelector('#pupukTable tbody');
        const newRow = document.createElement('tr');
        const rowNumber = tbody.children.length + 1;

        newRow.innerHTML = `
          <td>${rowNumber}</td>
          <td>${data.name}</td>
          <td>${data.type}</td>
          <td>${data.quantity}</td>
          <td>${data.unit}</td>
          <td>${data.note}</td>
          <td>
            <button class="action-btn edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete"><i class="fas fa-trash"></i></button>
          </td>
        `;

        tbody.appendChild(newRow);
      }

      // Handle edit dan delete
      document.querySelector('#pupukTable').addEventListener('click', (e) => {
        if(e.target.closest('.delete')) {
          e.target.closest('tr').remove();
        }
        
        if(e.target.closest('.edit')) {
          // Implementasi edit sesuai kebutuhan
          alert('Fitur edit dalam pengembangan!');
        }
      });
    });