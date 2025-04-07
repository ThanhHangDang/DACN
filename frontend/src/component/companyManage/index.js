import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllCompany } from "../../redux/actions/companyAction.js";
import {
  getCategoryIndustry,
  getCategoryCity,
} from "../../redux/actions/categoryAction";

import CompanyCard from "../../component/_component/ui/CompanyCard.js";

export default function ListCompany() {
  const dispatch = useDispatch();
  const { listCompany, totalPagesOfAllCompany } = useSelector(
    (state) => state.company
  );
  const { industry, city } = useSelector((state) => state.category);

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
    dispatch(getAllCompany(page));
    setTotalPages(totalPagesOfAllCompany);
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(getCategoryIndustry());
    dispatch(getCategoryCity(84));
  }, []);

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="/">Trang chủ</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Danh sách công ty
          </li>
        </ol>
      </nav>

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
        <h5 className="mb-0">Công ty nổi bật ({listCompany.length})</h5>
        <div>
          <select className="form-select form-select-sm d-inline-block w-auto me-2">
            <option>Tất cả lĩnh vực</option>
            {industry?.map((option) => (
              <option value={option.industry_id} key={option.industry_id}>
                {option.industry_name}
              </option>
            ))}
          </select>
          <select className="form-select form-select-sm d-inline-block w-auto">
            <option>Địa điểm</option>
            {city?.map((option) => (
              <option value={option.city_id} key={option.city_id}>
                {option.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {listCompany?.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}

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
    </div>
  );
}
