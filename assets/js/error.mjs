export function error(input) {
    document.querySelector(`#${input}`).classList.add("error");
    document.querySelector("#fields-error").style.visibility = "visible";
}

export function removeError(input) {
    document.querySelector(`#${input}`).classList.remove("error");
}