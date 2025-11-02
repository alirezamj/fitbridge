import { useEffect, useState } from "react";
import api from '../apiClient';

export default function DashboardFeed() {
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/client/stats')
      .then(res => setFeed(res.data.feed || [])) // assuming res.data.feed is an array
      .catch(() => setError('Failed to load activity feed'));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      {error && <p className="text-red-500">{error}</p>}
      {feed.length === 0 ? (
        <p className="text-gray-500">No recent activity yet.</p>
      ) : (
        <ul className="space-y-2">
          {feed.map((f, i) => (
            <li key={i} className="text-gray-600">
              • {f.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}