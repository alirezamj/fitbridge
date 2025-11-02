// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    logout(); // clears token + redirects
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-xl font-bold">
        <Link to="/">FitBridge</Link>
      </div>

      <div className="flex space-x-4 items-center">
        {/* <Link to="/" className="hover:underline">Home</Link> */}
        {/* {token && <Link to="/dashboard" className="hover:underline">Dashboard</Link>} */}
        {!token && <Link to="/login" className="hover:underline">Log In</Link>}
        {!token && <Link to="/register" className="hover:underline">Sign Up</Link>}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}