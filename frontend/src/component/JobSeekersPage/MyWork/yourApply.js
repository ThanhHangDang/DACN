import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getJobApply } from "../../../redux/actions/jobseekerAction.js";


export default function YourApply() {
  const dispatch = useDispatch();
  const { userInformation, listJobApply } = useSelector(
    (state) => state.jobseeker
  );
  
  useEffect(() => {
    dispatch(getJobApply(userInformation?.jobseeker_id));
  }, [dispatch,userInformation]);
  return (
    <>
      {listJobApply && listJobApply.length > 0 ? (
        <>
          {listJobApply.map((job) => (
            <div
            key={job.job_id} // Đảm bảo job_id tồn tại và là duy nhất
            className="d-flex justify-content-between align-items-center bg-white p-3 mb-2 rounded-2"
          >
            <div> {/* Bao bọc title_job và title_company trong một div */}
            <img src={job.logo} alt="Logo" width="100" /> {/* Ảnh công ty */}
              <span className="fw-bold">{job.title}</span><br /> {/* title_job đậm */}
              <span className="text-secondary">{job.company_name}</span> {/* title_company màu xám */}
            </div>
            <span>{moment(job.date_appy).format('DD/MM/YYYY')} </span>
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
