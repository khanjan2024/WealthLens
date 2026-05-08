# 💰 WealthLens — AI Personal Finance Advisor

> Your personal CFO, available 24/7, for free.

WealthLens is a full-stack web app that analyzes your monthly income and expenses and delivers a personalized financial health report — with a health score, spending breakdown, action plan, and goal feasibility — all in under 10 seconds, powered by Llama 3.3 70B via Groq.

---

## ✨ Features

- **Financial Health Score** — A 0–100 score with a color-coded arc (Poor / Fair / Good / Excellent)
- **Spending Breakdown** — Donut chart + 50/30/20 bar chart comparing actual vs recommended spending
- **AI Action Plan** — 3 specific steps with exact ₹ savings impact per month
- **Goal Feasibility Tracker** — Tells you if your goal is achievable, how many months it takes, and your target date
- **Live Surplus Indicator** — Shows monthly surplus/deficit as you type
- **India-specific advice** — Built around Indian salaries, expenses, and financial context

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Recharts, Axios, Plain CSS |
| Backend | Node.js, Express.js |
| AI Model | Llama 3.3 70B Versatile |
| AI Platform | Groq (ultra-fast inference) |
| Fonts | Inter (Google Fonts) |

---

## 📁 Project Structure

```
finance-advisor/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── components/
│   │       ├── InputForm.js      # Landing page with input form
│   │       ├── Dashboard.js      # Results layout
│   │       ├── HealthScore.js    # Circular score + category pills
│   │       ├── Charts.js         # Pie chart + bar chart
│   │       └── AdvicePanel.js    # Issues, action plan, quick win
│   └── package.json
│
└── server/                  # Node.js backend
    ├── index.js             # Express server + Groq API call
    ├── .env                 # API key (not committed)
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A free [Groq API key](https://console.groq.com/keys)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wealthlens.git
cd finance-advisor
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the server:

```bash
node index.js
# Server running on http://localhost:5000
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
npm start
# App running on http://localhost:3000
```

---

## 🔑 Getting a Groq API Key

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account
3. Click **"Create API Key"**
4. Paste it into `server/.env`

Groq free tier: **14,400 requests/day** — more than enough for demos and personal use.

---

## 📊 How It Works

```
User fills form → POST /api/analyze
       ↓
Express server builds prompt with financial data + today's date
       ↓
Groq API runs Llama 3.3 70B → returns structured JSON
       ↓
Frontend renders Health Score, Charts, Action Plan, Goal Tracker
```

The AI returns a single JSON object with:
- `healthScore` + `healthLabel`
- `spendingAnalysis` per category (percent, status, comment)
- `topIssues` (3 key problems)
- `actionPlan` (3 steps with ₹ impact)
- `goalFeasibility` (achievable, months needed, target date)
- `recommendations` (SIP suggestion, emergency fund status, quick win)

---

## 🎯 Demo Data (Pre-filled)

| Field | Value |
|---|---|
| Monthly Income | ₹50,000 |
| Rent / EMI | ₹15,000 |
| Food & Groceries | ₹12,000 |
| Transport | ₹5,000 |
| Entertainment | ₹8,000 |
| Other Expenses | ₹3,000 |
| Current Savings | ₹20,000 |
| Goal | Build emergency fund of ₹1,00,000 |

---

## 🔒 Security Notes

- The `.env` file is **not committed** to version control
- No user data is stored — every request is stateless
- API key lives only on the server, never exposed to the frontend

---

## 🛣 Roadmap

- [ ] Monthly history tracking
- [ ] Bank statement / UPI auto-import
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Conversational AI chat interface
- [ ] SIP & investment calculator

---

## 📄 License

MIT — free to use, modify, and distribute.

---

Built with ❤️ at a hackathon.
