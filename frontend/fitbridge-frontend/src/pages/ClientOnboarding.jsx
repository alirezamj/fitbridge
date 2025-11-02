import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../apiClient';

const ClientOnboarding = () => {
  const navigate = useNavigate();



  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [form, setForm] = useState({
    age: '',
    height: '',
    weight: '',
    goals: ''
  });


  useEffect(() => {
    api.get('/client/coachs')
    .then(res => setCoaches(res.data.coach))
    .catch(err => console.error('Failed to fetch coaches', err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCoachSelected = (e) => {
    setSelectedCoachId(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/client/profile', { ...form, coachId: selectedCoachId });
    navigate('/client/dashboard'); // or confirmation page
  };



  return (
   <>

<h2>Select your coach</h2>
<select onChange={handleCoachSelected} value={selectedCoachId}>
  <option value="">Choose a coach</option>
  {coaches.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name} ({c.email})
    </option>
  ))}
</select>

     <form onSubmit={handleSubmit}>
       <h2>Complete Your Profile</h2>
       <input name="age" placeholder="Age" onChange={handleChange} />
       <input name="height" placeholder="Height (cm)" onChange={handleChange} />
       <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
       <textarea name="goals" placeholder="Your goals" onChange={handleChange} />
       <button type="submit">Submit</button>
     </form>

   </>
  );
};

export default ClientOnboarding;