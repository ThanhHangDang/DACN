import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetItemProfileQuery } from "../../../redux_toolkit/jobseekerApi";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export default function CompanyYouFollow() {
  const { user } = useSelector((state) => state.auth);
  const jobseekerId = user?.id;

  // Using RTK Query hook instead of dispatch + useEffect
  const { data: listFollowEmployer, isLoading } = useGetItemProfileQuery({
    type: "follow_employer",
    profile_id: jobseekerId,
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const getRelativeTimeString = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      console.error("Invalid date format:", error);
      return dateString; // Trả về date_post gốc nếu có lỗi
    }
  };

  const handleUnFollow = (company_id) => {
    console.log(user?.id);
    console.log(company_id);
  };

  return (
    <>
      {listFollowEmployer && listFollowEmployer.length > 0 ? (
        <>
          {listFollowEmployer.map((company) => (
            <div
              className="card mb-3 shadow-sm job-card"
              key={company.company_id}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-success small fw-semibold">
                    {" "}
                    {/* {getRelativeTimeString(company.created_at)} */}
                  </span>

                  <i
                    className="bi bi-heart-fill text-danger"
                    onClick={() => {
                      handleUnFollow(company.company_id);
                    }}
                  ></i>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={company.logo}
                    alt="logo"
                    style={{ width: 80, height: 80, marginRight: 10 }}
                  />
                  <div className="d-flex flex-column">
                    <NavLink
                      to={`/company-detail/${company.company_id}`}
                      className="mb-0"
                    >
                      {company?.company_name}
                    </NavLink>
                    <p className="card-text mb-2">{company.industry_name}</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-2">
                  <span className="badge bg-light text-dark">
                    {company.average_score
                      ? `Score: ${company.average_score}`
                      : "Chưa có đánh giá"}
                  </span>
                  <span className="badge bg-light text-dark">
                    {company.count_job_posted
                      ? `Bài đăng: ${company.count_job_posted}`
                      : "Chưa có bài đăng"}
                  </span>
                  <span className="badge bg-light text-dark">
                    {company.working_type}
                  </span>
                  <span className="badge bg-light text-dark">
                    <i class="bi bi-people-fill"></i>{" "}
                    {company.count_follower ? company.count_follower : "0"}
                  </span>
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {company.company_location?.address
                      ? company.company_location?.address
                      : "Chưa có thông tin"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa theo dõi công ty nào"
      )}
    </>
  );
}
