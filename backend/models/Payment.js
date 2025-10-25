/**
 * @file Payment model schema
 * @description Stores payment transactions between client and coach
 */

const mongoose = require('mongoose');

/**
 * @typedef Payment
 * @property {mongoose.ObjectId} user - Client user ID
 * @property {mongoose.ObjectId} coach - Coach user ID
 * @property {Number} amount - Payment amount
 * @property {String} status - Payment status
 * @property {String} gateway - Payment gateway used
 * @property {String} transactionId - Gateway transaction ID
 * @property {Date} createdAt - Time of transaction
 */
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  gateway: { type: String },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);