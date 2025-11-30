import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../apiClient';

const ClientDetails = () => {
  const { id: clientId } = useParams();
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [sessions, setSessions] = useState([{ day: '', exercises: [''] }]);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();


  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/coach/accepted/${clientId}`)
      .then((res) => setClient(res.data))
      .catch(() => setMessage('Failed to load client details'));
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  const coachId = user?.id;


  if (!coachId) {
    setMessage('❌ Coach ID is missing');
    return;
  }


    try {
      const payload = { clientId: client.clientId, coachId, title, sessions, notes };
      await api.post('/coach/training-plans', payload);
      setMessage('✅ Training plan submitted successfully');
      setTitle('');
      setSessions([{ day: '', exercises: [''] }]);
      setNotes('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit training plan');
    }
  };

  const updateSession = (index, field, value) => {
    const updated = [...sessions];
    updated[index][field] = value;
    setSessions(updated);
  };

  const updateExercise = (sessionIndex, exerciseIndex, value) => {
    const updated = [...sessions];
    updated[sessionIndex].exercises[exerciseIndex] = value;
    setSessions(updated);
  };

  const addSession = () => setSessions([...sessions, { day: '', exercises: [''] }]);
  const addExercise = (i) => {
    const updated = [...sessions];
    updated[i].exercises.push('');
    setSessions(updated);
  };

  if (!client) return <p>Loading client details...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Client Details</h1>
      <div className="mb-6">
        <p><strong>ID:</strong> {client._id}</p>
        <p><strong>Age:</strong> {client.age}</p>
        <p><strong>Weight:</strong> {client.weight}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Add Training Plan</h2>
      {message && <p className="mb-2 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Plan Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />

        {sessions.map((session, i) => (
          <div key={i} className="border p-2 rounded">
            <input
              type="text"
              placeholder="Day (e.g. Monday)"
              value={session.day}
              onChange={(e) => updateSession(i, 'day', e.target.value)}
              className="border p-1 w-full mb-2"
              required
            />
            {session.exercises.map((ex, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Exercise ${j + 1}`}
                value={ex}
                onChange={(e) => updateExercise(i, j, e.target.value)}
                className="border p-1 w-full mb-1"
                required
              />
            ))}
            <button type="button" onClick={() => addExercise(i)} className="text-sm text-green-600">
              + Add Exercise
            </button>
          </div>
        ))}

        <button type="button" onClick={addSession} className="text-sm text-blue-600">
          + Add Session
        </button>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Plan
        </button>
      </form>
      <div className="sticky top-0 bg-white z-10 p-4 shadow-sm">
       <button
         onClick={() => {
              if (window.history.length > 1) {
                   navigate(-1);
                 } else {
                  navigate('/coach/clients');
                  }
           }}
               className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition duration-200"
        >
         <span className="text-lg">←</span> Back
       </button>
    </div>
    </div>
    
  );
};

export default ClientDetails;