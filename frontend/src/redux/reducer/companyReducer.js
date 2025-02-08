import { GET_COMPANY_INFORMATION } from "../contants/companyContants.js";

const initialState = {
  companyInformation: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_INFORMATION:
      return { ...state, companyInformation: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
