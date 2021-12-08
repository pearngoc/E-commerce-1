const userService = require('./userService')
exports.login = (req, res) => {
    const wrong = req.query['wrong'] !== undefined;

    res.render('authentication/views/login', {wrong});
}

exports.logout = (req, res) =>{
    req.logout();
    res.redirect('/');
}

exports.renderRegister = (req, res)=>{
    res.render('authentication/views/register')
}

exports.register = async(req, res)=>{
    const {username, email, password}  = req.body
    const user = await userService.register(username, email, password); 
    res.redirect('/login');
}