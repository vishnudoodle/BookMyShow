const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const auth =async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({'email': decoded._id, 'token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(404).send({error:"please authenticate."})
    }
}

module.exports = auth