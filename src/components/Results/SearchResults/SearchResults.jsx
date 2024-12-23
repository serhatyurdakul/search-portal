import { useSelector } from "react-redux";
import { selectPaginatedResults } from "../../../store/searchSlice";
import ResultItem from "./ResultItem";

const SearchResults = ({ maxResults }) => {
  const paginatedResults = useSelector(selectPaginatedResults);

  if (!paginatedResults || paginatedResults.length === 0) return null;

  const displayResults = maxResults
    ? paginatedResults.slice(0, maxResults)
    : paginatedResults;

  return (
    <ul className='results-list'>
      {displayResults.map((result) => (
        <ResultItem key={result.id} result={result} />
      ))}
    </ul>
  );
};

export default SearchResults;
