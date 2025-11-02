import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CoachDashboard from './pages/CoachDashboard';
import ClientOnboarding from './pages/ClientOnboarding';




const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};




export default function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route 
           path="/coach/dashboard"
           element={
            <PrivateRoute allowedRoles={['coach']}>
              <CoachDashboard />
            </PrivateRoute>
           }
           />
           <Route
           path="/client/onboarding"
           element={
            <PrivateRoute allowedRoles={['client']}>
              <ClientOnboarding />
            </PrivateRoute>
           }
           />
           <Route path="/client/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

   )
}
