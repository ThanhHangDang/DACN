import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { NavLink } from "react-router-dom";

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
            {getRelativeTimeString(job?.date_post)}
          </span>
          <i className="bi bi-bookmark"></i>
        </div>
        <div className="d-flex justify-content-start">
          <div>
            <img
              src={job?.company_logo || job?.logo}
              alt="Logo"
              className="img-fluid me-2 rounded-1 me-3"
              style={{ width: 80, height: 80 }}
            />
          </div>
          <div>
            <h5 className="card-title fw-bold">
              <NavLink to={`/post-detail/${job?.job_id}`}>{job?.title}</NavLink>
            </h5>
            <p className="card-text mb-2">
              <NavLink
                to={`/company-detail/${job?.company_id || job?.employer_id}`}
                className="text-decoration-none custom-hover-3"
              >
                {job?.company_name}
              </NavLink>
            </p>
            <div className="d-flex flex-wrap gap-3 mb-2">
              <span className="badge bg-light text-dark">
                {job?.job_function_name}
              </span>
              <span className="badge bg-light text-dark">
                {job?.working_type}
              </span>
              <span className="badge bg-light text-dark">
                {job?.salary_max} - {job?.salary_min}
              </span>
              <span className="badge bg-light text-dark">
                <i className="bi bi-geo-alt-fill me-1"></i>
                {job?.work_location_name}
              </span>
            </div>
          </div>
        </div>

        {/* <NavLink
          to={`/post-detail/${job?.job_id}`}
          className="btn btn-success btn-sm"
        >
          Job Details
        </NavLink> */}
      </div>
    </div>
  );
};

export default JobCard;
