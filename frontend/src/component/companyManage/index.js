import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetAllCompaniesQuery } from "../../redux_toolkit/guestApi";
import { useGetIndustriesQuery, useGetCitiesQuery } from "../../redux_toolkit/CategoryApi";
import CompanyCard from "../../component/_component/ui/CompanyCard.js";

export default function ListCompany() {
  const [page, setPage] = useState(1);
  
  // Sử dụng RTK Query hooks thay vì dispatch actions
  const { data: companiesData, isLoading: companiesLoading } = useGetAllCompaniesQuery(page);
  const { data: industries } = useGetIndustriesQuery();
  const { data: cities } = useGetCitiesQuery(84); // 84 là mã quốc gia Việt Nam
  
  // Lấy dữ liệu trực tiếp từ kết quả query
  const listCompany = companiesData?.companies || [];
  const totalPages = companiesData?.totalPages || 1;

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
        <h5 className="mb-0">
          {companiesLoading 
            ? "Đang tải dữ liệu..." 
            : `Công ty nổi bật (${listCompany.length})`
          }
        </h5>
        <div>
          <select className="form-select form-select-sm d-inline-block w-auto me-2">
            <option>Tất cả lĩnh vực</option>
            {industries?.map((industry) => (
              <option value={industry.industry_id} key={industry.industry_id}>
                {industry.industry_name}
              </option>
            ))}
          </select>
          <select className="form-select form-select-sm d-inline-block w-auto">
            <option>Địa điểm</option>
            {cities?.map((city) => (
              <option value={city.city_id} key={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {companiesLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải danh sách công ty...</p>
        </div>
      ) : (
        <>
          <div className="row">
            {listCompany?.length > 0 ? (
              listCompany.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))
            ) : (
              <p className="text-center py-3">Không tìm thấy công ty nào</p>
            )}
          </div>

          {listCompany?.length > 0 && (
            <nav
              className="d-flex justify-content-center mt-4"
              aria-label="Page navigation example"
            >
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                  >
                    <span aria-hidden="true">«</span>
                  </button>
                </li>

                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    aria-label="First"
                    onClick={() => changePage(1)}
                    disabled={page === 1}
                  >
                    <span aria-hidden="true">Đầu</span>
                  </button>
                </li>

                {getVisiblePages(page, totalPages).map((p) => (
                  <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => changePage(p)}
                    >
                      {p}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    aria-label="Last"
                    onClick={() => changePage(totalPages)}
                    disabled={page === totalPages}
                  >
                    <span aria-hidden="true">Cuối</span>
                  </button>
                </li>

                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                  >
                    <span aria-hidden="true">»</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
