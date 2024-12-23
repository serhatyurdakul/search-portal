import locationIcon from "../../../assets/icon/location-icon.svg";

const ResultItem = ({ result }) => (
  <li className='results-item'>
    <div className='location-info'>
      <div className='location-info-wrapper'>
        <img src={locationIcon} alt='location icon' />
        <div className='location-wrapper'>
          <p className='company location-bold-text'>{result.company}</p>
          <p className='location location-light-text'>
            <span className='city'>{result.city},</span>
            <span className='country'>{result.country}</span>
          </p>
        </div>
      </div>
    </div>
    <div className='user-info-wrapper'>
      <p className='user-info'>{result.nameSurname}</p>
      <p className='date-info'>{result.date}</p>
    </div>
  </li>
);

export default ResultItem;
