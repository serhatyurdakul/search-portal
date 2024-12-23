import { useState } from "react";
import sortIcon from "../../assets/icon/sort-icon.svg";

const OrderByMenu = ({ onSort, selectedSort }) => {
  const [showOrderBy, setShowOrderBy] = useState(false);

  const handleSort = (key, direction) => {
    onSort(key, direction);
    setShowOrderBy(false);
  };

  return (
    <div className='orderby-wrapper'>
      <button
        className='order-btn'
        onClick={() => setShowOrderBy(!showOrderBy)}
      >
        <img src={sortIcon} alt='order button' />
        Order By
      </button>
      <ul
        className='orderby-list'
        style={{ display: showOrderBy ? "block" : "none" }}
      >
        <li
          className={`orderby-item ${
            selectedSort === "name-asc" ? "selected" : ""
          }`}
          onClick={() => handleSort("name", "asc")}
        >
          <a href='#'>Name ascending</a>
        </li>
        <li
          className={`orderby-item ${
            selectedSort === "name-desc" ? "selected" : ""
          }`}
          onClick={() => handleSort("name", "desc")}
        >
          <a href='#'>Name descending</a>
        </li>
        <li
          className={`orderby-item ${
            selectedSort === "date-asc" ? "selected" : ""
          }`}
          onClick={() => handleSort("date", "asc")}
        >
          <a href='#'>Year ascending</a>
        </li>
        <li
          className={`orderby-item ${
            selectedSort === "date-desc" ? "selected" : ""
          }`}
          onClick={() => handleSort("date", "desc")}
        >
          <a href='#'>Year descending</a>
        </li>
      </ul>
    </div>
  );
};

export default OrderByMenu;
