import React, { useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getPostDetails } from "../../redux/actions/postAction.js";
import { useGetJobDetailQuery } from "../../../redux_toolkit/guestApi.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";
import calculateDaysRemaining from "../../../utils/calculateDaysRemaining.js";
import CompanyHeader from "../../../component/_component/ui/CompanyHeader.js";
import TitleComponent from "../../_component/ui/TitleComponent.js";
import { toast } from "react-toastify";
import LoginModal from "../../_component/ui/LoginModal.js";
import { format } from "date-fns";

export default function WorkDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  // const postDetail = useSelector((state) => state.post.postDetail);
  const {
    data: postDetail,
    isLoading,
    refetch,
  } = useGetJobDetailQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(postDetail);

  const handleSaveJob = () => {
    console.log("Jobseeker: ", user?.id, " lưu Job: ", postDetail?.job_id);
  };

  const handleApplyJob = () => {
    console.log(
      "Jobseeker: ",
      user?.id,
      " handdleApplyJob: ",
      postDetail?.job_id
    );
  };

  useEffect(() => {
    if (user?.role === 2) {
      toast.error("Vui lòng đăng nhập vai trò người tìm việc!");
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      <LoginModal />
      <TitleComponent title={"Work Detail"} description={""} />
      <div className="container my-5">
        <nav aria-label="breadcrumb mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/post">Danh sách việc làm</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Thông tin việc làm
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{postDetail?.title}</h4>
                <p className="text-muted">
                  <strong>
                    {postDetail?.salary_min === 0 &&
                    postDetail?.salary_max === 0
                      ? "Thỏa thuận"
                      : `${formatNumberToTr(
                          postDetail?.salary_min
                        )} - ${formatNumberToTr(
                          postDetail?.salary_max
                        )} đ/tháng`}
                  </strong>{" "}
                  • <i className="bi bi-stopwatch-fill me-1"></i>
                  {calculateDaysRemaining(postDetail?.date_expi)
                    ? `Hết hạn trong ${calculateDaysRemaining(
                        postDetail?.date_expi
                      )} ngày`
                    : "Hết hạn"}{" "}
                  •<i className="bi bi-people-fill me-1"></i>
                  {postDetail?.views} lượt xem •{" "}
                  {postDetail?.work_location_name}
                </p>
                {user?.role === 3 ? (
                  <>
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleApplyJob}
                    >
                      Ứng tuyển
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleSaveJob}
                    >
                      Lưu
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-danger me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#LoginModal"
                    >
                      Ứng tuyển
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#LoginModal"
                    >
                      Lưu
                    </button>
                  </>
                )}

                <hr />

                <h5 className="mt-3">Mô tả công việc</h5>
                <ul>
                  {postDetail?.describle
                    ?.split("%00endl")
                    .map((item, index) => item && <li key={index}>{item}</li>)}
                </ul>

                <h5 className="mt-3">Thông tin việc làm</h5>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {postDetail?.date_post && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-calendar fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Ngày đăng</p>
                        <p className="mb-0 text-muted">
                          {format(postDetail?.date_post, "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.job_function_name && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-sitemap fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Ngành nghề</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.job_function_name}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.industry_name && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-briefcase fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Lĩnh vực</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.industry_name}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.require_experience !== undefined && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-handshake-o fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Kinh nghiệm</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.require_experience > 0
                            ? postDetail?.require_experience
                            : "Không yêu cầu"}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.education_title && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-graduation-cap fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Trình độ học vấn</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.education_title}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.working_time && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-hourglass fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Giờ làm việc</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.working_time}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.job_level_name && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-user fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Cấp bậc</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.job_level_name}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.languages.length > 0 && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-language fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Cấp bậc</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.languages.map((item) => (
                            <span key={item.language_id}>
                              {item.language_name}{" "}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.require_gender && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-venus-mars fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Giới tính</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.require_gender}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.require_marital_status && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-heart fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Tình trạng hôn nhân</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.require_marital_status}
                        </p>
                      </div>
                    </div>
                  )}

                  {postDetail?.working_type && (
                    <div className="d-flex align-items-center mb-3">
                      <i
                        className={`fa fa-clock-o fa-lg text-primary me-3 mt-1 ms-2`}
                      ></i>
                      <div>
                        <p className="mb-1 fw-bold">Loại hình làm việc</p>
                        <p className="mb-0 text-muted">
                          {postDetail?.working_type}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {postDetail?.more_requirements && (
                  <>
                    <h5 className="mt-3">Yêu cầu ứng viên</h5>
                    <ul>
                      {postDetail.more_requirements
                        .split("%00endl")
                        .map(
                          (item, index) => item && <li key={index}>{item}</li>
                        )}
                    </ul>
                  </>
                )}

                <h5 className="mt-3">Các phúc lợi dành cho bạn</h5>
                <div className="d-flex flex-column gap-3">
                  {postDetail?.company_benefits?.map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className="card p-3 d-flex flex-row align-items-center gap-3"
                        >
                          <i
                            className={`fa ${item.benefit_icon} fa-lg text-primary me-3 mt-1`}
                            style={{ minWidth: "24px" }}
                          ></i>
                          <div>
                            <p className="fw-bold mb-1">{item.benefit_name}</p>
                            <p className="text-muted mb-0">
                              {item.benefit_value}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>

                <h5 className="mt-3">Địa điểm làm việc</h5>
                <p>
                  <i class="fa fa-map-marker fa-lg text-primary me-3 mt-1 ms-2"></i>
                  {postDetail?.address}
                </p>

                <h5 className="mt-3">Từ khóa:</h5>
                <div>
                  {postDetail?.job_skills.length > 0
                    ? postDetail.job_skills
                        ?.slice() // Create a copy of the array to avoid mutating the original
                        .sort(
                          (a, b) => a.skill_name.length - b.skill_name.length
                        ) // Sort by name length (shortest first)
                        .map((item) => (
                          <NavLink
                            key={item.skill_id}
                            to={`/post?skill_id=${item.skill_id}`}
                            className="badge bg-secondary me-2 mb-2 text-decoration-none skill-badge"
                          >
                            {item.skill_name}
                          </NavLink>
                        ))
                    : "Chưa có thông tin"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <CompanyHeader
                  companyInformation={postDetail}
                  heightBg={"150px"}
                  logoSize={"30px"}
                />
                <h5>Thông tin việc làm</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>Ngày đăng:</strong>{" "}
                    {formatDateToDDMMYYYY(postDetail?.date_post)}
                  </li>
                  <li>
                    <strong>Ngành nghề:</strong> {postDetail?.industry_name}
                  </li>
                  <li>
                    <strong>Kỹ năng:</strong>{" "}
                    {postDetail?.job_skills
                      ? postDetail.job_skills
                          ?.slice() // Create a copy of the array to avoid mutating the original
                          .sort(
                            (a, b) => a.skill_name.length - b.skill_name.length
                          ) // Sort by name length (shortest first)
                          .map((item) => (
                            <NavLink
                              key={item.skill_id}
                              to={`/post?skill_id=${item.skill_id}`}
                              className="badge bg-secondary me-2 mb-2 text-decoration-none skill-badge"
                            >
                              {item.skill_name}
                            </NavLink>
                          ))
                      : "Chưa có thông tin"}
                  </li>
                  <li>
                    <strong>Giờ làm việc:</strong>{" "}
                    {postDetail?.working_time
                      ? postDetail?.working_time
                      : "Chưa có thông tin"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5>Việc làm tương tự</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#a" className="text-decoration-none">
                      Junior AI Engineer - Navigos Search
                    </a>
                  </li>
                  <li>
                    <a href="#a" className="text-decoration-none">
                      AI Engineer - Samsung Electronics Vietnam
                    </a>
                  </li>
                  <li>
                    <a href="#a" className="text-decoration-none">
                      Data Engineer - Công ty TNHH FPT Smart Cloud
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
