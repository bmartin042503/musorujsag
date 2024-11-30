function displayError(msg) {
    const errorLabel = document.getElementById('error_label');
    errorLabel.innerText = msg;
    errorLabel.style.display = "block";
}