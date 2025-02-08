import {
  SET_CURRENT_DATE,
  SET_LEADING_COMPANY,
  SET_LATEST_WORK,
  SET_CURRENT_PAGE,
} from "../contants/homePageContants.js";

const initialState = {
  currentDate: "",
  leadingCompany: [],
  latestWork: [],
  currentPage: 1,
};

const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SET_LEADING_COMPANY:
      return { ...state, leadingCompany: action.payload };
    case SET_LATEST_WORK:
      return { ...state, latestWork: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default homePageReducer;
