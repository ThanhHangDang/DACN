import {
  GET_CATEGORY_BENEFIT,
  GET_CATEGORY_CITY,
  GET_CATEGORY_DISTRICT,
  GET_CATEGORY_INDUSTRY,
  GET_CATEGORY_JOBFUNCTION,
  GET_CATEGORY_LANGUAGE,
  GET_CATEGORY_LEVEL,
  GET_CATEGORY_NATION,
  GET_CATEGORY_SCALE,
  GET_CATEGORY_TAGS,
  GET_CATEGORY_EDU,
} from "../contants/categoryContants.js";

const initialState = {
  industry: [],
  jobFunction: [],
  benefit: [],
  nation: [],
  city: [],
  district: [],
  level: [],
  tags: [],
  scale: [],
  lang: [],
  edu: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_INDUSTRY:
      return { ...state, industry: action.payload };
    case GET_CATEGORY_JOBFUNCTION:
      return { ...state, jobFunction: action.payload };
    case GET_CATEGORY_BENEFIT:
      return { ...state, benefit: action.payload };
    case GET_CATEGORY_NATION:
      return { ...state, nation: action.payload };
    case GET_CATEGORY_CITY:
      return { ...state, city: action.payload };
    case GET_CATEGORY_DISTRICT:
      return { ...state, district: action.payload };
    case GET_CATEGORY_LANGUAGE:
      return { ...state, lang: action.payload };
    case GET_CATEGORY_LEVEL:
      return { ...state, level: action.payload };
    case GET_CATEGORY_SCALE:
      return { ...state, scale: action.payload };
    case GET_CATEGORY_TAGS:
      return { ...state, tags: action.payload };
    case GET_CATEGORY_EDU:
      return { ...state, edu: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
