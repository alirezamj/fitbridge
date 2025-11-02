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
      setPendingClients(prev => prev.filter(c => c.clientId._id !== clientId));
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
        pendingClients.map(({ clientId }) => (
          <div key={clientId._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{clientId.name}</h3>
            <p>{clientId.email}</p>
            <button onClick={() => handleAccept(clientId._id)}>Accept</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CoachDashboard;