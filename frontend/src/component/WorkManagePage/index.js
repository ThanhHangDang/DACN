// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPosts } from "../../redux/actions/postAction";
// import { NavLink,
//   // useNavigate
// } from "react-router-dom";

// import { getPostsSearch } from "../../redux/actions/postAction";
// // import {
// //   getCategoryIndustry,
// //   getCategoryJobFunction,
// //   getCategoryCity,
// // } from "../../redux/actions/categoryAction";
// import { useGetCitiesQuery, useGetIndustriesQuery,useGetJobFunctionQuery } from "../../redux_toolkit/CategoryApi";

// export default function WorkMangePage() {
//   const dispatch = useDispatch();
//   const { allPosts, totalWorksPages } = useSelector((state) => state.post);
// const {data: city} = useGetCitiesQuery(84); // 84 là mã quốc gia Việt Nam
// const {data: industry} = useGetIndustriesQuery();
// const {data: jobFunction} = useGetJobFunctionQuery();

//   // const { industry, jobFunction, city } = useSelector(
//   //   (state) => state.category
//   // );

//   console.log("city", city);

//   const [filter, setFilter] = useState({
//     title: "",
//     industry: "",
//     job_function: "",
//     work_location: "",
//     salary_max: "",
//     salary_min: "",
//     level_id: "",
//     require_marital_status: "",
//     require_gender: "",
//     require_age_min: "",
//     require_age_max: "",
//     education_at_least: 0,
//     require_experience: 0,
//     is_active: 1,
//     date_post: "",
//   });

//   const formatNumberToTr = (number) => `${(number / 1e6).toFixed(0)}tr`;

//   const handleSearch = (e) => {
//     e.preventDefault();
//     dispatch(getPostsSearch(filter));
//   };

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const getVisiblePages = (page, totalPages) => {
//     let start = Math.max(1, page - 2);
//     let end = Math.min(totalPages, page + 2);

//     if (end - start < 4) {
//       if (start === 1) {
//         end = Math.min(totalPages, start + 4);
//       } else if (end === totalPages) {
//         start = Math.max(1, end - 4);
//       }
//     }

//     const pages = [];
//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   const changePage = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   useEffect(() => {
//     dispatch(getAllPosts(page));

//     setTotalPages(totalWorksPages);
//   }, [page, dispatch]);

//   const renderJob = () => {
//     return allPosts?.map((job, index) => {
//       return (
//         <div
//           key={job.job_id}
//           className="row d-flex align-items-center border rounded-3 p-3 mb-3 bg-light"
//           style={{ borderLeft: "5px solid #0d6efd" }}
//         >
//           {/* Logo */}
//           <div className="col-md-3 align-self-center ">
//             <img
//               src={job.company_logo ? job.company_logo : job.logo}
//               alt={job.company}
//               className="img-fluid rounded-2"
//               style={{ maxHeight: 100, maxWidth: 100 }}
//             />
//           </div>
//           {/* Job Details */}
//           <div className="flex-grow-1 col-md-6">
//             <NavLink
//               to={`/post-detail/${job.job_id}`}
//               className="text-decoration-none"
//             >
//               <h5 className="text-primary text-decoration-none">{job.title}</h5>
//             </NavLink>
//             <p className="mb-1 fw-bold">{job.company_name}</p>
//             <p className="mb-1 text-danger">
//               {formatNumberToTr(job?.salary_min)}-
//               {formatNumberToTr(job?.salary_max)} đ/tháng
//             </p>
//             <p className="mb-0 text-muted">{job.work_location_name}</p>
//           </div>
//           {/* Favorite Icon */}
//           <div className="col-md-2 d-flex justify-content-end">
//             <button className="btn btn-outline-secondary">
//               <i className="bi bi-heart"></i>
//             </button>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div>
//       <div className="container mt-4">
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <NavLink to="/">Trang chủ</NavLink>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Danh sách việc làm
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="container bg-light p-4 rounded-3 shadow-sm mt-4 sticky">
//         <form>
//           <div className="row g-3">
//             {/* Tiêu đề tìm kiếm và nút Search */}
//             <div className="col-md-12 d-flex align-items-end">
//               <input
//                 type="text"
//                 className="form-control me-2"
//                 placeholder="Tiêu đề tin tuyển dụng"
//                 // disabled
//                 onChange={(e) =>
//                   setFilter({ ...filter, title: e.target.value })
//                 }
//               />
//               <button className="btn btn-primary d-flex" onClick={handleSearch}>
//                 Search <i className="bi bi-search ms-3"></i>
//               </button>
//             </div>

//             {/* Lĩnh vực */}
//             <div className="col-md-3">
//               <label className="form-label">Lĩnh vực</label>
//               <select
//                 className="form-select"
//                 onChange={(e) =>
//                   setFilter({ ...filter, industry: e.target.value })
//                 }
//               >
//                 {industry?.map((item, index) => (
//                   <option key={index} value={item.industry_id}>
//                     {item.industry_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Ngành nghề */}
//             <div className="col-md-3">
//               <label className="form-label">Ngành nghề</label>
//               <select
//                 className="form-select"
//                 onChange={(e) =>
//                   setFilter({ ...filter, job_function: e.target.value })
//                 }
//               >
//                 {jobFunction?.map((item, index) => (
//                   <option key={index} value={item.job_function_id}>
//                     {item.job_function_name}
//                   </option>
//                 ))}
//                 <option value="">Bất kỳ</option>
//               </select>
//             </div>

//             {/* Cấp bậc */}
//             <div className="col-md-3">
//               <label className="form-label">Cấp bậc</label>
//               <select className="form-select">
//                 <option value="">Bất kỳ</option>
//               </select>
//             </div>

//             {/* Số năm kinh nghiệm */}
//             <div className="col-md-3">
//               <label className="form-label">Số năm kinh nghiệm</label>
//               <input
//                 type="number"
//                 className="form-control me-2"
//                 placeholder="Năm kinh nghiệm"
//                 step={1}
//                 min={0}
//                 onChange={(e) =>
//                   setFilter({ ...filter, require_experience: e.target.value })
//                 }
//               />
//             </div>

//             {/* Địa điểm */}
//             <div className="col-md-3">
//               <label className="form-label">Địa điểm</label>
//               <select
//                 className="form-select"
//                 onChange={(e) =>
//                   setFilter({ ...filter, work_location: e.target.value })
//                 }
//               >
//                 {city?.map((item, index) => (
//                   <option key={index} value={item.city_id}>
//                     {item.city_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Mức lương */}
//             <div className="col-md-3">
//               <label className="form-label">Mức lương</label>
//               <div className="d-flex">
//                 <input
//                   type="number"
//                   className="form-control me-2"
//                   placeholder="Từ"
//                   step={1000000}
//                   min={1000000}
//                   onChange={(e) =>
//                     setFilter({ ...filter, salary_min: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Đến"
//                   step={1000000}
//                   min={1000000}
//                   onChange={(e) =>
//                     setFilter({ ...filter, salary_max: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             {/* Ngày đăng */}
//             <div className="col-md-3">
//               <label className="form-label">Ngày đăng</label>
//               <select className="form-select">
//                 <option value="">Bất kỳ</option>
//               </select>
//             </div>

//             {/* Hạn tin */}
//             <div className="col-md-3">
//               <label className="form-label">Hạn tin</label>
//               <select className="form-select">
//                 <option value="">Bất kỳ</option>
//               </select>
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="container mt-4">{renderJob()}</div>

//       <nav
//         className="d-flex justify-content-center mt-4"
//         aria-label="Page navigation example"
//       >
//         <ul className="pagination">
//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#aaa"
//               aria-label="Previous"
//               onClick={() => changePage(page - 1)}
//             >
//               <span aria-hidden="true">«</span>
//             </a>
//           </li>

//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#aaa"
//               aria-label="Previous"
//               onClick={() => changePage(1)}
//             >
//               <span aria-hidden="true">Đầu</span>
//             </a>
//           </li>

//           {getVisiblePages(page, totalPages).map((p) => (
//             <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
//               <a
//                 className="page-link"
//                 href="#aaa"
//                 onClick={() => changePage(p)}
//               >
//                 {p}
//               </a>
//             </li>
//           ))}

//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#aaa"
//               aria-label="Previous"
//               onClick={() => changePage(totalPages)}
//             >
//               <span aria-hidden="true">Cuối</span>
//             </a>
//           </li>

//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#aaa"
//               aria-label="Next"
//               onClick={() => changePage(page + 1)}
//             >
//               <span aria-hidden="true">»</span>
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const jobs = [
  {
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schulist Co",
    category: "Hotels & Tourism",
    type: "Full time",
    salary: "$40000-$42000",
    location: "New-York, USA",
  },
  {
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisokz - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los- Angeles, USA",
  },
  {
    time: "15 min ago",
    title: "Internal Integration Planner",
    company: "Mraz, Quigley and Feest Inc.",
    category: "Construction",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Texas, USA",
  },
  {
    time: "24 min ago",
    title: "District Intranet Director",
    company: "VonRueden - Weber Co",
    category: "Commerce",
    type: "Full time",
    salary: "$42000-$48000",
    location: "Florida, USA",
  },
  {
    time: "26 min ago",
    title: "Corporate Tactics Facilitator",
    company: "Cormier, Turner and Flatley Inc",
    category: "Commerce",
    type: "Full time",
    salary: "$38000-$40000",
    location: "Boston, USA",
  },
  {
    time: "30 min ago",
    title: "Forward Accounts Consultant",
    company: "Miller Group",
    category: "Financial services",
    type: "Full time",
    salary: "$45000-$48000",
    location: "Boston, USA",
  },
];

const JobCard = ({ job }) => (
  <div className="card mb-3 shadow-sm job-card">
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <span className="text-success small fw-semibold">{job.time}</span>
        <i className="bi bi-bookmark"></i>
      </div>
      <h5 className="card-title fw-bold">{job.title}</h5>
      <p className="card-text mb-2">{job.company}</p>
      <div className="d-flex flex-wrap gap-3 mb-2">
        <span className="badge bg-light text-dark">{job.category}</span>
        <span className="badge bg-light text-dark">{job.type}</span>
        <span className="badge bg-light text-dark">{job.salary}</span>
        <span className="badge bg-light text-dark">
          <i className="bi bi-geo-alt-fill me-1"></i>
          {job.location}
        </span>
      </div>
      <button className="btn btn-success btn-sm">Job Details</button>
    </div>
  </div>
);

const JobListing = () => {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h6 className="fw-bold mb-3">Search by Job Title</h6>
            <input
              className="form-control mb-3"
              placeholder="Job title or company"
            />
            <h6 className="fw-bold mb-2">Location</h6>
            <select className="form-select mb-3">
              <option>Choose city</option>
            </select>
            <h6 className="fw-bold mb-2">Category</h6>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="cat1" />
              <label className="form-check-label" htmlFor="cat1">
                Commerce
              </label>
            </div>
            <button className="btn btn-link p-0">Show More</button>

            <h6 className="fw-bold mt-3">Job Type</h6>
            {/* Add job type checkboxes */}

            <h6 className="fw-bold mt-3">Experience Level</h6>
            {/* Add experience checkboxes */}

            <h6 className="fw-bold mt-3">Date Posted</h6>
            {/* Add date checkboxes */}

            <h6 className="fw-bold mt-3">Salary</h6>
            <input type="range" className="form-range mb-2" />
            <div className="d-flex justify-content-between small">
              <span>$0</span>
              <span>$99999</span>
            </div>
            <button className="btn btn-outline-success btn-sm mt-2">
              Apply
            </button>

            <h6 className="fw-bold mt-3">Tags</h6>
            <div className="d-flex flex-wrap gap-2">
              {[
                "engineering",
                "design",
                "ui/ux",
                "marketing",
                "management",
              ].map((tag) => (
                <span key={tag} className="badge bg-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 text-center bg-secondary text-white rounded shadow-sm">
            <h5 className="fw-bold">WE ARE HIRING</h5>
            <p className="mb-0">Apply Today!</p>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-muted small">Showing 6-6 of 10 results</div>
            <select className="form-select form-select-sm w-auto">
              <option>Sort by latest</option>
            </select>
          </div>
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}

          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination pagination-sm">
              <li className="page-item">
                <button className="page-link">1</button>
              </li>
              <li className="page-item active">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
