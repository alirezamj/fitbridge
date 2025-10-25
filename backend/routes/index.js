/**
 * @file Main API router
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const workoutRoutes = require('./workout');
const dietRoutes = require('./diet');


router.use('/auth', authRoutes);
router.use('/workouts', workoutRoutes);
router.use('/diets', dietRoutes);


module.exports = router;