const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

function toggleTheme() {
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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