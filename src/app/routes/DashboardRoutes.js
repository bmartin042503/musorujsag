const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.get('/dashboard', AuthenticationMiddleware, DashboardController.getDashboard)

module.exports = router;