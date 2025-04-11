import React, { useState } from "react";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      {/* Sidebar Header */}
      <div className="d-flex align-items-center p-3 border-bottom border-secondary">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="rounded-circle me-2"
        />
        <span className="fw-bold">kaiadmin</span>
        <button
          className="btn btn-sm btn-outline-light ms-auto d-md-none"
          type="button"
          onClick={() => toggleMenu("sidebar")}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow-1">
        <ul className="nav flex-column">
          {/* Dashboard */}
          <li className="nav-item">
            <button
              className="nav-link text-start text-light px-3 py-2 d-flex align-items-center"
              onClick={() => toggleMenu("dashboard")}
            >
              <i className="bi bi-house-door me-2"></i>
              Dashboard
              <i
                className={`bi ms-auto ${
                  openMenu === "dashboard" ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></i>
            </button>
            <div
              className={`collapse ${openMenu === "dashboard" ? "show" : ""}`}
            >
              <ul className="nav flex-column bg-secondary ps-3">
                <li className="nav-item">
                  <a href="#" className="nav-link text-light py-1 px-2">
                    Submenu 1
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-light py-1 px-2">
                    Submenu 2
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* Components */}
          <li className="nav-item">
            <button
              className="nav-link text-start text-light px-3 py-2 d-flex align-items-center"
              onClick={() => toggleMenu("components")}
            >
              <i className="bi bi-stack me-2"></i>
              Components
              <i
                className={`bi ms-auto ${
                  openMenu === "components"
                    ? "bi-chevron-up"
                    : "bi-chevron-down"
                }`}
              ></i>
            </button>
            <div
              className={`collapse ${openMenu === "components" ? "show" : ""}`}
            >
              <ul className="nav flex-column bg-secondary ps-3">
                <li className="nav-item">
                  <a href="#" className="nav-link text-light py-1 px-2">
                    Base
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-light py-1 px-2">
                    Sidebar Layouts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-light py-1 px-2">
                    Forms
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* Widgets */}
          <li className="nav-item">
            <button
              className="nav-link text-start text-light px-3 py-2 d-flex align-items-center"
              onClick={() => toggleMenu("widgets")}
            >
              <i className="bi bi-display me-2"></i>
              Widgets
              <span className="badge bg-success ms-auto">4</span>
            </button>
          </li>

          {/* Documentation */}
          <li className="nav-item">
            <a
              href="#"
              className="nav-link text-light px-3 py-2 d-flex align-items-center"
            >
              <i className="bi bi-file-earmark me-2"></i>
              Documentation
              <span className="badge bg-primary ms-2">1</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-3 border-top border-secondary">
        <small className="text-secondary">© 2025 kaiadmin</small>
      </div>
    </div>
  );
}

export default Sidebar;
