const userModel = require('./userModel');

exports.findByUserName = (username)=>{
    return userModel.findOne({
        username: username
    }).lean()
}

exports.validPassword = (password, user)=>{
    return password === user.password;
}