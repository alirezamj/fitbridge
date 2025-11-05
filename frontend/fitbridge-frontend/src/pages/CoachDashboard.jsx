// src/pages/CoachDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../apiClient';

const CoachDashboard = () => {
  const [pendingClients, setPendingClients] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/coach/requests')
      .then(res => setPendingClients(res.data))
      .catch(() => setMessage('Failed to load pending clients'));
  }, []);

  const handleAccept = async (clientId) => {
    try {
      await api.post('/coach/accept-client', { clientId });
      setMessage('Client accepted!');
      setPendingClients(prev => prev.filter(c => c.clientId._id == clientId));
    } catch {
      setMessage('Failed to accept client');
    }
  };

  return (
    <div>
      <h2>Coach Dashboard</h2>
      {message && <p>{message}</p>}
      {pendingClients.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        pendingClients.map((request) => {
  if (!request || !request.clientId) return null;

  return (
    <div key={request.clientId.id} className="request-card">
      <h3>{request.clientId.name}</h3>
      <p>{request.clientId.email}</p>
      <button onClick={() => handleAccept(request.clientId._id)}>Accept</button>
    </div>
    );
  }))
}
    </div>
  );
};

export default CoachDashboard;