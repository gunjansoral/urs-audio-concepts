import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import EQ from "./components/EQ";
import AudioMotorPage from './pages/AudioMotorPage';

function App() {
  const handleEqChange = (
    values: { frequency: number; gain: number; q: number }[]
  ) => {
    console.log("EQ values changed:", values);
  };

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/audio-motor" className="nav-link">AudioMotor</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="app-container">
              <h1>URSAC</h1>
              <div className="eq-wrapper">
                <EQ audio="/audio.wav" onEqChange={handleEqChange} />
              </div>
            </div>
          } />
          <Route path="/audio-motor" element={<AudioMotorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
