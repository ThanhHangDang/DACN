// import {
//   GET_CATEGORY_BENEFIT,
//   GET_CATEGORY_CITY,
//   GET_CATEGORY_DISTRICT,
//   GET_CATEGORY_INDUSTRY,
//   GET_CATEGORY_JOBFUNCTION,
//   GET_CATEGORY_LANGUAGE,
//   GET_CATEGORY_LEVEL,
//   GET_CATEGORY_NATION,
//   GET_CATEGORY_SCALE,
//   GET_CATEGORY_TAGS,
//   GET_CATEGORY_EDU,
// } from "../contants/categoryContants.js";

// import axios from "axios";
// import domain from "../../config/domain";

// export const getCategoryIndustry = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${domain}/category/getCategory_Industry`
//       );
//       dispatch({ type: GET_CATEGORY_INDUSTRY, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryJobFunction = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${domain}/category/getCategory_Jobfunction`
//       );
//       dispatch({
//         type: GET_CATEGORY_JOBFUNCTION,
//         payload: response.data.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryBenefit = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCatalog_Benefit`);
//       dispatch({ type: GET_CATEGORY_BENEFIT, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryNation = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCategory_Nation`);
//       dispatch({ type: GET_CATEGORY_NATION, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryCity = (nation) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCategory_City`, {
//         params: { nation: nation },
//       });
//       console.log(response.data);
//       dispatch({ type: GET_CATEGORY_CITY, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryDistrict = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${domain}/category/getCategory_District`
//       );
//       dispatch({ type: GET_CATEGORY_DISTRICT, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryLanguage = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${domain}/category/getCategory_Language`
//       );
//       dispatch({ type: GET_CATEGORY_LANGUAGE, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryLevel = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCategory_Level`);
//       dispatch({ type: GET_CATEGORY_LEVEL, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryScale = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCategory_Scale`);
//       dispatch({ type: GET_CATEGORY_SCALE, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryEdu = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${domain}/category/getCategory_Education`
//       );
//       dispatch({ type: GET_CATEGORY_EDU, payload: response.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const getCategoryTags = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/category/getCategory_Tags`);
//       dispatch({ type: GET_CATEGORY_TAGS, payload: response.data.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
