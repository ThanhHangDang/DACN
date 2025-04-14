import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { getListEmployee } from "../../../redux/actions/userAction.js";
import { useGetlistJobseekerQuery } from "../../../redux_toolkit/employerApi";

export default function EmployeeMaganePage() {
  const dispatch = useDispatch();
  // const { listEmployee } = useSelector((state) => state.user);
  const { isLogin, user } = useSelector((state) => state.auth);
  const { data } = useGetlistJobseekerQuery();
  const listEmployee = data?.listEmployee || [];
  console.log("asdsdasdad", data);

  // useEffect(() => {
  //   dispatch(getListEmployee());
  // }, []);

  const renderEmployee = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          {listEmployee?.map((candidate, index) => (
            <div className="col-md-4 mb-4" key={index}>
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
                        to={`/employee-detail/${candidate.jobseeker_id}`}
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
    <div>
      <div className="container bg-light p-4 rounded-3 shadow-sm mt-4 sticky">
        <form>
          <div className="row g-3">
            {/* Tiêu đề tìm kiếm và nút Search */}
            <div className="col-md-12 d-flex align-items-end">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Tên ứng viên"
                // disabled
              />
              <button className="btn btn-primary d-flex">
                Search <i className="bi bi-search ms-3"></i>
              </button>
            </div>

            {/* Lĩnh vực */}
            <div className="col-md-3">
              <label className="form-label">Lĩnh vực</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
                {/* Thêm options */}
              </select>
            </div>

            {/* Ngành nghề */}
            <div className="col-md-3">
              <label className="form-label">Ngành nghề</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Cấp bậc */}
            <div className="col-md-3">
              <label className="form-label">Trình độ học vấn</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Cấp bậc */}
            <div className="col-md-3">
              <label className="form-label">Cấp bậc</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Số năm kinh nghiệm */}
            <div className="col-md-3">
              <label className="form-label">Số năm kinh nghiệm</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Địa điểm */}
            <div className="col-md-3">
              <label className="form-label">Nơi ở hiện tại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Chọn Quốc Gia, Thành Phố"
              />
            </div>

            {/* Tuổi */}
            <div className="col-md-3">
              <label className="form-label">Tuổi</label>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Từ"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Đến"
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="col-md-3">
              <label className="form-label">Trạng thái</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Ngày đăng */}
            <div className="col-md-3">
              <label className="form-label">Giới tính</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Hạn tin */}
            <div className="col-md-3">
              <label className="form-label">Ngoại ngữ</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-4">
        <h5>Danh sách ứng viên</h5>
        {listEmployee.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            Không có ứng viên nào
          </div>
        ) : (
          renderEmployee()
        )}
      </div>
    </div>
  );
}
