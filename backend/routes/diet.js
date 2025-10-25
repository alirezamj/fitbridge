/**
 * @file Diet routes
 * @description Routes for diet logging
 */

/**
 * @swagger
 * tags:
 *   name: Diet
 *   description: Nutrition and diet tracking
 */


const express = require('express');
const router = express.Router();
const { createDietLog, getDietLogs } = require('../controllers/dietController');
const { requireAuth } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /diets:
 *   post:
 *     summary: Create a new diet log
 *     tags: [Diet]
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
 *               - meals
 *               - totalCalories
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - calories
 *                   properties:
 *                     name:
 *                       type: string
 *                       minLength: 2
 *                     calories:
 *                       type: number
 *               totalCalories:
 *                 type: number
 *               notes:
 *                 type: string
 *           example:
 *             date: "2025-09-24"
 *             meals:
 *               - name: "Breakfast - Eggs and Toast"
 *                 calories: 350
 *               - name: "Lunch - Chicken Salad"
 *                 calories: 500
 *             totalCalories: 850
 *             notes: "Felt energetic today"
 *     responses:
 *       201:
 *         description: Diet log created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */



/**
 * @route POST /api/diets
 * @desc Create a new diet log
 */
router.post('/', requireAuth, createDietLog);


/**
 * @swagger
 * /diets:
 *   get:
 *     summary: Get all diet logs for the user
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of diet logs
 *         content:
 *           application/json:
 *             example:
 *               logs:
 *                 - date: "2025-09-24"
 *                   totalCalories: 850
 *                   meals:
 *                     - name: "Breakfast - Eggs and Toast"
 *                       calories: 350
 *                     - name: "Lunch - Chicken Salad"
 *                       calories: 500
 *                   notes: "Felt energetic today"
 *       401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/', requireAuth, getDietLogs);

module.exports = router;