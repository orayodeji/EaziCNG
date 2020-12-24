const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const compareSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User' 
    },
    name: {
        type : String,
        required: true
    },
    url: {
        type : String,
        required: true
    },
    discount:{
        type:String,
        required:false
    },
    old_price:{
        type:String,
        required:false
    },
    price:{
        type : String,
        required: true
    },
    img:{
        type : String,
        required: false
    },
    vendor:{
        type : String,
        required: false
    },
    specification:{
        type: Array,
        required: false
    },
    features:{
        type: Array,
        required: false
    },
    brand:{
        type : String,
        required: false
    }
}, {timestamps: true});

const Compare = mongoose.model('Compare', compareSchema)
module.exports = Compare;