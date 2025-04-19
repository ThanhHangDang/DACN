import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGetAllCompaniesQuery } from "../../../redux_toolkit/guestApi.js";
import { useGetIndustriesQuery, useGetCitiesQuery } from "../../../redux_toolkit/CategoryApi.js";
import CompanyCard from "../../_component/ui/CompanyCard.js";

export default function ListCompany() {
  const [page, setPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false); // Add this near the top of your component

  // Add more detailed query information
  const { data, isLoading: companiesLoading, isError, error, refetch } = useGetAllCompaniesQuery({ paging_size: 12, active_page: page });
  const { data: industries } = useGetIndustriesQuery();
  const { data: cities } = useGetCitiesQuery(84); // 84 là mã quốc gia Việt Nam

  const { companies: listCompany, totalPages } = data || { companies: [], totalPages: 1 };
  // Lấy dữ liệu trực tiếp từ kết quả query

  const getVisiblePages = (currentPage, totalPages) => {
    const delta = 2; // Number of pages to show on each side
    let range = [];
    
    // Calculate start and end page
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);
    
    // Adjust if we're at the beginning or end
    if (currentPage <= delta) {
      end = Math.min(totalPages, 2 * delta + 1);
    } else if (currentPage >= totalPages - delta) {
      start = Math.max(1, totalPages - 2 * delta);
    }
    
    // Generate page numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      console.log(`Changing to page ${newPage}`); // Debug log
      setIsPageChanging(true);
      setPage(newPage);
      // Scroll to top for better UX
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    console.log("Current page:", page);
    console.log("API data received:", data);
    console.log("Companies:", listCompany);
    console.log("Total pages:", totalPages);
    
    if (data) {
      setIsPageChanging(false);
    }
  }, [data, page]); // Reset the indicator when data changes

  const PaginationComponent = () => {
    // Don't render pagination if there are no companies or only one page
    if (!listCompany?.length || totalPages <= 1) return null;
    
    // Calculate visible pages
    const visiblePages = getVisiblePages(page, totalPages);
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;
    
    return (
      <nav className="d-flex justify-content-center mt-4" aria-label="Page navigation">
        <ul className="pagination">
          {/* Previous button */}
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => page > 1 && changePage(page - 1)}
              disabled={page === 1}
            >
              &laquo;
            </button>
          </li>
          
          {/* First page button */}
          {showStartEllipsis && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(1)}
              >
                1
              </button>
            </li>
          )}
          
          {/* Start ellipsis */}
          {showStartEllipsis && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          
          {/* Page numbers */}
          {visiblePages.map(p => (
            <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => changePage(p)}
              >
                {p}
              </button>
            </li>
          ))}
          
          {/* End ellipsis */}
          {showEndEllipsis && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          
          {/* Last page button */}
          {showEndEllipsis && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          )}
          
          {/* Next button */}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => page < totalPages && changePage(page + 1)}
              disabled={page === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
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
          {isPageChanging ? ( // In your JSX where you render the company list
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="ms-2">Đang tải trang {page}...</span>
            </div>
          ) : (
            <div className="row">
              {listCompany?.length > 0 ? (
                listCompany.map((company, index) => (
                  <CompanyCard key={index} company={company} />
                ))
              ) : (
                <p className="text-center py-3">Không tìm thấy công ty nào</p>
              )}
            </div>
          )}

          {listCompany?.length > 0 && <PaginationComponent />}
        </>
      )}
    </div>
  );
}
