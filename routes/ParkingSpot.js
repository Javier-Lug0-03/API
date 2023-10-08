const express = require('express')
const router = express.Router();
const controller = require('../controllers/ParkingSpot')

router.post('/search',controller.getAllInParking);
router.post('/add',controller.addSpot);
router.post('/update',controller.updateSpot);
router.post('/status',controller.getStatus);


module.exports = router;