const userModel = require('../component/authentication/userModel')
const userService = require('../component/authentication/userService')
module.exports = async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.find({username: username}).lean();
    if(user[0] && userService.validPassword(password, user[0])){
        if(user.status == "activated"){
            next();
        }else{
            const message = "Your account is not active"
            res.render('authentication/views/login', {message, username, password});
        }
    }else{
        const error = "Username or password is not correct!"
        res.render('authentication/views/login', {error, username, password});
    }
    
}