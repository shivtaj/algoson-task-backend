const mongoose = require('mongoose');

const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:"User Name should not be empty"
    },
    firstName:{
        type:String,
        required:"First Name should not be empty"
    },
    lastName:{
        type:String,
        required:"Last NAme should not be empty"
    },
    
    email:{
        type:String,
        required:'email should not be empty',
        unique: true
    },
    password:{
        type:String,
        required:'password can not be empty',
        minlength:[4,'password must be altleast for 4 character']
    },
    image:{
        data: Buffer, 
        contentType: String,
    },
    saltSecret: String
});

userSchema.path('email').validate((val) =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val));
},'invalid email');

userSchema.pre('save',function(next){
     bcrypt.genSalt(10, (err, salt) =>{
         bcrypt.hash(this.password, salt, (err, hash) =>{
             this.password = hash;
             this.saltSecret = salt;
             next();
         });

     });
});

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

module.export = mongoose.model('User', userSchema);  