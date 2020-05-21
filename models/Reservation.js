const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema ({
    service: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', required: true, trim: true},
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true, trim: true},
    timeEstimatedStart: {type: Date, required: true},
    timeEstimatedFinish: {type: Date, required: true},
    timeRealStart: {type: Date},
    timeRealFinished: {type: Date},
    type: {type: String },
    state: {type: String},
    register: {type: Date, default: Date.now}
    
})

// Export
module.exports = mongoose.model('Reservation', ReservationSchema);