const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const crypto = require('crypto');
const db_link = 'mongodb+srv://codeWithShubham:shubhamkinidhi130617@ecommerceweb.spevi.mongodb.net/PROJECT?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("connected to database");
})
.catch(function(error){
    console.log("error while connecting to databse",error.message);
})
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword == this.password
        }
    },
    role:{
        type:String,
        enum:["admin","user","restaurantOwner","deliveryBoy"],
        default:"user"
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
})
userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}





const userModel = mongoose.model('signupAndLogin',userSchema);
module.exports = userModel;