const session = require('express-session');
const bcrypt = require('bcrypt');
const AdminDAO = require('../dao/AdminDAO');

const register = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await AdminDAO.getAdminByName(username);
        const existingEmail = await AdminDAO.emailExists(email);
        if(existingUser) {
            return res.status(400).json({ message: "Ez a felhasználó már létezik! "});
        }
        if(existingEmail) {
            return res.status(400).json({ message: "Ez az e-mail cím már regisztrálva van! "});
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        await AdminDAO.createAdmin(username, email, hashedPassword);
        res.status(201).json({ message: "Sikeres regisztráció!" });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a regisztráció során: ${error}` });
    }
}

const login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await AdminDAO.getAdminByName(username);
        if(!admin) {
            return res.status(400).json({ message: "Rossz felhasználónév vagy jelszó!" });
        }
        const passMatch = await bcrypt.compare(password, admin.password);
        if(!passMatch) {
            return res.status(400).json({ message: "Rossz felhasználónév vagy jelszó!" });
        }
        req.session.isLoggedIn = true;
        req.session.name = username;
        req.session.id = admin.id;
        res.status(200).json({ message: "Sikeres bejelentkezés" });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a bejelentkezés során: ${error}` });
    }
}

const logout = async(req, res) => {
    try {
        req.session.destroy((error) => {
            if(error) {
                console.log(`Hiba a session törlése során: ${error}`);
            } else {
                res.redirect('/login');
            }
        });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a kijelentkezés során: ${error}` });
    }
}

module.exports = { register, login, logout }