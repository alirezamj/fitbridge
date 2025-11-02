import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import './Home.css';

import { useState , useEffect } from 'react';



export default function Home() {
const token = localStorage.getItem('token');

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
            <Link to="/dashboard" className="btn">Go to Dashboard</Link>
         )}
       </header>
     </div>
     <Features />
     <Hero />
    </Layout>
  );
};









