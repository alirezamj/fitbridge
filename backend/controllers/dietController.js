/**
 * @file Diet controller
 * @description Handles diet log creation and retrieval
 */

const DietLog = require('../models/DietLog');

/**
 * Creates a new diet log
 * @param {object} req
 * @param {object} res
 */
const createDietLog = async (req, res) => {
  try {
    const { date, meals, totalCalories, notes } = req.body;
    const dietLog = await DietLog.create({
      user: req.user.id,
      date,
      meals,
      totalCalories,
      notes
    });
    res.status(201).json(dietLog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create diet log', error: err.message });
  }
};

/**
 * Retrieves all diet logs for the authenticated user
 * @param {object} req
 * @param {object} res
 */
const getDietLogs = async (req, res) => {
  try {
    const logs = await DietLog.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch diet logs', error: err.message });
  }
};

module.exports = { createDietLog, getDietLogs };