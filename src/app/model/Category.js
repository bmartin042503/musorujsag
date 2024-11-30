class Category {
    constructor(
        id,
        name
    ) {
        this._id = id;
        this._name = name;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}

module.exports = Category;