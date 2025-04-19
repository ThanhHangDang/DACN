import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemProfileQuery } from "../../../redux_toolkit/jobseekerApi.js";
import SkillsContainer from "../../../component/_component/ui/jobseeker/PercentContainer.js";
import LineChartComponent from "../../../component/_component/ui/LineChart.js";
import { format, subDays } from "date-fns";

export default function JobSeekerOverview() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const {
    data: userInformation,
    isLoading,
    error,
  } = useGetItemProfileQuery(
    { type: "Basic", profile_id: user?.user?.id },
    {
      skip: !user?.user?.id,
    }
  );

  //****** * tạm thời chưa gợi ý job cho jobseeker (vì trước đó cũng chưa có làm)
  // const { suitablePosts } = useSelector((state) => state.post);
  const suitablePosts = [];

  const navigate = useNavigate();

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  const renderSuitableWork = () => {
    return suitablePosts?.map((work, index) => {
      return (
        <div
          key={work.job_id}
          className="card mb-3 col-lg-3 col-sm-10 m-2"
          style={{ maxWidth: 540 }}
        >
          <div className="row g-0">
            <div className="col-md-4 align-self-center">
              <img
                src={work.company_logo}
                className="img-fluid rounded-2"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <NavLink
                  to={`/post-detail/${work.job_id}`}
                  className="text-decoration-none"
                >
                  <h5 className="card-title text-truncate">{work.title}</h5>
                </NavLink>
                {/* <h5 className="card-title text-truncate">{work.title}</h5> */}
                <div
                  className="card-text"
                  style={{ padding: "0px !important" }}
                >
                  <p className="text-truncate">{work.company_name}</p>
                  <p className="text-truncate text-danger">
                    {formatNumberToTr(work?.salary_min)}-
                    {formatNumberToTr(work?.salary_max)} đ/tháng
                  </p>
                  <p className="card-text text-truncate">
                    {work.work_location_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const appliedCount = null;
  const viewProfileCount = null;
  const savedProfileCount = null;

  const [rangeLabel, setRangeLabel] = useState([
    "12/04/2025",
    "13/04/2025",
    "14/04/2025",
    "15/04/2025",
    "16/04/2025",
  ]);
  const [days, setDays] = useState(7);
  const handleChangeChartTime = () => {
    console.log(days);
    const endDate = new Date(); // Ngày hiện tại
    const dateRange = [];

    // Xác định bước nhảy theo số ngày đã chọn
    let step;
    if (days === 7) {
      step = 1;
    } else if (days === 14 || days === 30) {
      step = Math.floor(days / 5);
    } else {
      step = Math.floor(days / 5); // fallback
    }

    // Lấy 5 mốc thời gian, từ hiện tại lùi về trước
    for (let i = 4; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i * step);
      dateRange.push(format(date, "dd/MM/yyyy"));
    }

    console.log(dateRange);
    setRangeLabel(dateRange);
  };

  const handleGetChartDataByDateRange = () => {
    console.log("Query số lượng theo từng ngày trong range: ", rangeLabel);
    console.log(
      "Trả về 3 mảng có 5 giá trị, xong set state lại cho appliedCount, viewProfileCount, savedProfileCount, dùng redux state "
    );
  };

  useEffect(() => {
    handleChangeChartTime();
    handleGetChartDataByDateRange();
  }, [days]);

  useEffect(() => {
    if (!isLogin || user?.user.role !== 3) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h5 className="fw-bold">Tổng quan</h5>
        <SkillsContainer percent={80} />
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h5 className="fw-bold">Hoạt động của bạn</h5>
        <div className="row justify-content-md-around ">
          <div className="col-md-8">
            <LineChartComponent
              labelChoice={rangeLabel}
              data1={appliedCount}
              data2={viewProfileCount}
              data3={savedProfileCount}
            />
            <select
              className="form-select form-select-sm w-auto"
              onChange={(e) => {
                setDays(e.target.value);
              }}
            >
              <option value={7}>7 ngày</option>
              <option value={14}>14 ngày</option>
              <option value={30}>30 ngày</option>
            </select>
          </div>
          <div className=" col-md-4 d-flex justify-content-md-around justify-content-sm-center text-center flex-column">
            <div className="col-sm-11 border border-primary p-2 d-flex justify-content-center align-items-center flex-column">
              <h4 className="text-primary">0</h4>
              Việc làm đã ứng tuyển
            </div>
            <div className=" col-sm-11 border border-primary p-2 d-flex justify-content-center align-items-center flex-column">
              <h4 className="text-warning">0</h4>
              Lượt xem hồ sơ
            </div>
            <div className=" col-sm-11 border border-primary p-2 d-flex justify-content-center align-items-center flex-column">
              <h4 className="text-danger">0</h4>
              Lượt lưu hồ sơ
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold">Công việc phù hợp</h5>
          <NavLink to="/post" className="text-primary">
            Xem tất cả
          </NavLink>
        </div>

        <div className="row  rounded-2 p-2 d-flex justify-content-between">
          {renderSuitableWork()
            ? renderSuitableWork()
            : "Không có công việc nào"}
        </div>
      </div>
    </>
  );
}
