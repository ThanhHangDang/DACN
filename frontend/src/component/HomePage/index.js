import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useGetLeadingCompaniesQuery, useGetLatestWorkQuery } from "../../redux_toolkit/guestApi.js";
import { useGetTimeQuery } from "../../redux_toolkit/CategoryApi.js";
export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: data_leadingCompany } = useGetLeadingCompaniesQuery({paging_size:5});
  const { data: latestWorkResponse, isLoading, isError, error } = useGetLatestWorkQuery({paging_size:27});
  const latestWork = latestWorkResponse?.jobs || [];
  // const totalWorksPages = latestWorkResponse?.totalWorksPages || 0;
  
  const leadingCompany = data_leadingCompany?.companies; // Access the jobs property from the API response
  const { currentDate } = useGetTimeQuery();

  const { isLogin, user } = useSelector((state) => state.auth);

  const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

  const pageSize = 9;
  const totalPages = latestWork ? Math.ceil(latestWork.length / pageSize) : 0;

  useEffect(() => {
    if (isLogin && user?.user?.role === 2) {
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
    window.scrollTo({ top: document.getElementById('latestJobs').offsetTop - 100, behavior: 'smooth' });
    console.log(`Chuyển sang trang ${page}`);
  };

  const PaginationFeaturedJobs = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;
    
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Page dots only */}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""} m-1`}
            >
              <button
                className="page-link dot"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  padding: 0,
                  margin: '0 5px'
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
      <div className="bg-primary pt-4">
        <section className="container">
          {/* Search */}
          <form
            className="d-flex mb-4 rounded-5"
            style={{ backgroundColor: "#fff" }}
          >
            <input
              className="form-control me-2 rounded-start-5"
              type="search"
              placeholder="Vị trí tuyển dụng, tên công ty"
              aria-label="Search"
            />

            <div className="d-flex align-items-center col-2 me-2 border-end">
              <i className="bi bi-geo-alt-fill me-2"></i>
              <span className="md-display-none">Tất cả địa điểm</span>
            </div>

            <button
              className="btn btn-outline-info rounded-5 d-flex align-items-center col-1"
              type="submit"
            >
              <i className="bi bi-search me-2"></i>
              <span className="md-display-none">Search</span>
            </button>
          </form>

          {/* Carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>
            <div className="carousel-inner rounded-5">
              <div className="carousel-item active">
                <img
                  src="./img/carousel-banner/banner1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./img/carousel-banner/banner1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./img/carousel-banner/carousel12.png"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Công ty hàng đầu */}
          <div className="pb-4">
            <h3 className="mb-3">Công ty hàng đầu</h3>
            <div className="row d-flex justify-content-lg-between justify-content-md-start justify-content-sm-center m-4">
              {renderLeadingCompany()}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-light pb-4">
        <div className="pt-4"></div>
        {/* Việc làm tốt nhất */}
        <section id="latestJobs" className="container border border-primary rounded-3 mt-4">
          <div className="d-flex border-bottom border-primary justify-content-between align-items-center mb-2">
            <h3>Việc làm mới nhất</h3>
            <NavLink to="/post" className="text-primary">
              Xem tất cả
            </NavLink>
          </div>

          <div className="row d-flex justify-content-center">
            {latestWork && latestWork.length > 0 ? renderLatestWork() : (
              <div className="text-center py-4">
                <p>Không có việc làm mới</p>
              </div>
            )}
          </div>

          {/* Thanh pagination */}
          <div className="container mt-2 mb-3">
            <PaginationFeaturedJobs
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChangeFeaturedJobs}
            />
          </div>
        </section>
      </div>

      <div className="pb-4">
        <div className="pt-4"></div>
        {/* Thông tin thị trường */}
        <section className="container border border-primary rounded-3 bg-primary mb-3">
          <h3 className="mb-3 text-white">
            Thị trường việc làm hôm nay {currentDate}
          </h3>
          <div className="row d-flex justify-content-md-between justify-content-sm-center m-2">
            <div className="col-md-3 col-sm-10 backgound-item-info text-white rounded-2 m-2">
              <h3>2.368</h3>
              <p>Việc làm mới nhất 24h gần nhất</p>
            </div>
            <div className="col-md-3 col-sm-10 backgound-item-info text-white rounded-2 m-2">
              <h3>2.368</h3>
              <p>Việc làm dang tuyển</p>
            </div>
            <div className="col-md-3 col-sm-10 backgound-item-info text-white rounded-2 m-2">
              <h3>2.368</h3>
              <p>Công ty đang tuyển</p>
            </div>
          </div>
        </section>

        {/* Xây dựng thương hiệu cá nhân với công cụ của chúng tôi */}
        <section className="container border border-primary rounded-3 bg-light">
          <h3 className="mb-3 text-primary">
            Xây dựng thương hiệu cá nhân với công cụ của chúng tôi
          </h3>

          <div className="row d-flex justify-content-md-between justify-content-sm-center m-2">
            <div className="col-md-5 col-sm-10 backgound-item-info text-white rounded-2 m-4 p-4">
              <h3>Boost Career Profile</h3>
              <p>
                HDN Team Profile là bản hồ sơ năng lực giúp bạn xây dựng thương
                hiệu cá nhân, thể hiện thế mạnh của bản thân thông qua việc đính
                kèm học vấn, kinh nghiệm, dự án, kỹ năng,... của mình
              </p>
              <button className="btn btn-primary text-white float-end">
                Tạo profile<i className="bi bi-arrow-right fs-10 ms-2"></i>
              </button>
            </div>
            <div className="col-md-5 col-sm-10 backgound-item-info text-white rounded-2 m-4 p-4">
              <h3>Xây dựng lộ trình sự nghiệp</h3>
              <p>
                HDN Team Profile là bản hồ sơ năng lực giúp bạn xây dựng thương
                hiệu cá nhân, thể hiện thế mạnh của bản thân thông qua việc đính
                kèm học vấn, kinh nghiệm, dự án, kỹ năng,... của mìnhn
              </p>
              <button className="btn btn-primary text-white float-end">
                Xây dựng<i className="bi bi-arrow-right fs-10 ms-2"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
