import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getJobApply } from "../../../redux/actions/jobseekerAction.js";

export default function YourApply() {
  const dispatch = useDispatch();
  const { userInformation, listJobApply } = useSelector(
    (state) => state.jobseeker
  );

  return (
    <>
      {listJobApply && listJobApply.length > 0 ? (
        <>
          {listJobApply.map((job) => (
            <div
              key={job.job_id}
              className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
            >
              <span>{job.job_title}</span>
              <span>{job.date_apply}</span>
              <a href="#" className="text-primary text-decoration-none">
                Xem
              </a>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa ứng tuyển công việc nào"
      )}
    </>
  );
}
