const router = require('express').Router();
const Product = require('../models/product');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get('/addproduct', authCheck, (req, res) => {
    res.render('addproduct', {
        user: req.user
    });
});

router.post('/addproduct', authCheck, (req, res) => {
   
       var productname = req.body.productname;
        var imgurl01 = req.body.imgurl01;
        var imgurl02 = req.body.imgurl02;
        var imgurl03 = req.body.imgurl03;
        var imgurl04 = req.body.imgurl04;
        var price = req.body.price;

        var newProduct = {productname: productname,
                            imgurl01:imgurl01,
                             imgurl02:imgurl02,
                             imgurl03:imgurl03,
                             imgurl04:imgurl04,
                             price:price };

        Product.create(newProduct, function(err, newlyCreated) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/home');   
            }
        })
    });


module.exports = router;