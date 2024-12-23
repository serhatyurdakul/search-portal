import { Link } from "react-router-dom";
import SearchBar from "../ui/SearchBar/SearchBar";
import logo from "../../assets/icon/logo-sm.svg";
import AddRecordButton from '../ui/Button/AddRecordButton';

const ResultsHeader = () => {
  const searchQuery = new URLSearchParams(window.location.search).get("s") || "";

  return (
    <header className='results-header'>
      <div className='container'>
        <div className='results-header-wrapper'>
          <Link to='/'>
            <img src={logo} alt='Tesodev Logo' className='logo' />
          </Link>
          <div className='search-bar-results'>
            <SearchBar isResultsPage={true} initialValue={searchQuery} />
          </div>
          <AddRecordButton />
        </div>
      </div>
    </header>
  );
};

export default ResultsHeader; 