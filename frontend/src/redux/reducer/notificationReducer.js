import { GET_NOTIFICATION } from "../contants/notificationContants.js";

const initialState = {
  notification: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
