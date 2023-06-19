const mongoose = require('mongoose');

async function connect(){
    mongoose.connect('mongodb+srv://khoahnvithuy:khoa6122003@atn.n7owox5.mongodb.net/ATN?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected!'));
}

module.exports = {connect};