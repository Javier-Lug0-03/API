const express = require('express')
const router = express.Router();
const controller = require('../controllers/ParkingLot')

router.get('/get',controller.getAll);
router.get('/getAvailable',controller.getAvailable);
router.post('/update',controller.toggleState);

module.exports = router;