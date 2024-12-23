import { Link, useNavigate } from "react-router-dom";
import logoSm from "../../assets/icon/logo-sm.svg";
import arrowBack from "../../assets/icon/arrow-back.svg";

const FormHeader = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      navigate(`/results?s=${encodeURIComponent(lastSearch)}`);
    } else {
      navigate("/results");
    }
  };

  return (
    <header className='form-header'>
      <div className='container'>
        <div className='form-header-wrapper'>
          <Link to='/'>
            <img src={logoSm} alt='Tesodev Logo' />
          </Link>
          <div className='return-text'>
            <button onClick={handleReturn} className='return-wrapper'>
              <img src={arrowBack} alt='Return to Previous Page Icon' />
              <p className='return-title'>Return to List Page</p>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
