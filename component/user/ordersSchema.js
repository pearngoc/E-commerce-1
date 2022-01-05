const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema  = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty:{
            type: Number
        }
    }],
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    paymentType:{
        type: String,
        default: ''
    },
    detailPayment:{
        type: String, 
        default: ''
    },
    status:{
        type: String, 
        default: 'ordered'
    },
    

}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema);