const { Router } = require("express")
const auth = require("../middleware/auth")
const { check } = require('express-validator')
const movieController = require("../controller/movieController")
const locationController = require("../controller/locationController")
const router = new Router()

router.post('/create',[
    check('name', 'name is required')
    .notEmpty(), 
    check('language', 'language is requried')
    .notEmpty(),
    check('genre', 'genre is requried')
    .notEmpty()
], movieController.createMovieController)

router.post("/allmovie", movieController.getAllMovieController)

router.get("/location/:id", locationController.getLocationController)



module.exports = router