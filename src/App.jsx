import { useState, useEffect } from 'react';
import CoinsTable from './components/CoinsTable.jsx';
import Highlights from './components/Highlights.jsx';
import Loading from './components/Loading.jsx';
import { coinGeckoAPI } from './api/coingecko.js';
import './styles.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const [marketsResponse, trendingResponse] = await Promise.all([
        coinGeckoAPI.getMarkets({ page, per_page: 20 }), // 20 coins per page
        coinGeckoAPI.getTrending()
      ]);
      
      setCoins(marketsResponse.data);
      setTrending(trendingResponse.data.coins.slice(0, 5));
      
      setTotalPages(10);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && coins.length === 0) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Crypto Dashboard</h1>
        <p>Live cryptocurrency market data - Page {currentPage}</p>
      </header>
      <main className="main">
        <Highlights trending={trending} coins={coins} />
        <CoinsTable 
          coins={coins} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <footer className="footer">
        <p>Data provided by CoinGecko</p>
      </footer>
    </div>
  );
}
export default App;