const mongoose = require('mongoose')

const User = new mongoose.Schema({

    name : {
        type:String,
        required:true,
    },
    username : {
        type:String,
        required:true,
        unique: true,
    },
    profilepic : {
        type:String,
        default: "https://i.ibb.co/Jc6cLM7/download.jpg",
    },
    email : {
        type:String,
        required:true,
        unique: true,
    },
    password : {
        type:String,
        required:true
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },

},{ timestamps : true })

module.exports = mongoose.model("User",User)