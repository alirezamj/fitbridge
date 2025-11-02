const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { submitProfile, getAssignedCoach, getCoaches, getClientStats } = require('../controllers/clientController');



// POST /api/client/profile
router.post('/profile', authMiddleware, submitProfile );



// GET /api/client/coach
router.get('/coach', authMiddleware, getAssignedCoach);


// GET /api/client/coachs
router.get('/coachs', authMiddleware, getCoaches);


router.get('/stats', authMiddleware, getClientStats);

module.exports = router;