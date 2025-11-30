import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { useAuth } from "../context/AuthContext";
import api from '../apiClient';
import './clientOnboarding.css';

const ClientOnboarding = () => {
  const navigate = useNavigate();



  const [profiles, setProfiles] = useState([]);
  const { user }  = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // or any default page size
  const [totalPages, setTotalPages] = useState(1);
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
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
  },
   []);

  useEffect(() => {
    const stored = localStorage.getItem('submittedProfile');
    if(stored && user) {
      const parsed = JSON.parse(stored);
      if (parsed.userId === user.id) {
        localStorage.removeItem("submittedData");
        setSubmittedData(null);
      } else {
        setSubmittedData(parsed);
      } 
       }
   }, [user]);

   useEffect(() => {
    api.get('/client/profile')
    .then(res => setProfiles(res.data.profiles))
    .catch(err => console.error('Failed to fetch profiles', err));
   }, []);

useEffect(() => {
  api.get(`/client/profiles?page=${page}&limit=5`)
    .then(res => {
      setProfiles(res.data.profiles);
      setTotalPages(res.data.totalPages);
    })
    .catch(err => console.error('Failed to fetch profiles', err));
}, [page]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCoachSelected = (e) => {
    setSelectedCoachId(e.target.value);
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await api.post('/client/profile', { ...form, coachId: selectedCoachId });
        const now = new Date();
        const selectedCoach = coaches.find(c => c._id === selectedCoachId);

        const dataToStore = {
          ...form,
          coachId: selectedCoach?.name || 'not specified',
          date: now.toLocaleString('fa-IR'),
          userId: user?.id
        };
        localStorage.setItem('submittedProfile' , JSON.stringify(dataToStore));
        setSubmittedData(dataToStore);
        // navigate('/client/dashboard');

    }catch (err) {
      console.error('submission failed', err);
    }
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


     {submittedData && (
    <div className="submitted-info">
    <h3>اطلاعات ثبت‌شده:</h3>
    <p><strong>سن:</strong> {submittedData.age}</p>
    <p><strong>قد:</strong> {submittedData.height}</p>
    <p><strong>وزن:</strong> {submittedData.weight}</p>
    <p><strong>اهداف:</strong> {submittedData.goals}</p>
    <p><strong>نام مربی:</strong> {submittedData.coachId}</p>
    <p><strong>تاریخ ثبت:</strong> {submittedData.date}</p>
  </div>
)};


<div className="profile-list">
  {profiles.map((p, index) => (
    <div key={p._id} className="profile-card">
      <h4>ثبت شماره {(page - 1) * limit + index + 1}</h4>
      <p><strong>سن:</strong> {p.age}</p>
      <p><strong>قد:</strong> {p.height}</p>
      <p><strong>وزن:</strong> {p.weight}</p>
      <p><strong>اهداف:</strong> {p.goals}</p>
      <p><strong>مربی:</strong> {p.coachId?.name}</p>
      <p><strong>تاریخ:</strong> {new Date(p.createdAt).toLocaleString('fa-IR')}</p>
    </div>
  ))}
</div>

<div className="pagination">
  <button disabled={page === 1} onClick={() => setPage(page - 1)}>قبلی</button>
  <span>صفحه {page} از {totalPages}</span>
  <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>بعدی</button>
</div>

   </>
  );
};

export default ClientOnboarding;