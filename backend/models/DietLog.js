/**
 * @file DietLog model schema
 * @description Tracks daily meals and nutritional intake
 */

const mongoose = require('mongoose');

/**
 * @typedef DietLog
 * @property {mongoose.ObjectId} user - Reference to the user
 * @property {Date} date - Date of diet entry
 * @property {Array} meals - List of meals with nutritional values
 * @property {Number} totalCalories - Total calories consumed
 * @property {String} notes - Optional notes
 */
const dietLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  meals: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number
    }
  ],
  totalCalories: Number,
  notes: String
});

module.exports = mongoose.model('DietLog', dietLogSchema);