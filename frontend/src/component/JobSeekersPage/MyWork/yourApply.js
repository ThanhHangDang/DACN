import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobApply } from "../../../redux/actions/jobseekerAction.js";

export default function YourApply() {
  const dispatch = useDispatch();
  const { userInformation, listJobApply } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    dispatch(getJobApply(userInformation?.jobseeker_id));
  }, []);

  return (
    <>
      {listJobApply && listJobApply.length > 0 ? (
        <>
          {listJobApply.map((job) => (
            <div
              key={job.job_id}
              className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
            >
              <span>
                <img
                  src={job[0].company_logo}
                  alt="logo"
                  style={{ height: 50, width: 50 }}
                  className="rounded-circle me-2"
                />
              </span>
              <span>{job[0].title}</span>

              <NavLink
                to={`/post-detail/${job[0].job_id}`}
                className="text-primary text-decoration-none"
              >
                Xem
              </NavLink>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa ứng tuyển công việc nào"
      )}
    </>
  );
}
