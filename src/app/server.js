/* Konstansok, beimportált elemek */
const express = require('express');
const http = require('http');
const path = require('path');
const db_server = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 7500;

const app = express();
const server = http.createServer(app);

/* Beállítások */
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

/* Alap végpontok kezelése */
app.get('/', (req, res) => {
    res.send('Műsorújság projekt');
});

/* Szerver */
server.listen(PORT, () => {
    console.log(`A szerver elindult! Port: ${PORT}`);
});





