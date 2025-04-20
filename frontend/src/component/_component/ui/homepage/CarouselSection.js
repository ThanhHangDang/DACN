import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

const HeroSection = ( {generalInfo} ) => {
  const {leadingcompany,count_job_posted,company_count,jobseeker_count} = generalInfo || {leadingcompany:[],count_job_posted:0,company_count:0,jobseeker_count:0}
  
  return (
    <div
      className="text-white text-center py-5"
      style={{
        // background:
        //   "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/hero-bg.jpg') no-repeat center center",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: "0.8",
        // background: "#614c4c",
        background:
          "radial-gradient(circle, rgba(97, 76, 76, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(1, 11, 13, 1) 89%)",
      }}
    >
      {/* Heading */}
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">Find Your Dream Job Today!</h1>
        <p className="lead text-white-50 mb-4">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className="d-flex justify-content-center">
          {/* Search Bar */}
          <div
            className="bg-white rounded shadow d-flex flex-nowrap align-items-stretch justify-content-between mb-5 w-100"
            style={{ maxWidth: "900px", overflowX: "auto" }}
          >
            {/* Input (mobile & desktop cùng lúc, chỉ 1 cái cần thiết thôi) */}
            <input
              type="text"
              className="form-control border-0 rounded-0 rounded-start"
              placeholder="Job Title or Company"
              style={{ maxWidth: "250px", flexShrink: 1, minWidth: 0 }}
            />

            {/* Location */}
            <select
              className="form-select border-0 rounded-0 d-none d-md-block"
              style={{ maxWidth: "200px", flexShrink: 1, minWidth: 0 }}
            >
              <option>Select Location</option>
            </select>

            {/* Category */}
            <select
              className="form-select border-0 rounded-0 d-none d-md-block"
              style={{ maxWidth: "200px", flexShrink: 1, minWidth: 0 }}
            >
              <option>Select Category</option>
            </select>

            {/* Button lớn */}
            <button className="btn btn-success rounded-0 rounded-end px-4 d-none d-md-flex align-items-center">
              <i className="bi bi-search me-2"></i> Search Job
            </button>

            {/* Button nhỏ */}
            <button className="btn btn-success d-flex d-md-none align-items-center px-3">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row justify-content-center text-white-50">          
          <div className="col-6 col-md-3 mb-4">
          <NavLink to="/post" className="text-decoration-none text-white-50">
            <div className="d-flex flex-column align-items-center">
              <div className="bg-success rounded p-3 mb-2">
                <i className="bi bi-briefcase-fill fs-4 text-white"></i>
              </div>
              <h5 className="text-white mb-0">{count_job_posted}</h5>
              <small>Công việc</small>
            </div>
          </NavLink>
          </div>
          <div className="col-6 col-md-3 mb-4">
          <NavLink to="/candidates" className="text-decoration-none text-white-50">
            <div className="d-flex flex-column align-items-center">
              <div className="bg-success rounded p-3 mb-2">
                <i className="bi bi-people-fill fs-4 text-white"></i>
              </div>
              <h5 className="text-white mb-0">{jobseeker_count}</h5>
              <small>Ứng viên</small>
            </div>
            </NavLink>
          </div>
          <div className="col-6 col-md-3 mb-4">
          <NavLink to="/list-company" className="text-decoration-none text-white-50">
            <div className="d-flex flex-column align-items-center">
              <div className="bg-success rounded p-3 mb-2">
                <i className="bi bi-buildings-fill fs-4 text-white"></i>
              </div>
              <h5 className="text-white mb-0">{company_count}</h5>
              <small>Công ty</small>
            </div>
            </NavLink>
          </div>
        </div>

        {/* leadingcompanys section */}
        <div className="d-flex flex-wrap justify-content-center gap-5 mt-4">
          {leadingcompany?.map((item, index) => {
            return (
              <NavLink to={`/company-detail/${item.company_id}`} key={index}>
                <img
                  src={item.logo}
                  alt="Slack"
                  height="40"
                  className="custom-hover-2"
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
