const express = require('express')
const connect = require('./db/db')
const cors = require('cors');
const path = require('path')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')

const app = express() 

// middleware
app.use(express.json())
app.use(cors()) 


app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)
app.use('/api/user',userRoute)

// static files
app.use(express.static(path.join(__dirname,'./build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./build/index.html'))
})


const port = process.env.PORT || 5000

app.listen(port,()=>{
    connect()
    console.log(`server started on port : ${port}`);
})