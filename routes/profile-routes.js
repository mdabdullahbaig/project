const router = require('express').Router();

const isloggin = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', isloggin, (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/addproduct', isloggin, (req,res) => {
    res.render('addproduct', {user: req.user});
});


module.exports = router;