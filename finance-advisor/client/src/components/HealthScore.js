import React from 'react';

const CATEGORY_LABELS = {
  rent: 'Rent/EMI',
  food: 'Food',
  transport: 'Transport',
  entertainment: 'Entertainment',
  others: 'Others',
};

function getScoreColor(score) {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // yellow
  if (score >= 40) return '#f97316'; // orange
  return '#f43f5e';                  // red
}

function getLabelStyle(label) {
  const map = {
    Excellent: { background: '#d1fae5', color: '#065f46' },
    Good:      { background: '#fef3c7', color: '#92400e' },
    Fair:      { background: '#ffedd5', color: '#9a3412' },
    Poor:      { background: '#fee2e2', color: '#991b1b' },
  };
  return map[label] || { background: '#f1f5f9', color: '#475569' };
}

export default function HealthScore({ data }) {
  const { healthScore, healthLabel, spendingAnalysis } = data;

  const score = Math.min(100, Math.max(0, Number(healthScore)));
  const color = getScoreColor(score);
  const labelStyle = getLabelStyle(healthLabel);

  // SVG arc parameters
  const radius = 68;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="health-score-card">
      {/* Left: circular score */}
      <div className="health-score-left">
        <div className="score-circle-container" style={{ width: 160, height: 160 }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Track */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            {/* Progress */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
            />
          </svg>
          <div className="score-text-overlay">
            <span className="score-number" style={{ color }}>
              {score}
            </span>
            <span className="score-out-of">/ 100</span>
          </div>
        </div>

        <div className="health-label-badge" style={labelStyle}>
          {healthLabel}
        </div>
      </div>

      {/* Right: title + category pills */}
      <div className="health-score-right">
        <h2>Financial Health Score</h2>
        <p>Based on your income, expenses, and savings pattern</p>

        <div className="category-pills">
          {Object.entries(spendingAnalysis).map(([key, val]) => (
            <div className="category-pill" key={key}>
              <span className={`pill-dot ${val.status}`} />
              <div className="pill-info">
                <span className="pill-name">{CATEGORY_LABELS[key] || key}</span>
                <span className="pill-percent">{val.percent}% of income</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
