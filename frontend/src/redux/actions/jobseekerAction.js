import axios from "axios";
import domain from "../../config/domain.js";
import { toast } from "react-toastify";

import {
  SET_USER_INFORMATION,
  GET_LIST_CERTIFICATION,
  GET_LIST_EDUCATION,
  GET_LIST_EXP,
  GET_LIST_LANGUAGE,
  GET_LIST_SKILL,
  GET_LIST_PROJECT,
  GET_JOB_APPLY,
  GET_JOB_SAVE,
  GET_FOLLOW_EMPLOYER,
  UPDATE_EXPECTED_JOB,
  UPDATE_CAREER_TARGET,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
} from "../contants/jobseekerContants.js";

// Action creator
export const getUserInformationByID = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/user-information`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: SET_USER_INFORMATION,
        payload: response.data.userInfor,
      });
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const getListExp = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-experience`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List experience:", response.data);
      dispatch({
        type: GET_LIST_EXP,
        payload: response.data.experience,
      });
    }
  } catch (error) {
    console.error("Error fetching list experience:", error);
  }
};

export const getListEducation = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-education`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List education:", response.data);
      dispatch({
        type: GET_LIST_EDUCATION,
        payload: response.data.education,
      });
    }
  } catch (error) {
    console.error("Error fetching list education:", error);
  }
};

export const getListProject = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://${domain}:4000/user/get-project`, {
      params: { id: id },
    });
    if (response.status === 200) {
      // console.log("List project:", response.data);
      dispatch({
        type: GET_LIST_PROJECT,
        payload: response.data.project,
      });
    }
  } catch (error) {
    console.error("Error fetching list project:", error);
  }
};

export const getListSkill = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://${domain}:4000/user/get-skill`, {
      params: { id: id },
    });
    if (response.status === 200) {
      // console.log("List skill:", response.data);
      dispatch({
        type: GET_LIST_SKILL,
        payload: response.data.skill,
      });
    }
  } catch (error) {
    console.error("Error fetching list skill:", error);
  }
};

export const getListLanguage = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-language`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List language:", response.data);
      dispatch({
        type: GET_LIST_LANGUAGE,
        payload: response.data.language,
      });
    }
  } catch (error) {
    console.error("Error fetching list language:", error);
  }
};

export const getListCertification = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-certification`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List certification:", response.data);
      dispatch({
        type: GET_LIST_CERTIFICATION,
        payload: response.data.certificate,
      });
    }
  } catch (error) {
    console.error("Error fetching list certification:", error);
  }
};

export const getJobApply = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-job-applied`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List job apply:", response.data);
      dispatch({
        type: GET_JOB_APPLY,
        payload: response.data.jobApplied,
      });
    }
  } catch (error) {
    console.error("Error fetching list job apply:", error);
  }
};

export const getJobSave = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-job-saved`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      // console.log("List job save:", response.data);
      dispatch({
        type: GET_JOB_SAVE,
        payload: response.data.jobSaved,
      });
    }
  } catch (error) {
    console.error("Error fetching list job save:", error);
  }
};

export const getFollowEmployer = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://${domain}:4000/user/get-followed-company`,
      {
        params: { id: id },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: GET_FOLLOW_EMPLOYER,
        payload: response.data.companySaved,
      });
    }
  } catch (error) {
    console.error("Error fetching list follow employer:", error);
  }
};

export const updateExpectedJob = (id, expectedJob) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://${domain}:4000/user/update-expected-job`,
      {
        id: id,
        expectedJob: expectedJob,
      }
    );
    if (response.status === 200) {
      dispatch({
        type: UPDATE_EXPECTED_JOB,
        payload: response.data.userInfor,
      });
      console.log("Add expected job successfully");
      toast.success("Cập nhật công việc mong muốn thành công.");
    }
  } catch (error) {
    console.error("Error adding expected job:", error);
    toast.error("Cập nhật công việc mong muốn thất bại.");
  }
};

export const updateCareerTarget = (id, careerTarget) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://${domain}:4000/user/update-career-target`,
      {
        id: id,
        careerTarget: careerTarget,
      }
    );
    if (response.status === 200) {
      dispatch({
        type: UPDATE_CAREER_TARGET,
        payload: response.data.userInfor,
      });
      console.log("Add career target successfully");
      toast.success("Cập nhật mục tiêu nghề nghiệp thành công.");
    }
  } catch (error) {
    console.error("Error adding career target:", error);
    toast.error("Cập nhật mục tiêu nghề nghiệp thất bại.");
  }
};

export const addExperience = (id, experience) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://${domain}:4000/user/add-experience`,
      {
        id: id,
        experience: experience,
      }
    );
    if (response.status === 200) {
      dispatch({
        type: ADD_EXPERIENCE,
        payload: response.data.experience,
      });
      toast.success(response.message || "Thêm kinh nghiệm thành công.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Thêm kinh nghiệm thất bại.");
  }
};
export const addEducation = (id, education) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://${domain}:4000/user/add-education`,
      {
        id: id,
        education: education,
      }
    );
    if (response.status === 200) {
      dispatch({
        type: ADD_EDUCATION,
        payload: response.data.education,
      });
      toast.success(response.message || "Thêm học vấn thành công.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Thêm học vấn thất bại.");
  }
};
