const mongoose = require('mongoose');

const User = mongoose.model('User');
const dbs = require("../db");
const ObjectID = require('mongodb').ObjectID;


const dbName = "task";
const collectionName = "user_record";


module.exports.register =  (req, res) => {
    console.log('entering')
        var user = new User();
        user.userName = req.body.userName;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;

        console.log(user)
        dbs.initialize(dbName, collectionName, function (dbCollection) {
            dbCollection.insertOne(req.body, (error, result) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    res.send(result.result);
                });

        })
        

    };

module.exports.userList = (req, res, next) => {
    dbs.initialize(dbName, collectionName, function (dbCollection) {
        let test = []; // successCallback
        // get all items
        dbCollection.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
        });

    });

}


module.exports.deleteUser =  (req, res, next) =>{
    dbs.initialize(dbName, collectionName, function (dbCollection) {
       
        const showid = ObjectID(req.params.id);
        dbCollection.deleteOne({_id:showid},function(err,result){
            if(err) throw err;
            console.log('the document is deleted')
            res.send(result);
    
        });
         
    });
}
  




