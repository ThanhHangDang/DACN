import { NavLink } from "react-router-dom";
import JobCard from "../JobCard.js";
import "./MainCategorySection.css";

const RecentJobSection = ({ job }) => {
  return (
    <div className="container my-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h3 className="fw-bold mb-2">Recent Jobs Available</h3>
          <p className="text-muted mb-0">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet...
          </p>
        </div>
        <div className="mt-3 mt-md-0">
          <NavLink
            to="/post"
            className="text-success text-decoration-underline fw-semibold"
          >
            View all
          </NavLink>
        </div>
      </div>

      <div>
        {job?.map((item, index) => {
          return <JobCard key={index} />;
        })}
      </div>
    </div>
  );
};

export default RecentJobSection;
