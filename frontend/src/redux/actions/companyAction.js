import {
  GET_COMPANY_INFORMATION,
  POST_NEW_WORK,
} from "../contants/companyContants.js";

import domain from "../../config/domain";
import { toast } from "react-toastify";
import axios from "axios";

export const getCompanyInformation = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-employer-information`,
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

export const postNewWork = (data1) => async (dispatch) => {
  let data = {
    ...data1,
    require_skill: data1.require_skill.map((skill) => skill.content),
    require_language: data1.require_language.map((lang) => lang.language_id),
  };
  // console.log("data", data);
  try {
    const response = await axios.post(
      `http://${domain}:4000/company/post-job`,
      data
    );
    if (response.status === 200) {
      dispatch({
        type: POST_NEW_WORK,
        payload: response.data.work,
      });
      toast.success("Đăng bài thành công!");
    }
  } catch (error) {
    console.error("Error posting new work:", error);
    toast.error("Đăng bài thất bại!");
  }
};
