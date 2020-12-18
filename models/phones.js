const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const phoneSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    url: {
        type : String,
        required: true
    },
    discount:{
        type : String,
        required: false
    },
    price:{
        type : String,
        required: true
    },
    old_price:{
        type : String,
        required: true
    },
    img:{
        type : String,
        required: true
    },
    brand:{
        type : String,
        required: true
    },
    type:{
        type : String,
        required: true
    },
    category:{
        type : String,
        required: true
    },
    logo:{
        type : String,
        required: true
    },
    details:{
        type: Array,
        required: false
    },
    features:{
        type: Array,
        required: false
    },
    specification:{
        type:Array,
        required: false
    },
    description:{
        type: String,
        required:false
    },
    vendor:{
        type:String,
        required:false
    }
})

const Phone = mongoose.model('Phone', phoneSchema)
module.exports = Phone;