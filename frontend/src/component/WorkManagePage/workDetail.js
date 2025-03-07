import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetails } from "../../redux/actions/postAction.js";

export default function WorkDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;
  const calculateDaysRemaining = (targetDateString) => {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Trả về số ngày còn lại
  };
  const formatDateToDDMMYYYY = (isoDateString) => {
    const date = new Date(isoDateString); // Tạo đối tượng Date từ chuỗi ISO
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY
  };

  const postDetail = useSelector((state) => state.post.postDetail);
  console.log(id);
  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [id]);

  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="card">
          <div className="card-header post-detail-bg">
            <h3>{postDetail?.title}</h3>
            <div className="d-flex justify-content-start">
              <p className="me-5">{postDetail?.company_name}</p>
              <p className="me-4">
                <i class="bi bi-geo-alt-fill me-2"></i>
                {postDetail?.work_location_name}
              </p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="me-4 text-color">
                {formatNumberToTr(postDetail?.salary_min)}-
                {formatNumberToTr(postDetail?.salary_max)} đ/tháng
              </p>
              <p className="me-4">
                <i class="bi bi-stopwatch-fill me-2"></i>Hết hạn trong{" "}
                {calculateDaysRemaining(postDetail?.date_expi)} ngày
              </p>
              <p>
                <i class="bi bi-people-fill me-2"></i>
                {postDetail?.views} Lượt xem
              </p>
            </div>

            {user?.user.role !== 2 && (
              <>
                <button className="btn btn-primary mb-3 mt-2">Ứng tuyển</button>
                <button className="btn btn-secondary mb-3 mt-2 ms-2">
                  Lưu
                </button>
              </>
            )}
          </div>
          <div className="card-body">
            <section className="mb-4 border border-primany rounded-3 p-2">
              {postDetail?.describle && postDetail.describle.length > 0 && (
                <section className="mb-4">
                  <h5>Mô tả công việc</h5>
                  <ul>
                    {/* {postDetail.describle?.map((description, index) => (
                      <li key={index}>{description}</li>
                    ))} */}
                    <li>{postDetail?.describle}</li>
                  </ul>
                </section>
              )}

              {postDetail?.more_requirement &&
                postDetail.more_requirement.length > 0 && (
                  <section className="mb-4">
                    <h5>Yêu cầu công việc</h5>
                    <ul>
                      {postDetail?.more_requirement.map(
                        (requirement, index) => (
                          <li key={index}>{requirement}</li>
                        )
                      )}
                    </ul>
                  </section>
                )}
            </section>

            <section className="mb-4 border border-primany rounded-3 p-2">
              <h5>Quyền lợi</h5>
              {/* <section className="mb-4 border border-primany rounded-3 p-2">
                <h6 className="fw-bold text-secondary">Thưởng</h6>
                <p>1 năm/1 lần - Tăng ca chi trả riêng.</p>
              </section>
              <section className="mb-4 border border-primany rounded-3 p-2">
                <h6 className="fw-bold text-secondary">Chăm sóc sức khỏe</h6>
                <p>
                  Bảo hiểm xả hội (bảo hiểm y tế cho người lao động), bảo hiểm
                  thất nghiệp, khám sức khỏe định kỳ.
                </p>
              </section>
              <section className="mb-4 border border-primany rounded-3 p-2">
                <h6 className="fw-bold text-secondary">Nghỉ phép có lương</h6>
                <p>
                  Hơn 120 ngày nghĩ lễ trong năm (thứ Bảy, Chủ Nhật, Tết nguyên
                  đán, Golden Week, kỳ nghỉ hè,...)
                </p>
              </section>
              <section className="mb-4 border border-primany rounded-3 p-2">
                <h6 className="fw-bold text-secondary">Khác</h6>
                <p>
                  Công ty cung cấp nhà ở và thiết bị, hỗ trợ việc làm, hỗ trợ
                  sinh hoạt, quản lý kỹ sư. Nếu bạn đến Nhật Bản cùng gia đình,
                  công ty sẽ hỗ trợ thủ tục xin visa và nhập cảnh.
                </p>
              </section> */}
              <p>{postDetail?.catalog_benefit}</p>
            </section>

            <section className="mb-4 border border-primany rounded-3 p-2">
              <h5>Thông tin việc làm</h5>
              <div className="d-flex ">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Ngày Đăng</h6>
                  <p>{formatDateToDDMMYYYY(postDetail?.date_post)}</p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Cấp bậc</h6>
                  <p>{postDetail?.job_level_name}</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Ngành nghề</h6>
                  <p>Software Engineer</p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Kỹ năng</h6>
                  <p>
                    {postDetail?.job_skills
                      ? postDetail.job_skills
                      : "Không yêu cầu"}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Lĩnh vực</h6>
                  <p>Công nghệ thông tin</p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Ngôn ngữ</h6>
                  <p>
                    {postDetail?.languages
                      ? postDetail.languages
                      : "Không yêu cầu"}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Kinh nghiệm</h6>
                  <p>
                    {postDetail?.require_experience
                      ? `${postDetail.require_experience} năm`
                      : "Không yêu cầu"}
                  </p>{" "}
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Độ tuổi</h6>
                  <p>
                    {postDetail?.require_age_min} -{" "}
                    {postDetail?.require_age_max}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Trình độ học vấn</h6>
                  <p>
                    {postDetail?.education_requirement
                      ? postDetail.education_requirement
                      : "Không yêu cầu"}
                  </p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Giới tính</h6>
                  <p>
                    {postDetail?.require_gender
                      ? postDetail.require_gender
                      : "Không yêu cầu"}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">
                    Số lượng tuyển dụng
                  </h6>
                  <p>{postDetail?.quantity}</p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">
                    Tình trạng hôn nhân
                  </h6>
                  <p>
                    {postDetail?.require_marital_status
                      ? postDetail.require_marital_status
                      : "Không yêu cầu"}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h6 className="fw-bold text-secondary">Loại hình làm việc</h6>
                  <p>
                    {postDetail?.working_type
                      ? postDetail.working_type
                      : "Không yêu cầu"}
                  </p>
                </div>
                <div>
                  <h6 className="fw-bold text-secondary">Thời gian làm việc</h6>
                  <p>
                    {postDetail?.working_time
                      ? postDetail.working_time
                      : "Không yêu cầu"}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-4 border border-primany rounded-3 p-2">
              <h5>Địa điểm làm việc</h5>
              <span>
                <i class="bi bi-geo-alt-fill me-2"></i>
                {postDetail?.address}
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
