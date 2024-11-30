class Actor {
    constructor(
        id,
        name,
        profession,
        nationality,
        date_of_birth
    ) {
        this._id = id;
        this._name = name;
        this._profession = profession;
        this._nationality = nationality;
        this._date_of_birth = date_of_birth;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set profession(value) {
        this._profession = value;
    }

    set nationality(value) {
        this._nationality = value;
    }

    set date_of_birth(value) {
        this._date_of_birth = value;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get profession() {
        return this._profession;
    }

    get nationality() {
        return this._nationality;
    }

    get date_of_birth() {
        return this._date_of_birth;
    }
}

module.exports = Actor;