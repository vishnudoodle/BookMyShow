const { Router } = require("express")
const auth = require("../middleware/auth")
const { check } = require('express-validator')
const userController = require("../controller/userController")
const router = new Router()

router.post('/create',[
    check('email', 'Email is required')
    .isEmail(), 
    check('password', 'Password is requried')
    .notEmpty(),
],userController.createUserController)

router.post("/login",[
    check('email', 'Email is required')
    .isEmail(), 
    check('password', 'Password is requried')
    .notEmpty(),
],userController.loginUserController)

router.get("/me", auth, userController.meUserController)

router.get("/logout", auth,userController.logoutUserController )

module.exports = router