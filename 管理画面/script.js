document.addEventListener('DOMContentLoaded', function () {
    var fileInput = document.getElementById('fileInput');
    var fileStatus = document.getElementById('fileStatus');
    var fileTableBody = document.getElementById('fileTableBody');
    fileInput.addEventListener('change', function (event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            var file = files[0];
            fileStatus.textContent = file.name;
            // Clear the table body
            fileTableBody.innerHTML = '';
            // Add file details to the table
            var row = document.createElement('tr');
            var nameCell = document.createElement('td');
            var typeCell = document.createElement('td');
            var sizeCell = document.createElement('td');
            nameCell.textContent = file.name;
            typeCell.textContent = file.type;
            sizeCell.textContent = "".concat((file.size / 1024).toFixed(2), " KB");
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(sizeCell);
            fileTableBody.appendChild(row);
        }
        else {
            fileStatus.textContent = '選択されていません';
            fileTableBody.innerHTML = '';
        }
    });
});
