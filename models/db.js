const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {  useCreateIndex: true, useNewUrlParser: true }, (err) =>{
    if(!err){
        console.log('database is connected successfully');
    }else{
    console.log('there is an error to connect mongodb,' +JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');