Crypto-Dashboard:
A beautiful cryptocurrency dashboard that displays live market data from CoinGecko API.

TechStack:
React - Frontend framework
Vite - Build tool
Axios - API calls
Vanilla CSS - Styling
CoinGecko API - Crypto data

Project Architecture:
src/
├── components/     # React components
├── api/            # API functions
├── styles.css      # CSS files
├── App.jsx         # Main app
└── main.jsx        # App entry

Design Patterns
Component Pattern - Reusable UI pieces
Service Layer - API calls separate from UI
Props Drilling - Data passed from parent to children

Limitations:
No API key needed (free tier)
Shows only 50 coins
No real-time updates
Basic error handling

Future Improvements:
Debounce search
Favorites feature
Dark mode

Features:
Live crypto prices
Search coins
Sort by columns
Top gainers/losers
Trending coins
Mobile responsive
Clean UI

API Key Instructions:
No API key needed to start - works without it, as the endpoints are publicly accessible as CoinGecko offers free public access and also we are just reading data not modifying