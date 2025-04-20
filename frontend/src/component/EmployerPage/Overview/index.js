import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LineChartComponent from "../../../component/_component/ui/LineChart.js";

export default function EmployerOverview() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.role !== 2) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Tổng quan Employer</h3>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        {/* Thẻ số liệu */}
        <div className="row mb-2">
          <div className="col">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title">Tất cả tin tuyển dụng</h6>
                <h4 className="card-text text-primary">50</h4>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title">Tin đang hiển thị</h6>
                <h4 className="card-text text-warning">30</h4>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center border-danger">
              <div className="card-body">
                <h6 className="card-title">Tin sắp hết hạn</h6>
                <h4 className="card-text text-danger">10</h4>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title">Tổng số hồ sơ</h6>
                <h4 className="card-text text-warning">1370</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-md-8 mb-4">
            <h6 className="fw-bold">Tổng số lượng hồ sơ</h6>
            <div className="bg-light p-3 rounded text-danger fw-bold">1370</div>
          </div>
          <div className="col-md-3">
            <select className="form-select mb-3">
              <option value="all">Tất cả công việc</option>
              <option value="dev">Lập trình viên</option>
              <option value="design">Thiết kế đồ họa</option>
            </select>
          </div>
        </div>
      </div> */}

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="row mb-2 d-flex justify-content-between">
          {/* Lịch sử hoạt động */}
          <div className="col-md-8 mb-4">
            <h6 className="fw-bold">Lịch sử hoạt động</h6>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option value="7days">7 ngày</option>
              <option value="30days">30 ngày</option>
              <option value="today">Hôm nay</option>
            </select>
          </div>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ height: "400px" }}
        >
          <LineChartComponent />
        </div>
      </div>
    </>
  );
}
