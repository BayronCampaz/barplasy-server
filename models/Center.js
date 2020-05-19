const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CenterSchema = new Schema ({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique:true},
    password: {type: String, required: true, trim: true},
    ownerId: {type: String, required: true, trim: true},
    ownerName: {type: String, required: true, trim: true},
    cellphone: {type: String, required: true, trim: true},
    score: {type: Number},
    banner: {type: String, trim: true},
    image:{type: String, trim: true},
    role: {type: String, required:true, trim: true},
    typeSchedule: {type: String},
    location: { city: {type: String}, address : {type : String}, latitude : {type : Schema.Types.Decimal128}, longitude : {type : Schema.Types.Decimal128}  },
    register: {type: Date, default: Date.now}
    
})

// Export
module.exports = mongoose.model('Center', CenterSchema);