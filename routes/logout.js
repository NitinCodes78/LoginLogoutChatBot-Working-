const express = require("express");
const authController = require('../controllers/logout');

const router = express.Router();

router.post('/login',authController.logout);


module.exports = router;