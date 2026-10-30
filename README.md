# CodeSage: AI Code Reviewer

React + Node/Express app that sends your code to Google Gemini (gemini-2.5-flash)
and returns a structured review: summary, categorized issues, fixes, improvements
and a score out of 10.

## Run locally

### Backend
```
cd BackEnd
npm install
cp .env.example .env     # then put your real GOOGLE_GEMINI_KEY in .env
node server.js           # runs on http://localhost:3000
```

### Frontend
```
cd Frontend
npm install
npm run dev              # runs on http://localhost:5173
```

Optional: copy `Frontend/.env.example` to `Frontend/.env` to change the API URL.
