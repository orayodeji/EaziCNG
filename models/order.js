const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user: {type:Schema.Types.ObjectId, ref: 'User'},
    order: {type:Object, required:true},
    
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;