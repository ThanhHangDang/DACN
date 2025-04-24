import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkLoginStatus } from "../../redux_toolkit/AuthSlice.js";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  // const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, loading } = useSelector((state) => state.auth);

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      dispatch(checkLoginStatus());
    }
  }, [isLogin]);

  return (
    <div className=" d-flex align-items-center justify-content-center p-5">
      {/* <div className="container bg-light mt-5 mb-5 col-10 col-sm-5 rounded-3">
        <div className="row">
          <h2 className="fw-bold text-center mt-2">ĐĂNG NHẬP</h2>
          <p>
            Nếu bạn chưa có tài khoản, xin vui lòng bấm "Đăng ký" chuyển qua
            trang đăng ký.
            
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
      </div> */}

      <div className="card shadow-lg w-100" style={{ maxWidth: 480 }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3">ĐĂNG NHẬP</h1>
            <p className="card-text text-muted">
              Nếu bạn chưa có tài khoản, xin vui lòng bấm "Đăng ký" chuyển qua
              trang đăng ký.
              <br />
              Những trường có * là bắt buộc
            </p>
          </div>
          <div className="mt-4">
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
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
              </div>
              <p className="text-center text-muted mt-4">
                Bạn chưa có tài khoản?
                <NavLink to="/register" className="text-decoration-none">
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
}
