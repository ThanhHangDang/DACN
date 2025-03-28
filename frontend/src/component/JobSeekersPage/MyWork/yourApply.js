import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobApply } from "../../../redux/actions/jobseekerAction.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";

export default function YourApply() {
  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;
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
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {listJobApply.map((job) => (
            <>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={`flush-headingOne${job[0].job_id}`}
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseOne${job[0].job_id}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapseOne${job[0].job_id}`}
                  >
                    <span>
                      <img
                        src={job[0].company_logo}
                        alt="logo"
                        style={{ height: 50, width: 50 }}
                        className="rounded-circle me-5"
                      />
                    </span>
                    <span className="fw-bold">{job[0].title}</span>
                  </button>
                </h2>
                <div
                  id={`flush-collapseOne${job[0].job_id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`flush-headingOne${job[0].job_id}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body text-start d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span>
                        Mức lương:{" "}
                        {job[0].salary_min || job[0].salary_max
                          ? `${formatNumberToTr(
                              job[0].salary_min
                            )} - ${formatNumberToTr(job[0].salary_max)} đ/tháng`
                          : "Chưa có thông tin"}{" "}
                      </span>
                      <span>
                        Công ty:{" "}
                        {job[0].company_name || "Chưa có thông tin công ty"}
                      </span>
                      <span>
                        Địa chỉ: {job[0].address || "Chưa có thông tin địa chỉ"}
                      </span>
                      <span>
                        Ngày đăng:{" "}
                        {formatDateToDDMMYYYY(job[0].date_post) ||
                          "Chưa có thông tin ngày đăng"}
                      </span>
                      <span>
                        Mô tả:{" "}
                        {job[0].describle ||
                          "Chưa có thông tin mô tả công việc"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <NavLink
                        to={`/post-detail/${job[0].job_id}`}
                        className="text-primary text-decoration-none flex-end"
                      >
                        Xem thêm
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        "Bạn chưa ứng tuyển công việc nào"
      )}
    </>
  );
}
