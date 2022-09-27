import { createSlice } from "@reduxjs/toolkit";
import CONTENT_LISTING_PAGE_1 from "./JSON/CONTENT_LISTING_PAGE_1";
import CONTENT_LISTING_PAGE_2 from "./JSON/CONTENT_LISTING_PAGE_2";
import CONTENT_LISTING_PAGE_3 from "./JSON/CONTENT_LISTING_PAGE_3";

const listMap = {
  1: CONTENT_LISTING_PAGE_1,
  2: CONTENT_LISTING_PAGE_2,
  3: CONTENT_LISTING_PAGE_3,
};

const getSearchByName = (name = "") => {
  const totalList = [
    CONTENT_LISTING_PAGE_1,
    CONTENT_LISTING_PAGE_2,
    CONTENT_LISTING_PAGE_3,
  ];

  const newList = { ["content-items"]: { content: [] } };

  const allContent = [];

  totalList.forEach((item) => {
    const searchName = name.toLowerCase();
    item.page["content-items"].content.forEach((subItem) => {
      if (subItem.name.toLowerCase().includes(searchName)) {
        allContent.push(subItem);
      }
    });
  });

  newList["content-items"].content = allContent;

  return newList;
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
        state.list = listMap[action.payload].page;
        state.currentPage = action.payload;
      }
    },
    getListByName: (state, action) => {
      state.list = getSearchByName(action.payload);
    },
  },
});

export const { getList, getListByName } = moviesSlice.actions;

export default moviesSlice.reducer;
