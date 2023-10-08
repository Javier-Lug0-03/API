const express = require("express");
const router = express.Router();

router.use('/spots',require('./routes/ParkingSpot'));
router.use('/lots',require('./routes/ParkingLot'));
router.use('/user',require('./routes/Users'));

module.exports = router