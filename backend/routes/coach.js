const express = require('express');
const router = express.Router();
const { getPendingClients, acceptClient } = require('../controllers/coachController');
const authMiddleware = require('../middlewares/authMiddleware.js');


const coachOnly = (req, res, next) => {
    if (!req.user.role === 'coach') return res.status(403).json({ error: 'Access denied'});
    next();
};


// GET /api/coach/requests
router.get('/requests', authMiddleware, coachOnly, getPendingClients);

//POST /api/coach/accept-client
router.post('/accept-client', authMiddleware, acceptClient);


module.exports = router;

