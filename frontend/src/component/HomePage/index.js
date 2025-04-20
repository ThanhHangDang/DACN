import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetLeadingCompaniesQuery,
  useGetLatestWorkQuery,
} from "../../redux_toolkit/guestApi.js";
import { useGetTimeQuery } from "../../redux_toolkit/CategoryApi.js";

import HeroSection from "../../component/_component/ui/homepage/CarouselSection.js";
import RecentJobSection from "../../component/_component/ui/homepage/RecentJobSection.js";
import MainCategorySection from "../../component/_component/ui/homepage/MainCategorySection.js";
import BeOurEmployer from "../../component/_component/ui/homepage/BeOurEmployer.js";
import FounderSection from "../../component/_component/ui/homepage/OurFounder.js";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: leadingCompany } = useGetLeadingCompaniesQuery();
  const { data: latestWorkResponse } = useGetLatestWorkQuery();
  const { currentDate } = useGetTimeQuery();

  const { isLogin, user } = useSelector((state) => state.auth);

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  const pageSize = 9;
  const totalPages = latestWork ? Math.ceil(latestWork.length / pageSize) : 0;

  useEffect(() => {
    if (isLogin && user?.role === 2) {
      navigate("/employer-overview");
    }
  }, [dispatch]);

  // Inside your component
  if (isLoading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  if (isError) {
    console.error("Error fetching latest jobs:", error);
    return <div className="text-center py-4">Không thể tải dữ liệu. Vui lòng thử lại sau.</div>;
  }

  // Pagination
  const currentWorks = latestWork?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChangeFeaturedJobs = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("latestJobs").offsetTop - 100,
      behavior: "smooth",
    });
    console.log(`Chuyển sang trang ${page}`);
  };

  const PaginationFeaturedJobs = ({
    totalPages,
    currentPage,
    onPageChange,
  }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Page dots only */}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${
                currentPage === page ? "active" : ""
              } m-1`}
            >
              <button
                className="page-link dot"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  padding: 0,
                  margin: "0 5px",
                }}
              />
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderLatestWork = () => {
    if (!latestWork || latestWork.length === 0) {
      return (
        <div className="text-center py-4">
          <p>Không có việc làm mới</p>
        </div>
      );
    }
    
    return currentWorks?.map((work, index) => {
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

  const renderLeadingCompany = () => {
    if (!leadingCompany || leadingCompany.length === 0) {
      return <div>Chưa có thông tin công ty</div>;
    }
    return leadingCompany?.map((company, index) => {
      return (
        <div
          key={company.Company_ID}
          className="card col-lg-2 col-md-3 m-md-2 col-sm-10 align-items-center m-sm-4"
        >
          <img
            src={company.logo}
            className="card-img-top mt-2"
            alt="..."
            style={{ width: "80%", minHeight: "150px" }}
          />
          <div className="card-body text-center">
            <h5
              className="card-title text-truncate"
              style={{ maxWidth: "200px" }}
            >
              {company.company_name}
            </h5>
            <p className="btn btn-primary">Việc mới</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <HeroSection logo={leadingCompany} />
      <RecentJobSection job={latestWork} />
      <MainCategorySection />
      <BeOurEmployer />
      <FounderSection />
    </>
  );
}
