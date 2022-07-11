const Location = require("../models/locationModel")
const { validationResult } = require('express-validator');
const Movie = require("../models/movieModel");

module.exports = {
    createLocationController : async (req,res)=>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).send({ "msg" : errors.array()})
            }else{
                const location = new Location(req.body)
                await location.save()
                res.status(201).send(location)
            }
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    getAllLocationController : async (req,res)=>{
        try{
            const locations = await Location.distinct("location")
            res.status(200).send(locations)
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    getLocationController: async (req,res)=>{
        try{
            const _id = req.params.id
            const movie = await Movie.findById({_id})
            const location = await Location.find({_id :movie.location})
            res.status(201).send(location)
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
    getsingleLocationController: async (req,res)=>{
        try{
            const getlocation = req.body.location
            const location = await Location.find({location : getlocation})
            res.status(201).send(location)
        } catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    },
}