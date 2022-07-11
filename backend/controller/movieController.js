const Movie = require("../models/movieModel")
const { validationResult } = require('express-validator')

module.exports = {
    createMovieController : async (req,res)=>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).send({ "msg" : errors.array()})
            }else{
                const movie = new Movie(req.body)
                await movie.save()
                res.status(201).send(movie)
            }
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    getAllMovieController : async (req,res)=>{
        let movie = ""
        try{
            if(req.body.language){
               movie = await Movie.find({ language : req.body.language })
            }else if(req.body.genre){
                movie = await Movie.find({ genre: req.body.genre})
            }else{
                if(req.query.sortBy == 'name'){
                    movie = await Movie.find({}).sort({ "name" : 1})
                }else if(req.query.sortBy == 'language'){
                    movie = await Movie.find({}).sort({ "language" : 1})
                }else {
                    movie = await Movie.find({})
                }
            }
            res.status(200).send(movie)
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
}