const express = require('express')
// allow us create route in diffrent file
const route = express.Router()
const axios = require('axios')

const controller = require('../controller/controller')

// how to use API to insert data in ejs file
route.get('/',(req,res)=>{
    // make a get request to api user 
    axios.get('http://localhost:3000/api/users')
    .then((response)=>{
        res.render('index.ejs',{users : response.data})
    })
    .catch(err=>{
        res.send(err)
    })
    
})

// how to show in form during updating particular user
route.get('/update-user',(req,res)=>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            //  user data contain all data that is present at that id so we transferring it to user and acess it via _show.ejs file
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })  
})


route.get('/add-user',(req,res)=>{
    res.render('add_user.ejs')
})

// API 
// a software intermediary that allows two applications to talk to each other. APIs are an accessible way to extract and share data within and across organizations.
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)

// for exporting module

module.exports = route
