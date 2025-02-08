import React from "react";

export default function EmployeeMaganePage() {
  const candidates = [
    {
      name: "Nguyễn Văn A",
      position: "Software Developer",
      experience: "Kinh nghiệm 2 năm",
    },
    {
      name: "Nguyễn Quang Huy",
      position: "Mobile Developer",
      experience: "Kinh nghiệm 3 năm",
    },
    {
      name: "Trần Thị Minh Thư",
      position: "Web Developer",
      experience: "Kinh nghiệm 1 năm",
    },
    {
      name: "Phạm Thị Hồng Nhung",
      position: "UI/UX Designer",
      experience: "Kinh nghiệm 4 năm",
    },
    {
      name: "Võ Văn Bình",
      position: "Data Analyst",
      experience: "Kinh nghiệm 2 năm",
    },
    {
      name: "Hoàng Minh Đạt",
      position: "Fullstack Developer",
      experience: "Kinh nghiệm 5 năm",
    },
    {
      name: "Trần Thanh Trúc",
      position: "Backend Developer",
      experience: "Kinh nghiệm 3 năm",
    },
    {
      name: "Dương Văn Phúc",
      position: "Frontend Developer",
      experience: "Kinh nghiệm 2 năm",
    },
    {
      name: "Lê Gia Khánh",
      position: "DevOps Engineer",
      experience: "Kinh nghiệm 1 năm",
    },
  ];

  const renderEmployee = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          {candidates.map((candidate, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card d-flex">
                <div className="card-body">
                  <div className="me-3">
                    <img
                      src={candidate.logo}
                      alt={candidate.name}
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <h5 className="card-title">{candidate.name}</h5>
                    <p className="card-text">{candidate.position}</p>
                    <p className="text-muted">{candidate.experience}</p>
                    <a href="#aa" className="btn btn-primary">
                      Chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container bg-light p-4 rounded-3 shadow-sm mt-4 sticky">
        <form>
          <div className="row g-3">
            {/* Tiêu đề tìm kiếm và nút Search */}
            <div className="col-md-12 d-flex align-items-end">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Tên ứng viên"
                // disabled
              />
              <button className="btn btn-primary d-flex">
                Search <i className="bi bi-search ms-3"></i>
              </button>
            </div>

            {/* Lĩnh vực */}
            <div className="col-md-3">
              <label className="form-label">Lĩnh vực</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
                {/* Thêm options */}
              </select>
            </div>

            {/* Ngành nghề */}
            <div className="col-md-3">
              <label className="form-label">Ngành nghề</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Cấp bậc */}
            <div className="col-md-3">
              <label className="form-label">Trình độ học vấn</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Cấp bậc */}
            <div className="col-md-3">
              <label className="form-label">Cấp bậc</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Số năm kinh nghiệm */}
            <div className="col-md-3">
              <label className="form-label">Số năm kinh nghiệm</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Địa điểm */}
            <div className="col-md-3">
              <label className="form-label">Nơi ở hiện tại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Chọn Quốc Gia, Thành Phố"
              />
            </div>

            {/* Tuổi */}
            <div className="col-md-3">
              <label className="form-label">Tuổi</label>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Từ"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Đến"
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="col-md-3">
              <label className="form-label">Trạng thái</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Ngày đăng */}
            <div className="col-md-3">
              <label className="form-label">Giới tính</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Hạn tin */}
            <div className="col-md-3">
              <label className="form-label">Ngoại ngữ</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-4">
        <h5>Danh sách ứng viên</h5>
        {renderEmployee()}
      </div>
    </div>
  );
}
