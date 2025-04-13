import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
// import { NavLink, useNavigate } from "react-router-dom";
import { useGetPostSearchQuery } from "../../../redux_toolkit/guestApi";
import {
  useGetCitiesQuery,
  useGetIndustriesQuery,
  useGetJobFunctionQuery,
} from "../../../redux_toolkit/CategoryApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const JobCard = ({ job }) => {
  const getRelativeTimeString = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      console.error("Invalid date format:", error);
      return dateString; // Trả về date_post gốc nếu có lỗi
    }
  };
  return (
    <div className="card mb-3 shadow-sm job-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <span className="text-success small fw-semibold">
            {" "}
            {getRelativeTimeString(job.date_post)}
          </span>
          <i className="bi bi-bookmark"></i>
        </div>
        <h5 className="card-title fw-bold">{job.title}</h5>
        <p className="card-text mb-2">{job.company_name}</p>
        <div className="d-flex flex-wrap gap-3 mb-2">
          <span className="badge bg-light text-dark">
            {job.job_function_name}
          </span>
          <span className="badge bg-light text-dark">{job.working_type}</span>
          <span className="badge bg-light text-dark">
            {job.salary_max} - {job.salary_min}
          </span>
          <span className="badge bg-light text-dark">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {job.work_location_name}
          </span>
        </div>
        <button className="btn btn-success btn-sm">Job Details</button>
      </div>
    </div>
  );
};

const JobListing = () => {
   const [filter, setFilter] = useState({
    title: "",
    industry_id: "",
    job_function_id: "",
    work_location: "",
    salary: "",
    level_id: "",
    require_marital_status: "",
    require_gender: "",
    require_age_min: "",
    require_age_max: "",
    education_at_least: 0,
    require_experience: 0,
    is_active: 1,
    date_post: "",
    active_page: 1, // Thêm active_page vào filter
    paging_size: 10, // Thêm kích thước trang
  });
  const { data: cata_city } = useGetCitiesQuery(84); // 84 là mã quốc gia Việt Nam
  const { data: cata_industry } = useGetIndustriesQuery();
  // const { data: cata_jobFunction } = useGetJobFunctionQuery();
  const cata_jobtype = [
    { id: 1, name: "Full time" },
    { id: 2, name: "Part time" },
  ];

  // const [active_page, setActive_Page] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading, error, refetch } = useGetPostSearchQuery(filter);
  const { work: jobs, totalWorksPages } = data || {
    work: [],
    totalWorksPages: 1,
  };
  console.log("city", cata_industry);

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h6 className="fw-bold mb-3">Search by Job Title</h6>
            <input
              className="form-control mb-3"
              placeholder="Job title or company"
            />
            <h6 className="fw-bold mb-2">Location</h6>
            <select 
              className="form-select mb-3"
              onChange={(e) => setFilter({
                ...filter,
                work_location: e.target.value
              })}
              value={filter.city_id}
            >
              <option value="">Choose city</option>
              {cata_city?.map((c) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>
            <h6 className="fw-bold mb-2">Category</h6>
            <select
              className="form-select mb-3"
              onChange={(e) => setFilter({
                ...filter,
                industry_id: e.target.value
              })}
              value={filter.industry_id}
            >
              <option value="">Choose category</option>
              {cata_industry?.map((c) => (
                <option key={c.industry_id} value={c.industry_id}>
                  {c.industry_name}
                </option>
              ))}
            </select>
            <h6 className="fw-bold mt-3">Job Type</h6>
            {cata_jobtype.map((type) => (
              <div className="form-check mb-2" key={type.id}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`jobtype-${type.id}`} 
                  onChange={(e) => {
                    setFilter({
                      ...filter, 
                      working_type: e.target.checked ? type.name : ""
                    });
                  }}
                />
                <label className="form-check-label" htmlFor={`jobtype-${type.id}`}>
                  {type.name}
                </label>
              </div>
            ))}

            <h6 className="fw-bold mt-3">Experience Level</h6>
            {/* Add experience checkboxes */}

            <h6 className="fw-bold mt-3">Date Posted</h6>
            {/* Add date checkboxes */}

            <h6 className="fw-bold mt-3">Salary</h6>
            <input type="range" className="form-range mb-2" />
            <div className="d-flex justify-content-between small">
              <span>$0</span>
              <span>$99999</span>
            </div>
            <button className="btn btn-outline-success btn-sm mt-2">
              Apply
            </button>

            <h6 className="fw-bold mt-3">Tags</h6>
            <div className="d-flex flex-wrap gap-2">
              {[
                "engineering",
                "design",
                "ui/ux",
                "marketing",
                "management",
              ].map((tag) => (
                <span key={tag} className="badge bg-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 text-center bg-secondary text-white rounded shadow-sm">
            <h5 className="fw-bold">WE ARE HIRING</h5>
            <p className="mb-0">Apply Today!</p>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-muted small">Showing 6-6 of 10 results</div>
            <select className="form-select form-select-sm w-auto">
              <option>Sort by latest</option>
            </select>
          </div>
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}

          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination pagination-sm">
              <li className="page-item">
                <button className="page-link">1</button>
              </li>
              <li className="page-item active">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
