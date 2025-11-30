const ClientProfile = require('../models/ClientProfile');
const TrainingPlan = require('../models/TrainingPlan');



//Get /api/coach/requests
const getPendingClients = async (req, res) => {
    try{
        const coachId = req.user.id;
        const getPendingClients = await ClientProfile.find({ coachId: coachId, status:'pending'});

        res.json(getPendingClients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pending clients'});
    }
};

//Get /api/coach/accepted
const getAcceptedClients = async (req, res) => {
    try {
        const coachId = req.user.id;
        const getAcceptedClients = await ClientProfile.find({ coachId: coachId, status:'accepted'});

        res.json(getAcceptedClients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch accepted clients'});
    }
};


//POST /api/coach/accept-client
const acceptClient = async (req, res) => {
    try {
        const coachId = req.user.id;
        const { clientId } = req.body;
        
        const profile = await ClientProfile.findOne({ clientId, coachId, status: 'pending' });
        if (!profile) return res.status(404).json({ error: 'Client profile not found'});

        profile.status = 'accepted';
        await profile.save();

        res.json({ success: true, message: 'Client accepted'});
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept client'});
    }
};


//GET /api/coach/accepted/:id
const getAcceptedClientById  = async (req, res) => {
    try {
        const clientId = req.params.id;  //problem here. must get user's id not clientProfile' id ***********
        const client = await ClientProfile.findById(clientId);

        if(!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    }catch (error) {
        console.error('Error fetching client by ID', error);
        res.status(500).json({ message: 'Server error'});
    }
};


const createTrainingPlan = async (req, res) => {
    try {
        const { clientId, coachId, title, sessions, notes } = req.body;
        console.log('Received training plan data:', req.body);

        if (!clientId || !coachId || !title || !sessions ) {
            return res.status(400).json({ message: 'Missing requires fields'});
        }

        const newPlan = new TrainingPlan({
            clientId,
            coachId,
            title,
            sessions,notes
        });

        await newPlan.save();

        res.status(201).json({ message: 'Training plan created', plan: newPlan});
    } catch (error) {
        console.error('Error creating training plan:', error);
        res.status(500).json({ message: 'Server error'});
    }
};




module.exports = { 
    getPendingClients,
    acceptClient,
    getAcceptedClients,
    getAcceptedClientById,
    createTrainingPlan
};