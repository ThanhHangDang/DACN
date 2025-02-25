import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowEmployer } from "../../../redux/actions/jobseekerAction.js";

export default function CompanyYouFollow() {
  const dispatch = useDispatch();
  const { userInformation, listFollowEmployer } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    console.log("Uaaaaa");
    dispatch(getFollowEmployer(userInformation?.jobseeker_id));
  }, []);

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

              <NavLink to="" className="text-primary text-decoration-none">
                Xem
              </NavLink>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa theo dỏi công ty nào"
      )}
    </>
  );
}
