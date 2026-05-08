import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PIE_COLORS = ['#0d9488', '#f43f5e', '#f59e0b', '#6366f1', '#ec4899'];

const CATEGORY_LABELS = {
  rent: 'Rent/EMI',
  food: 'Food',
  transport: 'Transport',
  entertainment: 'Entertainment',
  others: 'Others',
};

function formatINR(value) {
  return '₹' + Number(value).toLocaleString('en-IN');
}

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div
        style={{
          background: '#1e293b',
          border: 'none',
          borderRadius: 8,
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: '0.85rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{name}</div>
        <div style={{ color: '#94a3b8' }}>{formatINR(value)}</div>
      </div>
    );
  }
  return null;
}

function CustomBarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e293b',
          border: 'none',
          borderRadius: 8,
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: '0.85rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
            {p.name}: {formatINR(p.value)}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function Charts({ data, formData }) {
  const income = Number(formData.income) || 1;

  // Pie chart data
  const pieData = [
    { name: 'Rent/EMI', value: Number(formData.rent) || 0 },
    { name: 'Food', value: Number(formData.food) || 0 },
    { name: 'Transport', value: Number(formData.transport) || 0 },
    { name: 'Entertainment', value: Number(formData.entertainment) || 0 },
    { name: 'Others', value: Number(formData.others) || 0 },
  ].filter((d) => d.value > 0);

  // Bar chart: 50/30/20 rule
  const needs = (Number(formData.rent) || 0) + (Number(formData.food) || 0) + (Number(formData.transport) || 0);
  const wants = (Number(formData.entertainment) || 0) + (Number(formData.others) || 0);
  const totalExpenses = needs + wants;
  const actualSavings = income - totalExpenses;

  const barData = [
    {
      category: 'Needs',
      Actual: needs,
      Recommended: Math.round(income * 0.5),
    },
    {
      category: 'Wants',
      Actual: wants,
      Recommended: Math.round(income * 0.3),
    },
    {
      category: 'Savings',
      Actual: Math.max(0, actualSavings),
      Recommended: Math.round(income * 0.2),
    },
  ];

  return (
    <div className="charts-card">
      {/* Pie Chart */}
      <div className="chart-section">
        <div className="chart-title">
          <span className="chart-title-icon">🥧</span>
          Where Your Money Goes
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="custom-legend">
          {pieData.map((entry, index) => (
            <div className="legend-item" key={entry.name}>
              <span
                className="legend-dot"
                style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
              />
              <span>
                {entry.name}: {formatINR(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart-section">
        <div className="chart-title">
          <span className="chart-title-icon">📊</span>
          Actual vs Recommended (50/30/20 Rule)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={barData}
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => '₹' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '0.8rem', paddingTop: 8 }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
            <Bar dataKey="Actual" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Actual" />
            <Bar dataKey="Recommended" fill="#0d9488" radius={[4, 4, 0, 0]} name="Recommended" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
