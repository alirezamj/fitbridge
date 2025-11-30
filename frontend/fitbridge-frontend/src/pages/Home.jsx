import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState , useEffect } from 'react';
import './Home.css';




export default function Home() {
const { token, user } = useContext(AuthContext);
const tokens = localStorage.getItem('token');
// console.log("User:", user);
// console.log("Token:", token);

const quotes = [
  "Every rep counts 💪",
  "Fuel your body, fuel your goals 🥗",
  "Progress is a process 📈"
];

const [quoteIndex, setQuoteIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);
            console.log("User from context:", user);

  return (
   <Layout>
     <div className="home-container">
       <header className="hero">
         <div className="transition duration-500 hover:scale-105">
          <h1>Welcome to FitBridge</h1>
         </div>
         <p>Your personalized fitness journey starts here.</p>
         <p className="quote">{quotes[quoteIndex]}</p>
         {!token ? (
         <div className="button-group">
          <Link to="/login" className="btn">Log In</Link>
           <Link to="/register" className="btn btn-secondary">Sign Up</Link>
         </div>
         ) : (
          <>

          <>
  {user?.role === "client" && (
    <Link to="/client/dashboard" className="btn">Go to Dashboard</Link>
  )}
  {user?.role === "coach" && (
    <Link to="/coach/dashboard" className="btn">Go to Dashboard</Link>
  )}

  {user?.role === "client" && (
    <Link to="/client/onBoarding" className="btn btn-secondary">Go to board</Link>
  )}
  {user?.role === "coach" && (
    <Link to="/coach/clients" className="btn btn-secondary">Go to List</Link>
  )}
</>
          </>
         )}
       </header>
     </div>
     <Features />
     <Hero />
    </Layout>
  );
};









