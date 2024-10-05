import React, { useState, useEffect } from 'react';
import '../App.css';
import Table from './Table';

const SearchAndSoetingBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        res.json()
        .then((result) => {
          setData(result);
          setSortedData(result);
          console.dir(result);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="container-main">
      <div className="SearchAndSoetingBar">
        <input
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search By Name or Symbol"
        />
        <div
          id="sort-btn1"
          className="btn"
          onClick={() => setSortedData([...data].sort((a, b) => a.market_cap - b.market_cap))}
        >
          Sort By Mkt Cap
        </div>
        <div
          id="sort-btn2"
          className="btn"
          onClick={() => setSortedData([...data].sort((a, b) => b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h
          ))}
        >
          Sort By Percentage
        </div>
      </div>
      <Table data={sortedData} searchValue={searchValue} />
    </div>
  );
};

export default SearchAndSoetingBar;
