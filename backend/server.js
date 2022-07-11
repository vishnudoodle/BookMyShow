const express = require('express')
const cors = require('cors')

const userRouter = require('./router/userRouter')
const movieRouter = require('./router/movieRouter')
const locationRouter = require('./router/locationRouter')

const connectDB = require('./config/config')

const app = new express()


app.use(cors())
app.use(express.json())


require("dotenv").config();

app.use("/user",userRouter)
app.use("/movie",movieRouter)
app.use("/location",locationRouter)


const port = process.env.PORT || 5000


app.listen(port, ()=> {
    console.log("server is on port " + port)
    connectDB()
})