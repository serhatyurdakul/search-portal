import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const formatData = (rawData) => {
  return rawData.data.map((row) => {
    const obj = {};
    rawData.cols.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
};

const initialState = {
  allData: formatData(data),
  searchResults: [],
  lastSearch: localStorage.getItem("lastSearch") || "",
  sortKey: null,
  sortDirection: null,
  currentPage: 1,
  resultsPerPage: 5,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.currentPage = 1;
    },
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
      if (action.payload) {
        localStorage.setItem("lastSearch", action.payload);
      } else {
        localStorage.removeItem("lastSearch");
      }
    },
    sortResults: (state, action) => {
      const { key, direction } = action.payload;
      if (!state.searchResults.length) return;

      state.searchResults = [...state.searchResults].sort((a, b) => {
        if (key === "date") {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return direction === "asc" ? dateA - dateB : dateB - dateA;
        }
        return direction === "asc"
          ? a.nameSurname.localeCompare(b.nameSurname)
          : b.nameSurname.localeCompare(a.nameSurname);
      });

      state.sortKey = key;
      state.sortDirection = direction;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addData: (state, action) => {
      state.allData = [...state.allData, action.payload];
    },
  },
});

export const {
  setSearchResults,
  setLastSearch,
  sortResults,
  setCurrentPage,
  addData,
} = searchSlice.actions;

export const performSearch =
  (searchText, maxResults = Infinity) =>
  (dispatch, getState) => {
    const { allData } = getState().search;

    if (!searchText || searchText.trim().length < 2) {
      dispatch(setSearchResults([]));
      dispatch(setLastSearch(""));
      return;
    }

    const searchQuery = searchText.trim().toLowerCase();
    const results = allData
      .filter(
        (item) =>
          item.nameSurname.toLowerCase().includes(searchQuery) ||
          item.company.toLowerCase().includes(searchQuery) ||
          item.country.toLowerCase().includes(searchQuery) ||
          item.city.toLowerCase().includes(searchQuery)
      )
      .slice(0, maxResults);

    dispatch(setSearchResults(results));
    dispatch(setLastSearch(searchText));
  };

export const selectSearchResults = (state) => state.search.searchResults;
export const selectLastSearch = (state) => state.search.lastSearch;
export const selectSortKey = (state) => state.sortKey;
export const selectSortDirection = (state) => state.sortDirection;
export const selectCurrentPage = (state) => state.search.currentPage;
export const selectResultsPerPage = (state) => state.search.resultsPerPage;
export const selectTotalPages = (state) =>
  Math.ceil(state.search.searchResults.length / state.search.resultsPerPage);
export const selectPaginatedResults = (state) => {
  const { searchResults, currentPage, resultsPerPage } = state.search;
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return searchResults.slice(start, end);
};

export default searchSlice.reducer;
