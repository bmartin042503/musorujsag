class Admin {
    constructor(
        id,
        name,
        password, // hashelt, a bejelentkezésnél az összehasonlítás miatt van rá szükség
        email,
        last_login
    ) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._email = email;
        this._last_login = last_login;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }

    get last_login() {
        return this._last_login;
    }
}

module.exports = Admin;