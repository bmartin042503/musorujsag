class Channel {
    constructor(
        id,
        name,
        description,
        categories, // Category példányok
        shows // Show példányok
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._categories = categories;
        this._shows = shows;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set categories(value) {
        this._categories = value;
    }

    set shows(value) {
        this._shows = value;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get categories() {
        return this._categories;
    }

    get shows() {
        return this._shows;
    }
}

module.exports = Channel;