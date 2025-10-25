/**
 * @file Auth middleware
 * @description Protects routes by verifying JWT token
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to verify JWT and attach user to request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { requireAuth };