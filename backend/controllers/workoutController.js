/**
 * @file Workout controller
 * @description Handles workout log creation and retrieval
 */

const WorkoutLog = require('../models/WorkoutLog');

/**
 * Creates a new workout log
 * @param {object} req
 * @param {object} res
 */
const createWorkout = async (req, res) => {
  try {
    const { date, exercises, notes } = req.body;
    const workout = await WorkoutLog.create({
      user: req.user.id,
      date,
      exercises,
      notes
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workout', error: err.message });
  }
};

/**
 * Retrieves all workout logs for the authenticated user
 * @param {object} req
 * @param {object} res
 */
const getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutLog.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workouts', error: err.message });
  }
};

module.exports = { createWorkout, getWorkouts };