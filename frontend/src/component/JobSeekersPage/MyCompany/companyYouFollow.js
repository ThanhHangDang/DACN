import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getFollowEmployer } from "../../../redux/actions/jobseekerAction.js";

export default function CompanyYouFollow() {
  const dispatch = useDispatch();
  const { userInformation, listFollowEmployer } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    dispatch(getFollowEmployer(userInformation?.jobseeker_id));
  }, [dispatch]);

  // console.log("List follow employer:", listFollowEmployer);
  // console.log("User information:", userInformation.jobseeker_id);

  return (
    <>
      {listFollowEmployer && listFollowEmployer.length > 0 ? (
        <>
          {listFollowEmployer.map((company) => (
            <div
              key={company.company_id}
              className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
            >
              <span>{company.company_name}</span>
              {/* <span>{company.date_follow}</span> */}
              <a href="#" className="text-primary text-decoration-none">
                Xem
              </a>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa theo dỏi công ty nào"
      )}
    </>
  );
}
