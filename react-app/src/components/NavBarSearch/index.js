import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSearch } from '../../store/search_results';
import { useHistory } from 'react-router';
import './navbarsearch.css';
import useDebounce from '../../utils/useDebounce'
const NavBarSearch = () => {
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
      <div className="searchh">
        <input
          type="text"
          id="splash-searchh"
          value={searchTerm}
          placeholder=" Search (by name or cuisine type)"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        ></input>
        <div className="icon-divv">
          <i className="fas fa-search" onClick={handleSubmit}></i>
        </div>
      </div>
    </form>
  );
};

export default NavBarSearch;
