import React from "react";

export default function EmployeeDetail() {
  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="card">
          <div className="card-header post-detail-bg">
            <h3>Trần Văn A</h3>
            <p className="me-5">Software Engineer - 1 năm kinh nghiệm</p>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i class="bi bi-briefcase-fill me-2"></i>Thực tập sinh/Sinh viên
              </p>
              <p className="me-4">
                <i class="bi bi-mortarboard-fill me-2"></i>Cử nhân
              </p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i class="bi bi-envelope-fill me-2"></i>tranvana@gmail.com
              </p>
              <p className="me-4">
                <i class="bi bi-telephone-fill me-2"></i>0123456789
              </p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="me-5 col-4">
                <i class="bi bi-envelope-fill me-2"></i>138/34/5 Lê Văn Việt,
                Quận 9, TPHCM
              </p>
              {/* <p className="me-4">
                <i class="bi bi-telephone-fill me-2"></i>0123456789
              </p> */}
            </div>

            <button className="btn btn-primary mb-3 mt-2">Liên hệ</button>
            <button className="btn btn-secondary mb-3 mt-2 ms-2">Lưu</button>
          </div>
          <div className="card-body">
            <section className="mb-4 border border-primany rounded-3 p-2">
              <h5>Hồ sơ ứng viên</h5>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Công việc mong muốn</h6>
                <p>Nơi làm việc: Hồ Chí minh</p>
                <p className="mt-0">Mức lương: 10tr-15tr</p>
              </section>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Mục tiêu nghề nghiệp</h6>
                <ul>
                  <li>
                    Sinh viên mới tốt nghiệp ra trường với chuyên ngành Hệ thống
                    Thông tin Quản lý, nắm vững các kiến thức, kỹ năng chuyên
                    môn.
                  </li>
                  <li>
                    Mong muốn được vào làm việc tại công ty với vị trí nhân viên
                    phân tích hệ thống, có thể vận dụng những kiến thức đã được
                    trau dồi và không ngừng học hỏi để phát triển bản thân, cũng
                    như hoàn thành tốt nhất công việc được giao
                  </li>
                </ul>
              </section>
              <section className="mb-4 p-2">
                <div className="d-flex ">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Tuổi</h6>
                    <p>20 tuổi</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Giới tính</h6>
                    <p>Nam</p>
                  </div>
                  <div>
                    <h6 className="fw-bold text-secondary">
                      Tình trạng hôn nhân
                    </h6>
                    <p>Độc thân</p>
                  </div>
                </div>

                <div className="d-flex ">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Kinh ngiệm</h6>
                    <p>1 năm</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-secondary">Học vấn</h6>
                    <p>Cử nhân</p>
                  </div>
                  <div></div>
                </div>
              </section>
              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Dự án</h6>
                <p>
                  Xây dựng website tìm kiếm việc làm tích hợp các công cụ AI
                </p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Kỹ năng</h6>
                <p>
                  C++, Python, Javascript, ReactJs, NodeJs, Git, mySQL, Java,
                  String Boot
                </p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Ngoại ngữ</h6>
                <p>Tiếng Anh TOEIC 750, tiếng Nhật N2</p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Hoạt động</h6>
                <p>Không</p>
              </section>

              <section className="mb-4 p-2">
                <h6 className="fw-bold text-secondary">Chứng chỉ</h6>
                <p>Không</p>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
