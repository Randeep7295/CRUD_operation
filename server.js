const express = require('express')
const morgan = require('morgan');

// if you used post request so you will need the body of the request, so you will need body-parser 
const bodyparser = require("body-parser");

const path = require('path');

const app = express();


const connectDB = require('./server/database/connection')



// Environment variables in Node are used to store sensitive data such as passwords, API credentials, and other information that should not be written directly in code.
// for connecting the env file server.js
const port = 3000;


// log request
app.use(morgan('tiny'))

// mongodb connection
connectDB();


// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))


// set view engine by default it will enter into views folder
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"))


// load asset
// this show name used to refer it
app.use('/CSS',express.static(path.resolve(__dirname,"./assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"./assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"./assets/js")))




// load router
app.use('/',require("./server/routes/router"))

app.listen(port,()=>{
    console.log(`Listening to server ${port}`)
})
