import { useState } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const CoinsTable = ({ coins, currentPage, totalPages, onPageChange }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * modifier;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>All Cryptocurrencies</h2>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search coins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="coins-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th onClick={() => handleSort('current_price')}>
                Price <ArrowUpDown size={14} />
              </th>
              <th onClick={() => handleSort('price_change_percentage_24h')}>
                24h % <ArrowUpDown size={14} />
              </th>
              <th onClick={() => handleSort('market_cap')}>
                Market Cap <ArrowUpDown size={14} />
              </th>
              <th onClick={() => handleSort('total_volume')}>
                Volume <ArrowUpDown size={14} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-results">
                  No coins found {search ? `for "${search}"` : ''}
                </td>
              </tr>
            ) : (
              sortedCoins.map(coin => (
                <tr key={coin.id} className="coin-row">
                  <td>{coin.market_cap_rank}</td>
                  <td>
                    <div className="coin-info">
                      <img src={coin.image} alt={coin.name} className="coin-icon" />
                      <div>
                        <div className="coin-name">{coin.name}</div>
                        <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatPrice(coin.current_price)}</td>
                  <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>{formatNumber(coin.market_cap)}</td>
                  <td>{formatNumber(coin.total_volume)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CoinsTable;