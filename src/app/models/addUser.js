const UserDetails = require('./Users');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoahnvithuy:khoa6122003@atn.n7owox5.mongodb.net/ATN?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected!'));

// UserDetails.register({ username: 'candy', active: false }, 'cane');
// UserDetails.register({ username: 'starbuck', active: false }, 'redeye');

UserDetails.register({ username: 'admin', active: false , role:'admin', email: 'admin@gmail.com', phone :'0987654321'}, 'admin123', (err, user) => {
    if (err) {
      console.error(err);
    } else {
      console.log('User user created successfully');
    }
  });
// UserDetails.register({ username: 'user', active: false }, 'user123','user','user@gmail.com','0987654321');
