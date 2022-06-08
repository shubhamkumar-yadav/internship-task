const mongoose = require('mongoose');
const db_link = 'mongodb+srv://codeWithShubham:shubhamkinidhi130617@ecommerceweb.spevi.mongodb.net/PROJECT?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("plan connected to database");
})
.catch(function(error){
    console.log("error while connecting to databse",error.message);
})



const planSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name should not be greater than 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount < 100
        },'discount cant be more than 100%']
    }
});



const planModel = mongoose.model('planModel',planSchema);

module.exports = planModel;