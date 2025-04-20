import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

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
        <h5 className="card-title fw-bold">{job?.title}</h5>
        <p className="card-text mb-2">{job?.company_name}</p>
        <div className="d-flex flex-wrap gap-3 mb-2">
          <span className="badge bg-light text-dark">
            {job?.job_function_name}
          </span>
          <span className="badge bg-light text-dark">{job?.working_type}</span>
          <span className="badge bg-light text-dark">
            {job?.salary_max} - {job?.salary_min}
          </span>
          <span className="badge bg-light text-dark">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {job?.work_location_name}
          </span>
        </div>
        <button className="btn btn-success btn-sm">Job Details</button>
      </div>
    </div>
  );
};

export default JobCard;
