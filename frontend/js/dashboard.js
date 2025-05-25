
 
    document.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('salesChart').getContext('2d');
      
      // Data contoh penjualan
      const dates = ['Jan 1', 'Jan 5', 'Jan 9', 'Jan 13', 'Jan 17', 'Jan 21'];
      const fruitSales = [1200000, 1850000, 1500000, 2100000, 1750000, 2050000];
      const vegetableSales = [950000, 1200000, 1100000, 1650000, 1450000, 1550000];
      
      const salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Buah',
              data: fruitSales,
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              borderRadius: 4
            },
            {
              label: 'Sayuran',
              data: vegetableSales,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += 'Rp ' + context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return label;
                }
              }
            }
          }
        }
      });
      document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.sidebar a');
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    // Hapus semua class active agar tidak tertinggal
    link.classList.remove('active');

    // Ambil nama file dari href
    const linkPage = link.getAttribute('href').split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
});

      // Fungsi untuk edit table
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const row = this.closest('tr');
          row.classList.add('editing');
        });
      });

      document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const row = this.closest('tr');
          row.classList.remove('editing');
        });
      });

      document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const row = this.closest('tr');
          const inputs = row.querySelectorAll('.editable-input');
          const staticTexts = row.querySelectorAll('.static-text');
          
          // Update static text with new values
          inputs.forEach((input, index) => {
            if (input.tagName === 'SELECT') {
              staticTexts[index].textContent = input.options[input.selectedIndex].text;
            } else {
              staticTexts[index].textContent = input.value;
            }
          });
          
          row.classList.remove('editing');
          
          // Di sini bisa ditambahkan AJAX untuk menyimpan data ke server
          alert('Data berhasil disimpan!');
        });
      });
    });
    // Fruit and vegetable options
const productOptions = {
  'Buah': ['Pisang', 'Mangga', 'Nanas', 'Durian', 'Manggis', 'Buah Naga', 'Salak', 'Belimbing'],
  'Sayuran': ['Kangkung', 'Bayam', 'Sawi', 'Daun Singkong', 'Kacang Panjang', 'Mentimun', 'Selada', 'Kale']
};

// Update name dropdown when type changes
document.getElementById('newType').addEventListener('change', function() {
  const nameSelect = document.getElementById('newName');
  const selectedType = this.value;
  
  nameSelect.innerHTML = '';
  nameSelect.disabled = !selectedType;
  
  if (selectedType) {
    productOptions[selectedType].forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      nameSelect.appendChild(option);
    });
  } else {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Pilih Jenis dulu';
    nameSelect.appendChild(option);
  }
});

// Add new row to table
document.getElementById('addRowForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const type = document.getElementById('newType').value;
  const name = document.getElementById('newName').value;
  const quantity = document.getElementById('newQuantity').value;  
  const price = document.getElementById('newPrice').value;
  
  if (!type || !name || !quantity || !price) {
    alert('Harap isi semua field!');
    return;
  }
  
  const tbody = document.querySelector('.data-table tbody');
  const newRow = document.createElement('tr');
  newRow.className = type === 'Buah' ? 'fruit-row' : 'vegetable-row';
  
  newRow.innerHTML = `
    <td>${type}</td>
    <td>
      <span class="static-text">${name}</span>
      <select class="editable-input">
        ${productOptions[type].map(item => 
          `<option value="${item}" ${item === name ? 'selected' : ''}>${item}</option>`
        ).join('')}
      </select>
    </td>
    <td>
      <span class="static-text">${quantity}</span>
      <input type="number" class="editable-input" value="${quantity}">
    </td>
    <td>
      <span class="static-text">${price}</span>
      <input type="number" class="editable-input" value="${price}">
    </td>
    <td class="action-buttons">
      <button class="edit-btn">Edit</button>
      <button class="save-btn">Simpan</button>
      <button class="cancel-btn">Batal</button>
    </td>
  `;
  
  tbody.appendChild(newRow);
  
  // Add event listeners to new buttons
  addRowEventListeners(newRow);
  
  // Reset form
  this.reset();
  document.getElementById('newName').disabled = true;
  document.getElementById('newName').innerHTML = '<option value="">Pilih Jenis dulu</option>';
  
  alert('Data berhasil ditambahkan!');
});

// Helper function to add event listeners to new rows
function addRowEventListeners(row) {
  // Edit button shows Save, Delete, Cancel and hides Edit
  row.querySelector('.edit-btn').addEventListener('click', function() {
    row.classList.add('editing');
  });
  
  // Cancel button hides Save, Delete, Cancel and shows Edit
  row.querySelector('.cancel-btn').addEventListener('click', function() {
    // Reset any changes made during editing
    const inputs = row.querySelectorAll('.editable-input');
    const staticTexts = row.querySelectorAll('.static-text');
    
    inputs.forEach((input, index) => {
      if (input.tagName === 'SELECT') {
        input.value = staticTexts[index].textContent;
      } else {
        input.value = staticTexts[index].textContent;
      }
    });
    
    row.classList.remove('editing');
  });
  
  // Save button commits changes
  row.querySelector('.save-btn').addEventListener('click', function() {
    const inputs = row.querySelectorAll('.editable-input');
    const staticTexts = row.querySelectorAll('.static-text');
    
    inputs.forEach((input, index) => {
      if (input.tagName === 'SELECT') {
        staticTexts[index].textContent = input.options[input.selectedIndex].text;
      } else {
        staticTexts[index].textContent = input.value;
      }
    });
    
    row.classList.remove('editing');
    alert('Data berhasil diperbarui!');
  });
  
  // Delete button removes the row
  const deleteBtn = row.querySelector('.delete-btn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      row.remove();
      alert('Data berhasil dihapus!');
    }
  });
}
}

// Initialize all existing rows
document.querySelectorAll('.data-table tbody tr').forEach(row => {
  addRowEventListeners(row);
});

// Update the form submission to add new rows
document.getElementById('addRowForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const type = document.getElementById('newType').value;
  const name = document.getElementById('newName').value;
  const quantity = document.getElementById('newQuantity').value;
  const price = document.getElementById('newPrice').value;
  
  if (!type || !name || !quantity || !price) {
    alert('Harap isi semua field!');
    return;
  }
  
  const tbody = document.querySelector('.data-table tbody');
  const newRow = document.createElement('tr');
  newRow.className = type === 'Buah' ? 'fruit-row' : 'vegetable-row';
  
  newRow.innerHTML = `
    <td>${type}</td>
    <td>
      <span class="static-text">${name}</span>
      <select class="editable-input">
        ${productOptions[type].map(item => 
          `<option value="${item}" ${item === name ? 'selected' : ''}>${item}</option>`
        ).join('')}
      </select>
    </td>
    <td>
      <span class="static-text">${quantity}</span>
      <input type="number" class="editable-input" value="${quantity}">
    </td>
    <td>
      <span class="static-text">${price}</span>
      <input type="number" class="editable-input" value="${price}">
    </td>
    <td class="action-buttons">
      <button class="edit-btn">Edit</button>
      <button class="save-btn">Simpan</button>
      <button class="delete-btn">Hapus</button>
      <button class="cancel-btn">Batal</button>
    </td>
  `;
  
  tbody.appendChild(newRow);
  addRowEventListeners(newRow);
  
  // Reset form
  this.reset();
  document.getElementById('newName').disabled = true;
  document.getElementById('newName').innerHTML = '<option value="">Pilih Jenis dulu</option>';
  
  alert('Data berhasil ditambahkan!');
});
