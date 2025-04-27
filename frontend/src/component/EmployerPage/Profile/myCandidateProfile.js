import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useGetJobseekerAppliedQuery} from "../../../redux_toolkit/employerApi.js";
import { differenceInYears,format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import "./style.css";

export default function EmployeeProfileManage() {
  const { isLogin, user } = useSelector((state) => state.auth);
// const {data} = useGetJobseekerAppliedQuery(user?.id)||[];
  const navigate = useNavigate();

  const data = [
    {
      profile_id: 1,
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      fullname: "Nguyễn Thị Hồng",
      title: "Nhân viên Marketing",
      birdday:  "1994-04-10",
      create_at: "2025-04-10",
      score: 3,
    },
    {
      profile_id: 2,
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      full_name: "Trần Minh Quân",
      job: "Lập trình viên Backend",
      birdday:  "2004-04-10",
      create_at: "2025-04-12",
      score: 4,
    },
    {
      profile_id: 3,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      full_name: "Lê Phương Anh",
      job: "Thiết kế UI/UX",
      birdday:  "1998-04-10",
      create_at: "2025-04-13",
      score: 5,
    },
    {
      profile_id: 4,
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
      full_name: "Phạm Hữu Nghĩa",
      job: "Chuyên viên SEO",
      birdday:  "1994-04-10",
      create_at: "2025-04-15",
      score: 2,
    },
    {
      profile_id: 4,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      full_name: "Đào Mai Linh",
      job: "Chuyên viên Tuyển dụng",
      birdday:  "1996-04-10",
      create_at: "2025-04-17",
      score: 3,
    },
  ];

  const [ratings, setRatings] = useState(() =>
    data.reduce((acc, item) => ({ ...acc, [item.profile_id]: item.score }), {})
  );

  const handleRatingChange = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));

    handleRating(data[id]);
  };

  const handleRating = (item) => {
    console.log(item);
  };

  useEffect(() => {
    if (!isLogin && !(user?.role === 2)) {
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
              return <option value={item.job_id}>{item.title}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Ảnh đại diện</th>
              <th scope="col">Tên ứng viên</th>
              <th scope="col">Vị trí ứng tuyển</th>
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
              <tr key={item.job_id + item.profile_id} className="align-items-center">
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
                <td className="text-start">{item.full_name}</td>
                <td className="text-start">{item.title}</td>
                <td> {differenceInYears(new Date(), new Date(item.birthday))}</td>
                <td>{format(parseISO(item.create_at), 'dd/MM/yyyy', { locale: vi })}</td>
                <td>
                  <div className="star-rating animated-stars">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <React.Fragment key={star}>
                        <input
                          type="radio"
                          id={`star${star}-user${item.profile_id}`}
                          name={`rating-user${item.profile_id}`}
                          value={star}
                          checked={ratings[item.profile_id] === star}
                          onChange={() => handleRatingChange(item.profile_id, star)}
                        />
                        <label
                          htmlFor={`star${star}-user${item.profile_id}`}
                          className={`bi bi-star-fill ${
                            ratings[item.id] >= star ? "active" : ""
                          }`}
                          onClick={() => handleRatingChange(item.profile_id, star)}
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
