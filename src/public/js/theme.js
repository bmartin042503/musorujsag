const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

function toggleTheme() {
    body.style.transition = 'background-color 0.4s ease';
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setTimeout(() => {
        body.style.transition = '';
    }, 400);
}

function setTheme(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'dark') {
        body.classList.add('dark');
        body.classList.remove('light');
        themeIcon.src = 'images/dark_mode.svg';
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        themeIcon.src = 'images/light_mode.svg';
    }
}