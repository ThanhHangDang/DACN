import React, { useEffect } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { getJobSave } from "../../../redux/actions/jobseekerAction.js";

export default function SavedWork() {
  const dispatch = useDispatch();
  const { userInformation, listJobSave } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    dispatch(getJobSave(userInformation?.jobseeker_id));
  }, [dispatch,userInformation]);

  return (
    <>
      {listJobSave && listJobSave.length > 0 ? (
        <>
          {listJobSave.map((job) => (
            <div
            key={job.job_id} // Đảm bảo job_id tồn tại và là duy nhất
            className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
          >
            <div> {/* Bao bọc title_job và title_company trong một div */}
              <img src={job.logo} alt="Logo" width="100" /> {/* Ảnh công ty */}
              <span className="fw-bold">{job.title}</span><br /> {/* title_job đậm */}
              <span className="text-secondary">{job.company_name}</span> {/* title_company màu xám */}
            </div>
            <span>{moment(job.date_post).format('DD/MM/YYYY')} </span>
            <a href="#" className="text-primary text-decoration-none">
              Bỏ lưu
            </a>
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
