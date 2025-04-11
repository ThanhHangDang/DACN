import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetItemProfileQuery } from "../../../redux_toolkit/JobseekerApi";

export default function CompanyYouFollow() {
  const { user } = useSelector((state) => state.auth);
  const jobseekerId = user?.user?.id;
  
  // Using RTK Query hook instead of dispatch + useEffect
  const { data: listFollowEmployer, isLoading } = useGetItemProfileQuery({type:"follow_employer",profile_id:jobseekerId});

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {listFollowEmployer && listFollowEmployer.length > 0 ? (
        <>
          {listFollowEmployer.map((company) => (
            <div
              key={company.company_id}
              className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
            >
              <span>
                <img
                  src={company.logo}
                  alt="logo"
                  style={{ height: 50, width: 50 }}
                  className="rounded-circle me-2"
                />
              </span>
              <span>{company.company_name}</span>

              <NavLink to={`/company-detail/${company.company_id}`} className="text-primary text-decoration-none">
                Xem
              </NavLink>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa theo dõi công ty nào"
      )}
    </>
  );
}
