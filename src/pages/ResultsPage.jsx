import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  performSearch,
  sortResults,
  selectSearchResults,
  setCurrentPage,
} from "../store/searchSlice";
import ResultsHeader from "../components/Header/ResultsHeader";
import SearchResults from "../components/Results/SearchResults/SearchResults";
import OrderByMenu from "../components/Results/OrderByMenu";
import Pagination from "../components/Results/Pagination";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchResults = useSelector(selectSearchResults);
  const [selectedSort, setSelectedSort] = useState(null);

  useEffect(() => {
    const searchQuery = searchParams.get("s");
    if (searchQuery) {
      dispatch(performSearch(decodeURIComponent(searchQuery)));
    }
  }, [searchParams, dispatch]);

  const handleSort = (key, direction) => {
    dispatch(sortResults({ key, direction }));
    dispatch(setCurrentPage(1));
    setSelectedSort(`${key}-${direction}`);
  };

  return (
    <>
      <ResultsHeader />
      <section className='results'>
        <div className='container'>
          <div className='all-results-wrapper'>
            <SearchResults />

            {searchResults.length > 0 && (
              <OrderByMenu onSort={handleSort} selectedSort={selectedSort} />
            )}
          </div>

          <Pagination />
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
