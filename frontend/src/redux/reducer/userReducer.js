import { GET_LIST_EMPLOYEE } from "../contants/userContants.js";

const initialState = {
  listEmployee: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_EMPLOYEE:
      return { ...state, listEmployee: action.payload };
    default:
      return state;
  }
};

export default userReducer;
