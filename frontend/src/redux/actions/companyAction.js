// import {
//   GET_COMPANY_INFORMATION,
//   GET_ALL_COMPANY,
//   GET_COMPANY_BY_ID,
// } from "../contants/companyContants.js";

// import domain from "../../config/domain";
// // import { toast } from "react-toastify";
// import axios from "axios";

// export const getCompanyInformation = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `${domain}/user/get-employer-information`,
//       {
//         params: { id: id },
//       }
//     );
//     if (response.status === 200) {
//       dispatch({
//         type: GET_COMPANY_INFORMATION,
//         payload: response.data.companyInfor,
//       });
//     } else {
//       console.log("Error fetching company information:", response.data.message);
//     }
//   } catch (error) {
//     console.log("Error fetching company information:", error);
//   }
// };

// export const getAllCompany = (page) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${domain}/company/get-all-company`, {
//       params: { page: page },
//     });
//     if (response.status === 200) {
//       dispatch({
//         type: GET_ALL_COMPANY,
//         payload: response.data,
//       });
//     } else {
//       console.log("Error fetching all companies:", response.data.message);
//     }
//   } catch (error) {
//     console.log("Error fetching all companies:", error);
//   }
// };
