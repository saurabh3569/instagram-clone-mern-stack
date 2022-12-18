const User = require("../models/User")
const bcrypt = require("bcrypt");



const Register = async(req,res) => {
    const {name,username,email,password} = req.body

    if(!name || !username || !email || !password){
        return res.status(403).json('pls fill all the field')
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newuser = new User({name,username,email,password:hashedPassword})

        if(await User.findOne({username:username})) return res.status(403).json("username already exist");
       if(await User.findOne({email:email})) return res.status(403).json("email already exist");
        
        const user = await newuser.save()
        const { password, createdAt, ... other} = user._doc
        res.status(200).json(other)
  
    } catch (error) {
        res.status(500).json(error)        
    }
}

const Login = async(req,res) => {

    if(!req.body.email || !req.body.password){
        return res.status(403).json('pls fill all the field')
    }

    try {
        const user = await User.findOne({email:req.body.email})

        if(!user) return res.status(404).json('user not exist')

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) return res.status(400).json("wrong credentials")

        const { password, createdAt,updatedAt, ... other} = user._doc       
        res.status(200).json(other)
  
    } catch (error) {
        res.status(500).json(error)        
    }
}

module.exports = {Register,Login}   