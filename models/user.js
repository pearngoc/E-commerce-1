const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) =>{
            return validator.isEmail(value)
        }
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
    
    createAt:{
        type: Date,
        default: Date.now()
    },

    updateAt:{
        type: Date,
        default: Date.now(),
    }


})

module.exports = mongoose.model("User", userSchema)
