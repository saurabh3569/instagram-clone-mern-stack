const express = require('express')
const router = express.Router()
const {Register,Login} = require('../controllers/auth')

// create account
router.post('/register',Register)

// login
router.post('/login',Login)


module.exports = router 