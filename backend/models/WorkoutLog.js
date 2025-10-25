/**
 * @file WorkoutLog model schema
 * @description Stores workout sessions and exercises for a user
 */

const mongoose = require('mongoose');

/**
 * @typedef WorkoutLog
 * @property {mongoose.ObjectId} user - Reference to the user
 * @property {Date} date - Date of workout
 * @property {Array} exercises - List of exercises performed
 * @property {String} notes - Optional notes
 */
const workoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number
    }
  ],
  notes: { type: String }
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);