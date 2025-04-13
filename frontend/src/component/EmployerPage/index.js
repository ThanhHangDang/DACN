import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetCompanyInformationQuery } from "../../redux_toolkit/guestApi";

export default function EmployerPage() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

const { data: companyInformation } = useGetCompanyInformationQuery(user?.user.id);

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <div className="row rounded-2 bg-primary text-center m-2 pt-2 d-fex justify-content-center">
            <div className="col-md-12 me-3 mb-2">
              {companyInformation?.logo ? (
                <img
                  src={companyInformation.logo}
                  alt="logo"
                  style={{ height: 80, width: 80 }}
                  className="rounded-circle me-2"
                />
              ) : (
                <i className="bi bi-person-circle me-2 text-white fs-2"></i>
              )}
            </div>
            <div className="col-md-12">
              <p className="fw-bold lh-1">{companyInformation?.company_name}</p>
              <p className="mb-0 pb-2 lh-1">
                {companyInformation?.email ? companyInformation.email : ""}
              </p>
            </div>
          </div>

          <nav className="nav flex-column">
            <NavLink
              id="active"
              className="nav-link rounded-2 bg-light m-2 ps-3"
              to="/employer-overview"
            >
              <span className="ms-3">
                <i className="bi bi-nut me-2"></i>Tổng quan
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/employer-profile"
            >
              <span className="ms-3">
                <i className="bi bi-person-video3 me-2"></i>Quản lý hồ sơ
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/employer-post"
            >
              <span className="ms-3">
                <i className="bi bi-postcard me-2"></i>Quản lý tin tuyển dụng
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/employer-notification"
            >
              <span className="ms-3">
                <i className="bi bi-bell me-2"></i>Thông báo
              </span>
            </NavLink>
            <NavLink
              className="nav-link rounded-2 bg-light m-2"
              to="/employer-account"
            >
              <span className="ms-3">
                <i className="bi bi-person-gear me-2"></i>Quản lý tài khoản
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
