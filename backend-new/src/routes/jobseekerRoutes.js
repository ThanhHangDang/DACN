const express = require("express");
const {
  getItemProfile,
  deleteItemProfile,
  addItemProfile,
  updateItemProfile,
  updateJobseekerProfileImage,
  addResume,
  getResume,
  deleteResume,
  getListJobApplication,
  applyToJob,
  addCompanyReview,
  getListCompanyFollowing,
  deleteCompanyFollowing,
  addCompanyFollowing,
  getListJobSaving,
  addJobSaving,
  deleteJobSaving
} = require("../controllers/jobseekerControllers.js");

const { upload } = require("../middlewares/imageUpload.js");

const jobseekerRoutes = express.Router();

jobseekerRoutes.get("/profile", getItemProfile);
jobseekerRoutes.post("/profile", addItemProfile);
jobseekerRoutes.put("/profile", updateItemProfile);
jobseekerRoutes.delete("/profile", deleteItemProfile);
jobseekerRoutes.post("/avatar-imagine", upload.single("image"), updateJobseekerProfileImage);

jobseekerRoutes.post("/cv", upload.single("resume"), addResume);
jobseekerRoutes.get("/cv", getResume);
jobseekerRoutes.delete("/cv", deleteResume);

jobseekerRoutes.get("/job-applications", getListJobApplication); // lấy
jobseekerRoutes.post("/job-application", applyToJob);

jobseekerRoutes.post("/company-rating", addCompanyReview); // đánh giá công ty
jobseekerRoutes.get("/company-following", getListCompanyFollowing); // lấy danh sách công ty đã theo dõi
jobseekerRoutes.delete("/company-following", deleteCompanyFollowing); // bỏ theo dõi công ty
jobseekerRoutes.post("/company-following", addCompanyFollowing); // theo dõi công ty

jobseekerRoutes.get("/job-saving", getListJobSaving); // lấy danh sách việc làm đã lưu
jobseekerRoutes.post("/job-saving", addJobSaving); // thêm việc làm vào danh sách đã lưu
jobseekerRoutes.delete("/job-saving", deleteJobSaving); // xóa việc làm đã lưu

module.exports = jobseekerRoutes;






