import Layout from '../layout/Layout';
import DashboardHeader from '../components/DashboardHeader';
import DashboardStats from '../components/DashboardStats';
import DashboardFeed from '../components/DashboardFeed';
import { useEffect, useState } from 'react';
import api from '../apiClient';








export default function Dashboard() {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [coach, setCoach] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/client/get-training-plans');
        setPlans(Array.isArray(res.data) ? res.data : [res.data]);
        console.log('Training plans response:', res.data);
      } catch (err) {
        console.error('Error fetching training plans:', err);
        setError('Failed to load training plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

    useEffect(() => {
    api.get('/client/coach')
      .then(res => {
        // setCoach(res.data.coach);
        setStatus(res.data.coach ? 'accepted' : 'pending');
      })
      .catch(() => setMessage('Failed to load coach info'));
  }, []);




  return (
    <Layout>
      <div className="p-6 space-y-6">
        <DashboardHeader />
        <DashboardStats />
        <DashboardFeed />
      </div>
          
    <div>
      <h2>Client Dashboard</h2>
      {message && <p>{message}</p>}
      {status === 'pending' ? (
        <p>Your profile is submitted and awaiting coach approval.</p>
      ) : (
        <div>
          <h3>Your Coach</h3>
          {/* <p><strong>Name:</strong> {coach.name}</p> */}
          {/* <p><strong>Specialty:</strong> {coach.specialty}</p> */}
          <p>Welcome to FitBridge! Your journey starts now 💪</p>
        </div>
      )}
    </div>
    {loading ? (
      <p>Loading training plans...</p>
       ) : error ? (
      <p className="text-red-500">{error}</p>
       ) : plans.length === 0 ? (
      <p>No training plans found.</p>
       ) : (
      <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan._id} className="border p-4 rounded shadow">
        <h3 className="text-lg font-semibold">{plan.title}</h3>
        <p className="text-sm text-gray-600">{plan.notes}</p>
        <ul className="mt-2 list-disc pl-5">
           {plan.sessions.map((session, index) => (
             <li key={index}>
               <strong>{session.day}:</strong> {session.exercises.join(', ')}
             </li>
            ))}
          </ul>
        </div>
       ))}
    </div>
   )} 

   <button
  onClick={() => window.location.reload()}
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Refresh Plans
</button>
    </Layout>
  );
}
