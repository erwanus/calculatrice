const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const amount = document.querySelector("#amount");
    const interestInput = document.querySelector("#interest");
    const duration = document.querySelector("#duration");
    const int = interestInput.value.replace(",", ".");
    const interest = parseFloat(int);
    
    if (!Number(amount.value) || Number(amount.value) <= 0) {
        error(amount.id);
    } else {
        removeError(amount.id);
    }

    if (!Number(interest) || Number(interest) <= 0 ) {
        error(interestInput.id);
    } else {
        removeError(interestInput.id);
    }

    if (!Number(duration.value || Number(duration.value) <= 0)) {
        error(duration.id);
    } else {
        removeError(duration.id);
    }

    if (Number(amount.value) && Number(interest) && Number(duration.value) && Number(amount.value) > 0 && Number(interest) > 0 && Number(duration.value) > 0) {
        document.querySelector("#fields-error").style.visibility = "hidden";
        const table = document.querySelector(".tab");
        table.style.display = "block";
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        generateAmortizationTable(amount.value, interest, duration.value);

        amount.value = "";
        interestInput.value = "";
        duration.value = "";
    }
});

function generateAmortizationTable(principal, annualRate, years) {
    var monthlyRate = annualRate / 100 / 12;
    var numberOfPayments = years * 12;
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const tbody = document.querySelector("tbody");

    var balance = principal;
    for (var month = 1; month <= numberOfPayments; month++) {
        var interest = balance * monthlyRate;
        var amortization = monthlyPayment - interest;
        balance -= amortization;

        var row = document.createElement('tr');
        row.innerHTML = '<th>' + month + '</th>' +
                        '<th>' + (balance + amortization).toFixed(2) + '</th>' +
                        '<th>' + monthlyPayment.toFixed(2) + '</th>' +
                        '<th>' + interest.toFixed(2) + '</th>' +
                        '<th>' + amortization.toFixed(2) + '</th>' +
                        '<th>' + balance.toFixed(2) + '</th>';
        tbody.appendChild(row);
    }
}

function generatePDF() {
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

function error(input) {
    document.querySelector(`#${input}`).classList.add("error");
    document.querySelector("#fields-error").style.visibility = "visible";
}

function removeError(input) {
    document.querySelector(`#${input}`).classList.remove("error");
}