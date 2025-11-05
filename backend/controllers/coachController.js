const ClientProfile = require('../models/ClientProfile');


//Get /api/coach/requests
const getPendingClients = async (req, res) => {
    try{
        const coachId = req.user.id;
        const getPendingClients = await ClientProfile.find({ coachId, status:'pending'})
        .populate('clientId', 'name email'); //populate basic client info

        res.json(getPendingClients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pending clients'});
    }
};


//POST /api/coach/accept-client
const acceptClient = async (req, res) => {
    try {
        const coachID = req.user.id;
        const { clientId } = req.body;

        const profile = await ClientProfile.findOne({ clientId, coachID });
        if (!profile) return res.status(404).json({ error: 'Client profile not found'});

        profile.status = 'Accepted';
        await profile.save();

        res.json({ success: true, message: 'Client accepted'});
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept client'});
    }
};


module.exports = { 
    getPendingClients,
    acceptClient
};