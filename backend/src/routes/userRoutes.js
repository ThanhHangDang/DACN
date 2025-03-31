const express = require("express");

const {
  getListEmployee,
  getEmployeeDetail,

  getUserInformation,
  getExperienceByID,
  getEducationByID,
  getSkillByID,
  getLanguageByID,
  getCertificateByID,
  getProjectByID,
  getJobAppliedByID,
  getJobSavedByID,
  getFollowedCompanyByID,
  getCompanyInformation,

  updateJobseekerProfileImage,
  updateJobseekerProfile,
  updateExpectedJob,
  updateCareerTarget,
  addExperience,
  addEducation,
  addProject,
  addSkill,
  addCertification,

  deleteExperience,
  deleteEducation,
  deleteProject,
  deleteSkill,
  deleteLanguage,
  deleteCertification,

  getNotificationByID,
} = require("../controllers/userControllers.js");

const { upload } = require("../middleware/imageUpload.js");

const userRoutes = express.Router();

userRoutes.get("/get-list-employee", getListEmployee);
userRoutes.get("/get-employee-detail", getEmployeeDetail);

userRoutes.get("/user-information", getUserInformation);
userRoutes.get("/get-experience", getExperienceByID);
userRoutes.get("/get-education", getEducationByID);
userRoutes.get("/get-skill", getSkillByID);
userRoutes.get("/get-language", getLanguageByID);
userRoutes.get("/get-certification", getCertificateByID);
userRoutes.get("/get-project", getProjectByID);
userRoutes.get("/get-job-applied", getJobAppliedByID);
userRoutes.get("/get-job-saved", getJobSavedByID);
userRoutes.get("/get-followed-company", getFollowedCompanyByID);

userRoutes.get("/get-employer-information", getCompanyInformation);

userRoutes.post(
  "/update-jobseeker-profile-image",
  upload.single("image"),
  updateJobseekerProfileImage
);
userRoutes.post("/update-jobseeker-profile", updateJobseekerProfile);
userRoutes.post("/update-expected-job", updateExpectedJob);
userRoutes.post("/update-career-target", updateCareerTarget);
userRoutes.post("/add-experience", addExperience);
userRoutes.post("/add-education", addEducation);
userRoutes.post("/add-project", addProject);
userRoutes.post("/add-skill", addSkill);
userRoutes.post("/add-certification", addCertification);

userRoutes.delete("/delete-experience", deleteExperience);
userRoutes.delete("/delete-education", deleteEducation);
userRoutes.delete("/delete-project", deleteProject);
userRoutes.delete("/delete-skill", deleteSkill);
userRoutes.delete("/delete-language", deleteLanguage);
userRoutes.delete("/delete-certification", deleteCertification);

userRoutes.get("/get-notification-by-user-id", getNotificationByID);

module.exports = userRoutes;
