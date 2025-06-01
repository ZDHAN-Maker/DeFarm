document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("table tbody");

  // Modal Tambah
  const addButton = document.getElementById("addSettingButton");
  const addModal = document.getElementById("addSettingModal");
  const addClose = document.getElementById("addClose");
  const addForm = document.getElementById("addSettingForm");
  const newName = document.getElementById("newName");
  const newValue = document.getElementById("newValue");

  // Modal Edit
  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const editClose = document.getElementById("editClose");
  const editName = document.getElementById("editName");
  const editValue = document.getElementById("editValue");

  let currentRow = null;

  // Buka modal tambah
  addButton.addEventListener("click", () => {
    addModal.style.display = "block";
    addForm.reset();
  });

  // Tutup modal tambah
  addClose.onclick = () => addModal.style.display = "none";

  // Simpan data dari form tambah
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = newName.value.trim();
    const value = newValue.value.trim();
    if (!name || !value) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${value}</td>
      <td><button class="action-btn edit"><i class="fas fa-edit"></i></button></td>
    `;
    tableBody.appendChild(row);
    addModal.style.display = "none";
  });

  // Delegasi klik tombol edit
  tableBody.addEventListener("click", function (e) {
    if (e.target.closest(".edit")) {
      currentRow = e.target.closest("tr");
      const name = currentRow.children[0].textContent;
      const value = currentRow.children[1].textContent;

      editName.value = name;
      editValue.value = value;
      editModal.style.display = "block";
    }
  });

  // Simpan perubahan edit
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!currentRow) return;

    currentRow.children[0].textContent = editName.value.trim();
    currentRow.children[1].textContent = editValue.value.trim();
    editModal.style.display = "none";
  });

  // Tutup modal edit
  editClose.onclick = () => editModal.style.display = "none";

  // Tutup modal jika klik di luar area modal
  window.onclick = function (e) {
    if (e.target === addModal) addModal.style.display = "none";
    if (e.target === editModal) editModal.style.display = "none";
  };
});
