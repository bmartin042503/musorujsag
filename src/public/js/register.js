document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitRegistration();
    });
});

function submitRegistration() {
    const name = document.getElementById('reg-name').value;
    const password = document.getElementById('reg-pass').value;
    const passwordConfirm = document.getElementById('reg-pass-confirm').value;
    const email = document.getElementById('reg-email').value;

    if(
        name.length === 0 ||
        password.length === 0 ||
        passwordConfirm.length === 0 ||
        email.length === 0
    ) {
        displayError("A mezők kitöltése kötelező!");
        return;
    }

    if(name.length < 5) {
        displayError("A névnek legalább 5 karakter hosszúnak kell lennie!");
        return;
    }

    if(password.length < 5) {
        displayError("A jelszónak legalább 5 karakter hosszúnak kell lennie!");
        return;
    }

    if(password.length > 30) {
        displayError("Túl hosszú jelszó! Maximum 30 karakter!")
        return;
    }

    if(password !== passwordConfirm) {
        displayError("A jelszavak nem egyeznek!");
        return;
    }

    fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { username: name, email: email, password: password,  }
        )
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || "Ismeretlen hiba történt");
                });
            }
            window.location.href = '/login';
        })
        .catch(error => {
            displayError(error.message || "Hiba történt a regisztráció során!");
        });

}