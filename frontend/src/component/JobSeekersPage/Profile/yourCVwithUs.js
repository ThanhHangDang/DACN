import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getListExp,
  getListEducation,
  getListProject,
  getListSkill,
  getListLanguage,
  getListCertification,
  updateCareerTarget,
  getUserInformationByID,
  addExperience,
  addEducation,
  addProject,
  addSkill,
  addCertification,
  deleteProfileItem,
  updateProfileItem,
} from "../../../redux/actions/jobseekerAction.js";
import { getCategoryEdu } from "../../../redux/actions/categoryAction.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";

export default function YourCVwithUs() {
  const dispatch = useDispatch();
  const {
    userInformation,
    listExp,
    listEducation,
    listProject,
    listSkill,
    // listLanguage,
    listCertification,
  } = useSelector((state) => state.jobseeker);
  const { user } = useSelector((state) => state.auth);
  const { edu } = useSelector((state) => state.category);

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
    education_id: "1",
  });

  const [dataDeleteModal, setDataDeleteModal] = useState({
    modalID: "",
    id: "",
    id_delete: "",
  });

  const [careerTarget, setCareerTarget] = useState("");

  const [project, setProject] = useState({
    project_name: "",
    project_from: "",
    project_to: "",
    project_description: "",
  });

  const [skill, setSkill] = useState({
    skill_name: "",
  });

  const [certification, setCertification] = useState({
    certificate_name: "",
    date: "",
  });

  const [modalUpdateID, setModalUpdateID] = useState("");

  const [isAdd, setIsAdd] = useState(true);

  const handleUpdateCarreerTarget = () => {
    // console.log("Update career target: ", careerTarget);
    dispatch(updateCareerTarget(userInformation?.jobseeker_id, careerTarget));
  };

  const handleAddExperience = () => {
    if (isAdd) {
      dispatch(addExperience(userInformation?.jobseeker_id, experience));
    } else {
      dispatch(
        updateProfileItem(
          modalUpdateID,
          userInformation?.jobseeker_id,
          experience
        )
      );
    }

    setExperience({
      job: "",
      company: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  };

  const handleAddEducation = () => {
    if (isAdd) {
      dispatch(addEducation(userInformation?.jobseeker_id, education));
    } else {
      console.log("Update education chạy: ", education);
      dispatch(
        updateProfileItem(
          modalUpdateID,
          userInformation?.jobseeker_id,
          education
        )
      );
    }
    setEducation({
      major: "",
      school: "",
      startYear: "",
      endYear: "",
      education_id: "1",
    });
  };

  const handleAddProject = () => {
    if (isAdd) {
      dispatch(addProject(userInformation?.jobseeker_id, project));
    } else {
      console.log("Update project chạy: ", project);
      dispatch(
        updateProfileItem(modalUpdateID, userInformation?.jobseeker_id, project)
      );
    }
    setProject({
      project_name: "",
      project_from: "",
      project_to: "",
      project_description: "",
    });
  };

  const handleAddSkill = () => {
    if (isAdd) {
      dispatch(addSkill(userInformation?.jobseeker_id, skill));
    } else {
      console.log("Update skill chạy: ", skill);
      dispatch(
        updateProfileItem(modalUpdateID, userInformation?.jobseeker_id, skill)
      );
    }
    setSkill({
      skill_name: "",
    });
  };

  const handleAddCertification = () => {
    if (isAdd) {
      dispatch(addCertification(userInformation?.jobseeker_id, certification));
    } else {
      dispatch(
        updateProfileItem(
          modalUpdateID,
          userInformation?.jobseeker_id,
          certification
        )
      );
    }

    setCertification({
      certificate_name: "",
      date: "",
    });
  };

  const handleDeleteProfileItem = () => {
    dispatch(
      deleteProfileItem(
        dataDeleteModal.modalID,
        dataDeleteModal.id,
        dataDeleteModal.id_delete
      )
    );
  };

  useEffect(() => {
    dispatch(getListExp(userInformation?.jobseeker_id));
    dispatch(getListEducation(userInformation?.jobseeker_id));
    dispatch(getListProject(userInformation?.jobseeker_id));
    dispatch(getListSkill(userInformation?.jobseeker_id));
    dispatch(getListLanguage(userInformation?.jobseeker_id));
    dispatch(getListCertification(userInformation?.jobseeker_id));
    dispatch(getCategoryEdu());
  }, [dispatch, userInformation]);

  useEffect(() => {
    if (userInformation && userInformation.career_target) {
      setCareerTarget(userInformation.career_target);
    }
  }, [userInformation]);

  return (
    <div>
      {/* Modal mục tiêu nghề nghiệp */}
      <div
        className="modal fade"
        id="careerTarget"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
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
                    defaultValue={
                      careerTarget
                        ? careerTarget
                        : userInformation?.career_target
                    }
                    onChange={(e) => setCareerTarget(e.target.value)}
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleUpdateCarreerTarget}
              >
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
        // aria-hidden="true"
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
                      required
                      value={experience.job}
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
                      value={experience.company}
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
                      value={experience.startYear}
                      type="date"
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
                      value={experience.endYear}
                      type="date"
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
                    value={experience.description}
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả công việc"
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
        // aria-hidden="true"
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
                      value={education.major}
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
                      value={education.school}
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
                  <div className="col-md-4">
                    <label htmlFor="field" className="form-label">
                      Cấp bậc
                    </label>
                    <select
                      value={education.education_id}
                      className="form-select"
                      id="field"
                      onChange={(e) => {
                        setEducation({
                          ...education,
                          education_id: e.target.value,
                        });
                      }}
                    >
                      {edu?.map((option) => (
                        <option
                          value={option.education_id}
                          key={option.education_id}
                        >
                          {option.education_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      value={education.startYear}
                      type="date"
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
                      value={education.endYear}
                      type="date"
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
        // aria-hidden="true"
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
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Dự án
                    </label>
                    <input
                      value={project.project_name}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập dự án"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_name: e.target.value,
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
                      value={project.project_from}
                      type="date"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_from: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      value={project.project_to}
                      type="date"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_to: e.target.value,
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
                    value={project.project_description}
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả dự án"
                    // defaultValue={""}
                    onChange={(e) => {
                      setProject({
                        ...project,
                        project_description: e.target.value,
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
                onClick={handleAddProject}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
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
        // aria-hidden="true"
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
                    {/* <select className="form-select" id="field">
                      <option selected>Chọn kỹ năng</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select> */}
                    <input
                      value={skill.skill_name}
                      type="text"
                      className="form-control"
                      placeholder="Nhập kỹ năng"
                      onChange={(e) => {
                        setSkill({ ...skill, skill_name: e.target.value });
                      }}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="field" className="form-label">
                      Mức độ thành thạo
                    </label>
                    <select className="form-select" id="field">
                      <option selected>Chọn mức độ thành thạo</option>
                      <option>Công nghệ thông tin</option>
                      <option>Marketing</option>
                      <option>Tài chính</option>
                    </select>
                  </div> */}
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddSkill}
              >
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
        // aria-hidden="true"
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
        // aria-hidden="true"
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
                    value={certification?.certificate_name || ""}
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                    onChange={(e) => {
                      setCertification({
                        ...certification,
                        certificate_name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="jobTitle" className="form-label">
                    Ngày cấp
                  </label>
                  <input
                    value={certification.date}
                    type="date"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                    onChange={(e) => {
                      setCertification({
                        ...certification,
                        date: e.target.value,
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddCertification}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm chứng chỉ */}

      {/* Modal delete */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex={-1}
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          {" "}
          {/* Căn giữa và nhỏ lại */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Xác nhận xóa
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className=" modal-body justify-content-center align-items-center modal-dialog-centered">
              {/* Căn giữa hai nút */}
              <button
                type="button"
                className="btn btn-secondary me-3"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteProfileItem}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal delete */}

      <div className="bg-light rounded-2 me-2 my-2 p-4">
        <h5 className="fw-bold">Hoàn chỉnh hồ sơ</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span
            className={
              userInformation?.percent_complete < 50
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Cơ bản
          </span>
          <span
            className={
              userInformation?.percent_complete >= 50 &&
              userInformation?.percent_complete < 80
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Trung bình
          </span>
          <span
            className={
              userInformation?.percent_complete >= 80 &&
              userInformation?.percent_complete < 99
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Tương đối hoàn chỉnh
          </span>
          <span
            className={
              userInformation?.percent_complete >= 99
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Hoàn chỉnh
          </span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${userInformation.percent_complete}%` }}
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
            listExp?.map((exp, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{exp.exp_title}</span>
                  <span className="col-md-3">{exp.exp_company}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(exp.exp_from)} đến{" "}
                    {formatDateToDDMMYYYY(exp.exp_to)}
                  </span>

                  <span className="text-primary text-decoration-none">
                    <i
                      class="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addExperience"
                      onClick={() => {
                        setIsAdd(false);
                        setExperience({
                          ...experience,
                          job: exp.exp_title,
                          company: exp.exp_company,
                          startYear: new Date(exp.exp_from)
                            .toISOString()
                            .split("T")[0],
                          endYear: new Date(exp.exp_to)
                            .toISOString()
                            .split("T")[0],
                          description: exp.exp_description,
                        });
                        setModalUpdateID(1);
                      }}
                    ></i>
                    <i
                      class="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          modalID: 1,
                          id: userInformation?.jobseeker_id,
                          id_delete: exp.profile_experience_id,
                        });
                      }}
                    ></i>
                  </span>
                </div>
                <p>{exp.exp_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addExperience"
          onClick={() => {
            setIsAdd(true);
            setExperience({
              job: "",
              company: "",
              startYear: "",
              endYear: "",
              description: "",
            });
            setModalUpdateID("");
          }}
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm kinh nghiệm làm việc</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Học vấn</h3>
          {listEducation &&
            listEducation?.map((edu, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{edu.major}</span>
                  <span className="col-md-2">{edu.education_title}</span>
                  <span className="col-md-3">{edu.school}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(edu.from_)} đến{" "}
                    {formatDateToDDMMYYYY(edu.to_)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      class="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addEducation"
                      onClick={() => {
                        setIsAdd(false);
                        setEducation({
                          ...education,
                          major: edu.major,
                          education_id: edu.education_id,
                          school: edu.school,
                          startYear: new Date(edu.from_)
                            .toISOString()
                            .split("T")[0],
                          endYear: new Date(edu.to_)
                            .toISOString()
                            .split("T")[0],
                        });
                        setModalUpdateID(2);
                      }}
                    ></i>
                    <i
                      class="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          modalID: 2,
                          id: userInformation?.jobseeker_id,
                          id_delete: edu.profile_education_id,
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addEducation"
          onClick={() => {
            setIsAdd(true);
            setEducation({
              major: "",
              education_id: "",
              school: "",
              startYear: "",
              endYear: "",
            });
            setModalUpdateID("");
          }}
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
            listProject?.map((pro, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{pro.project_name}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(pro.project_from)} đến{" "}
                    {formatDateToDDMMYYYY(pro.project_to)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      class="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addProject"
                      onClick={() => {
                        setIsAdd(false);
                        setProject({
                          ...project,
                          project_name: pro.project_name,
                          project_from: new Date(pro.project_from)
                            .toISOString()
                            .split("T")[0],
                          project_to: new Date(pro.project_to)
                            .toISOString()
                            .split("T")[0],
                          project_description: pro.project_description,
                        });
                        setModalUpdateID(3);
                      }}
                    ></i>
                    <i
                      class="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          modalID: 3,
                          id: userInformation?.jobseeker_id,
                          id_delete: pro.profile_project_id,
                        });
                      }}
                    ></i>
                  </span>
                </div>
                <p>{pro.project_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addProject"
          onClick={() => {
            setIsAdd(true);
            setProject({
              project_name: "",
              project_from: "",
              project_to: "",
              project_description: "",
            });
            setModalUpdateID("");
          }}
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
            listSkill?.map((skl, index) => (
              <div
                className="bg-white rounded-2 me-2 my-2 p-2 col-4"
                key={index}
              >
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{skl.skill}</span>
                  <span className="text-primary text-decoration-none">
                    <i class="bi bi-pencil-square me-2"></i>
                    <i
                      class="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          modalID: 4,
                          id: userInformation?.jobseeker_id,
                          id_delete: skl.profile_skill_id,
                        });
                      }}
                    ></i>
                  </span>
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
            listCertification?.map((cer, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{cer.certifications || ""}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(cer.month_)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      class="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addCer"
                      onClick={() => {
                        setIsAdd(false);
                        setCertification({
                          ...certification,
                          certificate_name: cer.certifications,
                          date: new Date(cer.month_)
                            .toISOString()
                            .split("T")[0],
                        });
                        setModalUpdateID(6);
                      }}
                    ></i>
                    <i
                      class="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          modalID: 6,
                          id: userInformation?.jobseeker_id,
                          id_delete: cer.profile_certifications_id,
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addCer"
          onClick={() => {
            setCertification({
              certificate_name: "",
              date: "",
            });
            setModalUpdateID("");
          }}
        >
          <i class="bi bi-plus-circle me-2"></i>
          <p>Thêm chứng chỉ</p>
        </span>
      </div>
    </div>
  );
}
