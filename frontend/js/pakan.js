document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('addPakanModal');
    const addBtn = document.getElementById('addPakanButton');
    const closeBtn = document.querySelector('.close-button');
    const form = document.getElementById('pakanForm');

    // Open modal when add button is clicked
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('pakanName').value;
        const type = document.getElementById('ternakType').value;
        const stock = document.getElementById('pakanStock').value;
        const unit = document.getElementById('pakanUnit').value;
        
        // In a real application, you would send this data to a server
        console.log('New feed added:', { name, type, stock, unit });
        
        // Reset form and close modal
        form.reset();
        modal.style.display = 'none';
        
        alert('Pakan baru berhasil ditambahkan!');
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.action-btn.edit');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.cells;
            alert(`Edit pakan: ${cells[1].textContent}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const pakanName = row.cells[1].textContent;
            if (confirm(`Apakah Anda yakin ingin menghapus ${pakanName}?`)) {
                row.remove();
                alert(`${pakanName} telah dihapus`);
            }
        });
    });
});