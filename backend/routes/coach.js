const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const { 
    getPendingClients,
    acceptClient, 
    getAcceptedClients, 
    getAcceptedClientById,
    createTrainingPlan
 } = require('../controllers/coachController');





// GET /api/coach/requests
router.get('/requests', authMiddleware, getPendingClients);

//Get /api/coach/accepted
router.get('/accepted', authMiddleware, getAcceptedClients);

//POST /api/coach/accept-client
router.post('/accept-client', authMiddleware, acceptClient);


//GET /api/coach/accepted/:id
router.get('/accepted/:id', authMiddleware, getAcceptedClientById);


//POST /api/coach/training-plans
router.post('/training-plans', authMiddleware, createTrainingPlan);












module.exports = router;

