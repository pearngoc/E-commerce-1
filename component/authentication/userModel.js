const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        //unique: true
    },
    password: {
        type: String,
    },
    username: {
        type: String,
        default: "",
        require: true,
    },

    isAdmin:{
        type: Boolean,
        default: false,
    },

    avatar: {
        type: String,
        default: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    },

    phoneNumber:{
        type: String,
        default: "",
        min: 10,
        max: 12
    },

    address:{
        type: String,
        default: ""
    },
    
    lock_status:{
        type: Boolean,
        default: false
    },

    authType:{
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },

    authGoogleID:{
        type: String,
        default: null,
    }, 

    activationString:{
        type: String,
        default: "",
    }, 
    
    status:{
        type: String,
    }

    // cart:{
    //     items:[{
    //         productId:{
    //             type: mongoose.Types.ObjectId,
    //             ref: 'Product',
    //             require: true
    //         },
    //         qty:{
    //             type: Number,
    //             require: true
    //         }
    //     }],
    //     totalPrice: Number
    // }



},{timestamps: true})


module.exports = mongoose.model("User", userSchema)
