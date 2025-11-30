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
import CoachList from './pages/CoachList';
import ClientDetails from './pages/ClientDetails';
import { ToastContainer } from 'react-toastify';





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
           <Route
           path="/coach/clients"
           element={
            <PrivateRoute allowedRoles={['coach']}>
              <CoachList/>
            </PrivateRoute>
           }
           />
           <Route path="/client/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
           <Route path="/clients/:id" element={<ClientDetails/>} />
        </Routes>
        <ToastContainer>
        </ToastContainer>
      </AuthProvider>
    </BrowserRouter>

   )
}
