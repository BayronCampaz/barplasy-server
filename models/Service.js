const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceSchema = new Schema ({
    centerId: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    time: {type: Number, required: true},
    price : {type : Schema.Types.Decimal128}
    
})

// Export
module.exports = mongoose.model('Service', ServiceSchema);