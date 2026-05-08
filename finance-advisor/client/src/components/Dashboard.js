import React from 'react';
import HealthScore from './HealthScore';
import Charts from './Charts';
import AdvicePanel from './AdvicePanel';

export default function Dashboard({ data, formData, onBack }) {
  const { goalFeasibility } = data;
  const gap =
    goalFeasibility.monthlySavingsNeeded - goalFeasibility.currentMonthlySavings;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <button className="back-btn" onClick={onBack}>
          ← Analyze Again
        </button>
        <span className="dashboard-title">Financial Analysis Report</span>
      </div>

      {/* Row 1: Health Score */}
      <div className="dashboard-row">
        <HealthScore data={data} />
      </div>

      {/* Row 2: Charts + Advice */}
      <div className="dashboard-middle">
        <Charts data={data} formData={formData} />
        <AdvicePanel data={data} />
      </div>

      {/* Row 3: Goal Feasibility */}
      <div className="dashboard-row">
        <div className="goal-card">
          <div className="goal-card-title">🎯 Goal Feasibility Analysis</div>
          <div className="goal-card-inner">
            {/* Left */}
            <div>
              <div className="goal-text">{goalFeasibility.goalText}</div>

              <div
                className={`achievable-badge ${
                  goalFeasibility.achievable ? 'yes' : 'no'
                }`}
              >
                {goalFeasibility.achievable ? '✅ Achievable' : '❌ Not Currently Achievable'}
              </div>

              <p className="goal-verdict">{goalFeasibility.verdict}</p>

              {!goalFeasibility.achievable && gap > 0 && (
                <div className="goal-warning">
                  ⚠️ Increase monthly savings by ₹
                  {Number(gap).toLocaleString('en-IN')} to reach your goal on
                  time.
                </div>
              )}
            </div>

            {/* Right: stat boxes */}
            <div className="goal-stats">
              <div className="goal-stat-box">
                <div className="goal-stat-label">Target Date</div>
                <div className="goal-stat-value teal">
                  {goalFeasibility.targetDate}
                </div>
              </div>
              <div className="goal-stat-box">
                <div className="goal-stat-label">Months Needed</div>
                <div className="goal-stat-value">
                  {goalFeasibility.monthsNeeded}
                </div>
              </div>
              <div className="goal-stat-box">
                <div className="goal-stat-label">Monthly Savings Needed</div>
                <div className="goal-stat-value">
                  ₹
                  {Number(
                    goalFeasibility.monthlySavingsNeeded
                  ).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
