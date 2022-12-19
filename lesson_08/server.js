require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3500
const {logger, logEvent} = require('./middleware/logger')
const {errorHandler} = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/', require("./routes/root"))
app.use("/users",require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use(express.json())
mongoose.set('strictQuery', true);
connectDB()


app.all("*",(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if(req.accepts('json')){
        res.json({message:"404 not found!"})
    }else{
        res.type("txt").send("404 not found!")
    }
})

// app.use(errorHandler)


mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,`mongoErrLog.log`)
})