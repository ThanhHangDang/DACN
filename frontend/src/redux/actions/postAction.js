// import axios from "axios";
// import {
//   POST_DETAILS_FAILURE,
//   POST_DETAILS_REQUEST,
//   POST_DETAILS_SUCCESS,
//   GET_ALL_POSTS_FAILURE,
//   GET_ALL_POSTS_REQUEST,
//   GET_ALL_POSTS_SUCCESS,
//   GET_POSTS_BY_USER,
//   GET_POSTS_SEARCH,
//   DELETE_POST_BY_USER,
//   POST_NEW_WORK,
//   EDIT_POST_BY_USER,
// } from "../contants/postContants.js";
// import domain from "../../config/domain";
// import { toast } from "react-toastify";

// export const postDetailsRequest = () => ({
//   type: POST_DETAILS_REQUEST,
// });

// export const postDetailsSuccess = (post) => ({
//   type: POST_DETAILS_SUCCESS,
//   payload: post,
// });

// export const postDetailsFailure = (error) => ({
//   type: POST_DETAILS_FAILURE,
//   payload: error,
// });

// export const getPostDetails = (postId) => {
//   console.log(postId);
//   return async (dispatch) => {
//     dispatch(postDetailsRequest());
//     try {
//       const response = await axios.get(
//         `${domain}/work/get-work-detail/`,
//         {
//           params: { postId },
//         },
//         { withCredentials: true }
//       );
//       // console.log(response.data.work[0]);
//       dispatch(postDetailsSuccess(response.data.work[0]));
//     } catch (err) {
//       dispatch(
//         postDetailsFailure(
//           err.response?.data?.message || "Lấy bài viết thất bại!"
//         )
//       );
//       toast.error(err.response?.data?.message || "Lấy bài viết thất bại!");
//     }
//   };
// };

// export const getAllPostsRequest = () => ({
//   type: GET_ALL_POSTS_REQUEST,
// });

// export const getAllPostsSuccess = (posts) => ({
//   type: GET_ALL_POSTS_SUCCESS,
//   payload: posts,
// });

// export const getAllPostsFailure = (error) => ({
//   type: GET_ALL_POSTS_FAILURE,
//   payload: error,
// });

// export const getAllPosts = (page) => {
//   return async (dispatch) => {
//     dispatch(getAllPostsRequest());
//     try {
//       const response = await axios.get(`${domain}/work/get-all-works`, {
//         withCredentials: true,
//         params: { page },
//       });
//       console.log(response.data);
//       dispatch(getAllPostsSuccess(response.data));
//     } catch (err) {
//       dispatch(
//         getAllPostsFailure(
//           err.response?.data?.message || "Lấy danh sách bài viết thất bại!"
//         )
//       );
//     }
//   };
// };

// export const getPostsByUser = (userId) => {
//   return async (dispatch) => {
//     try {
//       console.log("userId tại action", userId);
//       const response = await axios.get(
//         `${domain}/work/get-works-by-user`,
//         {
//           params: { userId },
//         },
//         { withCredentials: true }
//       );
//       dispatch({
//         type: GET_POSTS_BY_USER,
//         payload: response.data.work,
//       });
//     } catch (error) {
//       console.error("Error fetching posts by user:", error);
//     }
//   };
// };

// export const getPostsSearch = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${domain}/work/get-works-by-search`, {
//         params: data,
//       });
//       dispatch({
//         type: GET_POSTS_SEARCH,
//         payload: response.data.work,
//       });
//     } catch (error) {
//       console.error("Error fetching posts search:", error);
//     }
//   };
// };
// export const deletePostByUser = (id, postID) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `${domain}/work/delete-work-by-user`,
//         {
//           params: { id, postID },
//         },
//         { withCredentials: true }
//       );
//       dispatch({
//         type: DELETE_POST_BY_USER,
//         payload: response.data.work,
//       });
//       toast.success("Xóa bài viết thành công.");
//     } catch (error) {
//       console.error("Error deleting post by user:", error);
//       toast.error("Xóa bài viết thất bại.");
//     }
//   };
// };

// export const postNewWork = (data1) => async (dispatch) => {
//   let data = {
//     ...data1,
//     require_skill: data1.require_skill.map((skill) => skill.tag_id),
//     require_language: data1.require_language.map((lang) => lang.language_id),
//   };
//   // console.log("data", data);
//   try {
//     const response = await axios.post(`${domain}/company/post-job`, data);

//     if (response.status === 200) {
//       dispatch({
//         type: POST_NEW_WORK,
//         payload: response.data.work,
//       });
//       toast.success("Đăng bài thành công!");
//     } else {
//       toast.error("Đăng bài thất bại!");
//     }
//   } catch (error) {
//     console.error("Đăng bài thất bại: ", error);
//     toast.error("Đăng bài thất bại!");
//   }
// };

// export const editPostByUser = (data1) => async (dispatch) => {
//   let data = {
//     ...data1,
//     require_skill: data1.require_skill.map((skill) => skill.content),
//     require_language: data1.require_language.map((lang) => lang.language_id),
//   };
//   // console.log("data", data);
//   try {
//     const response = await axios.put(`${domain}/work/edit-job`, data);

//     if (response.status === 200) {
//       dispatch({
//         type: EDIT_POST_BY_USER,
//         payload: response.data.work,
//       });
//       toast.success("Sửa bài thành công!");
//     } else {
//       toast.error("Sửa bài thất bại!");
//     }
//   } catch (error) {
//     console.error("Sửa bài thất bại: ", error);
//     toast.error("Sửa bài thất bại!");
//   }
// };
