import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

export default function EmployeeProfileManage() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Nguyễn Thị Hồng",
      job: "Nhân viên Marketing",
      age: 26,
      dateApplied: "2025-04-10",
      rating: 3,
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      name: "Trần Minh Quân",
      job: "Lập trình viên Backend",
      age: 29,
      dateApplied: "2025-04-12",
      rating: 4,
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Lê Phương Anh",
      job: "Thiết kế UI/UX",
      age: 24,
      dateApplied: "2025-04-13",
      rating: 5,
    },
    {
      id: 4,
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
      name: "Phạm Hữu Nghĩa",
      job: "Chuyên viên SEO",
      age: 31,
      dateApplied: "2025-04-15",
      rating: 2,
    },
    {
      id: 4,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      name: "Đào Mai Linh",
      job: "Chuyên viên Tuyển dụng",
      age: 27,
      dateApplied: "2025-04-17",
      rating: 3,
    },
  ];

  const [ratings, setRatings] = useState(() =>
    data.reduce((acc, item) => ({ ...acc, [item.id]: item.rating }), {})
  );

  const handleRatingChange = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));

    handleRating(data[id]);
  };

  const handleRating = (item) => {
    console.log(item);
  };

  useEffect(() => {
    if (!isLogin && !(user?.user.role === 2)) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2 d-flex justify-content-between">
        <h5 className="fw-bold">Quản lý hồ sơ ứng viên</h5>
        <div>
          <select className="form-select form-select-sm w-auto">
            <option>Filter by JobName</option>
            {data?.map((item, index) => {
              return <option value={item.job}>{item.job}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Ứng viên</th>
              <th scope="col">Công việc</th>
              <th scope="col">Tuổi</th>
              {/* <th scope="col">Địa chỉ</th>
              <th scope="col">Email</th> */}
              <th scope="col">Ngày ứng tuyển</th>
              <th scope="col">Đánh giá</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="align-items-center align-middle">
            {data?.map((item) => (
              <tr key={item.id} className="align-items-center">
                <td>
                  <img
                    src={item.avatar}
                    alt="avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td className="text-start">{item.name}</td>
                <td className="text-start">{item.job}</td>
                <td>{item.age}</td>
                <td>{item.dateApplied}</td>
                <td>
                  <div className="star-rating animated-stars">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <React.Fragment key={star}>
                        <input
                          type="radio"
                          id={`star${star}-user${item.id}`}
                          name={`rating-user${item.id}`}
                          value={star}
                          checked={ratings[item.id] === star}
                          onChange={() => handleRatingChange(item.id, star)}
                        />
                        <label
                          htmlFor={`star${star}-user${item.id}`}
                          className={`bi bi-star-fill ${
                            ratings[item.id] >= star ? "active" : ""
                          }`}
                          onClick={() => handleRatingChange(item.id, star)}
                        ></label>
                      </React.Fragment>
                    ))}
                  </div>
                </td>
                <td>
                  <a
                    href="#aaaa"
                    className="text-success text-decoration-none custom-hover-3"
                  >
                    Chi tiết
                  </a>
                </td>
                <td>
                  <a
                    href="#aaaa"
                    className="text-danger text-decoration-none custom-hover-3"
                  >
                    Xóa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
