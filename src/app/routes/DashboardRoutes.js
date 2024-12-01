const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.get('/dashboard', AuthenticationMiddleware, DashboardController.getDashboard);
router.post('/api/new-channel', AuthenticationMiddleware, DashboardController.createChannel);
router.get('/api/categories', AuthenticationMiddleware, DashboardController.getCategories);

module.exports = router;