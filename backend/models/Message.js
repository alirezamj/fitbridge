/**
 * @file Message model schema
 * @description Stores chat messages between users
 */

const mongoose = require('mongoose');

/**
 * @typedef Message
 * @property {mongoose.ObjectId} sender - Sender user ID
 * @property {mongoose.ObjectId} receiver - Receiver user ID
 * @property {String} content - Message text
 * @property {Date} timestamp - Time of sending
 */
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);