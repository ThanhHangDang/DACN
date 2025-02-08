import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getJobSave } from "../../../redux/actions/jobseekerAction.js";

export default function SavedWork() {
  const dispatch = useDispatch();
  const { userInformation, listJobSave } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    dispatch(getJobSave(userInformation?.jobseeker_id));
  }, [dispatch]);

  return (
    <>
      {listJobSave && listJobSave.length > 0 ? (
        <>
          {listJobSave.map((job) => (
            <div
              key={job.job_id}
              className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
            >
              <span>{job.job_title}</span>
              {/* <span>{job.date_save}</span> */}
              <a href="#" className="text-primary text-decoration-none">
                Xem
              </a>
            </div>
          ))}
        </>
      ) : (
        "Bạn chưa lưu công việc nào"
      )}
    </>
  );
}
