const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    theatrename: {
        type:String,
        required: true,
        trim:true
    },
    timing: {
        type:Array
    },
    price: {
        type: Number,
        required: true
    },
    location :{
        type:String,
        required: true
    }
},{
    timestamps:true
})

LocationSchema.virtual('Movies',{
    ref:'Movie',
    localField:"_id",
    foreignField:"location"

})
const Location = mongoose.model('Location', LocationSchema)


module.exports = Location