/**
 * @file Main API router
 */

const express = require('express');
const router = express.Router();


const authRoutes = require('./auth');
const workoutRoutes = require('./workout');
const dietRoutes = require('./diet');
const clientRoutes = require('./client');
const coachRoutes = require('./coach');
const cartRoutes = require('./cart');


router.use('/auth', authRoutes);
router.use('/workouts', workoutRoutes);
router.use('/diets', dietRoutes);
router.use('/client', clientRoutes);
router.use('/coach', coachRoutes);
router.use('/cart', cartRoutes);


module.exports = router;