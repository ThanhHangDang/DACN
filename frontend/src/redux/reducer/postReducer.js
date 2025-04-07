import {
  POST_DETAILS_FAILURE,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_POSTS_BY_USER,
  GET_POSTS_SEARCH,
  DELETE_POST_BY_USER,
  POST_NEW_WORK,
  EDIT_POST_BY_USER,
} from "../contants/postContants.js";

const initialState = {
  loading: false,
  postDetail: null,
  error: null,
  allPosts: null,
  postsByUser: null,
  suitablePosts: null,
  totalWorksPages: 1,
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
      console.log("dsdsda", action.payload.work);
      return {
        ...state,
        loading: false,
        allPosts: action.payload.work,
        totalWorksPages: action.payload.totalPages,
      };
    case GET_ALL_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_POSTS_BY_USER:
      return { ...state, postsByUser: action.payload };
    case GET_POSTS_SEARCH:
      return { ...state, allPosts: action.payload };
    case DELETE_POST_BY_USER:
      return { ...state, postsByUser: action.payload };
    case POST_NEW_WORK:
      return { ...state, postsByUser: action.payload };
    case EDIT_POST_BY_USER:
      return { ...state, postsByUser: action.payload };
    default:
      return state;
  }
};

export default postReducer;
