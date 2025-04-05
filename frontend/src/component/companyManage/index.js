import React from "react";

const companies = [
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    name: "CÔNG TY CỔ PHẦN MỤC TIÊU VIỆT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    follows: 775,
    jobs: 10,
    locations: ["Hồ Chí Minh", "Hà Nội"],
    description:
      "VietGoalTM - Trung tâm Bóng đá Trẻ em thành lập năm 2012 nhằm tạo dựng sân chơi bóng đá cho trẻ em...",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    name: "HAPAS VIỆT NAM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    follows: 775,
    jobs: 10,
    locations: ["Hồ Chí Minh", "Hà Nội"],
    description:
      "HAPAS chào bạn! HAPAS với sứ mệnh đem lại hạnh phúc và tự tin cho mọi người...",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    name: "SONATGAME STUDIO",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0JRIJbRlJrEhNZlPR-xHkBddR5jA0BXtXA&s",
    follows: 775,
    jobs: 10,
    locations: ["Hồ Chí Minh", "Hà Nội"],
    description:
      "SONAT GAME STUDIO là công ty sản xuất game mobile toàn cầu – Top 1 Puzzle Game Việt Nam...",
  },
];

function CompanyCard({ company }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={company.image}
          className="card-img-top"
          alt={company.name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            <img
              src={company.logo}
              alt="logo"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <h6 className="mb-0">{company.name}</h6>
          </div>
          <p className="mb-1 text-muted">
            {company.follows} lượt theo dõi • {company.jobs} tin tuyển dụng
          </p>
          <div className="mb-2">
            {company.locations.map((loc) => (
              <span key={loc} className="badge bg-secondary me-1">
                {loc}
              </span>
            ))}
          </div>
          <p className="card-text small">
            {company.description.slice(0, 120)}...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CompanyCulture() {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Khám Phá Văn Hoá Công Ty</h2>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên công ty"
        />
        <button className="btn btn-primary">Tìm</button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Công ty nổi bật ({companies.length})</h5>
        <div>
          <select className="form-select form-select-sm d-inline-block w-auto me-2">
            <option>Tất cả lĩnh vực</option>
          </select>
          <select className="form-select form-select-sm d-inline-block w-auto">
            <option>Địa điểm</option>
          </select>
        </div>
      </div>

      <div className="row">
        {companies.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
}
