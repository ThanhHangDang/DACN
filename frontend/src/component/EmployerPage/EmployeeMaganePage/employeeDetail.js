import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetItemProfileQuery } from "../../../redux_toolkit/jobseekerApi";

export default function EmployeeDetail() {
  const { id } = useParams();
  const { data } = useGetItemProfileQuery({
    type: "jobseeker",
    profile_id: id,
  });
  const jobseekerDetail = data || [];
  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="card">
          <div className="card-header post-detail-bg">
            <h3>{jobseekerDetail?.full_name}</h3>
            <p className="me-5">{jobseekerDetail?.title}</p>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i className="bi bi-briefcase-fill me-2"></i>
                {jobseekerDetail?.level_name}
              </p>
              <p className="me-4">
                <i className="bi bi-mortarboard-fill me-2"></i>
                {jobseekerDetail?.education_title}
              </p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i className="bi bi-envelope-fill me-2"></i>
                {jobseekerDetail?.email}
              </p>
              <p className="me-4">
                <i className="bi bi-telephone-fill me-2"></i>
                {jobseekerDetail?.phone_number}
              </p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i className="bi bi-envelope-fill me-2"></i>
                {jobseekerDetail?.address}
              </p>
            </div>

            <button className="btn btn-primary mb-3 mt-2">Liên hệ</button>
            <button className="btn btn-secondary mb-3 mt-2 ms-2">Lưu</button>
          </div>
          <div className="card-body">
            <section className="mb-4 border border-primany rounded-3 p-2">
              <h5>Hồ sơ ứng viên</h5>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Công việc mong muốn</h6>
                <p>Nơi làm việc: {jobseekerDetail?.work_expected_place}</p>
                <p className="mt-0">
                  Mức lương: {formatNumberToTr(jobseekerDetail?.salary_expect)}{" "}
                  đ/tháng
                </p>
              </section>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Mục tiêu nghề nghiệp</h6>
                <ul>
                  <li>{jobseekerDetail?.career_target}</li>
                </ul>
              </section>
              <section className="mb-4 p-2">
                <div className="d-flex ">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Tuổi</h6>
                    <p>20 tuổi</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Giới tính</h6>
                    <p>{jobseekerDetail?.gender}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold text-secondary">
                      Tình trạng hôn nhân
                    </h6>
                    <p>{jobseekerDetail?.marital_status}</p>
                  </div>
                </div>

                <div className="d-flex ">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Kinh ngiệm</h6>
                    <p>{jobseekerDetail?.year_exp} năm</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Học vấn</h6>
                    <p>{jobseekerDetail?.education_title}</p>
                  </div>
                  <div></div>
                </div>
              </section>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Dự án</h6>
                <ul>
                  {jobseekerDetail?.project_info?.map((project) => (
                    <li>
                      <p>{project.project_name}</p>
                      <p>
                        {project.project_from} - {project.project_to}
                      </p>
                      <p>
                        {project.project_description}
                        {" - "}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Kỹ năng</h6>
                <p>
                  {jobseekerDetail?.skill_info?.map((skill) => (
                    <span>
                      {skill.skill}
                      {", "}
                    </span>
                  ))}
                  ...
                </p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Ngoại ngữ</h6>
                <p>
                  {jobseekerDetail?.language_info?.map((language) => (
                    <span>
                      {language.language}
                      {", "}
                    </span>
                  ))}
                  ...
                </p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Hoạt động</h6>
                <p>Không</p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Chứng chỉ</h6>
                <ul>
                  {jobseekerDetail?.certification_info?.map((certificate) => (
                    <li>
                      <p>{certificate.certification}</p>
                      <p>{certificate.month}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
