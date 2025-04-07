import React from "react";

function JobDetail() {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Column */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">AI Engineer</h4>
              <p className="text-muted">
                <strong>20tr-30tr/tháng</strong> • Hết hạn trong 16 ngày • 422
                lượt xem • Hồ Chí Minh
              </p>
              <button className="btn btn-danger me-2">Ứng tuyển</button>
              <button className="btn btn-outline-secondary">Lưu</button>

              <hr />

              <h5 className="mt-3">Mô tả công việc</h5>
              <ul>
                <li>
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
                </li>
              </ul>

              <h5 className="mt-3">Yêu cầu ứng viên</h5>
              <ul>
                <li>
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
                </li>
              </ul>

              <h5 className="mt-3">Các phúc lợi dành cho bạn</h5>
              <ul>
                <li>Thưởng lương tháng 13 và các khoản thưởng khác.</li>
                <li>Chăm sóc sức khỏe định kỳ.</li>
                <li>Đào tạo và phát triển nghề nghiệp.</li>
                <li>Hoạt động nhóm và các sự kiện thường niên.</li>
              </ul>

              <h5 className="mt-3">Địa điểm làm việc</h5>
              <p>Toà nhà 678, Số 678 Hoàng Văn Thái, P. Tân Phú, Quận 7, HCM</p>

              <h5 className="mt-3">Từ khóa:</h5>
              <div>
                <span className="badge bg-secondary me-2">AI</span>
                <span className="badge bg-secondary me-2">
                  Machine Learning
                </span>
                <span className="badge bg-secondary me-2">Python</span>
                <span className="badge bg-secondary">Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Thông tin việc làm</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Ngày đăng:</strong> 24/03/2025
                </li>
                <li>
                  <strong>Ngành nghề:</strong> Công nghệ thông tin
                </li>
                <li>
                  <strong>Kỹ năng:</strong> AI, Machine Learning, Python
                </li>
                <li>
                  <strong>Giờ làm việc:</strong> 9:00 - 18:00
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

export default JobDetail;
