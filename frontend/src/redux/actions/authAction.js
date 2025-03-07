import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_LOGIN_STATUS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../contants/authContants.js";
import domain from "../../config/domain";
import { toast } from "react-toastify";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        `${domain}/auth/login`,
        {
          params: { username, password },
        },
        { withCredentials: true }
      );
      dispatch(loginSuccess(response.data));
      toast.success(response.data.message || "Đăng nhập thành công!");
    } catch (err) {
      dispatch(
        loginFailure(err.response?.data?.message || "Đăng nhập thất bại!")
      );
      toast.error(err.response?.data?.message || "Đăng nhập thất bại!");
    }
  };
};

export const checkLoginStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${domain}/auth/`, {
        withCredentials: true,
      });
      dispatch({ type: CHECK_LOGIN_STATUS, payload: response.data });
    } catch (err) {
      dispatch({ type: LOGOUT });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    // Gửi request đến API để đăng xuất
    axios
      .delete(`${domain}/auth/logout`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: LOGOUT }); // Dispatch action LOGOUT
        }
        toast.success("Đăng xuất thành công!");
      })
      .catch((err) => {
        console.error("Đăng xuất thất bại:", err);
        toast.error("Đăng xuất thất bại!");
      });
  };
};

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

export const registerUser = (dataRegister) => {
  console.log(dataRegister);
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post(
        `${domain}/auth/register`,
        { params: { dataRegister } },
        { withCredentials: true }
      );
      dispatch(registerSuccess(response.data));
      toast.success(response.data.message || "Đăng ký thành công!");
    } catch (err) {
      dispatch(
        registerFailure(err.response?.data?.message || "Đăng ký thất bại!")
      );
      toast.error(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };
};
