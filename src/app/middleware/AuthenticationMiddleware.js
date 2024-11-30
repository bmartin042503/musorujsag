const express = require('express');
const session = require('express-session');

const AuthenticationMiddleware = async (req, res, next) => {
    if(req.session.isLoggedIn) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = AuthenticationMiddleware;