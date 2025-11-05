const express = require('express');
const router = express.Router();
const { getPendingClients, acceptClient } = require('../controllers/coachController');
const authMiddleware = require('../middlewares/authMiddleware.js');





// GET /api/coach/requests
router.get('/requests', authMiddleware, getPendingClients);

//POST /api/coach/accept-client
router.post('/accept-client', authMiddleware, acceptClient);


module.exports = router;

