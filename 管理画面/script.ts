document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const fileStatus = document.getElementById('fileStatus') as HTMLSpanElement;
    const fileTableBody = document.getElementById('fileTableBody') as HTMLTableSectionElement;

    fileInput.addEventListener('change', (event) => {
        const files = (event.target as HTMLInputElement).files;
        
        if (files && files.length > 0) {
            const file = files[0];
            fileStatus.textContent = file.name;

            // Clear the table body
            fileTableBody.innerHTML = '';

            // Add file details to the table
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const typeCell = document.createElement('td');
            const sizeCell = document.createElement('td');

            nameCell.textContent = file.name;
            typeCell.textContent = file.type;
            sizeCell.textContent = `${(file.size / 1024).toFixed(2)} KB`;

            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(sizeCell);

            fileTableBody.appendChild(row);
        } else {
            fileStatus.textContent = '選択されていません';
            fileTableBody.innerHTML = '';
        }
    });
});
