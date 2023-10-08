const express = require('express')
const router = express.Router();
const controller = require('../controllers/Users');

router.post('/register',controller.createNew);
router.post('/login',controller.login);

module.exports = router;