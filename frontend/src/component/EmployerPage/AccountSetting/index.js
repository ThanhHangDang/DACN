import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction.js";

export default function EmployerAccountSetting() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 2) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <div>
      {/* Modal đổi mật khẩu */}
      <div
        className="modal fade"
        id="changePasswordE"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Đỗi mật khẩu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Mật khẩu cũ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal đổi mật khẩu */}

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Quản lý tài khoản</h3>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h4>Tài khoản và mật khẩu</h4>
        <div
          className="d-flex justify-content-between align-items-center p-3 rounded border"
          style={{ backgroundColor: "#e9ecef" }}
        >
          <div>
            <p className="mb-1 fw-bold">
              Username: <span className="fw-normal">{user?.user.username}</span>
            </p>
            <p className="mb-0 fw-bold">
              Password: <span className="fw-normal">******</span>
            </p>
          </div>
          <div>
            <p className="mb-0 text-muted">
              Ngày tạo: {user?.user.create_date}
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end me-2 my-2 p-2">
        <a
          onClick={handleLogout}
          className="text-primary text-decoration-primary d-block mt-2 pe-3 border-end border-primary"
        >
          Đăng xuất
        </a>

        <span
          className="text-primary text-decoration-underline text-decoration-primary d-block mt-2 me-4 ms-3 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#changePasswordE"
        >
          Đổi mật khẩu
        </span>
      </div>

      <div className="d-flex justify-content-start me-2 my-2 p-2">
        <a
          href="#"
          className="text-danger text-decoration-none d-block mt-2 ms-3"
        >
          <i class="bi bi-dash-circle-fill me-2"></i>Xóa tài khoản
        </a>
      </div>
    </div>
  );
}
