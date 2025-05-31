import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';


// TODO: Import react router dom here
import { BrowserRouter, BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { MapPin } from 'lucide-react';


import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
         {/* TODO: Add react router dom routes here */}
          { <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes> }

          <div className="content">
            <h1>Welcome to DevSphere</h1>
            <p>Your one-stop destination for all things developer.</p>
            <MapPin size={24} />
          </div>
          

        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;