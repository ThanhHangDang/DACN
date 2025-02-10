import React, { useEffect, useState } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getUserInformationByID,
  getListExp,
} from "../../../redux/actions/jobseekerAction.js";
import { getCategoryCity } from "../../../redux/actions/categoryAction.js";

export default function JobSeekerProfile() {
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.jobseeker);
  const { hideStatus, setHideStatus } = useState(false);

  const { isLogin, user } = useSelector((state) => state.auth);
  const { city } = useSelector((state) => state.category);

  const [expectedJob, setExpectedJob] = useState({
    workCityPlace: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleUpdateExpectedJob = () => {
    console.log("Expected Job: ", expectedJob);
  };

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
    dispatch(getUserInformationByID(user?.user.id));
    dispatch(getCategoryCity(84));
    setExpectedJob({
      workCityPlace: userInformation?.city_id,
      salary: userInformation?.salary_expect,
    });
  }, [dispatch, isLogin, navigate, user]);

  return (
    <div>
      {/* Modal công việc mong muốn */}
      <div
        className="modal fade"
        id="expectedJob"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Công việc mong muốn
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
                      Nơi làm việc
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      value={
                        expectedJob.workCityPlace
                          ? expectedJob.workCityPlace
                          : userInformation?.city_id
                      }
                      onChange={(e) =>
                        setExpectedJob({
                          ...expectedJob,
                          workCityPlace: e.target.value,
                        })
                      }
                    >
                      {city?.map((option) => (
                        <option value={option.city_id} key={option.city_id}>
                          {option.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="postTitle" className="form-label">
                    Mức lương mong muốn (VNĐ)
                  </label>
                  <input
                    type="number"
                    step="1000000"
                    min="1000000"
                    className="form-control"
                    id="postTitle"
                    placeholder="Nhập mức lương mong muốn"
                    value={
                      expectedJob.salary
                        ? expectedJob.salary
                        : userInformation?.salary_expect
                    }
                    onChange={(e) =>
                      setExpectedJob({ ...expectedJob, salary: e.target.value })
                    }
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
                onClick={handleUpdateExpectedJob}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal công việc mong muốn */}

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="d-flex justify-content-start align-items-center mb-2">
          <h3 className="me-2">Hồ sơ của bạn</h3>
          <NavLink to="/post" className="text-primary">
            {hideStatus ? (
              <i class="bi bi-eye"></i>
            ) : (
              <i class="bi bi-eye-slash"></i>
            )}
          </NavLink>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="row d-flex ">
          <div className="d-flex justify-content-between">
            <h3>Thông tin cơ bản</h3>
            <i class="bi bi-pencil-square text-primary custom-hover"></i>
          </div>

          <div className="col-md-2 col-sm-0 text-center d-flex justify-content-center">
            <img
              src={userInformation.avatar}
              alt="logo"
              style={{ height: 120, width: 120 }}
              className="rounded-2 img-fluid"
            />
            <i class="bi bi-pencil-square text-primary custom-hover"></i>
          </div>
          <div className="col-8">
            <h3>{userInformation.full_name}</h3>
            <p className="lh-1">{userInformation.title}</p>
            <div className="row">
              <span className="col-md-6 col-sm-0">
                <i className="bi bi-briefcase-fill me-2"></i>
                {userInformation.year_exp
                  ? `${userInformation.year_exp} năm kinh nghiệm`
                  : "Chưa có kinh nghiệm"}
              </span>

              <span className="col-md-5 col-sm-0">
                <i class="bi bi-mortarboard-fill me-2"></i>
                {userInformation.situations
                  ? userInformation.situations
                  : "Chưa"}
              </span>
            </div>
            <div className="row">
              <span className="col-md-6 col-sm-0">
                <i class="bi bi-envelope-fill me-2"></i>
                {userInformation.email}
              </span>
              <span className="col-md-5 col-sm-0">
                <i class="bi bi-telephone-fill me-2"></i>
                {userInformation?.phone_number
                  ? userInformation.phone_number
                  : "Chưa có số điện thoại liên lạc"}
              </span>
            </div>
            <span>
              <i class="bi bi-house-door-fill me-2"></i>
              {userInformation?.address
                ? userInformation.address
                : "Chưa có thông tin địa chỉ"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="d-flex justify-content-between">
          <h3>Công việc mong muốn</h3>
          <i
            class="bi bi-pencil-square text-primary custom-hover"
            data-bs-toggle="modal"
            data-bs-target="#expectedJob"
          ></i>
        </div>

        <div className="row">
          <span className="col-md-3 col-sm-0">Nơi làm việc</span>
          <span className="col-md-5 col-sm-0 fw-bold">
            {userInformation?.city_name}
          </span>
        </div>
        <div className="row">
          <span className="col-md-3 col-sm-0 ">
            Mức lương mong muốn (VNĐ/tháng)
          </span>
          <span className="col-md-5 col-sm-0 fw-bold">
            {userInformation.salary_expect} (VNĐ/tháng)
          </span>
        </div>
      </div>

      <div className="rounded-2 me-2 my-2 p-2">
        <div className="">
          <NavLink to="/jobseeker-profile" className="text-decoration-none">
            <span className="me-3">Hồ sơ với Boost Career</span>
          </NavLink>
          <NavLink
            to="/jobseeker-profile/upload"
            className="text-decoration-none"
          >
            <span>Hồ sơ đính kèm</span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
