import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectTotalPages,
  setCurrentPage,
  selectSearchResults,
} from "../../store/searchSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const searchResults = useSelector(selectSearchResults);

  const getVisiblePages = () => {
    if (totalPages <= 6) return [...Array(totalPages)].map((_, i) => i + 1);

    let pages = [1, totalPages];
    let middlePages = [];

    if (currentPage <= 3) {
      middlePages = [2, 3, 4];
    } else if (currentPage >= totalPages - 2) {
      middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return [...new Set([...pages, ...middlePages])].sort((a, b) => a - b);
  };

  const handlePageChange = (page) => {
    let newPage = currentPage;

    if (page === "previous") {
      newPage = Math.max(currentPage - 1, 1);
    } else if (page === "next") {
      newPage = Math.min(currentPage + 1, totalPages);
    } else {
      newPage = page;
    }

    if (newPage !== currentPage) {
      dispatch(setCurrentPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!searchResults.length || totalPages <= 1) return null;

  return (
    <div className='pagination-container'>
      <ul className='pagination'>
        <li
          className={`page-item previous ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <a
            href='#'
            className='page-link'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange("previous");
            }}
          >
            Previous
          </a>
        </li>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const visiblePages = getVisiblePages();

          if (visiblePages.includes(pageNum)) {
            return (
              <li
                key={pageNum}
                className={`page-item ${
                  currentPage === pageNum ? "active" : ""
                }`}
              >
                <a
                  href='#'
                  className='page-link'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}
                >
                  {pageNum}
                </a>
              </li>
            );
          } else if (
            pageNum === visiblePages[visiblePages.length - 1] - 1 ||
            pageNum === visiblePages[0] + 1
          ) {
            return (
              <li key={`ellipsis-${pageNum}`} className='page-item ellipsis'>
                <span className='page-link'>...</span>
              </li>
            );
          }

          return null;
        })}

        <li
          className={`page-item next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            href='#'
            className='page-link'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange("next");
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
