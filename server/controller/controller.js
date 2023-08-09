var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    // The req. body property contains key-value pairs of data submitted in the request body
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database using form
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    // for getting single user
    // if we pass id parameter of query (id is located)
    if(req.query.id){
        // storeing id 
        const id = req.query.id;

        // userdb.findById() return promise so we use then  & the value returned by userdb.findById() is strored in data include collection at that id 
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    // if you have the route/student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 
    // now id using params
    const id = req.params.id;

    // The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    // The then() method in JavaScript has been defined in the Promise API and is used to deal with asynchronous tasks such as an API call.
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{

    // if you have the route/student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 
    const id = req.params.id;

    // The findByIdAndDelete() function is used to find a matching document, removes it, and passing the found document (if any) to the callback.
    // The findByIdAndDelete() method is a convenient function provided by Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. This method is used to find a document by its ID and delete it from the MongoDB collection.
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}