const express = require("express");

const {
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
  updateExpectedJob,
  updateCareerTarget,
  addExperience,
  addEducation,
  addProject,
  deleteExperience,
} = require("../controllers/userControllers.js");

const userRoutes = express.Router();

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

userRoutes.post("/update-expected-job", updateExpectedJob);
userRoutes.post("/update-career-target", updateCareerTarget);
userRoutes.post("/add-experience", addExperience);
userRoutes.post("/add-education", addEducation);
userRoutes.post("/add-project", addProject);

userRoutes.delete("/delete-experience", deleteExperience);

module.exports = userRoutes;
