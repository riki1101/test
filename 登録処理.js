var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () {
    var newRecordButton = document.getElementById('newRecordButton');
    var deleteSelectedButton = document.getElementById('deleteSelectedButton');
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var backButton = document.getElementById('backButton');
    var submitButton = document.getElementById('submitButton');
    var fileInput = document.getElementById('fileInput');
    var fileStatus = document.getElementById('fileStatus');
    var fileSelectButton = document.getElementById('fileSelectButton');
    var fileTableBody = document.getElementById('fileTableBody');
    var recordTableBody = document.getElementById('recordTableBody');
    var titleInput = document.getElementById('title');
    var yearSelect = document.getElementById('year');
    var monthSelect = document.getElementById('month');
    // 年と月のオプションを追加
    for (var i = 2020; i <= 2030; i++) {
        var option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        yearSelect.appendChild(option);
    }
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        monthSelect.appendChild(option);
    }
    newRecordButton.addEventListener('click', function () {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    });
    backButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
    fileSelectButton.addEventListener('click', function () {
        fileInput.click();
    });
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
    submitButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var title, year, month, fileName, fileType, fileSize, row, checkboxCell, checkbox, titleCell, yearCell, monthCell, fileNameCell, fileTypeCell, fileSizeCell, recordData, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = titleInput.value;
                    year = yearSelect.value;
                    month = monthSelect.value;
                    fileName = fileStatus.textContent;
                    if (!(title && year && month && fileName !== '選択されていません')) return [3 /*break*/, 6];
                    fileType = fileTableBody.rows[0].cells[1].textContent;
                    fileSize = fileTableBody.rows[0].cells[2].textContent;
                    row = document.createElement('tr');
                    checkboxCell = document.createElement('td');
                    checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkboxCell.appendChild(checkbox);
                    titleCell = document.createElement('td');
                    yearCell = document.createElement('td');
                    monthCell = document.createElement('td');
                    fileNameCell = document.createElement('td');
                    fileTypeCell = document.createElement('td');
                    fileSizeCell = document.createElement('td');
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
                    recordData = {
                        title: title,
                        year: year,
                        month: month,
                        fileName: fileName,
                        fileType: fileType,
                        fileSize: fileSize
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('YOUR_LAMBDA_ENDPOINT_URL', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(recordData)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
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
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error sending data to Lambda:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    alert('全てのフィールドを入力してください。');
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); });
    deleteSelectedButton.addEventListener('click', function () {
        var checkboxes = recordTableBody.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function (checkbox) {
            var row = checkbox.closest('tr');
            if (row) {
                recordTableBody.removeChild(row);
            }
        });
    });
});
