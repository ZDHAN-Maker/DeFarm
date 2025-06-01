
  const modal = document.getElementById("addNewsModal");
  const addNewsButton = document.getElementById("addNewsButton");
  const closeButton = document.querySelector(".close-button");
  const imageUploadArea = document.getElementById("imageUploadArea");
  const fileInput = document.getElementById("newsImage");
  const imagePreview = document.getElementById("imagePreview");
  const newsForm = document.getElementById("newsForm");
  const newsContainer = document.querySelector(".news-container");

  // Buka modal saat tombol 'Tambah Berita' diklik
  addNewsButton.onclick = () => {
    modal.style.display = "block";
  };

  // Tutup modal saat tombol 'X' diklik
  closeButton.onclick = () => {
    modal.style.display = "none";
    resetForm();
  };

  // Tutup modal jika klik di luar modal
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      resetForm();
    }
  };

  // Klik area upload memicu input file
  imageUploadArea.addEventListener("click", () => {
    fileInput.click();
  });

  // Tampilkan preview gambar
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Tangani submit form berita
  newsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("newsTitle").value;
    const content = document.getElementById("newsContent").value;
    const imageSrc = imagePreview.src || "https://via.placeholder.com/600x400?text=Tanpa+Gambar";
    const today = new Date();
    const formattedDate = today.toLocaleDateString("id-ID", {
      day: '2-digit', month: 'long', year: 'numeric'
    });

    // Template berita baru
    const newsHTML = `
      <div class="news-card">
        <div class="news-image">
          <img src="${imageSrc}" alt="${title}">
        </div>
        <div class="news-content">
          <h2 class="news-title">${title}</h2>
          <hr class="news-divider">
          <p class="news-description">${content}</p>
          <div class="news-footer">
            <div class="news-date">
              <i class="far fa-calendar"></i> ${formattedDate}
            </div>
            <div class="news-actions">
              <button class="action-btn"><i class="fas fa-edit"></i></button>
              <button class="action-btn"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Tambahkan ke container berita
    newsContainer.insertAdjacentHTML("afterbegin", newsHTML);

    // Reset form & tutup modal
    resetForm();
    modal.style.display = "none";
  });

  // Fungsi reset form
  function resetForm() {
    newsForm.reset();
    imagePreview.src = "";
    imagePreview.style.display = "none";
    fileInput.value = "";
  }
