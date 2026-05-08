import React, { useState } from 'react';
import axios from 'axios';

const DEMO = {
  income: '50000',
  rent: '15000',
  food: '12000',
  transport: '5000',
  entertainment: '8000',
  others: '3000',
  savings: '20000',
  goal: 'Build emergency fund of ₹1,00,000',
};

function NumInput({ label, name, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <span className="input-prefix">₹</span>
        <input
          id={name}
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          min="0"
          placeholder="0"
        />
      </div>
    </div>
  );
}

export default function InputForm({ onAnalyze }) {
  const [form, setForm] = useState(DEMO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const totalExpenses =
    (Number(form.rent) || 0) +
    (Number(form.food) || 0) +
    (Number(form.transport) || 0) +
    (Number(form.entertainment) || 0) +
    (Number(form.others) || 0);

  const surplus = (Number(form.income) || 0) - totalExpenses;

  const surplusClass =
    surplus > 0 ? 'positive' : surplus < 0 ? 'negative' : 'neutral';

  const surplusIcon = surplus > 0 ? '📈' : surplus < 0 ? '📉' : '➖';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.income || Number(form.income) <= 0) {
      setError('Please enter a valid monthly income.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/analyze', form);
      if (data.error) {
        setError(data.error);
      } else {
        onAnalyze(data, form);
      }
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">✨ AI-Powered Analysis</div>
        <h1>
          Take Control of Your <span>Finances</span>
        </h1>
        <p>
          Get a personalized financial health report and actionable advice in
          seconds — powered by AI.
        </p>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-column-title">💼 Income & Savings</div>

              <NumInput
                label="Monthly Income"
                name="income"
                value={form.income}
                onChange={handleChange}
              />
              <NumInput
                label="Current Savings"
                name="savings"
                value={form.savings}
                onChange={handleChange}
              />

              <div className="form-group">
                <label htmlFor="goal">Financial Goal</label>
                <input
                  id="goal"
                  type="text"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="e.g. Save ₹1,00,000 for emergency fund"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-column-title">🧾 Monthly Expenses</div>

              <NumInput
                label="Rent / EMI"
                name="rent"
                value={form.rent}
                onChange={handleChange}
              />
              <NumInput
                label="Food & Groceries"
                name="food"
                value={form.food}
                onChange={handleChange}
              />
              <NumInput
                label="Transport"
                name="transport"
                value={form.transport}
                onChange={handleChange}
              />
              <NumInput
                label="Entertainment"
                name="entertainment"
                value={form.entertainment}
                onChange={handleChange}
              />
              <NumInput
                label="Other Expenses"
                name="others"
                value={form.others}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Live Surplus */}
          <div className={`surplus-bar ${surplusClass}`}>
            <span className="surplus-label">
              {surplusIcon}&nbsp;
              {surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}
            </span>
            <span className="surplus-amount">
              {surplus >= 0 ? '+' : ''}₹{Math.abs(surplus).toLocaleString('en-IN')}
            </span>
          </div>

          {error && (
            <div
              style={{
                marginTop: 14,
                padding: '12px 16px',
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: 8,
                color: '#991b1b',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing...
              </>
            ) : (
              <>Analyze My Finances →</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
