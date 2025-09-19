import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const Highlights = ({ trending, coins }) => {
  const topGainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3);

  const topLosers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 3);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="highlights">
      <div className="highlight-card">
        <h3><TrendingUp size={20} /> Top Gainers</h3>
        {topGainers.map(coin => (
          <div key={coin.id} className="highlight-item">
            <span>{coin.symbol.toUpperCase()}</span>
            <span className="positive">+{coin.price_change_percentage_24h.toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="highlight-card">
        <h3><TrendingDown size={20} /> Top Losers</h3>
        {topLosers.map(coin => (
          <div key={coin.id} className="highlight-item">
            <span>{coin.symbol.toUpperCase()}</span>
            <span className="negative">{coin.price_change_percentage_24h.toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="highlight-card">
        <h3><BarChart3 size={20} /> Trending</h3>
        {trending.map(coin => (
          <div key={coin.item.id} className="highlight-item">
            <span>{coin.item.symbol.toUpperCase()}</span>
            <span>Trending</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;