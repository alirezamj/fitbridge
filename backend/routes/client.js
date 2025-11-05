const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    submitProfile,
    getAssignedCoach, 
    getCoaches, 
    getClientStats,
    getClientProfile
 } = require('../controllers/clientController');



// POST /api/client/profile
router.post('/profile', authMiddleware, submitProfile );

//POST /api/client/profiles        list of forms submitted by user to display
router.get('/profiles', authMiddleware, getClientProfile);

// GET /api/client/coach
router.get('/coach', authMiddleware, getAssignedCoach);


// GET /api/client/coachs
router.get('/coachs', authMiddleware, getCoaches);


router.get('/stats', authMiddleware, getClientStats);



module.exports = router;