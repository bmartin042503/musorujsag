const express = require('express');
const router = express.Router();
const ProgramController = require('../controllers/ProgramController');

router.get('/program-guide', ProgramController.getProgramGuide);

module.exports = router;