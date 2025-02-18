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

const initialState = {
  userInformation: [],
  listExp: null,
  listEducation: null,
  listProject: null,
  listSkill: null,
  listLanguage: null,
  listCertification: null,
  listJobApply: null,
  listJobSave: null,
  listFollowEmployer: null,
};

const jobseekerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFORMATION:
      return { ...state, userInformation: action.payload };
    case GET_LIST_EXP:
      return { ...state, listExp: action.payload };
    case GET_LIST_EDUCATION:
      return { ...state, listEducation: action.payload };
    case GET_LIST_PROJECT:
      return { ...state, listProject: action.payload };
    case GET_LIST_SKILL:
      return { ...state, listSkill: action.payload };
    case GET_LIST_LANGUAGE:
      return { ...state, listLanguage: action.payload };
    case GET_LIST_CERTIFICATION:
      return { ...state, listCertification: action.payload };
    case GET_JOB_APPLY:
      return { ...state, listJobApply: action.payload };
    case GET_JOB_SAVE:
      return { ...state, listJobSave: action.payload };
    case GET_FOLLOW_EMPLOYER:
      return { ...state, listFollowEmployer: action.payload };
    case UPDATE_EXPECTED_JOB:
      return { ...state, userInformation: action.payload };
    case UPDATE_CAREER_TARGET:
      return { ...state, userInformation: action.payload };
    case ADD_EXPERIENCE:
      return { ...state, listExp: action.payload };
    case ADD_EDUCATION:
      return { ...state, listEducation: action.payload };
    default:
      return state;
  }
};

export default jobseekerReducer;
