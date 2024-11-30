const session = require('express-session');

const getDashboard = async(req, res) => {
    try {
        res.render('dashboard', { channels: [], shows: [], actors: [], categories: [] });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a kezelőpanel megjelenítése során: ${error}` });
    }
}


const createChannel = async(req, res) => {
    const { name, description } = req.body;
    try {

    } catch(error) {

    }
}

module.exports = { getDashboard }