const express = require("express");
const router = express.Router();
const authRoutes = require('./authRouter')


router.use('/user',authRoutes)



module.exports = router