const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema ({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique:true},
    password: {type: String, required: true, trim: true},
    cellphone: {type: String, required: true, trim: true},
    register: {type: Date, default: Date.now}
    
})

// Export
module.exports = mongoose.model('User', UserSchema);