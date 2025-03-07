import { GET_COMPANY_INFORMATION } from "../contants/companyContants.js";

import domain from "../../config/domain";
// import { toast } from "react-toastify";
import axios from "axios";

export const getCompanyInformation = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${domain}/user/get-employer-information`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: GET_COMPANY_INFORMATION,
        payload: response.data.companyInfor,
      });
    }
  } catch (error) {
    console.error("Error fetching company information:", error);
  }
};
