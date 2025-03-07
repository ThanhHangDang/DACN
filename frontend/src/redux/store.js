import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/authReducer.js";
import homePageReducer from "./reducer/homePageReducer.js";
import jobseekerReducer from "./reducer/jobseekerReducer.js";
import postReducer from "./reducer/postReducer.js";
import companyReducer from "./reducer/companyReducer.js";
import categoryReducer from "./reducer/categoryReducer.js";
import notificationReducer from "./reducer/notificationReducer.js";
import userReducer from "./reducer/userReducer.js";

import storage from "redux-persist/lib/storage"; // Lưu vào localStorage
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // Key dùng để lưu vào localStorage
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  homePage: homePageReducer,
  jobseeker: jobseekerReducer,
  post: postReducer,
  company: companyReducer,
  category: categoryReducer,
  notification: notificationReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default store;
