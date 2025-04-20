import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { getListEmployee } from "../../../redux/actions/userAction.js";
import { useGetlistJobseekerQuery } from "../../../redux_toolkit/employerApi.js";
import TitleComponent from "../../_component/ui/TitleComponent.js";

export default function EmployeeMaganePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { listEmployee } = useSelector((state) => state.user);
  const { isLogin, user } = useSelector((state) => state.auth);
  const { data } = useGetlistJobseekerQuery();
  const listEmployee = data?.listEmployee || [];
  console.log("asdsdasdad", data);

  // useEffect(() => {
  //   dispatch(getListEmployee());
  // }, []);
  useEffect(() => {
    if (!isLogin || user?.role !== 2) {
      navigate("/login");
    }
  }, [navigate, user, isLogin]);

  const renderEmployee = () => {
    return (
      <div className="container">
        <div className="row">
          {listEmployee?.map((candidate, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card d-flex">
                <div className="card-body">
                  <div className="me-3 d-flex">
                    <img
                      src={candidate.avatar}
                      alt={candidate.full_name}
                      className="img-fluid me-2 rounded-circle"
                      style={{ width: 150, height: 150 }}
                    />
                    <div>
                      <h5
                        className="text-truncate card-title"
                        style={{ maxWidth: "200px" }}
                      >
                        {candidate.full_name}
                      </h5>
                      <p className="card-text">{candidate.title}</p>
                      <p className="text-muted">
                        {candidate.year_exp
                          ? `${candidate.year_exp} năm kinh nghiệm`
                          : "Chưa có kinh nghiệm"}
                      </p>
                      <NavLink
                        to={`/candidate-detail/${candidate.jobseeker_id}`}
                        className="btn btn-primary"
                      >
                        Chi tiết
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <TitleComponent
        title={"Our Candicates"}
        description={"Let choose a right Candicate for your Camany!"}
      />
      <div>
        <div className="container-fluid p-3 mt-3">
          <div className="row">
            <div className="col-lg-3 mb-4">
              <div className="p-3 border rounded shadow-sm bg-light">
                <h6 className="fw-bold mb-3">Lĩnh vực</h6>
                <input
                  className="form-control mb-3"
                  placeholder="Job title or company"
                />
                <h6 className="fw-bold mb-2">Ngành nghề</h6>
                <select className="form-select mb-3">
                  <option>Choose city</option>
                </select>
                <h6 className="fw-bold mb-2">Category</h6>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="cat1"
                  />
                  <label className="form-check-label" htmlFor="cat1">
                    Commerce
                  </label>
                </div>
                <button className="btn btn-link p-0">Show More</button>

                <h6 className="fw-bold mt-3">Trình độ học vấn</h6>
                {/* Add job type checkboxes */}

                <h6 className="fw-bold mt-3">Cấp bậc</h6>
                {/* Add experience checkboxes */}

                <h6 className="fw-bold mt-3">Kinh nghiệm</h6>
                {/* Add date checkboxes */}

                <h6 className="fw-bold mt-3">Tuổi</h6>
                {/* Add date checkboxes */}

                <h6 className="fw-bold mt-3">Giới tính</h6>
                {/* Add date checkboxes */}

                <h6 className="fw-bold mt-3">Salary</h6>
                <input type="range" className="form-range mb-2" />
                <div className="d-flex justify-content-between small">
                  <span>$0</span>
                  <span>$99999</span>
                </div>
                <button className="btn btn-outline-success btn-sm mt-2">
                  Apply
                </button>

                <h6 className="fw-bold mt-3">Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {[
                    "engineering",
                    "design",
                    "ui/ux",
                    "marketing",
                    "management",
                  ].map((tag) => (
                    <span key={tag} className="badge bg-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* <div className="mt-4 p-3 text-center bg-secondary text-white rounded shadow-sm">
              <h5 className="fw-bold">WE ARE HIRING</h5>
              <p className="mb-0">Apply Today!</p>
            </div> */}
            </div>
            <div className="col-lg-9">
              <div>
                <h5>Danh sách ứng viên</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="text-muted small">
                    Showing 6-6 of 10 results
                  </div>
                  <select className="form-select form-select-sm w-auto">
                    <option>Sort by latest</option>
                  </select>
                </div>
                {listEmployee.length === 0 ? (
                  <div className="alert alert-warning" role="alert">
                    Không có ứng viên nào
                  </div>
                ) : (
                  renderEmployee()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
