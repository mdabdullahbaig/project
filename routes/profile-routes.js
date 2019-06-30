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
    // res.render('index', {
    //     user: req.user
    // });


    // router.get("/home", function(req, res){
    var noMatch = null;
    if (req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all products from DB
        Product.find({
            productname: regex
        }, function (err, allProducts) {
            if (err) {
                console.log(err);
            } else {
                if (allProducts.length < 1) {
                    noMatch = "No Products match that query, please try again.";
                }
                res.render("index", {
                    products: allProducts,
                    noMatch: noMatch
                });
            }
        });
    } else {
        // Get all campgrounds from DB

        Product.find({}, function (err, allProducts) {
            if (err) {
                console.log(err);
            } else {
                res.render("index", {
                    products: allProducts,
                    noMatch: noMatch,
                    user: req.user
                });
            }
        });

    }
});

router.get('/aboutpage', authCheck, (req, res) => {
    res.render('aboutpage');
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

    var newProduct = {
        productname: productname,
        imgurl01: imgurl01,
        imgurl02: imgurl02,
        imgurl03: imgurl03,
        imgurl04: imgurl04,
        price: price
    };

    Product.create(newProduct, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    })
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;