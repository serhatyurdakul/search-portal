import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  performSearch,
  selectSearchResults,
  setLastSearch,
} from "../../../store/searchSlice";
import searchIcon from "../../../assets/icon/search-icon.svg";

const SearchBar = ({ initialValue = "", isResultsPage = false }) => {
  const [searchText, setSearchText] = useState(initialValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    setSearchText(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    if (searchText?.trim()) {
      navigate(`/results?s=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value?.trim() || value.trim().length < 2) {
      dispatch(performSearch(""));
      dispatch(setLastSearch(""));
      return;
    }

    dispatch(performSearch(value, isResultsPage ? Infinity : 3));
    dispatch(setLastSearch(value));
  };

  const isButtonDisabled =
    !searchText?.trim() ||
    searchText.trim().length < 2 ||
    !searchResults.length;

  if (isResultsPage) {
    return (
      <>
        <input
          type='text'
          className='searchInput-resultspage search-input input input-sm'
          autoFocus
          value={searchText}
          onChange={handleInputChange}
          placeholder='Search...'
        />
        <button
          className='btn'
          onClick={handleSearch}
          disabled={isButtonDisabled}
        >
          Search
        </button>
      </>
    );
  }

  return (
    <div className='search-bar'>
      <img className='icon search-icon' src={searchIcon} alt='' />
      <input
        type='text'
        className='search-input search-input-mainpage input input-lg'
        autoFocus
        value={searchText}
        onChange={handleInputChange}
        placeholder='Search...'
      />
      <a className='search-link' onClick={handleSearch}>
        <button className='btn btn-searchbar' disabled={isButtonDisabled}>
          Search
        </button>
      </a>
    </div>
  );
};

export default SearchBar;
