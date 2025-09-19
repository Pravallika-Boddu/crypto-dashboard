import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const coinGeckoAPI = {
  getMarkets: (params = {}) => 
    axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 20, 
        page: 1,
        price_change_percentage: '24h',
        sparkline: false,
        ...params 
      }
    }),
  getTrending: () => 
    axios.get(`${API_URL}/search/trending`)
};