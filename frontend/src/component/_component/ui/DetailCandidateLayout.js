import React, { useState,useEffect }from "react";
import { NavLink } from "react-router-dom";
import Rating from "./RatingSection.js";
// import { format } from "date-fns";
import formatSafeDate from "../../../utils/formatSafeDate.js";
const CandidateDetail = ({
  basic,
  certification_info,
  cv_link,
  education_info,
  experience_info,
  language_info,
  project_info,
  skill_info,
  ratingData,
}) => {
  const handleFollowCandidate = () => {
    console.log("Follow candidate clicked!");
    // Add your follow candidate logic here
  };

  console.log("ratingData", ratingData);
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center mb-4">
        <img
          src={basic?.avatar}
          alt="avatar"
          className="rounded-circle me-md-4 mb-3 mb-md-0"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div>
          <h4 className="mb-1">{basic?.full_name || "Tên Hidden"}</h4>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark">
              ⭐ {basic?.score ? parseFloat(basic.score).toFixed(1) : "0"}
            </span>
            <span
              className={`badge ${
                basic?.is_open_for_job === 0 ? "bg-danger" : "bg-success"
              }`}
            >
              {basic?.is_open_for_job === 0
                ? "Not Openning"
                : "Opening for Job"}
            </span>
          </div>
          <div className="text-muted small mt-2">
            {/* <div>Origin: Career Site</div> */}
            <div>Chức danh hiện tại: {basic?.title || "Hidden"}</div>
            <div>Cấp bậc hiện tại: {basic?.level_name || "Hidden"}</div>
            <div>
              Ngày tham gia:{" "}
              {formatSafeDate(basic?.create_at, "dd/MM/yyyy") || "Hidden"}
            </div>
          </div>
        </div>
        <div className="ms-auto">
          <button
            className="btn btn-primary me-2"
            onClick={handleFollowCandidate}
          >
            Follow
          </button>
          <a href={basic?.email} className="btn btn-outline-success">
            Send Email
          </a>
        </div>
      </div>

      <div className="row">
        {/* Left Side */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h6>Công việc mong muốn</h6>
              <div className="row small text-muted">
                <div className="col-md-6">
                  <p>
                    Mục tiêu sự nghiệp:{" "}
                    <strong>{basic?.career_target || "Hidden"}</strong>
                  </p>
                  <p>
                    Mức lương mong muốn:{" "}
                    <strong>{basic?.salary_expect || "Hidden"}</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Địa chỉ làm việc:{" "}
                    <strong>{basic?.work_expected_place || "Hidden"}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience*/}
          <div className="card mb-4">
            <div className="card-body">
              <h6>Experience</h6>

              <div className="row small text-muted">
                {experience_info?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="fw-bold mb-1">{item.exp_title}</p>
                      {/* <p className="text-muted small mb-3">
                        Fulltime • Jogja • Onsite
                      </p> */}
                      <div className="col-md-6">
                        <p>
                          Comapany: <strong>{item.exp_company}</strong>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          From:{" "}
                          <strong>
                            {formatSafeDate(item.exp_from, "MM/yyyy")}
                          </strong>{" "}
                          To:{" "}
                          <strong>
                            {" "}
                            {formatSafeDate(item.exp_to, "MM/yyyy")}
                          </strong>
                        </p>
                      </div>
                      <div className="mb-5">
                        <p className="fw-bold mb-1">Description</p>
                        <p>{item.exp_description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Education</h6>

              <div className="row small text-muted">
                {education_info?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="mb-1">
                        <strong>University:</strong> {item.school}
                      </p>
                      <p className="mb-1">
                        <strong>Major:</strong> {item.major}
                      </p>
                      <p className="mb-1">
                        From:{" "}
                        <strong>
                          {/* {format(new Date(item.from_), "MM/yyyy")} */}
                          {formatSafeDate(item.from_, "MM/yyyy")}
                        </strong>{" "}
                        To:{" "}
                        <strong>
                          {" "}
                          {/* {format(new Date(item.to_), "MM/yyyy")} */}
                          {formatSafeDate(item.to_, "MM/yyyy")}
                        </strong>
                      </p>
                      <p className="mb-5">
                        <strong>Level:</strong> {item.education_title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Project</h6>

              <div className="row small text-muted">
                {project_info?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="fw-bold mb-1">{item.project_name}</p>
                      <div className="col-md-6">
                        <p>
                          From:{" "}
                          <strong>
                            {/* {format(new Date(item.project_from), "MM/yyyy")} */}
                            {formatSafeDate(item.project_from, "MM/yyyy")}
                          </strong>{" "}
                          To:{" "}
                          <strong>
                            {/* {format(new Date(item.project_to), "MM/yyyy")} */}
                            {formatSafeDate(item.project_to, "MM/yyyy")}
                          </strong>
                        </p>
                      </div>
                      <div className="mb-5">
                        <p className="fw-bold mb-1">Description</p>
                        <p>{item.project_description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Skill</h6>

              <div className="small text-muted">
                {skill_info.map((item) => (
                  <NavLink
                    key={item.skill_id}
                    to={`/post?skill_id=${item.skill_id}`}
                    className="badge bg-secondary me-2 mb-2 text-decoration-none skill-badge"
                  >
                    {item.skill_name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Language</h6>

              <div className="small text-muted">
                {language_info.map((item) => (
                  <NavLink
                    key={item.language_id}
                    to={`/post?skill_id=${item.language_id}`}
                    className="badge bg-secondary me-2 mb-2 text-decoration-none skill-badge"
                  >
                    {`${item.language_name} - ${item.metric_display} `}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Certification</h6>

              <div className="row small text-muted">
                {certification_info?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="mb-1">
                        <strong>Certification:</strong> {item.certification}
                      </p>
                      <p className="mb-5">
                        <strong>Month:</strong>{" "}
                        {/* {formatSafeDate(item.month_)} */}
                        {formatSafeDate(item.month, "MM/yyyy")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-4">
          {/* Personal Info */}
          <div className="card mb-4">
            <div className="card-body">
              <h6>Thông tin cá nhân</h6>
              <p className="mb-1">
                <strong>Email:</strong>{" "}
                <a href={basic?.email}>
                  {basic?.email || "kristisipes@gmail.com"}
                </a>
              </p>
              <p className="mb-1">
                <strong>Số điện thoại liên hệ:</strong>{" "}
                {basic?.phone_number || "+62 - 921 - 019 - 112"}
              </p>
              <p className="mb-1">
                <strong>Giới tính:</strong>{" "}
                {basic?.gender
                  ? basic.gender === "female"
                    ? "Nữ"
                    : "Nam"
                  : "Hidden"}
              </p>
              <p className="mb-1">
                <strong>Tình trạng hôn nhân: </strong>{" "}
                {basic?.marital_status || "Hidden"}
              </p>
              <p className="mb-1">
                <strong>Ngày sinh:</strong>{" "}
                {formatSafeDate(basic.birthday, "dd/MM/yyyy") || "Hidden"}
              </p>
              <p className="mb-1">
                <strong>Địa chỉ:</strong> {basic?.address || "Hidden"}
              </p>
            </div>
          </div>

          {/* Notes */}

          <div className="card">
            {ratingData ? (
              <Rating ratingData={ratingData} profile_id = {basic?.profile_id} />
            ) : (
              <div className="card-body text-center text-muted">
                Không có dữ liệu đánh giá
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
