import { useEffect, useState } from 'react';
import api from '../apiClient';

export default function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/client/stats')
      .then(res => setStats(res.data))
      .catch(() => setError('Failed to load stats'));
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!stats) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  const statCards = [
    { label: 'Workouts Logged', value: stats.workouts },
    { label: 'Calories Burned', value: `${stats.calories} kcal` },
    { label: 'Progress', value: `${stats.progress}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((s, i) => (
        <div key={i} className="bg-white p-4 rounded shadow text-center">
          <div className="text-xl font-semibold text-gray-700">{s.label}</div>
          <div className="text-2xl font-bold text-blue-600">{s.value}</div>
        </div>
      ))}
    </div>
  );
}