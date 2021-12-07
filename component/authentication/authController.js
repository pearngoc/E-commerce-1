exports.login = (req, res) => {
    const wrong = req.query['wrong'] !== undefined;

    res.render('authentication/views/login', {wrong});
}

exports.logout = (req, res) =>{
    req.logout();
    res.redirect('/');
}