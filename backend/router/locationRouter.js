const { Router } = require("express")
const auth = require("../middleware/auth")
const { check } = require('express-validator')
const locationController = require("../controller/locationController")
const router = new Router()

router.post('/create',[
    check('theatrename', 'theatrename is required')
    .notEmpty(), 
    check('price', 'price is requried')
    .notEmpty(),
    check('location', 'location is requried')
    .notEmpty()
], locationController.createLocationController)

router.get("/alllocation", locationController.getAllLocationController)

router.post("/singlelocation", locationController.getsingleLocationController)

module.exports = router