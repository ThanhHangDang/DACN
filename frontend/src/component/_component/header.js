import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { logout, checkLoginStatus } from "../../redux/actions/authAction.js";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux
  const { isLogin, user } = useSelector((state) => state.auth);

  console.log(user?.user);

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

  const renderNotification = () => {
    return isLogin ? (
      <div className="navbar-nav mb-2 mb-lg-0">
        <a
          className="nav-link border rounded-pill me-lg-3 text-primary bg-light"
          href="#aa"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-bell-fill ms-2 me-2"></i>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end me-1"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a className="dropdown-item" href="#aaa">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#aaa">
              Another action
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#aaa">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    ) : (
      ""
    );
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
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-lg-4" to="/">
            <img
              src="./img/logo/logo.jpg"
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

            <div className="navbar-nav dropdown mb-2 mb-lg-0">
              <a
                className="nav-link border rounded-pill rounded-0 me-lg-3 text-primary bg-light"
                href="#aa"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-list me-2 ms-2"></i>
                Tất cả danh mục
              </a>
              <ul
                className="dropdown-menu dropdown-menu-define dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li className="">
                  <div className="row justify-content-around">
                    <div className="col-lg-3">
                      <h5>Việc làm</h5>
                      <p>Việc làm mới nhất</p>
                      <p>Tìm việc làm</p>
                      <NavLink to="/post" className="text-decoration-none">
                        Quản lý việc làm
                      </NavLink>
                    </div>
                    <div className="col-lg-3">
                      <h5>Việc làm của tôi</h5>
                      <p>Việc làm đã lưu</p>
                      <p>Việc làm đã ứng tuyển</p>
                      <p>Việc làm dành cho bạn</p>
                      <p>Thông báo việc làm</p>
                    </div>
                    <div className="col-lg-3">
                      <h5>Công ty</h5>
                      <p>Tất cả công ty</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <p class="navbar-nav vertical-line me-3 bg-secondary"></p>
            {renderNotification()}
            <div className="navbar-nav mb-2 mb-lg-0">
              <a
                className="nav-link border rounded-pill me-lg-3 text-primary bg-light"
                href="#aaa"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle ms-2 me-2"></i>
                <i class="bi bi-chevron-down"></i>
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
