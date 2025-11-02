// src/pages/ClientDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../apiClient';

const ClientDashboard = () => {
  const [coach, setCoach] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/client/coach')
      .then(res => {
        setCoach(res.data.coach);
        setStatus(res.data.coach ? 'accepted' : 'pending');
      })
      .catch(() => setMessage('Failed to load coach info'));
  }, []);

  return (
    <div>
      <h2>Client Dashboard</h2>
      {message && <p>{message}</p>}
      {status === 'pending' ? (
        <p>Your profile is submitted and awaiting coach approval.</p>
      ) : (
        <div>
          <h3>Your Coach</h3>
          <p><strong>Name:</strong> {coach.name}</p>
          <p><strong>Specialty:</strong> {coach.specialty}</p>
          <p>Welcome to FitBridge! Your journey starts now 💪</p>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;