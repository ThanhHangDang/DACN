import axios from "axios";
import domain from "../../config/domain.js";

import {
  GET_LIST_EMPLOYEE,
  GET_JOBSEEKER_DETAIL,
} from "../contants/userContants.js";

export const getListEmployee = () => async (dispatch) => {
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

export const getJobseekerDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${domain}/user/get-employee-detail/`,
      {
        params: { id },
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data.employeeDetail);
      dispatch({
        type: GET_JOBSEEKER_DETAIL,
        payload: response.data.employeeDetail[0],
      });
    }
  } catch (error) {
    console.log(error);
  }
};
