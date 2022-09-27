import { createSlice } from "@reduxjs/toolkit";
import CONTENT_LISTING_PAGE_1 from "./JSON/CONTENT_LISTING_PAGE_1";
import CONTENT_LISTING_PAGE_2 from "./JSON/CONTENT_LISTING_PAGE_2";
import CONTENT_LISTING_PAGE_3 from "./JSON/CONTENT_LISTING_PAGE_3";

const listMap = {
  1: CONTENT_LISTING_PAGE_1,
  2: CONTENT_LISTING_PAGE_2,
  3: CONTENT_LISTING_PAGE_3,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    isListLoaded: "none",
    list: {},
    currentPage: 0,
  },
  reducers: {
    getList: (state, action) => {
      if (listMap[action.payload]) {
        state.currentPage = action.payload;
        state.list = listMap[action.payload].page;
      } else {
        state.list = listMap[1].page;
        state.currentPage = 1;
      }
      state.isListLoaded = "loaded";
    },
    resetLoading: (state, action) => {
      state.isListLoaded = action.payload;
    },
    resetCurrentPage: (state, page) => {
      state.currentPage = page;
    },
  },
});

export const { getList, resetLoading, resetCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;
