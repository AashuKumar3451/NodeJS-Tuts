const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    isDrink:{
        type:Boolean,
        required:true,
        default:false
    },
    ingredients:{
        type: String,
        required:true,
        enum:['chicken','fish','veg']
    },
    numOfSales:{
        type:Number,
        default:0
    }
});

const Menu = mongoose.model("Menu",menuItemSchema);
module.exports = Menu;