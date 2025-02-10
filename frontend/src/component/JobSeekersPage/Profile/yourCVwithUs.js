import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getListExp,
  getListEducation,
  getListProject,
  getListSkill,
  getListLanguage,
  getListCertification,
} from "../../../redux/actions/jobseekerAction.js";

export default function YourCVwithUs() {
  const dispatch = useDispatch();
  const {
    userInformation,
    listExp,
    listEducation,
    listProject,
    listSkill,
    listLanguage,
    listCertification,
  } = useSelector((state) => state.jobseeker);
  const { user } = useSelector((state) => state.auth);

  const formatDateToDDMMYYYY = (isoDateString) => {
    const date = new Date(isoDateString); // Tạo đối tượng Date từ chuỗi ISO
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY
  };

  const [experience, setExperience] = useState({
    job: "",
    company: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const [education, setEducation] = useState({
    major: "",
    school: "",
    startYear: "",
    endYear: "",
  });

  const handleAddExperience = () => {
    console.log("Add experience: ", experience);
  };

  const handleAddEducation = () => {
    console.log("Add education: ", education);
  };

  useEffect(() => {
    dispatch(getListExp(userInformation?.jobseeker_id));
    dispatch(getListEducation(userInformation?.jobseeker_id));
    dispatch(getListProject(userInformation?.jobseeker_id));
    dispatch(getListSkill(userInformation?.jobseeker_id));
    dispatch(getListLanguage(userInformation?.jobseeker_id));
    dispatch(getListCertification(userInformation?.jobseeker_id));
  }, [dispatch]);

  return (
    <div>
      {/* Modal mục tiêu nghề nghiệp */}
      <div
        className="modal fade"
        id="careerTarget"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Mục tiêu nghề nghiệp
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mục tiêu nghề nghiệp
                  </label>
                  <textarea
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mục tiêu nghề nghiệp"
                    defaultValue={""}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal mục tiêu nghề nghiệp */}

      {/* Modal thêm kinh nghiệm */}
      <div
        className="modal fade"
        id="addExperience"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm kinh nghiệm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-7">
                    <label htmlFor="postTitle" className="form-label">
                      Công việc
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập công việc"
                      onChange={(e) => {
                        setExperience({ ...experience, job: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="postTitle" className="form-label">
                      Công ty
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập công ty"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          company: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      type="number"
                      min="1960"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          startYear: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      type="number"
                      min="1960"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          endYear: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả công việc"
                    // defaultValue={""}
                    onChange={(e) => {
                      setExperience({
                        ...experience,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddExperience}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm kinh nghiệm */}

      {/* Modal thêm học vấn */}
      <div
        className="modal fade"
        id="addEducation"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm học vấn
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-7">
                    <label htmlFor="postTitle" className="form-label">
                      Chuyên ngành
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập chuyên ngành"
                      onChange={(e) => {
                        setEducation({ ...education, major: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="postTitle" className="form-label">
                      Trường
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập Trường Đại học"
                      onChange={(e) => {
                        setEducation({ ...education, school: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      min="1960"
                      onChange={(e) => {
                        setEducation({
                          ...education,
                          startYear: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      min="1960"
                      onChange={(e) => {
                        setEducation({ ...education, endYear: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddEducation}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm học vấn */}

      {/* Modal thêm dự án */}
      <div
        className="modal fade"
        id="addProject"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm dự án
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-7">
                    <label htmlFor="postTitle" className="form-label">
                      Dự án
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập dự án"
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="postTitle" className="form-label">
                      Công ty
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập công ty"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả dự án"
                    // defaultValue={""}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm dự án */}

      {/* Modal thêm kỹ năng */}
      <div
        className="modal fade"
        id="addSkill"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm kỹ năng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="field" className="form-label">
                      Kỹ năng
                    </label>
                    <select className="form-select" id="field">
                      <option selected>Chọn kỹ năng</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="field" className="form-label">
                      Mức độ thành thạo
                    </label>
                    <select className="form-select" id="field">
                      <option selected>Chọn mức độ thành thạo</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm kỹ năng */}

      {/* Modal thêm ngoại ngữ */}
      <div
        className="modal fade"
        id="addLanguage"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm ngoại ngữ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Ngoại ngữ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập ngoại ngữ"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="field" className="form-label">
                      Chứng chỉ
                    </label>
                    <select className="form-select" id="field">
                      <option selected>Chọn kỹ năng</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="field" className="form-label">
                      Năng lực
                    </label>
                    <select className="form-select" id="field">
                      <option selected>Chọn mức độ thành thạo</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm ngoại ngữ */}

      {/* Modal thêm chứng chỉ */}
      <div
        className="modal fade"
        id="addCer"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm chứng chỉ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Chứng chỉ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Ngày cấp
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm chứng chỉ */}

      <div className="bg-light rounded-2 me-2 my-2 p-4">
        <h5 className="fw-bold">Hoàn chỉnh hồ sơ</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-muted">Cơ bản</span>
          <span className="text-danger fw-bold">Trung bình</span>
          <span className="text-muted">Tương đối hoàn chỉnh</span>
          <span className="text-muted">Hoàn chỉnh</span>
        </div>
        {/* <div
          className="progress mt-3"
          style={{ height: "20px", backgroundColor: "#e9ecef" }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${userInformation.percent_complete}%`,
              backgroundColor: "#FF865E",
              borderRadius: "10px",
            }}
            aria-valuenow={userInformation.percent_complete}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span
              style={{
                position: "absolute",
                color: "#fff",
                fontSize: "12px",
                left: "52%", //+ 5% nhé
                fontWeight: "Bold",
              }}
            >
              {userInformation?.percent_complete}
            </span>
          </div>
        </div> */}
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${userInformation.percent_complete}%` }}
            // aria-valuenow={userInformation?.percent_complete}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {userInformation?.percent_complete}%
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="d-flex justify-content-between">
          <h3>Mục tiêu nghề nghiệp</h3>
          <i
            class="bi bi-pencil-square text-primary custom-hover"
            data-bs-toggle="modal"
            data-bs-target="#careerTarget"
          ></i>
        </span>

        <ul>
          <li>{userInformation.career_target}</li>
        </ul>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Kinh nghiệm làm việc</h3>
          <p className="fst-italic">
            Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt
          </p>
          {listExp &&
            listExp?.map((exp) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2">
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{exp.exp_title}</span>
                  <span className="col-md-3">{exp.exp_company}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(exp.exp_from)} đến{" "}
                    {formatDateToDDMMYYYY(exp.exp_to)}
                  </span>
                  <a href="#" className="text-primary text-decoration-none">
                    Xóa
                  </a>
                </div>
                <p>{exp.exp_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addExperience"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm kinh nghiệm làm việc</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Học vấn</h3>
          {listEducation &&
            listEducation?.map((edu) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2">
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{edu.major}</span>
                  <span className="col-md-3">{edu.school}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(edu.from_)} đến{" "}
                    {formatDateToDDMMYYYY(edu.to_)}
                  </span>
                  <a href="#" className="text-primary text-decoration-none">
                    Xóa
                  </a>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addEducation"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm học vấn</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Dự án</h3>
          <p className="fst-italic">Mô tả dự án để thu hút nhà tuyển dụng</p>
          {listProject &&
            listProject?.map((pro) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2">
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{pro.project_name}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(pro.project_from)} đến{" "}
                    {formatDateToDDMMYYYY(pro.project_to)}
                  </span>
                  <a href="#" className="text-primary text-decoration-none">
                    Xóa
                  </a>
                </div>
                <p>{pro.project_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addProject"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm dự án</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Kỹ năng</h3>
          <p className="fst-italic">
            Mô tả kỹ năng làm việc của bạn càng chi tiết càng tốt
          </p>
          {listSkill &&
            listSkill?.map((skl) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2 col-4">
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{skl.skill}</span>
                  <a href="#" className="text-primary text-decoration-none">
                    Xóa
                  </a>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addSkill"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm kỹ năng</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Ngoại ngữ</h3>
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addLanguage"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm ngoại ngữ</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Chứng chỉ</h3>
          {listCertification &&
            listCertification?.map((cer) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2">
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{cer.certifications}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(cer.month_)}
                  </span>
                  <a href="#" className="text-primary text-decoration-none">
                    Xóa
                  </a>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addCer"
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm chứng chỉ</p>
        </span>
      </div>
    </div>
  );
}
