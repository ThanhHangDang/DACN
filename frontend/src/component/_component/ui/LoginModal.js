import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  checkLoginStatus,
} from "../../../redux_toolkit/AuthSlice.js";

const LoginModal = () => {
  const dispatch = useDispatch();

  const { isLogin, loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div
      className="modal fade"
      id="LoginModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg card shadow-lg w-100"
        style={{ maxWidth: 480 }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title card-title h3" id="modalTitle">
              Đổi mật khẩu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={submitLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Tên đăng nhập"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mật khẩu"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid">
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
              </div>
              <p className="text-center text-muted mt-4">
                Bạn chưa có tài khoản?
                <NavLink to="/auth" className="text-decoration-none">
                  Đăng ký
                </NavLink>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
