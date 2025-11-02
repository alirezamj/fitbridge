const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema({
    clientId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coachId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true},
    height: { type: Number, required: true},
    weight: { type: Number, required: true},
    goals: {type: String, required: true},
    status: {type: String, enum:['pending', 'accepted', 'rejected']},
    createdAt: {type: Date, default: Date.now}
});



module.exports = mongoose.model('ClientProfile', clientProfileSchema);