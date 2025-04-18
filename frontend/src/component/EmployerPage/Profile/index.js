import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function EmployerProfile() {
  return (
    <div className="container my-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            to="/employer-profile"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Hồ sơ công ty
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/employer-manage-employee"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Hồ sơ ứng tuyển
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/save-employee-profile"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Hồ sơ đã lưu
          </NavLink>
        </li>
      </ul>

      {/* Nội dung sẽ được thay đổi theo route */}
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
}
