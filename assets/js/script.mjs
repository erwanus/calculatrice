import { generateAmortizationTable } from "./generateTable.mjs";
import { error, removeError } from "./error.mjs";

const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", function(event) {
    const amountInput = document.querySelector("#amount");
    const interestInput = document.querySelector("#interest");
    const durationInput = document.querySelector("#duration");
    const amt = amountInput.value.replace(",", ".");
    const int = interestInput.value.replace(",", ".");
    const dur = durationInput.value.replace(",", "."); 
    const amount = parseFloat(amt);
    const interest = parseFloat(int);
    const duration = parseFloat(dur);

    event.preventDefault();
    durationInput.focus();
    
    if (!Number(amount) || Number(amount) <= 0) {
        error(amountInput.id);
    } else {
        removeError(amountInput.id);
    }

    if (!Number(interest) || Number(interest) <= 0 ) {
        error(interestInput.id);
    } else {
        removeError(interestInput.id);
    }

    if (!Number(duration) || (Number(duration.value) <= 0)) {
        error(durationInput.id);
    } else {
        removeError(durationInput.id);
    }

    if (Number(amount) && Number(interest) && Number(duration) && Number(amount) > 0 && Number(interest) > 0 && Number(duration) > 0) {
        document.querySelector("#fields-error").style.visibility = "hidden";
        const table = document.querySelector(".tab");
        table.style.display = "block";
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        generateAmortizationTable(amount, interest, duration);

        amountInput.value = "";
        interestInput.value = "";
        durationInput.value = "";
    }
});