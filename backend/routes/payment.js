/**
 * @file Payment routes
 * @description Zarinpal payment integration
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Checkout and payment verification
 */

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const {
  initiatePayment,
  handlePaymentCallback,
} = require('../controllers/paymentController');

/**
 * @swagger
 * /payment/checkout:
 *   post:
 *     summary: Initiate payment via Zarinpal
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment URL generated
 *         content:
 *           application/json:
 *             example:
 *               redirectUrl: "https://sandbox.zarinpal.com/pg/StartPay/AuthorityCode"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/checkout', requireAuth, initiatePayment);

/**
 * @swagger
 * /payment/callback:
 *   get:
 *     summary: Handle Zarinpal callback after payment
 *     tags: [Payment]
 *     parameters:
 *       - name: Authority
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: Status
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verified and order created
 *       400:
 *         description: Payment failed or canceled
 *         content:
 *           application/json:
 *             example:
 *               error: "Payment verification failed"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/callback', handlePaymentCallback);

module.exports = router;