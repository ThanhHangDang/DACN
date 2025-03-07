import {
  SET_CURRENT_DATE,
  SET_LEADING_COMPANY,
  SET_LATEST_WORK,
  SET_CURRENT_PAGE,
} from "../contants/homePageContants.js";

import axios from "axios";
import domain from "../../config/domain.js";

// Action creators
export const setCurrentDate = (date) => ({
  type: SET_CURRENT_DATE,
  payload: date,
});

export const setLeadingCompany = (company) => ({
  type: SET_LEADING_COMPANY,
  payload: company,
});

export const setLatestWork = (work) => ({
  type: SET_LATEST_WORK,
  payload: work,
});

// Thunks (asynchronous actions)
export const getCurrentDate = () => (dispatch) => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  dispatch(setCurrentDate(`${day}/${month}/${year}`));
};

export const getLeadingCompany = () => (dispatch) => {
  axios
    .get(`${domain}/company/get-leading-company`)
    .then((res) => {
      dispatch(setLeadingCompany(res.data.company));
    })
    .catch((err) => console.error(err));
};

export const getLatestWork = () => (dispatch) => {
  axios
    .get(`${domain}/work/get-latest-work`)
    .then((res) => {
      dispatch(setLatestWork(res.data.work));
    })
    .catch((err) => console.error(err));
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
