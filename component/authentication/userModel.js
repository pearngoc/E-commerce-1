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
        required: true,
        min: 6,
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
        default: "",
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
    }



},{timestamps: true})

module.exports = mongoose.model("User", userSchema)
