// ===== Get algorithm from query string =====
const params = new URLSearchParams(window.location.search);
const algorithm = params.get('algorithm');

// Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const uploadedFiles = document.getElementById('uploadedFiles');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsContainer = document.getElementById('resultsContainer');
const resultsContent = document.getElementById('resultsContent');
const patternContainer = document.getElementById('patternContainer');
const patternInput = document.getElementById('patternInput');
const algorithmDetail = document.getElementById('algorithmDetail');
const changeFileBtn = document.getElementById('changeFileBtn');

let selectedFile = null;

// ===== Algorithm descriptions =====
const algorithmDescriptions = {
    dna: "Operations: GC%, Reverse, Complement, Reverse Complement, Translation to amino acids. No pattern input required.",
    'boyer-moore': "Boyer-Moore pattern search. Requires a pattern input for sequence matching.",
    suffix: "Suffix Array & Inverse construction. Optional pattern for search.",
    overlap: "Overlap Graph construction. Optionally set minimum overlap length.",
    approximate: "Approximate Matching using Hamming or Edit Distance. Pattern input is required."
};

// Display algorithm details
algorithmDetail.textContent = algorithmDescriptions[algorithm] || "No details available.";

// Show pattern input if required
if(['boyer-moore','approximate'].includes(algorithm)) {
    patternContainer.style.display = 'block';
}

// ===== Drag & Drop =====
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

changeFileBtn.addEventListener('click', () => {
    fileInput.click();
});

// ===== Handle File Upload =====
function handleFiles(files) {
    if(files.length === 0) return;
    selectedFile = files[0];

    uploadedFiles.innerHTML = `
        <div class="uploaded-file-item">
            <span class="file-icon">📄</span>
            <div class="file-details">
                <div class="file-name">${selectedFile.name}</div>
                <div class="file-size">${(selectedFile.size / 1024).toFixed(2)} KB</div>
            </div>
        </div>
    `;

    fileInfo.style.display = 'block';
    analyzeBtn.disabled = false;
}

// ===== Analyze Button Click =====
analyzeBtn.addEventListener('click', () => {
    if(!selectedFile) return;

    analyzeBtn.disabled = true;
    resultsContainer.style.display = 'block';
    resultsContent.innerHTML = "Analyzing...";

    // === Read file content ===
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        const pattern = patternInput.value;

        // Placeholder: send fileContent + pattern + algorithm to backend
        // For now, just simulate
        setTimeout(() => {
            resultsContent.innerHTML = `
                <div class="result-item"><strong>Algorithm:</strong> ${algorithm}</div>
                <div class="result-item"><strong>File Name:</strong> ${selectedFile.name}</div>
                <div class="result-item"><strong>Pattern:</strong> ${pattern || 'N/A'}</div>
                <div class="result-item"><strong>Result:</strong> [This is a placeholder for backend results]</div>
            `;
            analyzeBtn.disabled = false;
        }, 1000);
    };
    reader.readAsText(selectedFile);
});
