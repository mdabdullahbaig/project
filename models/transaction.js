var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var transactionSchema = new Schema({
    avlbalance: {
        type:  Number,
        required: true,
        trim: true,
        minlength: true
    },
    deposit: {
        type: Number
        
    },
    credit: {
        type: Number
       
    },
    createdAt: {
        type: Date,
        default: Date.now() + 34200000
    },
    
});  


module.exports = mongoose.model("Transaction",transactionSchema);

