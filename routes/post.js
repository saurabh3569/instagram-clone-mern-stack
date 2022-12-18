const express = require('express')
const router = express.Router()
const {createpost,deletepost,mypost,getallpost,likepost,commentpost} = require('../controllers/post')


// create post
router.post('/create',createpost)

// delete post
router.delete('/delete/:id',deletepost)

// get my post 
router.get('/mypost/:id',mypost)

// get all post
router.get('/getallpost',getallpost)

// like post
router.put('/like/:id',likepost)

// comment post
router.post('/comment/:id',commentpost)



module.exports = router 