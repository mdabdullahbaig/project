var user = require('../models/user');
const router = require('express').Router();
var userdata = user.createStrategy();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};
router.get('/', (req, res) => {


    res.render('index', {
        user: userdata
    });
});
// router.get('/update', (req, res) => {
//     res.render('update');
// });
//edit user
router.get("/update", function (req, res) {
    user.findById(req.params.id, function (err, foundUser) {
        res.render("update", {
            user: foundUser
        });
    });
});

router.post('/update', (req, res) => {
    user.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/home");

        }
    });
})


// router.put("/home/:id", checkCartOwnership, function(req,res){
//     //find and update correct cart
//     Cart.findByIdAndUpdate(req.params.id, req.body.cart, function(err, updatedCart){
//         if(err){
//             res.redirect("/home");
//         } else{
//             req.flash("success", "Product Successfully Updated!!!");
//             res.redirect("/home/" + req.params.id);

//         }
//     });
// });


router.get("*", authCheck, (req, res) => {
    res.send("Page Not Found - 404 ");
})



module.exports = router;