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
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE,
  UPDATE_EXPECTED_JOB,
  UPDATE_CAREER_TARGET,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  ADD_PROJECT,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_CERTIFICATION,
  DELETE_LANGUAGE,
  DELETE_SKILL,
  DELETE_PROJECT,
} from "../contants/jobseekerContants.js";

// Action creator
export const getUserInformationByID = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${domain}/user/user-information`, {
      params: { id: id },
    });
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
    const response = await axios.get(`${domain}/user/get-experience`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-education`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-project`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-skill`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-language`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-certification`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-job-applied`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-job-saved`, {
      params: { id: id },
    });
    if (response.status === 200) {
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
    const response = await axios.get(`${domain}/user/get-followed-company`, {
      params: { id: id },
    });
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

export const updateProfileImage = (id, image) => async (dispatch) => {
  console.log("chayy");
  try {
    const formData = new FormData();
    // formData.append("id", id); // Thêm ID vào FormData
    formData.append("image", image); // Thêm hình ảnh vào FormData
    console.log("formData", formData);
    const response = await axios.post(
      `${domain}/user/update-jobseeker-profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      dispatch({
        type: UPDATE_PROFILE_IMAGE,
        payload: response.data.userInfor,
      });
      toast.success("Cập nhật ảnh đại diện thành công.");
    } else {
      toast.error("Có lỗi khi cập nhật ảnh đại diện.");
    }
  } catch (error) {
    console.log("Có lỗi khi cập nhật ảnh đại diện: ", error);
    toast.error("Có lỗi khi cập nhật ảnh đại diện.");
  }
};

export const updateProfile = (id, profile) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${domain}/user/update-jobseeker-profile`,
      {
        id: id,
        profile: profile,
      }
    );
    if (response.status === 200) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data.userInfor,
      });
      toast.success("Cập nhật hồ sơ thành công.");
    } else {
      toast.error("Có lỗi khi cập nhật hồ sơ.");
    }
  } catch (error) {
    console.log("Có lỗi khi cập nhật hồ sơ: ", error);
    toast.error("Có lỗi khi cập nhật hồ sơ.");
  }
};

export const updateExpectedJob = (id, expectedJob) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/user/update-expected-job`, {
      id: id,
      expectedJob: expectedJob,
    });
    if (response.status === 200) {
      dispatch({
        type: UPDATE_EXPECTED_JOB,
        payload: response.data.userInfor,
      });
      toast.success("Cập nhật công việc mong muốn thành công.");
    } else {
      toast.error("Cập nhật công việc mong muốn thất bại.");
    }
  } catch (error) {
    console.error("Error adding expected job:", error);
    toast.error("Cập nhật công việc mong muốn thất bại.");
  }
};

export const updateCareerTarget = (id, careerTarget) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/user/update-career-target`, {
      id: id,
      careerTarget: careerTarget,
    });
    if (response.status === 200) {
      dispatch({
        type: UPDATE_CAREER_TARGET,
        payload: response.data.userInfor,
      });
      toast.success("Cập nhật mục tiêu nghề nghiệp thành công.");
    } else {
      toast.error("Cập nhật mục tiêu nghề nghiệp thất bại.");
    }
  } catch (error) {
    console.error("Error adding career target:", error);
    toast.error("Cập nhật mục tiêu nghề nghiệp thất bại.");
  }
};

export const addExperience = (id, experience) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/user/add-experience`, {
      id: id,
      experience: experience,
    });
    if (response.status === 200) {
      dispatch({
        type: ADD_EXPERIENCE,
        payload: response.data.experience,
      });
      toast.success(response.message || "Thêm kinh nghiệm thành công.");
    } else {
      toast.error("Thêm kinh nghiệm thất bại.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Thêm kinh nghiệm thất bại.");
  }
};
export const addEducation = (id, education) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/user/add-education`, {
      id: id,
      education: education,
    });
    if (response.status === 200) {
      dispatch({
        type: ADD_EDUCATION,
        payload: response.data.education,
      });
      toast.success(response.message || "Thêm học vấn thành công.");
    } else {
      toast.error("Thêm học vấn thất bại.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Thêm học vấn thất bại.");
  }
};

export const addProject = (id, project) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/user/add-project`, {
      id: id,
      project: project,
    });
    if (response.status === 200) {
      dispatch({
        type: ADD_PROJECT,
        payload: response.data.project,
      });
      toast.success(response.message || "Thêm dự án thành công.");
    } else {
      toast.error("Thêm dự án thất bại.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Thêm dự án thất bại.");
  }
};

export const deleteProfileItem =
  (modalID, id, id_delete) => async (dispatch) => {
    switch (modalID) {
      case 1:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-experience",
          DELETE_EXPERIENCE,
          modalID,
          "Xóa kinh nghiệm thành công.",
          "Xóa kinh nghiệm thất bại"
        )(dispatch);
        break;
      case 2:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-education",
          DELETE_EDUCATION, // Define this constant appropriately
          modalID,
          "Xóa giáo dục thành công.",
          "Xóa giáo dục thất bại"
        )(dispatch);
        break;
      case 3:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-project",
          DELETE_PROJECT, // Define this constant appropriately
          modalID,
          "Xóa dự án thành công.",
          "Xóa dự án thất bại"
        )(dispatch);
        break;
      case 4:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-skill",
          DELETE_SKILL, // Define this constant appropriately
          modalID,
          "Xóa kỹ năng thành công.",
          "Xóa kỹ năng thất bại"
        )(dispatch);
        break;
      case 5:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-language",
          DELETE_LANGUAGE, // Define this constant appropriately
          modalID,
          "Xóa ngôn ngữ thành công.",
          "Xóa ngôn ngữ thất bại"
        )(dispatch);
        break;
      case 6:
        deleteProfileItemChild(
          id,
          id_delete,
          "delete-certification",
          DELETE_CERTIFICATION, // Define this constant appropriately
          modalID,
          "Xóa chứng chỉ thành công.",
          "Xóa chứng chỉ thất bại"
        )(dispatch);
        break;
      default:
        return; // Exit if modalID is not recognized
    }
  };

export const deleteProfileItemChild =
  (id, id_delete, host, type, modalID, messageSuccess, messageFail) =>
  async (dispatch) => {
    try {
      const response = await axios.delete(`${domain}/user/${host}`, {
        params: { id: id, id_delete: id_delete }, // Correctly pass data object for DELETE
      });
      if (response.status === 200) {
        let payload = ""; // Use let to allow reassignment
        switch (modalID) {
          case 1: // Xóa experience
            payload = response.data.experience;
            break;
          case 2: // Xóa education
            payload = response.data.education;
            break;
          case 3: // Xóa project
            payload = response.data.project;
            break;
          case 4: // Xóa skill
            payload = response.data.skill;
            break;
          case 5: // Xóa language
            payload = response.data.language; // Assuming you want to handle this case
            break;
          case 6: // Xóa certification
            payload = response.data.certification;
            break;
          default:
            break;
        }
        dispatch({
          type: type,
          payload: payload,
        });
        toast.success(messageSuccess);
      } else {
        toast.error(messageFail);
      }
    } catch (error) {
      console.error(error);
      toast.error(messageFail);
    }
  };
