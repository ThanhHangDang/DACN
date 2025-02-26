import axios from "axios";
import {
  POST_DETAILS_FAILURE,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_POSTS_BY_USER,
  GET_POSTS_SEARCH,
} from "../contants/postContants.js";
import domain from "../../config/domain";
import { toast } from "react-toastify";

export const postDetailsRequest = () => ({
  type: POST_DETAILS_REQUEST,
});

export const postDetailsSuccess = (post) => ({
  type: POST_DETAILS_SUCCESS,
  payload: post,
});

export const postDetailsFailure = (error) => ({
  type: POST_DETAILS_FAILURE,
  payload: error,
});

export const getPostDetails = (postId) => {
  console.log(postId);
  return async (dispatch) => {
    dispatch(postDetailsRequest());
    try {
      const response = await axios.get(
        `${domain}/work/get-work-detail/`,
        {
          params: { postId },
        },
        { withCredentials: true }
      );
      // console.log(response.data.work[0]);
      dispatch(postDetailsSuccess(response.data.work[0]));
    } catch (err) {
      dispatch(
        postDetailsFailure(
          err.response?.data?.message || "Lấy bài viết thất bại!"
        )
      );
      toast.error(err.response?.data?.message || "Lấy bài viết thất bại!");
    }
  };
};

export const getAllPostsRequest = () => ({
  type: GET_ALL_POSTS_REQUEST,
});

export const getAllPostsSuccess = (posts) => ({
  type: GET_ALL_POSTS_SUCCESS,
  payload: posts,
});

export const getAllPostsFailure = (error) => ({
  type: GET_ALL_POSTS_FAILURE,
  payload: error,
});

export const getAllPosts = () => {
  return async (dispatch) => {
    dispatch(getAllPostsRequest());
    try {
      const response = await axios.get(`${domain}/work/get-all-works`, {
        withCredentials: true,
      });
      dispatch(getAllPostsSuccess(response.data.work));
    } catch (err) {
      dispatch(
        getAllPostsFailure(
          err.response?.data?.message || "Lấy danh sách bài viết thất bại!"
        )
      );
      toast.error(
        err.response?.data?.message || "Lấy danh sách bài viết thất bại!"
      );
    }
  };
};

export const getPostsByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${domain}/work/get-works-by-user`,
        {
          params: { userId },
        },
        { withCredentials: true }
      );
      dispatch({
        type: GET_POSTS_BY_USER,
        payload: response.data.work,
      });
    } catch (error) {
      console.error("Error fetching posts by user:", error);
    }
  };
};

export const getPostsSearch = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${domain}/work/get-works-by-search`, {
        params: data,
      });
      dispatch({
        type: GET_POSTS_SEARCH,
        payload: response.data.work,
      });
    } catch (error) {
      console.error("Error fetching posts search:", error);
    }
  };
};
