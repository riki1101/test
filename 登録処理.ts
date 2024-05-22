document.addEventListener('DOMContentLoaded', () => {
    const newRecordButton = document.getElementById('newRecordButton') as HTMLButtonElement;
    const deleteSelectedButton = document.getElementById('deleteSelectedButton') as HTMLButtonElement;
    const overlay = document.getElementById('overlay') as HTMLDivElement;
    const popup = document.getElementById('popup') as HTMLDivElement;
    const backButton = document.getElementById('backButton') as HTMLButtonElement;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const fileStatus = document.getElementById('fileStatus') as HTMLSpanElement;
    const fileSelectButton = document.getElementById('fileSelectButton') as HTMLButtonElement;
    const fileTableBody = document.getElementById('fileTableBody') as HTMLTableSectionElement;
    const recordTableBody = document.getElementById('recordTableBody') as HTMLTableSectionElement;
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const yearSelect = document.getElementById('year') as HTMLSelectElement;
    const monthSelect = document.getElementById('month') as HTMLSelectElement;

    // 年と月のオプションを追加
    for (let i = 2020; i <= 2030; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        yearSelect.appendChild(option);
    }

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        monthSelect.appendChild(option);
    }

    newRecordButton.addEventListener('click', () => {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    });

    backButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });

    fileSelectButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event: Event) => {
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

    submitButton.addEventListener('click', async () => {
        const title = titleInput.value;
        const year = yearSelect.value;
        const month = monthSelect.value;
        const fileName = fileStatus.textContent;

        if (title && year && month && fileName !== '選択されていません') {
            const fileType = fileTableBody.rows[0].cells[1].textContent;
            const fileSize = fileTableBody.rows[0].cells[2].textContent;

            const row = document.createElement('tr');
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkboxCell.appendChild(checkbox);

            const titleCell = document.createElement('td');
            const yearCell = document.createElement('td');
            const monthCell = document.createElement('td');
            const fileNameCell = document.createElement('td');
            const fileTypeCell = document.createElement('td');
            const fileSizeCell = document.createElement('td');

            titleCell.textContent = title;
            yearCell.textContent = year;
            monthCell.textContent = month;
            fileNameCell.textContent = fileName;
            fileTypeCell.textContent = fileType;
            fileSizeCell.textContent = fileSize;

            row.appendChild(checkboxCell);
            row.appendChild(titleCell);
            row.appendChild(yearCell);
            row.appendChild(monthCell);
            row.appendChild(fileNameCell);
            row.appendChild(fileTypeCell);
            row.appendChild(fileSizeCell);

            recordTableBody.appendChild(row);

            // AWS Lambdaにデータを送信
            const recordData = {
                title: title,
                year: year,
                month: month,
                fileName: fileName,
                fileType: fileType,
                fileSize: fileSize
            };

            try {
                const response = await fetch('YOUR_LAMBDA_ENDPOINT_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recordData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Lambda response:', result);

                // 登録完了後、ポップアップを閉じる
                overlay.style.display = 'none';
                popup.style.display = 'none';

                // フォームをリセット
                titleInput.value = '';
                yearSelect.value = '';
                monthSelect.value = '';
                fileInput.value = '';
                fileStatus.textContent = '選択されていません';
                fileTableBody.innerHTML = '';
            } catch (error) {
                console.error('Error sending data to Lambda:', error);
            }
        } else {
            alert('全てのフィールドを入力してください。');
        }
    });

    deleteSelectedButton.addEventListener('click', () => {
        const checkboxes = recordTableBody.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            if (row) {
                recordTableBody.removeChild(row);
            }
        });
    });
});
