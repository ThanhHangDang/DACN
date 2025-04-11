import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetItemProfileQuery } from "../../redux_toolkit/JobseekerApi.js";
import Sidebar from "../../component/_component/sidebar.js";
export default function JobSeekerPage() {
  // Lấy thông tin user từ Redux store
  const { isLogin, user } = useSelector((state) => state.auth);
  console.log("User tại JobSeekerPage:", user?.user?.id);
  const navigate = useNavigate();

  // Sử dụng skip để tránh gọi API khi chưa có user.id
  const { data: userInformation, isLoading, error } = useGetItemProfileQuery({type:"Basic",profile_id: user?.user?.id},     
    { 
      skip: !user?.user?.id 
    }
  );

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <div className="row rounded-2 bg-primary text-center m-2 pt-2 d-flex justify-content-center">
            <div className="col-md-12 me-3">
              {userInformation?.avatar ? (
                <img
                  src={userInformation?.avatar}
                  alt="avatar"
                  style={{ height: 80, width: 80 }}
                  className="rounded-circle me-2"
                />
              ) : (
                <i className="bi bi-person-circle me-2 text-white fs-2"></i>
              )}
            </div>
            <div className="col-md-12">
              <h5 className="text-white">{userInformation?.full_name || "Chưa cập nhật"}</h5>
              <p className="mb-0 pb-2 text-white">{userInformation?.email || user?.user?.email}</p>
            </div>
          </div>

          <nav className="nav flex-column">
            <NavLink
              className="nav-link rounded-2 bg-light m-2 ps-3"
              to="/jobseeker-overview"
            >
              <span className="ms-3">
                <i className="bi bi-nut me-2"></i>Tổng quan
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-profile"
            >
              <span className="ms-3">
                <i className="bi bi-person-video3 me-2"></i>Hồ sơ cá nhân
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-company-follow"
            >
              <span className="ms-3">
                <i className="bi bi-buildings me-2"></i>Nhà tuyển dụng của tôi
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-mywork"
            >
              <span className="ms-3">
                <i className="bi bi-briefcase me-2"></i>Quản lý việc làm
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-notification"
            >
              <span className="ms-3">
                <i className="bi bi-bell me-2"></i>Thông báo
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-account"
            >
              <span className="ms-3">
                <i className="bi bi-person-gear me-2"></i>Quản lý tài khoản
              </span>
            </NavLink>
          </nav>
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
