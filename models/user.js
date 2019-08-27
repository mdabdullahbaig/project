var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  email:String,
  firstname: String,
  lastname: String,
  mobileno: Number,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('user',userSchema);
module.exports = User;