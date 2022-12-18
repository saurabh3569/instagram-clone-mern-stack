const express = require('express')
const { getuser , followuser, getalluser, getuserName, updatepic } = require('../controllers/user')
const router = express.Router()

// get all user
router.get('/',getalluser)

// get a user by id
router.get('/:id',getuser)

// get a user by username
router.get('/profile/:username',getuserName)

// follow or unfollow user
router.put('/follow/:id',followuser)

// update profile pic
router.put('/updatepic/:id',updatepic)


module.exports = router 