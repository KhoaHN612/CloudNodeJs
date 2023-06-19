const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// mongoose.connect('mongodb+srv://khoahnvithuy:khoa6122003@atn.n7owox5.mongodb.net/ATN?retryWrites=true&w=majority',
//         { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected!'));

const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
  role: String,
  email: String,
  phone: Number,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);