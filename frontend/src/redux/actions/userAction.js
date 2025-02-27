import axios from "axios";
import domain from "../../config/domain.js";

import { GET_LIST_EMPLOYEE } from "../contants/userContants.js";

export const getListEmployee = () => async (dispatch) => {
  console.log("cccccccc");
  try {
    const response = await axios.get(`${domain}/user/get-list-employee`);
    if (response.status === 200) {
      dispatch({
        type: GET_LIST_EMPLOYEE,
        payload: response.data.listEmployee,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
