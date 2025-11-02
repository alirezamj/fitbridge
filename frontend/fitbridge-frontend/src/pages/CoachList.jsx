import { useEffect, useState } from 'react';
import api from '../apiClient';
import { useNavigate } from 'react-router-dom';

const CoachList = () => {
  const [coaches, setCoaches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/coaches').then(res => setCoaches(res.data));
  }, []);

  const handleSelect = (coachId) => {
    navigate('/client/onboarding', { state: { coachId } });
  };

  return (
    <div>
      <h2>Select a Coach</h2>
      {coaches.map(coach => (
        <div key={coach._id}>
          <h3>{coach.name}</h3>
          <p>{coach.specialty}</p>
          <button onClick={() => handleSelect(coach._id)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default CoachList;