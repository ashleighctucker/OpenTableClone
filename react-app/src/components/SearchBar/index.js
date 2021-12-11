import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearch } from '../../store/search_results';
import { useHistory } from 'react-router';
import './searchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchTerm);
    await dispatch(getSearch(searchTerm));
    history.push('/search-results');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <input
          type="text"
          id="splash-search"
          value={searchTerm}
          placeholder="Find my next experience"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <div className="icon-div">
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
