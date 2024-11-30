function logout() {
    fetch('/api/logout', {
        method: 'GET'
    })
        .then(response => {
            if(response.status === 200 || response.status === 400) {
                window.location.href = "/";
            }
        })
        .catch(error => {
            console.error(`Hiba történt a kijelentkezés során: ${error}`);
        });
}