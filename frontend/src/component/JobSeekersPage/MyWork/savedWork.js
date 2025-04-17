import React from "react"; //{ useEffect }

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemProfileQuery } from "../../../redux_toolkit/jobseekerApi.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";
// import { type } from "@testing-library/user-event/dist/type/index.js";
import JobCard from "../../../component/_component/ui/JobCard.js";

export default function SavedWork() {
  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: userInformation } = useGetItemProfileQuery({
    type: "Basic",
    profile_id: user?.user?.id,
  });
  const { data: listJobSave } = useGetItemProfileQuery({
    type: "save_job",
    profile_id: user?.user?.id,
  });

  console.log("List job save:", listJobSave);

  return (
    <>
      {listJobSave && listJobSave.length > 0 ? (
        // <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="col-lg-11 mt-4">
          {listJobSave.map((job, index) => (
            <>
              {/* <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={`flush-headingOne${job.job_id}`}
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseOne${job.job_id}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapseOne${job.job_id}`}
                  >
                    <span>
                      <img
                        src={job.company_logo}
                        alt="logo"
                        style={{ height: 50, width: 50 }}
                        className="rounded-circle me-5"
                      />
                    </span>
                    <span className="fw-bold">{job.title}</span>
                  </button>
                </h2>
                <div
                  id={`flush-collapseOne${job.job_id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`flush-headingOne${job.job_id}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body text-start d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span>
                        Mức lương:{" "}
                        {job.salary_min || job.salary_max
                          ? `${formatNumberToTr(
                              job.salary_min
                            )} - ${formatNumberToTr(job.salary_max)} đ/tháng`
                          : "Chưa có thông tin"}{" "}
                      </span>
                      <span>
                        Công ty:{" "}
                        {job.company_name || "Chưa có thông tin công ty"}
                      </span>
                      <span>
                        Địa chỉ: {job.address || "Chưa có thông tin địa chỉ"}
                      </span>
                      <span>
                        Ngày đăng:{" "}
                        {formatDateToDDMMYYYY(job.date_post) ||
                          "Chưa có thông tin ngày đăng"}
                      </span>
                      <span>
                        Mô tả:{" "}
                        {job.describle || "Chưa có thông tin mô tả công việc"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <NavLink
                        to={`/post-detail/${job.job_id}`}
                        className="text-primary text-decoration-none flex-end"
                      >
                        Xem thêm
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div> */}
              <JobCard job={job} key={index} />
            </>
          ))}
        </div>
      ) : (
        "Bạn chưa lưu công việc nào"
      )}
    </>
  );
}
