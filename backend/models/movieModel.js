const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim:true
    },
    cast: {
        type:Array
    },
    language: {
        type:String,
        required: true,
    },
    genre: {
        type:String,
        required: true,
    },
    location :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    }]
},{
    timestamps:true
})


const Movie = mongoose.model('Movie', MovieSchema)


module.exports = Movie