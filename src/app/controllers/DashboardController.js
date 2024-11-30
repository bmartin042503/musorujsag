const session = require('express-session');

const getDashboard = async(req, res) => {
    try {
        if(req.session.isLoggedIn) {
            res.render('dashboard');
        } else {
            res.redirect('/login');
        }
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a kezelőpanel megjelenítése során: ${error}` });
    }
}

module.exports = { getDashboard }