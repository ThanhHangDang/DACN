import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getPostDetails } from "../../redux/actions/postAction.js";
import { useGetPostDetailQuery } from "../../../redux_toolkit/guestApi.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";
import calculateDaysRemaining from "../../../utils/calculateDaysRemaining.js";
import CompanyHeader from "../../../component/_component/ui/CompanyHeader.js";

export default function WorkDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  // const postDetail = useSelector((state) => state.post.postDetail);
  const {
    data: postDetail,
    isLoading,
    refetch,
  } = useGetPostDetailQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(postDetail);

  useEffect(() => {
    // dispatch(getPostDetails(id));
    refetch();
  }, [id]);

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
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
                  {postDetail?.salary_min === 0 && postDetail?.salary_max === 0
                    ? "Thỏa thuận"
                    : `${formatNumberToTr(
                        postDetail?.salary_min
                      )} - ${formatNumberToTr(postDetail?.salary_max)} đ/tháng`}
                </strong>{" "}
                • <i className="bi bi-stopwatch-fill me-1"></i>
                {calculateDaysRemaining(postDetail?.date_expi)
                  ? `Hết hạn trong ${calculateDaysRemaining(
                      postDetail?.date_expi
                    )} ngày`
                  : "Hết hạn"}{" "}
                •<i className="bi bi-people-fill me-1"></i>
                {postDetail?.views} lượt xem • {postDetail?.work_location_name}
              </p>

              <button className="btn btn-danger me-2">Ứng tuyển</button>
              <button className="btn btn-outline-secondary">Lưu</button>

              <hr />

              <h5 className="mt-3">Mô tả công việc</h5>
              <ul>
                {postDetail?.describle
                  ?.split("00pizon00")
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>

              <h5 className="mt-3">Yêu cầu ứng viên</h5>
              <ul>
                {postDetail?.more_requirements
                  ?.split("00pizon00")
                  ?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>

              <h5 className="mt-3">Các phúc lợi dành cho bạn</h5>
              <ul>
                {postDetail?.catalog_benefit?.split(",")?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h5 className="mt-3">Địa điểm làm việc</h5>
              <p>{postDetail?.address}</p>

              <h5 className="mt-3">Từ khóa:</h5>
              <div>
                {postDetail?.job_skills?.split(",")?.map((item, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {item}
                  </span>
                ))}
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
                  <strong>Kỹ năng:</strong> {postDetail?.job_skills}
                </li>
                <li>
                  {postDetail?.working_time ? (
                    <>
                      <strong>Giờ làm việc:</strong> {postDetail.working_time}
                    </>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>Việc làm tương tự</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-decoration-none">
                    Junior AI Engineer - Navigos Search
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    AI Engineer - Samsung Electronics Vietnam
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    Data Engineer - Công ty TNHH FPT Smart Cloud
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
