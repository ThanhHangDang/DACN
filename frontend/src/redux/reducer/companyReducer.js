import {
  GET_COMPANY_INFORMATION,
  GET_ALL_COMPANY,
  GET_COMPANY_BY_ID,
} from "../contants/companyContants.js";

const initialState = {
  companyInformation: null,
  listCompany: [],
  totalPagesOfAllCompany: 1,
  companyById: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_INFORMATION:
      return { ...state, companyInformation: action.payload };
    case GET_ALL_COMPANY:
      return {
        ...state,
        listCompany: action.payload.company,
        totalPagesOfAllCompany: action.payload.totalPages,
      };
    case GET_COMPANY_BY_ID:
      return { ...state, companyById: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
