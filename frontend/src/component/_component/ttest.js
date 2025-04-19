import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, checkLoginStatus } from "../../redux_toolkit/AuthSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux
  const { isLogin, user } = useSelector((state) => state.auth);

  console.log("header check ", user?.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleViewProfile = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      if (user.user.role === 2) {
        navigate("/employer-overview");
      } else if (user.user.role === 3) {
        navigate("/jobseeker-overview");
      }
    }
  };

  const renderProfile = () => {
    return isLogin ? (
      <>
        <li>
          <button className="dropdown-item" onClick={handleViewProfile}>
            Hồ sơ của bạn
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            Đăng xuất
          </button>
        </li>
      </>
    ) : (
      <>
        <li>
          <NavLink className="dropdown-item" to="/login">
            Đăng nhập
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/auth">
            Đăng ký
          </NavLink>
        </li>
      </>
    );
  };

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [isLogin]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-lg-4" to="/">
            <img
              src="/img/logo/logo.jpg"
              alt="logo"
              style={{ height: 40, width: 40 }}
            />
            <span className="ms-2 text-primary fw-bold">Boost Career</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <p className="navbar-nav  me-3 bg-secondary"></p>
            <div className="navbar-nav mb-2 mb-lg-0">
              <a
                className="nav-link border rounded-pill me-lg-3 text-primary bg-light"
                href="#aaa"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                {user?.user.logo ? (
                  <img src={user?.user.log} alt="logo" />
                ) : (
                  <i className="bi bi-person-circle ms-2 me-2"></i>
                )}
                <i className="bi bi-chevron-down"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end me-1"
                aria-labelledby="navbarDropdown"
              >
                {renderProfile()}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
