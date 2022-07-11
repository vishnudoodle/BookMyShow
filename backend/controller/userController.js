const User = require("../models/userModel")
const { validationResult } = require('express-validator')

module.exports = {
    createUserController : async (req,res)=>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).send({ "msg" : errors.array()})
            }else{
                const user = new User(req.body)
                await user.save()
                res.status(201).send(user)
            }
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    loginUserController : async (req,res)=>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).send({ "msg" : errors.array()})
            } else{
                const user = await User.findByCredentials(req.body.email,req.body.password)
                if(user.msg){
                    res.send(user)
                }else{
                    await user.generateAuthToken()
                    res.send(user)
                }
            }
           
        }catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    meUserController : async (req,res)=>{
        try{
            const user = await User.find(req.user)
            res.send(user)
        }catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    logoutUserController : async (req,res)=>{
        try{
            req.user.token = null
            await req.user.save()
            res.send("logout successfully")
        }catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    }
}