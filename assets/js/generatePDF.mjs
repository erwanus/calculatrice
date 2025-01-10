export function generatePDF() {
    var downloadButton = document.querySelector('#download');
    if (downloadButton) {
        downloadButton.style.display = 'none';
    }

    var element = document.querySelector("tbody").cloneNode(true);
    var logo = document.createElement('img');
    logo.src = "assets/logo.png";
    logo.alt = "Logo de Microlead";
    logo.style.display = "block";
    logo.style.margin = "0 auto 20px"; 
    logo.style.width = "150px"; 

    var header = document.querySelector('.tab h2');
    header.parentNode.insertBefore(logo, header.nextSibling);

    html2pdf(element, {
        margin:       [10, 10, 10, 10],
        filename:     'tableau_amortissement.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    }).then(function() {
        if (downloadButton) {
            downloadButton.style.display = 'block';
        }
    });
}