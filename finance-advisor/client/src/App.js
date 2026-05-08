import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('form');
  const [analysisData, setAnalysisData] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAnalysis = (data, form) => {
    setAnalysisData(data);
    setFormData(form);
    setView('dashboard');
  };

  const handleBack = () => {
    setView('form');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <span className="navbar-logo">💰</span>
            <span className="navbar-title">WealthLens</span>
          </div>
          <div className="navbar-tagline">Your Personal Finance Advisor</div>
        </div>
      </nav>

      <main className="main-content">
        {view === 'form' ? (
          <InputForm onAnalyze={handleAnalysis} />
        ) : (
          <Dashboard data={analysisData} formData={formData} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;
