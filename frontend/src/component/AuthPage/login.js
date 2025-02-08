import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkLoginStatus } from "../../redux/actions/authAction.js";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  // const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, loading } = useSelector((state) => state.auth);

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      dispatch(checkLoginStatus());
    }
  }, [dispatch, isLogin, navigate]);

  return (
    <div>
      <div className="container bg-light mt-5 mb-5 col-10 col-sm-5 rounded-3">
        <div className="row">
          <h2 className="fw-bold text-center mt-2">ĐĂNG NHẬP</h2>
          <p>
            Nếu bạn chưa có tài khoản, xin vui lòng bấm "Đăng ký" chuyển qua
            trang đăng ký.
            <br />
            Những trường có * là bắt buộc
          </p>
        </div>
        <form onSubmit={submitLogin}>
          <p>Tên đăng nhập*</p>
          <input
            type="text"
            className="form-control mb-3"
            name="email"
            placeholder="Tên đăng nhập"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p>Mật khẩu*</p>
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="row">
            <div className="col">
              <button
                type="submit"
                className="form-control btn btn-outline-danger mt-3 mb-3"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </div>

          <div className="row d-flex justify-content-end">
            <div className="col-8 d-flex justify-content-end mb-2">
              <NavLink to="/reset-password" className="text-primary">
                Quên mật khẩu?
              </NavLink>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <p className="me-2">Bạn chưa có tài khoản?</p>
              <NavLink to="/auth" className="text-primary">
                Đăng ký
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
