export function generateAmortizationTable(principal, annualRate, years) {
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