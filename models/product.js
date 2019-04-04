var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productSchema = new Schema({
    productname: {
        type:  String,
        required: true,
        trim: true,
        minlength: true
    },
    imgurl01: {
        type: String,
        required: true
    },

    imgurl02: String,
    imgurl03: String,
    imgurl04:String,
    
    price: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now() + 34200000
    },
    
});  


module.exports = mongoose.model("Product",productSchema);

