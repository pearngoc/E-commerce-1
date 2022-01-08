const userModel = require('../component/authentication/userModel')
const userService = require('../component/authentication/userService')
module.exports = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await userModel.find({username: username}).lean();
    if(user[0]){
        console.log('AA')
        if(user[0].lock_status){
            res.json({message: "Your account has been locked by admin"})
        }else{
            if(user[0] && await userService.validPassword(password, user[0])){
                if(user[0].status == "activated"){
                    next();
                }else{
                    res.json({message: "Your account is not active"})
                }
            }else{
                res.json({message: "Username or password is not correct!"})
            }
        }
    }else{
        res.json({message: "Account does not exists"})
    }
    
}