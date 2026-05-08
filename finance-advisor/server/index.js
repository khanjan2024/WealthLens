require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    /\.vercel\.app$/,
    /wealthlens/,
  ],
  credentials: true,
}));
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/analyze', async (req, res) => {
  try {
    const { income, rent, food, transport, entertainment, others, savings, goal } = req.body;

    const totalExpenses =
      Number(rent) + Number(food) + Number(transport) + Number(entertainment) + Number(others);
    const surplus = Number(income) - totalExpenses;

    const today = new Date();
    const currentDate = today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    const prompt = `You are an expert personal finance advisor specializing in Indian household finances.
Today's date is ${currentDate}. Use this as the reference point for all date calculations (targetDate, monthsNeeded, etc.).

Here is the user's financial data:
- Monthly Income: ₹${income}
- Monthly Expenses:
  - Rent/EMI: ₹${rent}
  - Food & Groceries: ₹${food}
  - Transport: ₹${transport}
  - Entertainment: ₹${entertainment}
  - Others: ₹${others}
- Current Savings: ₹${savings}
- Financial Goal: ${goal}
- Total Monthly Expenses: ₹${totalExpenses}
- Monthly Surplus: ₹${surplus}

IMPORTANT: All numeric fields (healthScore, percent, monthsNeeded, monthlySavingsNeeded, currentMonthlySavings, idealSavingsTarget) MUST be plain integers or decimals — NO rupee symbols, NO commas, NO quotes around numbers.

Respond ONLY in raw JSON, no markdown, no backticks:
{
  "healthScore": <integer 0-100>,
  "healthLabel": <"Poor"|"Fair"|"Good"|"Excellent">,
  "spendingAnalysis": {
    "rent":          { "percent": <number>, "status": <"healthy"|"warning"|"critical">, "comment": "<insight>" },
    "food":          { "percent": <number>, "status": <"healthy"|"warning"|"critical">, "comment": "<insight>" },
    "transport":     { "percent": <number>, "status": <"healthy"|"warning"|"critical">, "comment": "<insight>" },
    "entertainment": { "percent": <number>, "status": <"healthy"|"warning"|"critical">, "comment": "<insight>" },
    "others":        { "percent": <number>, "status": <"healthy"|"warning"|"critical">, "comment": "<insight>" }
  },
  "topIssues": ["<issue with ₹ numbers>", "<issue>", "<issue>"],
  "actionPlan": [
    { "step": "<title>", "detail": "<specific advice with ₹>", "impact": "<monthly saving>" },
    { "step": "<title>", "detail": "<specific advice with ₹>", "impact": "<monthly saving>" },
    { "step": "<title>", "detail": "<specific advice with ₹>", "impact": "<monthly saving>" }
  ],
  "goalFeasibility": {
    "goalText": "<goal>",
    "achievable": <true|false>,
    "monthsNeeded": <integer>,
    "targetDate": "<Month Year>",
    "monthlySavingsNeeded": <integer>,
    "currentMonthlySavings": <integer>,
    "verdict": "<2 sentence honest assessment>"
  },
  "recommendations": {
    "idealSavingsTarget": <integer>,
    "sipSuggestion": "<monthly SIP amount suggestion>",
    "emergencyFundStatus": "<comment on emergency fund>",
    "quickWin": "<one thing they can do TODAY>"
  }
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
      temperature: 0.3,
    });

    const rawText = completion.choices[0].message.content.trim();

    // Strip any accidental markdown fences
    let jsonText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    // Sanitize: remove ₹ symbols and commas from numeric values
    // This regex finds patterns like "₹9,091" or "9,091" and strips ₹ and commas
    jsonText = jsonText.replace(/₹\s*/g, '').replace(/(\d),(\d)/g, '$1$2');

    const analysis = JSON.parse(jsonText);
    res.json(analysis);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Finance Advisor server running on http://localhost:${PORT}`);
});
