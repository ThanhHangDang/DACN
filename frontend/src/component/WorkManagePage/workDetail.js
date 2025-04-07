import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetails } from "../../redux/actions/postAction.js";
import formatDateToDDMMYYYY from "../../utils/formatDate.js";
import calculateDaysRemaining from "../../utils/calculateDaysRemaining.js";
import CompanyHeader from "../../component/_component/ui/CompanyHeader.js";

export default function WorkDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  const postDetail = useSelector((state) => state.post.postDetail);
  console.log(postDetail);

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [id]);

  // return (
  //   <div>
  //     <div className="container mt-4 mb-4">
  //       <div className="card">
  //         <div className="card-header post-detail-bg">
  //           <h3>{postDetail?.title}</h3>
  //           <div className="d-flex justify-content-start">
  //             <p className="me-5">{postDetail?.company_name}</p>
  //             <p className="me-4">
  //               <i class="bi bi-geo-alt-fill me-2"></i>
  //               {postDetail?.work_location_name}
  //             </p>
  //           </div>
  //           <div className="d-flex justify-content-start">
  //             <p className="me-4 text-color">
  //               {postDetail?.salary_min === 0 && postDetail?.salary_max === 0
  //                 ? "Thỏa thuận"
  //                 : `${formatNumberToTr(
  //                     postDetail?.salary_min
  //                   )} - ${formatNumberToTr(postDetail?.salary_max)} đ/tháng`}
  //             </p>

  //             <p className="me-4">
  //               <i className="bi bi-stopwatch-fill me-2"></i>
  //               {calculateDaysRemaining(postDetail?.date_expi) > 0
  //                 ? `Hết hạn trong ${calculateDaysRemaining(
  //                     postDetail?.date_expi
  //                   )} ngày`
  //                 : "Hết hạn"}
  //             </p>

  //             <p>
  //               <i class="bi bi-people-fill me-2"></i>
  //               {postDetail?.views} Lượt xem
  //             </p>
  //           </div>

  //           {user?.user.role !== 2 && (
  //             <>
  //               <button className="btn btn-primary mb-3 mt-2">Ứng tuyển</button>
  //               <button className="btn btn-secondary mb-3 mt-2 ms-2">
  //                 Lưu
  //               </button>
  //             </>
  //           )}
  //         </div>
  //         <div className="card-body">
  //           <section className="mb-4 border border-primany rounded-3 p-2">
  //             {postDetail?.describle && postDetail.describle.length > 0 && (
  //               <section className="mb-4">
  //                 <h5>Mô tả công việc</h5>
  //                 <ul>
  //                   <li>{postDetail?.describle}</li>
  //                 </ul>
  //               </section>
  //             )}

  //             {postDetail?.more_requirement &&
  //               postDetail.more_requirement.length > 0 && (
  //                 <section className="mb-4">
  //                   <h5>Yêu cầu công việc</h5>
  //                   <ul>
  //                     {postDetail?.more_requirement.map(
  //                       (requirement, index) => (
  //                         <li key={index}>{requirement}</li>
  //                       )
  //                     )}
  //                   </ul>
  //                 </section>
  //               )}
  //           </section>

  //           <section className="mb-4 border border-primany rounded-3 p-2">
  //             <h5>Quyền lợi</h5>
  //             <p>{postDetail?.catalog_benefit}</p>
  //           </section>

  //           <section className="mb-4 border border-primany rounded-3 p-2">
  //             <h5>Thông tin việc làm</h5>
  //             <div className="d-flex ">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Ngày Đăng</h6>
  //                 <p>{formatDateToDDMMYYYY(postDetail?.date_post)}</p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Cấp bậc</h6>
  //                 <p>{postDetail?.job_level_name}</p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Ngành nghề</h6>
  //                 <p>{postDetail?.job_function_name}</p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Kỹ năng</h6>
  //                 <p>
  //                   {postDetail?.job_skills
  //                     ? postDetail.job_skills
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Lĩnh vực</h6>
  //                 <p>{postDetail?.industry_name}</p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Ngôn ngữ</h6>
  //                 <p>
  //                   {postDetail?.languages
  //                     ? postDetail.languages
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Kinh nghiệm</h6>
  //                 <p>
  //                   {postDetail?.require_experience
  //                     ? `${postDetail.require_experience} năm`
  //                     : "Không yêu cầu"}
  //                 </p>{" "}
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Độ tuổi</h6>
  //                 <p>
  //                   {postDetail?.require_age_min > 0 &&
  //                   postDetail?.require_age_max > 0
  //                     ? postDetail?.require_age_min +
  //                       " - " +
  //                       postDetail?.require_age_max
  //                     : "Không yêu cầu"}
  //                   {/* {postDetail?.require_age_min} -{" "}
  //                   {postDetail?.require_age_max} */}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Trình độ học vấn</h6>
  //                 <p>
  //                   {postDetail?.education_requirement
  //                     ? postDetail.education_requirement
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Giới tính</h6>
  //                 <p>
  //                   {postDetail?.require_gender
  //                     ? postDetail.require_gender
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">
  //                   Số lượng tuyển dụng
  //                 </h6>
  //                 <p>{postDetail?.quantity}</p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">
  //                   Tình trạng hôn nhân
  //                 </h6>
  //                 <p>
  //                   {postDetail?.require_marital_status
  //                     ? postDetail.require_marital_status
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="d-flex">
  //               <div className="col-md-6">
  //                 <h6 className="fw-bold text-secondary">Loại hình làm việc</h6>
  //                 <p>
  //                   {postDetail?.working_type
  //                     ? postDetail.working_type
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //               <div>
  //                 <h6 className="fw-bold text-secondary">Thời gian làm việc</h6>
  //                 <p>
  //                   {postDetail?.working_time
  //                     ? postDetail.working_time
  //                     : "Không yêu cầu"}
  //                 </p>
  //               </div>
  //             </div>
  //           </section>

  //           <section className="mb-4 border border-primany rounded-3 p-2">
  //             <h5>Địa điểm làm việc</h5>
  //             <span>
  //               <i class="bi bi-geo-alt-fill me-2"></i>
  //               {postDetail?.address}
  //             </span>
  //           </section>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

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
                •<i class="bi bi-people-fill me-1"></i>
                {postDetail?.views} lượt xem • {postDetail?.work_location_name}
              </p>

              <button className="btn btn-danger me-2">Ứng tuyển</button>
              <button className="btn btn-outline-secondary">Lưu</button>

              <hr />

              <h5 className="mt-3">Mô tả công việc</h5>
              <ul>
                {/* <li>
                  Nghiên cứu và thử nghiệm các công nghệ AI nhằm giải quyết và
                  tối ưu các bài toán cốt lõi.
                </li>
                <li>
                  Xây dựng, triển khai các hệ thống AI nhằm tích hợp công nghệ
                  vào sản phẩm và quy trình.
                </li>
                <li>
                  Phối hợp chặt chẽ với Data Engineer và Data Analyst để đảm bảo
                  hệ thống được tích hợp một cách hoàn chỉnh và tối ưu.
                </li> */}
                {postDetail?.describle?.split("u003c").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h5 className="mt-3">Yêu cầu ứng viên</h5>
              <ul>
                {/* <li>
                  Tốt nghiệp Đại học; ưu tiên chuyên ngành CNTT, Khoa học dữ
                  liệu, Trí tuệ nhân tạo.
                </li>
                <li>
                  Có từ 2 năm kinh nghiệm trở lên ở AI Engineer, Data Scientist
                  hoặc ML Engineer.
                </li>
                <li>
                  Kinh nghiệm với các công cụ AI và Machine Learning:
                  Scikit-learn, PyTorch, Pandas/Polars, SQL,...
                </li> */}
                {postDetail?.more_requirements
                  ?.split("u003c")
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>

              <h5 className="mt-3">Các phúc lợi dành cho bạn</h5>
              <ul>
                {/* <li>Thưởng lương tháng 13 và các khoản thưởng khác.</li>
                <li>Chăm sóc sức khỏe định kỳ.</li>
                <li>Đào tạo và phát triển nghề nghiệp.</li>
                <li>Hoạt động nhóm và các sự kiện thường niên.</li> */}
                {postDetail?.catalog_benefit?.split(",")?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h5 className="mt-3">Địa điểm làm việc</h5>
              <p>{postDetail?.address}</p>

              <h5 className="mt-3">Từ khóa:</h5>
              <div>
                {/* <span className="badge bg-secondary me-2">AI</span>
                <span className="badge bg-secondary me-2">
                  Machine Learning
                </span>
                <span className="badge bg-secondary me-2">Python</span>
                <span className="badge bg-secondary">Hồ Chí Minh</span> */}
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
