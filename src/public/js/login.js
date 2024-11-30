document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitLogin();
    });
});

function submitLogin() {
    const name = document.getElementById('log-name').value;
    const password = document.getElementById('log-pass').value;

    if(
        name.length === 0 ||
        password.length === 0
    ) {
        displayError("A mezők kitöltése kötelező!");
        return;
    }

    fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { username: name, password: password }
        )
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || "Ismeretlen hiba történt");
                });
            } else {
                window.location.href = "/dashboard";
            }
        })
        .catch(error => {
            displayError(error.message || "Hiba történt a bejelentkezés során!");
        });
}