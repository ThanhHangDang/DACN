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

const initialState = {
  loading: false,
  postDetail: null,
  error: null,
  allPosts: null,
  postsByUser: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_DETAILS_SUCCESS:
      return { ...state, loading: false, postDetail: action.payload };
    case POST_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_POSTS_SUCCESS:
      return { ...state, loading: false, allPosts: action.payload };
    case GET_ALL_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_POSTS_BY_USER:
      return { ...state, postsByUser: action.payload };
    case GET_POSTS_SEARCH:
      return { ...state, allPosts: action.payload };
    default:
      return state;
  }
};

export default postReducer;
