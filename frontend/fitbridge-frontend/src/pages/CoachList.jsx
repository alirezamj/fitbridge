import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiClient';
import './CoachList.css';
import RightMenu from './RightMenu'; // adjust path if needed

const CoachList = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/coach/accepted')
      .then((res) => setClients(res.data))
      .catch(() => setMessage('Failed to load accepted clients'));
  }, []);

  return (
    <div className="flex h-screen m-0 p-0">
      {/* Main content */}
      <div className="flex-1 bg-white overflow-y-auto m-0 p-0">
        <h1 className="text-2xl font-bold mb-4">Coach Dashboard</h1>
        {message && <p className="text-red-500">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white border rounded shadow p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{client.age}</h3>
              <p>{client.goals}</p>
              <button
                onClick={() => navigate(`/clients/${client._id}`)}
                className="mt-2 text-blue-600 hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right-side menu */}
      <RightMenu />
    </div>
  );
};

export default CoachList;