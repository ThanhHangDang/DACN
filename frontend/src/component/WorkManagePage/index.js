import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postAction";
import { NavLink, 
  // useNavigate 
} from "react-router-dom";

import { getPostsSearch } from "../../redux/actions/postAction";
import {
  getCategoryIndustry,
  getCategoryJobFunction,
  getCategoryCity,
} from "../../redux/actions/categoryAction";

export default function WorkMangePage() {
  const dispatch = useDispatch();
  const { allPosts, totalWorksPages } = useSelector((state) => state.post);

  const { industry, jobFunction, city } = useSelector(
    (state) => state.category
  );

  console.log("city", city);

  const [filter, setFilter] = useState({
    title: "",
    industry: "",
    job_function: "",
    work_location: "",
    salary_max: "",
    salary_min: "",
    level_id: "",
    require_marital_status: "",
    require_gender: "",
    require_age_min: "",
    require_age_max: "",
    education_at_least: 0,
    require_experience: 0,
    is_active: 1,
    date_post: "",
  });

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getPostsSearch(filter));
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getVisiblePages = (page, totalPages) => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4);
      } else if (end === totalPages) {
        start = Math.max(1, end - 4);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    dispatch(getAllPosts(page));
    dispatch(getCategoryIndustry());
    dispatch(getCategoryJobFunction());
    dispatch(getCategoryCity(84));
    setTotalPages(totalWorksPages);
  }, [page, dispatch]);

  const renderJob = () => {
    return allPosts?.map((job, index) => {
      return (
        <div
          key={job.job_id}
          className="row d-flex align-items-center border rounded-3 p-3 mb-3 bg-light"
          style={{ borderLeft: "5px solid #0d6efd" }}
        >
          {/* Logo */}
          <div className="col-md-3 align-self-center ">
            <img
              src={job.company_logo ? job.company_logo : job.logo}
              alt={job.company}
              className="img-fluid rounded-2"
              style={{ maxHeight: 100, maxWidth: 100 }}
            />
          </div>
          {/* Job Details */}
          <div className="flex-grow-1 col-md-6">
            <NavLink
              to={`/post-detail/${job.job_id}`}
              className="text-decoration-none"
            >
              <h5 className="text-primary text-decoration-none">{job.title}</h5>
            </NavLink>
            <p className="mb-1 fw-bold">{job.company_name}</p>
            <p className="mb-1 text-danger">
              {formatNumberToTr(job?.salary_min)}-
              {formatNumberToTr(job?.salary_max)} đ/tháng
            </p>
            <p className="mb-0 text-muted">{job.work_location_name}</p>
          </div>
          {/* Favorite Icon */}
          <div className="col-md-2 d-flex justify-content-end">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Danh sách việc làm
            </li>
          </ol>
        </nav>
      </div>

      <div className="container bg-light p-4 rounded-3 shadow-sm mt-4 sticky">
        <form>
          <div className="row g-3">
            {/* Tiêu đề tìm kiếm và nút Search */}
            <div className="col-md-12 d-flex align-items-end">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Tiêu đề tin tuyển dụng"
                // disabled
                onChange={(e) =>
                  setFilter({ ...filter, title: e.target.value })
                }
              />
              <button className="btn btn-primary d-flex" onClick={handleSearch}>
                Search <i className="bi bi-search ms-3"></i>
              </button>
            </div>

            {/* Lĩnh vực */}
            <div className="col-md-3">
              <label className="form-label">Lĩnh vực</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setFilter({ ...filter, industry: e.target.value })
                }
              >
                {industry?.map((item, index) => (
                  <option key={index} value={item.industry_id}>
                    {item.industry_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ngành nghề */}
            <div className="col-md-3">
              <label className="form-label">Ngành nghề</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setFilter({ ...filter, job_function: e.target.value })
                }
              >
                {jobFunction?.map((item, index) => (
                  <option key={index} value={item.job_function_id}>
                    {item.job_function_name}
                  </option>
                ))}
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
              <input
                type="number"
                className="form-control me-2"
                placeholder="Năm kinh nghiệm"
                step={1}
                min={0}
                onChange={(e) =>
                  setFilter({ ...filter, require_experience: e.target.value })
                }
              />
            </div>

            {/* Địa điểm */}
            <div className="col-md-3">
              <label className="form-label">Địa điểm</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setFilter({ ...filter, work_location: e.target.value })
                }
              >
                {city?.map((item, index) => (
                  <option key={index} value={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mức lương */}
            <div className="col-md-3">
              <label className="form-label">Mức lương</label>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Từ"
                  step={1000000}
                  min={1000000}
                  onChange={(e) =>
                    setFilter({ ...filter, salary_min: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Đến"
                  step={1000000}
                  min={1000000}
                  onChange={(e) =>
                    setFilter({ ...filter, salary_max: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Ngày đăng */}
            <div className="col-md-3">
              <label className="form-label">Ngày đăng</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>

            {/* Hạn tin */}
            <div className="col-md-3">
              <label className="form-label">Hạn tin</label>
              <select className="form-select">
                <option value="">Bất kỳ</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-4">{renderJob()}</div>

      <nav
        className="d-flex justify-content-center mt-4"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#aaa"
              aria-label="Previous"
              onClick={() => changePage(page - 1)}
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link"
              href="#aaa"
              aria-label="Previous"
              onClick={() => changePage(1)}
            >
              <span aria-hidden="true">Đầu</span>
            </a>
          </li>

          {getVisiblePages(page, totalPages).map((p) => (
            <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
              <a
                className="page-link"
                href="#aaa"
                onClick={() => changePage(p)}
              >
                {p}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              href="#aaa"
              aria-label="Previous"
              onClick={() => changePage(totalPages)}
            >
              <span aria-hidden="true">Cuối</span>
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link"
              href="#aaa"
              aria-label="Next"
              onClick={() => changePage(page + 1)}
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
