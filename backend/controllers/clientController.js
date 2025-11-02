// controllers/clientController.js
const ClientProfile = require('../models/ClientProfile');
const User = require('../models/User');



const submitProfile = async (req, res) => {
  try {
    const { age, height, weight, goals, coachId } = req.body;
    const clientId = req.user.id; // from auth middleware

    const profile = new ClientProfile({
      clientId,
      coachId,
      age,
      height,
      weight,
      goals,
      status: 'pending' // waiting for coach approval
    });

    await profile.save();
    res.json({ success: true, message: 'Profile submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit profile' });
  }
};







const getAssignedCoach = async (req, res) => {
  try {
    const clientId = req.user.id;
    const profile = await ClientProfile.findOne({ clientId, status: 'accepted' });

    if (!profile) return res.json({ coach: null });

    const coach = await User.findById(profile.coachId).select('name specialty');
    res.json({ coach });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coach info' });
  }
};


const getCoaches = async (req, res) => {
  try{
    const coach = await User.find({ role: 'coach'});

    if (coach.length === 0) return res.json({ coach: [] });

    res.json({ coach});
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch coaches'});
  }
}




const getClientStats = async (req, res) => {
  try {
    const clientId = req.user._id; // from auth middleware

    // Example: fetch stats from ClientProfile or Workout model
    const profile = await ClientProfile.findOne({ userId: clientId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // You can calculate or fetch stats here
    const stats = {
      workouts: profile.workoutsLogged || 0,
      calories: profile.totalCalories || 0,
      progress: profile.progressPercent || 0
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};



module.exports = { submitProfile, getAssignedCoach, getCoaches, getClientStats};