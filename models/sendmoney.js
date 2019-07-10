var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var sendmoneySchema = new Schema({
    emailid: {
        type:  String,
        required: true,
        trim: true,
        minlength: true
    },
    rupees: {
        type: Number,
        required: true,
        trim: true,
        minlength: true
        
    },
    message: {
        type: String,
        trim: true
       
    },
    createdAt: {
        type: Date,
        default: Date.now() + 34200000
    },
    
});  


module.exports = mongoose.model("Sendmoney",sendmoneySchema);

