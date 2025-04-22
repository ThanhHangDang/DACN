import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "./RatingSection.js";
import { format } from "date-fns";

const CandidateDetail = ({
  employerID,
  basic,
  certification1,
  cv,
  edu1,
  exp1,
  language1,
  project1,
  skill1,
  ratingData,
}) => {
  const exp = exp1 || [
    {
      profile_experience_id: 26,
      profile_id: 30000004,
      exp_title: "Software Developer hehe aaaaaaaa",
      exp_from: "2020-07-29T17:00:00.000Z",
      exp_to: "2022-10-29T17:00:00.000Z",
      exp_company: "Tech Solutions Vietnam",
      exp_description:
        "Developed web applications using React and Node.js. Worked in an Agile team environment. hehe",
    },
  ];

  const edu = edu1 || [
    {
      profile_education_id: 4,
      profile_id: 30000004,
      education_id: 80,
      major: "Kiến Trúc",
      school: "Đại học Xây Dựng",
      from_: "2015-08-31T17:00:00.000Z",
      to_: "2019-05-30T17:00:00.000Z",
      education_title: "Đại Học",
    },
    {
      profile_education_id: 15,
      profile_id: 30000004,
      education_id: 80,
      major: "Computer Science",
      school: "Ho Chi Minh City University of Technology",
      from_: "2016-08-30T17:00:00.000Z",
      to_: "2022-05-25T17:00:00.000Z",
      education_title: "Đại Học",
    },
  ];

  const project = project1 || [
    {
      profile_project_id: 4,
      profile_id: 30000004,
      project_name: "Thiết kế khu dân cư",
      project_from: "2019-04-26T17:00:00.000Z",
      project_to: "2024-12-30T17:00:00.000Z",
      project_description:
        "Thiết kế các tòa nhà căn hộ thân thiện với môi trường.",
    },
    {
      profile_project_id: 16,
      profile_id: 30000004,
      project_name: "E-commerce Platform 123",
      project_from: "2019-02-27T17:00:00.000Z",
      project_to: "2019-06-28T17:00:00.000Z",
      project_description:
        "Developed an e-commerce platform for a local retail company using MERN stack.",
    },
  ];

  const skill = skill1 || [
    {
      profile_id: 30000004,
      skill_id: 12,
      tags_content: "Tâm Lý Học",
    },
    {
      profile_id: 30000004,
      skill_id: 15,
      tags_content: "Phân Tích Kinh Tế",
    },
    {
      profile_id: 30000004,
      skill_id: 159,
      tags_content: "Big Data",
    },
    {
      profile_id: 30000004,
      skill_id: 185,
      tags_content: "Communication Skills",
    },
    {
      profile_id: 30000004,
      skill_id: 2030,
      tags_content: "Lập Trình Python",
    },
    {
      profile_id: 30000004,
      skill_id: 3329,
      tags_content: "Java Programming",
    },
  ];

  const language = language1 || [
    {
      profile_id: 30000004,
      language_id: 2,
      language_name: "ENGLISH",
      language_metrict: "TOEIC",
      metric_value: 80,
      metric_display: "TOEIC 700-900",
    },
    {
      profile_id: 30000004,
      language_id: 4,
      language_name: "ENGLISH",
      language_metrict: "TOEIC",
      metric_value: 40,
      metric_display: "TOEIC 450-550",
    },
    {
      profile_id: 30000004,
      language_id: 7,
      language_name: "JAPANESE",
      language_metrict: "JLPT",
      metric_value: 80,
      metric_display: "N2",
    },
    {
      profile_id: 30000004,
      language_id: 8,
      language_name: "JAPANESE",
      language_metrict: "JLPT",
      metric_value: 60,
      metric_display: "N3",
    },
  ];

  const certification = certification1 || [
    {
      profile_certifications_id: 4,
      profile_id: 30000004,
      certifications: "Autodesk Certified Profestional",
      month_: "2024-11-30T17:00:00.000Z",
    },
    {
      profile_certifications_id: 19,
      profile_id: 30000004,
      certifications: "AWS Certified Developer",
      month_: "2022-01-14T17:00:00.000Z",
    },
  ];

  const handleFollowCandidate = () => {
    console.log(
      "ID công ty: ",
      employerID,
      " và ID của Candidate: ",
      basic?.profile_id
    );
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center mb-4">
        <img
          src={
            basic?.avatar ||
            "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/6/30/1210827/339006310_3359181837.jpg"
          }
          alt="avatar"
          className="rounded-circle me-md-4 mb-3 mb-md-0"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div>
          <h4 className="mb-1">{basic?.username || "Tên mặc định"}</h4>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark">
              ⭐ {basic?.score || "0"}
            </span>
            <span className="badge bg-success">
              {basic?.status_ === 0 ? "UnActive" : "Active"}
            </span>
          </div>
          <div className="text-muted small mt-2">
            {/* <div>Origin: Career Site</div> */}
            <div>Title: {basic?.title || "Title mặc định"}</div>
            <div>Level: {basic?.level_name || "Level mặc định"}</div>
            <div>Applied: {basic?.create_at || "Ngày mặc định"}</div>
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
              <h6>Expected Job</h6>
              <div className="row small text-muted">
                <div className="col-md-6">
                  <p>
                    Career Target:{" "}
                    <strong>{basic?.career_target || "Mặc định"}</strong>
                  </p>
                  <p>
                    Expected Salary:{" "}
                    <strong>{basic?.salary_expect || "Mặc định"}</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Work Place:{" "}
                    <strong>{basic?.city_name || "Mặc định"}</strong>
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
                {exp?.map((item, index) => {
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
                            {format(new Date(item.exp_from), "MM/yyyy")}
                          </strong>{" "}
                          To:{" "}
                          <strong>
                            {" "}
                            {format(new Date(item.exp_to), "MM/yyyy")}
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
                {edu?.map((item, index) => {
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
                          {format(new Date(item.from_), "MM/yyyy")}
                        </strong>{" "}
                        To:{" "}
                        <strong>
                          {" "}
                          {format(new Date(item.to_), "MM/yyyy")}
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
                {project?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="fw-bold mb-1">{item.project_name}</p>
                      <div className="col-md-6">
                        <p>
                          From:{" "}
                          <strong>
                            {format(new Date(item.project_from), "MM/yyyy")}
                          </strong>{" "}
                          To:{" "}
                          <strong>
                            {format(new Date(item.project_to), "MM/yyyy")}
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
                {skill.map((item) => (
                  <NavLink
                    key={item.skill_id}
                    to={`/post?skill_id=${item.skill_id}`}
                    className="badge bg-secondary me-2 mb-2 text-decoration-none skill-badge"
                  >
                    {item.tags_content}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Language</h6>

              <div className="small text-muted">
                {language.map((item) => (
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
                {certification?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className="mb-1">
                        <strong>Certification:</strong> {item.certifications}
                      </p>
                      <p className="mb-5">
                        <strong>Month:</strong>{" "}
                        {format(new Date(item.month_), "MM/yyyy")}
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
              <h6>Personal Information</h6>
              <p className="mb-1">
                <strong>Email:</strong>{" "}
                <a href={basic?.email}>
                  {basic?.email || "kristisipes@gmail.com"}
                </a>
              </p>
              <p className="mb-1">
                <strong>Phone:</strong>{" "}
                {basic?.phone_number || "+62 - 921 - 019 - 112"}
              </p>
              <p className="mb-1">
                <strong>Gender:</strong> {basic?.gender || "Mặc định"}
              </p>
              <p className="mb-1">
                <strong>Marital: </strong> {basic?.marital_status || "Mặc định"}
              </p>
              <p className="mb-1">
                <strong>Birthdate:</strong> {basic?.birthday || "Mặc định"}
              </p>
              <p className="mb-1">
                <strong>Address:</strong> {basic?.address || "Mặc định"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <Rating ratingData={ratingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
