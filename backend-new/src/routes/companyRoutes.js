const express = require("express");

const {
  getLeadingCompany,
  getCompanySaveJobseeker,
  postJob,
  editJob,
  getAllCompany,
} = require("../controllers/companyControllers.js");

const companyRoutes = express.Router();

companyRoutes.get("/get-all-company", getAllCompany);

companyRoutes.get("/get-leading-company", getLeadingCompany);
companyRoutes.get("/get-company-save-jobseeker", getCompanySaveJobseeker);
companyRoutes.post("/post-job", postJob);
companyRoutes.get("/edit-job", editJob);

module.exports = companyRoutes;
