/**
 * @file User model schema
 * @description Represents a user in the system, either a coach or a client
 */

const mongoose = require('mongoose');

/**
 * @typedef User
 * @property {String} role - User role: 'coach' or 'client'
 * @property {String} name - Full name of the user
 * @property {String} email - Unique email address
 * @property {String} password - Hashed password
 * @property {String} avatar - Profile image URL
 * @property {String} bio - Short description or bio
 * @property {String} goals - Fitness goals
 * @property {Number} age - Age in years
 * @property {Number} height - Height in centimeters
 * @property {Number} weight - Weight in kilograms
 * @property {mongoose.ObjectId} coach - Reference to assigned coach
 * @property {Date} createdAt - Account creation date
 */
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['coach', 'client'], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  goals: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);