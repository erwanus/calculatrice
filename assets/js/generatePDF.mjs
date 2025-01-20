export function generatePDF() {
    var downloadButton = document.querySelector('#download');
    if (downloadButton) {
        downloadButton.style.display = 'none';
    }

    var element = document.querySelector(".tab").cloneNode(true);
    var logo = document.querySelector('header img').cloneNode(true);
    logo.style.width = '8.39vw';
    logo.style.height = '2.92vw';
    logo.style.display = 'block';
    logo.style.margin = '1vw auto';
    element.insertBefore(logo, element.firstChild);

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