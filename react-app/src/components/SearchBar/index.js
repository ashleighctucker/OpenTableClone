import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSearch } from '../../store/search_results';
import { useHistory } from 'react-router';
import useDebounce from '../../utils/useDebounce'
import './searchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(
      () => {
        if (debouncedSearchTerm) {
          setIsSearching(true);
          dispatch(getSearch(searchTerm)).then(result => {
            setIsSearching(false);
            history.push()
          })

          history.push('/search-results');
        } 
      },
      [debouncedSearchTerm]
    );










  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      let term = 'food';
      await dispatch(getSearch(term));
      history.push('/search-results');
    } else {
      await dispatch(getSearch(searchTerm));
      history.push('/search-results');
    }
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
          <i className="fas fa-search" onClick={handleSubmit}></i>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
