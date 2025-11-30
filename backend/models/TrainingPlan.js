const mongoose = require('mongoose');

const trainingPlanSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    title: { type: String, required: true},
    sessions: [
        {
        day: String,
        exercises: [String]
        }
    ],
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'TrainingPlan', trainingPlanSchema);