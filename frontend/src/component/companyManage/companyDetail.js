import React from "react";

export default function CompanyDetail() {
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="card">
        <div className="card-header p-0">
          <div className="position-relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s"
              alt="Company Banner"
              className="w-100"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="position-absolute bottom-0 start-0 p-3">
              <div className="d-flex align-items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s"
                  alt="Company Logo"
                  className="rounded-circle border border-white"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div className="ms-3">
                  <h5 className="text-white fw-bold">HAPAS VIỆT NAM</h5>
                  <p className="text-white mb-0">
                    https://hapas.vn | 25-99 nhân viên | 87 người theo dõi
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
              <p>
                HAPAS chào bạn! <br />
                HAPAS với sứ mệnh đem lại hạnh phúc và tiện ích cho mọi người,
                chúng tôi tạo cơ hội để sáng tạo, nuôi dưỡng tiềm năng con người
                và mang lại những giá trị tốt đẹp cho thị trường số 1 tại Việt
                Nam vào năm 2028, cam kết mang đến trải nghiệm khách hàng vượt
                trội và những sản phẩm tinh tế.
              </p>
              <p>
                Hãy gia nhập đội ngũ trẻ trung, năng động của HAPAS để cùng mang
                lại những điều bình thường tươi đẹp cho mọi người, cho mỗi ngày,
                bớt mệt nhọc!
              </p>
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
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                </select>
                <button className="btn btn-success">Tìm kiếm</button>
              </div>
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">
                      Quản Lý Cửa Hàng Thời Trang Tại Quận 9
                    </h6>
                    <p className="text-muted mb-0">
                      HAPAS VIỆT NAM | Hồ Chí Minh | Còn 25 ngày để ứng tuyển
                    </p>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success">15 - 25 triệu</span>
                    <button className="btn btn-outline-success btn-sm ms-3">
                      Ứng tuyển
                    </button>
                  </div>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
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
                </div>
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
              <p className="mb-1">
                Tầng 3, Tòa Riverside Garden 349 Vũ Tông Phan, Thanh Xuân, Hà
                Nội
              </p>
              <p>
                Tầng 17 Sailing Tower, 51A Pasteur, Phường Bến Nghé, Quận 1, TP
                Hồ Chí Minh
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
          <div className="row">
            <div className="col-md-4">
              <h6 className="fw-bold">Lương, Thưởng Và Chế Độ Phúc Lợi</h6>
              <p>Chính sách lương thưởng hấp dẫn, nhiều phúc lợi đặc biệt.</p>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">Thời Gian Làm Việc Và Nghỉ Ngơi</h6>
              <p>
                Môi trường làm việc năng động, giờ làm việc linh hoạt, nghỉ phép
                đầy đủ.
              </p>
            </div>
            <div className="col-md-4">
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
