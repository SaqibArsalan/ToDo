var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
      type: String,
        default: ''
    },
    password: {
      type: String,
      
    }
});

module.exports = mongoose.model('User', User);