import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInformationByID } from "../../../redux/actions/jobseekerAction.js";

export default function JobSeekerOverview() {
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state) => state.jobseeker);

  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user.role !== 3) {
      console.log("check: co chay", user?.user.role);
      navigate("/login");
    }
    dispatch(getUserInformationByID(user?.user.id));
  }, [dispatch, isLogin, navigate, user]);

  return (
    <>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Tổng quan</h3>
        <p className="lh-1">
          Cập nhật hồ sơ của bạn để tìm hiểu thêm về con đường sự nghiệp tiếp
          theo của bạn.
        </p>
        <p className="lh-1">
          Hoàn chỉnh hồ sơ: Cơ bản - Mức độ hoàn thiện: 47%
        </p>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Hoạt động của bạn</h3>
        <div className="row d-flex justify-content-md-around justify-content-sm-center text-center">
          <div className="col-md-3 col-sm-11 border border-primary p-2">
            <h4 className="text-primary">0</h4> Việc làm đã ứng tuyển
          </div>
          <div className="col-md-3 col-sm-11 border border-primary p-2">
            <h4 className="text-warning">0</h4> Lượt xem việc làm
          </div>
          <div className="col-md-3 col-sm-11 border border-primary p-2">
            <h4 className="text-danger">0</h4>Lượt tim việc làm
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Hồ sơ đính kèm của bạn</h3>
        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between">
          <span>
            <i class="bi bi-paperclip"></i>ThanhHangDang_Intern_CV.pdf
          </span>
          <span>Tải lên: 9/11/2024</span>
        </div>
      </div>

      <div className="d-flex justify-content-md-between justify-content-sm-center me-2 my-2">
        <div className="col-md-4 col-sm-0 bg-light rounded-2 text-center">
          <h4 className="">Công ty quan tâm đến hồ sơ của bạn</h4>
          <div className="row d-flex justify-content-center text-start">
            <div className="col-10 bg-secondary rounded-2 mb-2 pt-3 pb-3">
              <span className="d-flex justify-content-between fw-bold text-white">
                Lượt xem hồ sơ<i class="bi bi-chevron-right"></i>
              </span>
            </div>
            <div className="col-10 bg-secondary rounded-2 mb-2 pt-3 pb-3">
              <span className="d-flex justify-content-between fw-bold text-white">
                Lượt lưu hồ sơ
                <i class="bi bi-chevron-right"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-0 bg-light rounded-2 text-center">
          <h4>Ứng viên có cùng chức danh</h4>
          <div className="row d-flex justify-content-center">
            <div className="col-10 backgound-item-overview-seeker-2 rounded-2 pt-3 pb-3">
              <p>48 ứng viên</p>
              <p className="text-primary">
                Chuẩn bị phỏng vấn
                <i class="bi bi-chevron-right"></i>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-0 bg-light rounded-2 text-center">
          <h4>Việc làm phù hợp</h4>
          <div className="row d-flex justify-content-center">
            <div className="col-10 backgound-item-overview-seeker rounded-2 pt-3 pb-3">
              <p>200 công việc</p>
              <p className="text-primary">
                Xem việc làm phù hợp
                <i class="bi bi-chevron-right"></i>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2 d-flex justify-content-md-around justify-content-sm-around">
        <div className="col-md-5 col-sm-0 border border-primary rounded-2 text-center">
          <h4>Khoảng lương phổ biến</h4>
          <p>20 triệu VNĐ/tháng</p>
        </div>
        <div className="col-md-5 col-sm-0  border border-primary rounded-2 text-center">
          <h4>Lương trung bình</h4>
          <p>20 triệu VNĐ/tháng</p>
        </div>
      </div>
    </>
  );
}
