// src/pages/CoachDashboard.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../apiClient';

const CoachDashboard = () => {
  const [pendingClients, setPendingClients] = useState([]);
  const [message, setMessage] = useState('');
  const [acceptingId, setAcceptingId] = useState(null);

  useEffect(() => {
    api.get('/coach/requests')
      .then(res => setPendingClients(res.data))
      .catch(() => setMessage('Failed to load pending clients'));
  }, []);

  const handleAccept = async (clientId) => {
    setAcceptingId(clientId);
    try {
      await api.post('/coach/accept-client', { clientId });
      toast.success('Client accepted!');
      setPendingClients(prev => prev.filter(c => c.clientId === clientId));
    } catch {
      toast.error('Failed to accept client');
    } finally {
      setAcceptingId(null);
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
        <div key={request._id} className="request-card">
          <h3>Client ID: {request.clientId}</h3>
          <p>Age: {request.age}</p>
          <p>Height: {request.height} cm</p>
          <p>Weight: {request.weight} kg</p>
          <p>Goals: {request.goals}</p>
          <button onClick={() => handleAccept(request.clientId)}
            disabled={acceptingId === request.clientId}>
            {acceptingId === request.clientId ? 'Accepting...' : 'Accept'}
          </button>
        </div>
      );
    })
  )}
</div>
  );
};

export default CoachDashboard;