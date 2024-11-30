/* Konstansok, beimportált elemek */
const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const db_server = require('./config/db');
const programRoutes = require('./routes/ProgramRoutes');
const authRoutes = require('./routes/AuthRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 7500;

const app = express();
const server = http.createServer(app);

/* Beállítások */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

/* Alap végpontok kezelése */
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    if(req.session.isLoggedIn) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});

app.get('/register', (req, res) => {
    if(req.session.isLoggedIn) {
        res.redirect('/dashboard');
    } else {
        res.render('register');
    }
});

app.get('/dashboard', (req, res) => {
    if(req.session.isLoggedIn) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
});

app.use(programRoutes);
app.use('/api', authRoutes)

/* Szerver */
server.listen(PORT, () => {
    console.log(`A szerver elindult! Port: ${PORT}`);
});





