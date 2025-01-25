export function generatePDF() {
    const downloadButton = document.querySelector("#download");
    if (downloadButton) {
        downloadButton.style.display = 'none';
    }

    var element = document.querySelector(".tab").cloneNode(true);
    element.style.width = '100%';
    element.style.height = 'auto';
    element.style.border = 'none';
    var logo = document.querySelector('header img').cloneNode(true);
    logo.style.width = '20%';
    logo.style.height = 'auto';
    logo.style.display = 'block';
    logo.style.margin = '10% auto';
    element.insertBefore(logo, element.firstChild);

    html2pdf(element, {
        margin: [10, 10, 10, 10],
        filename: 'tableau_amortissement.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4',
            orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }).then(function () {
        if (downloadButton) {
            downloadButton.style.display = 'block';
        }
    });
}
