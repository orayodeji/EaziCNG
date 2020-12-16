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
    price:{
        type : String,
        required: true
    },
    img:{
        type : String,
        required: false
    },
    logo:{
        type : String,
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