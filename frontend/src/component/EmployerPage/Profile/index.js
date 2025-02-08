import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function EmployerProfile() {
  return (
    <div>
      <div className="rounded-2 me-2 my-2 p-2">
        <div className="">
          <NavLink to="/employer-profile" className="text-decoration-none">
            <span className="me-5 fs-4">Hồ sơ công ty</span>
          </NavLink>
          <NavLink
            to="/employer-manage-employee"
            className="text-decoration-none"
          >
            <span className="me-5 fs-4">Hồ sơ ứng tuyển</span>
          </NavLink>
          <NavLink to="/save-employee-profile" className="text-decoration-none">
            <span className="fs-4">Hồ sơ đã lưu</span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
