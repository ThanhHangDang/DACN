import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import calculateDaysRemaining from "../../../utils/calculateDaysRemaining.js";
import {
  useGetCompanyInformationQuery,
  useGetPostByUserQuery,
} from "../../../redux_toolkit/guestApi.js";
import { useGetCitiesQuery } from "../../../redux_toolkit/CategoryApi.js";
import CompanyHeader from "../../_component/ui/CompanyHeader.js";
import TitleComponent from "../../_component/ui/TitleComponent.js";

export default function CompanyDetail() {
  const { companyId } = useParams();
  const { data: city } = useGetCitiesQuery(84); // 84 là mã quốc gia Việt Nam
  const { data: companyInformation } = useGetCompanyInformationQuery(companyId);
  console.log("companyInformation", companyInformation);
  const { data } = useGetPostByUserQuery(companyId);
  const postsByUser = data?.jobs || [];
  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  return (
    <>
      <TitleComponent title={"Company Detail"} description={""} />
      <div className="container my-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-3">
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/list-company">Danh sách công ty</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Thông tin công ty
            </li>
          </ol>
        </nav>
        {/* Header */}
        <CompanyHeader companyInformation={companyInformation} />

        {/* Main Content */}
        <div className="row mt-4">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* Company Introduction */}
            <div className="card mb-4">
              <div className="card-body">
                <h6 className="fw-bold">Giới thiệu công ty</h6>
                <p>{companyInformation?.describle}</p>
              </div>
            </div>

            {/* Job Listings */}
            <div className="card">
              <div className="card-body">
                <h6 className="fw-bold">Tuyển dụng</h6>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên công việc, vị trí ứng tuyển..."
                  />
                  <select className="form-select">
                    <option selected>Tất cả tỉnh/thành phố</option>
                    {city?.map((option) => (
                      <option value={option.city_id} key={option.city_id}>
                        {option.city_name}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-success">Tìm kiếm</button>
                </div>
                <div className="list-group">
                  {postsByUser.length > 0 ? (
                    postsByUser.map((option) => (
                      <div
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={option.job_id}
                      >
                        <div>
                          <h6 className="mb-0">{option.title}</h6>
                          <p className="text-muted mb-0">
                            {/* {option.company_name} |  */}
                            {option.city_name} |{" "}
                            {calculateDaysRemaining(option.date_expi) > 0
                              ? `Còn ${calculateDaysRemaining(
                                  option.date_expi
                                )} ngày để ứng tuyển`
                              : "Hết hạn"}
                          </p>
                        </div>
                        <div className="text-end">
                          <span className="badge bg-success">
                            {option.salary_min === 0 && option.salary_max === 0
                              ? "Thỏa thuận"
                              : `${formatNumberToTr(
                                  option.salary_min
                                )} - ${formatNumberToTr(
                                  option.salary_max
                                )} đ/tháng`}
                          </span>
                          <button className="btn btn-outline-success btn-sm ms-3">
                            Ứng tuyển
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Chưa có bài đăng nào</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Contact Information */}
            <div className="card mb-4">
              <div className="card-body">
                <h6 className="fw-bold">Thông tin liên hệ</h6>
                <p className="mb-1">
                  <strong>Địa chỉ công ty:</strong>
                </p>

              <p>
                {companyInformation?.company_location
                  ? companyInformation.company_location.map((location) => (
                    <p>
                    {location.address} -  {location.city_name}
                    </p>))
                  : "Chưa có thông tin"}
              </p>
              <h6 className="fw-bold">Chia sẻ công ty tới bạn bè</h6>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-facebook"></i> Facebook
                </button>
                <button className="btn btn-outline-info btn-sm">
                  <i className="bi bi-twitter"></i> Twitter
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-linkedin"></i> LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body text-center">
          <div className="row list-group list-group-horizontal">
            <div className="col-md-4 list-group-item">
              <h6 className="fw-bold">Lương, Thưởng Và Chế Độ Phúc Lợi</h6>
              <p>Chính sách lương thưởng hấp dẫn, nhiều phúc lợi đặc biệt.</p>
            </div>
            <div className="col-md-4 list-group-item">
              <h6 className="fw-bold">Thời Gian Làm Việc Và Nghỉ Ngơi</h6>
              <p>
                Môi trường làm việc năng động, giờ làm việc linh hoạt, nghỉ phép
                đầy đủ.
              </p>
            </div>
            <div className="col-md-4 list-group-item">
              <h6 className="fw-bold">Đào Tạo Và Phát Triển</h6>
              <p>
                Chương trình đào tạo chuyên môn, phát triển kỹ năng cá nhân.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
