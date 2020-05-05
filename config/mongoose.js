const mongoose = require('mongoose');
let url = 'mongodb+srv://dbUser:barplasy2000@cluster0-6cofo.mongodb.net/barplasy?retryWrites=true&w=majority'

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

module.exports = db;