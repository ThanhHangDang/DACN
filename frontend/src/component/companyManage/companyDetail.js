import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyInformation } from "../../redux/actions/companyAction.js";
import { getCategoryCity } from "../../redux/actions/categoryAction.js";
import { getPostsByUser } from "../../redux/actions/postAction.js";
import calculateDaysRemaining from "../../utils/calculateDaysRemaining.js";

export default function CompanyDetail() {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const { companyInformation } = useSelector((state) => state.company);
  const { city } = useSelector((state) => state.category);
  const { postsByUser } = useSelector((state) => state.post);

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  useEffect(() => {
    dispatch(getCompanyInformation(companyId));
    dispatch(getPostsByUser(companyId));
  }, [companyId]);

  useEffect(() => {
    dispatch(getCategoryCity(84));
  }, []);

  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li class="breadcrumb-item">
            <NavLink to="/list-company">Danh sách công ty</NavLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Thông tin công ty
          </li>
        </ol>
      </nav>
      {/* Header */}
      <div className="card">
        <div className="card-header p-0">
          <div className="position-relative">
            <img
              src={
                companyInformation?.background
                  ? companyInformation.background
                  : "/img/default-background/defaultBg.jpg"
              }
              // src="/img/default-background/defaultBg.jpg"
              alt="Company Banner"
              className="w-100"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="position-absolute bottom-0 start-0 p-3">
              <div className="d-flex align-items-center">
                <img
                  src={companyInformation?.logo}
                  alt="Company Logo"
                  className="rounded-circle border border-white"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div className="ms-3">
                  <h5 className="text-white fw-bold">
                    {companyInformation?.company_name}
                  </h5>
                  {/* <p className="text-white mb-0">
                    https://hapas.vn | 25-99 nhân viên | 87 người theo dõi
                  </p> */}
                  <p className="text-white mb-0">
                    {companyInformation?.scale_min
                      ? companyInformation.scale_min
                      : "0"}{" "}
                    -{" "}
                    {companyInformation?.scale_max
                      ? companyInformation.scale_max
                      : companyInformation?.scale_min
                      ? companyInformation.scale_min
                      : "0"}{" "}
                    nhân viên |{" "}
                    {companyInformation?.count_follower
                      ? companyInformation.count_follower
                      : "0"}{" "}
                    người theo dõi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

                {/* <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">
                      Chuyên Viên Vận Hành Sàn Thương Mại Điện Tử
                    </h6>
                    <p className="text-muted mb-0">
                      HAPAS VIỆT NAM | Hà Nội | Còn 25 ngày để ứng tuyển
                    </p>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success">12 - 20 triệu</span>
                    <button className="btn btn-outline-success btn-sm ms-3">
                      Ứng tuyển
                    </button>
                  </div>
                </div> */}
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
                {companyInformation?.address
                  ? companyInformation.address
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

      {/* Footer Section */}
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
