import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  performSearch,
  selectSearchResults,
  selectLastSearch,
} from "../store/searchSlice";
import Slider from "../components/Slider/Slider";
import SearchResults from "../components/Results/SearchResults/SearchResults";
import HomeHeader from "../components/Header/HomeHeader";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import logo from "../assets/icon/logo.svg";

const HomePage = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const lastSearch = useSelector(selectLastSearch);

  useEffect(() => {
    dispatch(performSearch(""));
  }, [dispatch]);

  return (
    <>
      <HomeHeader />
      <section className='search-panel'>
        <div className='container'>
          <div className='search-panel-wrapper'>
            <img src={logo} alt='tesodev-logo' className='logo' />
            <span className='logo-sub-title'>Search app</span>
            <h1 className='title-lg'>Find in records</h1>

            <SearchBar />

            {searchResults.length > 0 && (
              <div className='search-results-home'>
                <SearchResults maxResults={3} />
                <Link
                  to={`/results?s=${encodeURIComponent(lastSearch)}`}
                  className='show-more-button subheading search-link'
                >
                  Show more...
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Slider />
    </>
  );
};

export default HomePage;
