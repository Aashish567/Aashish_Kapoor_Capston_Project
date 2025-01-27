const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newSchema = new Schema({

    title:{
        type:String,
        required:true
        
    },

    price:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

});

const User = mongoose.model('User', newSchema);
module.exports= User;