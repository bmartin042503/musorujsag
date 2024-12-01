class Show {
    constructor(
        id,
        title,
        episode,
        description,
        air_begin_date,
        air_end_date,
        actors, // Actor példányok
        airs_on
    ) {
        this._id = id;
        this._title = title;
        this._episode = episode;
        this._description = description;
        this._air_begin_date = air_begin_date;
        this._air_end_date = air_end_date;
        this._actors = actors;
    }

    set id(value) {
        this._id = value;
    }

    set title(value) {
        this._title = value;
    }

    set episode(value) {
        this._episode = value;
    }

    set description(value) {
        this._description = value;
    }

    set air_begin_date(value) {
        this._air_begin_date = value;
    }

    set air_end_date(value) {
        this._air_end_date = value;
    }

    set actors(value) {
        this._actors = value;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get episode() {
        return this._episode;
    }

    get description() {
        return this._description;
    }

    get air_begin_date() {
        return this._air_begin_date.toISOString();
    }

    get air_end_date() {
        return this._air_end_date.toISOString();
    }

    get actors() {
        return this._actors;
    }
}

module.exports = Show;