const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema ({
    serviceId: {type: String, required: true, trim: true},
    userId: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    timeApproximate: {type: Number, required: true},
    timeReal: {type: Number, required: true}
    
})

// Export
module.exports = mongoose.model('Book', BookSchema);