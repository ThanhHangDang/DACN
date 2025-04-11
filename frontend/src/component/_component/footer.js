import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-body-tertiary text-muted border-top align-items-center">
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-lg-3 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">Về chúng tôi</h6>
                <div>Giới thiệu</div>
                <div className="mt-2">Liên hệ</div>
                <div className="mt-2">Hỏi Đáp</div>
                <div className="mt-2">Chính sách bảo mật</div>
                <div className="mt-2">Điều khoản dịch vụ</div>
                <div className="mt-2">Quy chế hoạt động</div>
              </div>
              <div className="col-lg-3 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Hồ sơ và CV</h6>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Quản lý CV của bạn
                  </a>
                </div>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    HDN Teams Profile
                  </a>
                </div>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Hướng dẫn viết CV
                  </a>
                </div>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Review CV
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Sự nghiệp</h6>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Việc làm tốt nhất
                  </a>
                </div>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Việc làm lương cao
                  </a>
                </div>
                <div className="mt-2">
                  <a href="#a" className="text-reset text-decoration-none">
                    Quản lý việc làm
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Cộng đồng</h6>
                <div className="mt-2 d-flex justify-content-between col-4 ">
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-youtube"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-tiktok"></i>
                </div>
                <h6 className="text-uppercase fw-bold mb-4 mt-4">
                  Ứng dụng di động
                </h6>
                <div className="row d-flex align-items-between mt-2">
                  <div className="">
                    <img
                      src="./img/appstore/appstore.png"
                      style={{ height: 40, width: 80 }}
                      alt=""
                    />
                  </div>
                  <div className="mt-2">
                    <img
                      src="./img/appstore/google-play.png"
                      style={{ height: 40, width: 80 }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="#a">
            boost-career@support.com
          </a>
        </div>
      </footer>
    </div>
  );
}
