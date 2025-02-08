import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInformationByID } from "../../redux/actions/jobseekerAction.js";

export default function JobSeekerPage() {
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.jobseeker);

  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && !(user?.user.role === 3)) {
      navigate("/login");
    }
    dispatch(getUserInformationByID(user?.user.id));
  }, [dispatch, isLogin, navigate, user]);
  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <div className="row rounded-2 bg-primary text-center m-2 pt-2 d-fex justify-content-center">
            <div className="col-md-2 me-3">
              {userInformation?.avatar ? (
                <img
                  src={userInformation.avatar}
                  alt="logo"
                  style={{ height: 60, width: 60 }}
                  className="rounded-circle me-2"
                />
              ) : (
                <i class="bi bi-person-circle me-2 text-white fs-2"></i>
              )}
            </div>
            <div className="col-md-8">
              <h5>{userInformation.full_name}</h5>
              <p className="mb-0 pb-2">{userInformation.email}</p>
            </div>
          </div>

          <nav className="nav flex-column">
            <NavLink
              className="nav-link rounded-2 bg-light m-2 ps-3"
              to="/jobseeker-overview"
            >
              <span className="ms-3">
                <i class="bi bi-nut me-2"></i>Tổng quan
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-profile"
            >
              <span className="ms-3">
                <i class="bi bi-person-video3 me-2"></i>Hồ sơ cá nhân
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-company-follow"
            >
              <span className="ms-3">
                <i class="bi bi-buildings me-2"></i>Nhà tuyển dụng của tôi
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-mywork"
            >
              <span className="ms-3">
                <i class="bi bi-briefcase me-2"></i>Quản lý việc làm
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-notification"
            >
              <span className="ms-3">
                <i class="bi bi-bell me-2"></i>Thông báo
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/jobseeker-account"
            >
              <span className="ms-3">
                <i class="bi bi-person-gear me-2"></i>Quản lý tài khoản
              </span>
            </NavLink>

            <d className="nav-link rounded-2  m-2">
              <span className="ms-3"></span>
            </d>
            <d className="nav-link rounded-2  m-2">
              <span className="ms-3"></span>
            </d>
            <d className="nav-link rounded-2  m-2">
              <span className="ms-3"></span>
            </d>
          </nav>
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
