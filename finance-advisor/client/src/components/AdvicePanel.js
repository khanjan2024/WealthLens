import React from 'react';

export default function AdvicePanel({ data }) {
  const { topIssues, actionPlan, recommendations } = data;

  return (
    <div className="advice-panel">
      {/* Top Issues */}
      <div>
        <div className="advice-section-title">
          🔴 Top Issues
        </div>
        <div className="issues-list">
          {topIssues.map((issue, i) => (
            <div className="issue-item" key={i}>
              <span className="issue-bullet">!</span>
              <span>{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div>
        <div className="advice-section-title">
          ✅ Action Plan
        </div>
        <div className="action-cards">
          {actionPlan.map((item, i) => (
            <div className="action-card" key={i}>
              <div className="action-card-header">
                <span className="action-step-title">
                  {i + 1}. {item.step}
                </span>
                <span className="impact-badge">Save {item.impact}/mo</span>
              </div>
              <p className="action-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Win */}
      <div>
        <div className="advice-section-title">
          ⚡ Quick Win
        </div>
        <div className="quick-win-box">
          <div className="quick-win-label">Do this today</div>
          <p className="quick-win-text">{recommendations.quickWin}</p>
        </div>
      </div>

      {/* Extra Recommendations */}
      <div
        style={{
          background: '#f0fdfa',
          border: '1.5px solid #99f6e4',
          borderRadius: 10,
          padding: '14px 16px',
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: '#0f766e',
            marginBottom: 10,
          }}
        >
          💡 Recommendations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RecoRow
            icon="🎯"
            label="Ideal Savings Target"
            value={`₹${Number(recommendations.idealSavingsTarget).toLocaleString('en-IN')}/month`}
          />
          <RecoRow
            icon="📈"
            label="SIP Suggestion"
            value={recommendations.sipSuggestion}
          />
          <RecoRow
            icon="🛡️"
            label="Emergency Fund"
            value={recommendations.emergencyFundStatus}
          />
        </div>
      </div>
    </div>
  );
}

function RecoRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#0f766e',
            display: 'block',
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: '0.82rem', color: '#134e4a' }}>{value}</span>
      </div>
    </div>
  );
}
