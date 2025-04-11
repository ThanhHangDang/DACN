import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore,persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import authReducer from "../redux/reducer/authReducer.js";
import homePageReducer from "../redux/reducer/homePageReducer.js";
// import jobseekerReducer from "../redux/reducer/jobseekerReducer.js";
import postReducer from "../redux/reducer/postReducer.js";
// import companyReducer from "../redux/reducer/companyReducer.js";
// import categoryReducer from "../redux/reducer/categoryReducer.js";
import notificationReducer from "../redux/reducer/notificationReducer.js";
import userReducer from "../redux/reducer/userReducer.js";
import authReducer from './AuthSlice.js';
// import categoryReducer from './categorySlice.js';
import { categoryApi } from './CategoryApi.js';
import { guestApi } from './guestApi'; // Import the new API
import {jobseekerApi} from './JobseekerApi.js';
import { setupListeners } from '@reduxjs/toolkit/query';
const persistConfig = {
  key: "root", // Key dùng để lưu vào localStorage
  storage,
  blacklist: [categoryApi.reducerPath,guestApi.reducerPath, jobseekerApi.reducerPath], // Danh sách các reducer không cần lưu vào localStorage
};

const rootReducer = combineReducers({
  auth: authReducer,
  homePage: homePageReducer,
  // jobseeker: jobseekerReducer,
  post: postReducer,
  // company: companyReducer,
  // category: categoryReducer,
  notification: notificationReducer,
  user: userReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [guestApi.reducerPath]: guestApi.reducer,
  [jobseekerApi.reducerPath]: jobseekerApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: persistedReducer,
  // Thêm middleware từ RTK Query và xử lý serializability cho redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(categoryApi.middleware, guestApi.middleware, jobseekerApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

export default store;
