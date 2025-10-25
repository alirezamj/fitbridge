/**
 * @file Progress model schema
 * @description Tracks physical progress metrics over time
 */

const mongoose = require('mongoose');

/**
 * @typedef Progress
 * @property {mongoose.ObjectId} user - Reference to the user
 * @property {Date} date - Date of progress entry
 * @property {Number} weight - Weight in kilograms
 * @property {Number} bodyFat - Body fat percentage
 * @property {Number} muscleMass - Muscle mass percentage
 * @property {String} notes - Optional notes
 */
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: Number,
  bodyFat: Number,
  muscleMass: Number,
  notes: String
});

module.exports = mongoose.model('Progress', progressSchema);