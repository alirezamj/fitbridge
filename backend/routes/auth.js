/**
 * @file Auth routes
 * @description Handles user registration and login
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 */
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @swagger
 * /auth/register
 *   post:
 *    summary: Register a new user
 *    tags: 
 *      [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 2
 *                 maxLength: 100
 *                      responses:
 *                         201:
 *                       description: Created successfully
 *                         400:
 *                       $ref: '#/components/responses/ValidationError'
 *                         401:
 *                       $ref: '#/components/responses/UnauthorizedError'
 *                         500:
 *                       $ref: '#/components/responses/ServerError'
 */



/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *
 *     responses:
 *        200:
 *      description: Login successful, JWT returned
 *      content:
 *      application/json:
 *      example:
 *      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 *        201:
 *      description: Created successfully
 *        400:
 *      $ref: '#/components/responses/ValidationError'
 *        401:
 *      $ref: '#/components/responses/UnauthorizedError'
 *        500:
 *      $ref: '#/components/responses/ServerError'
 */


/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT
 */
router.post('/login', loginUser);

module.exports = router;