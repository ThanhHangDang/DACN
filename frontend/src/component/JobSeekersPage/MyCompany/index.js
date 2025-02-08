import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function JobSeekerCompany() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);
  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Công ty của tôi</h3>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="">
          {/* <NavLink to="/jobseeker-mycompany" className="text-decoration-none">
            <span className="me-3">Nhà tuyển dụng đã xem hồ sơ của bạn</span>
          </NavLink> */}
          <NavLink
            to="/jobseeker-company-follow"
            className="text-decoration-none"
          >
            <span>Công ty đã theo dõi</span>
          </NavLink>
        </div>

        <div
          className="background-opacity .bg-gradient rounded-2 me-2 my-2 p-2 d-flex justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <div className="col-8 text-center mt-4">
            <Outlet />
          </div>
        </div>
        <a
          href="#"
          className="text-primary text-decoration-primary d-block mt-2"
        >
          Ẩn hồ sơ của bạn
        </a>
      </div>
    </div>
  );
}
