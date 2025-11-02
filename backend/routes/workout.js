/**
 * @file Workout routes
 * @description Routes for workout logging
 */

/**
 * @swagger
 * tags:
 *   name: Workout
 *   description: Workout log management
 */

const express = require('express');
const router = express.Router();
const { createWorkout, getWorkouts } = require('../controllers/workoutController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout log
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - exercises
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - sets
 *                     - reps
 *                   properties:
 *                     name:
 *                       type: string
 *                       minLength: 2
 *                     sets:
 *                       type: integer
 *                       minimum: 1
 *                     reps:
 *                       type: integer
 *                       minimum: 1
 *                     weight:
 *                       type: number
 *               notes:
 *                 type: string
 *           example:
 *             date: "2025-09-24"
 *             exercises:
 *               - name: "Bench Press"
 *                 sets: 3
 *                 reps: 10
 *                 weight: 60
 *               - name: "Squats"
 *                 sets: 4
 *                 reps: 12
 *                 weight: 80
 *             notes: "Felt strong today"
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', authMiddleware, createWorkout);

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workout logs for the user
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout logs
 *         content:
 *           application/json:
 *             example:
 *               logs:
 *                 - date: "2025-09-24"
 *                   exercises:
 *                     - name: "Bench Press"
 *                       sets: 3
 *                       reps: 10
 *                       weight: 60
 *                     - name: "Squats"
 *                       sets: 4
 *                       reps: 12
 *                       weight: 80
 *                   notes: "Felt strong today"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', authMiddleware, getWorkouts);

module.exports = router;