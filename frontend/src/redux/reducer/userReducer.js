import {
  GET_LIST_EMPLOYEE,
  GET_JOBSEEKER_DETAIL,
} from "../contants/userContants.js";

const initialState = {
  listEmployee: [],
  jobseekerDetail: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_EMPLOYEE:
      return { ...state, listEmployee: action.payload };
    case GET_JOBSEEKER_DETAIL:
      return { ...state, jobseekerDetail: action.payload };
    default:
      return state;
  }
};

export default userReducer;
