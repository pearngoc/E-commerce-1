const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema  = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    id:{
        type: String, 
        required: true,
    },
    username:{
        type: String,
        default: ""
    },
    items:{
        type: Array,
        default: [], 
        required: true
    },
    phone:{
        type: String,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true
    },
    totalItem:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    paymentType:{
        type: String,
        default: 'COD'
    },
    status:{
        type: String, 
        default: 'order confirmed'
    }

}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema);