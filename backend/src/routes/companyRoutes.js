const express = require("express");

const {
  getLeadingCompany,
  getCompanySaveJobseeker,
  postJob,
} = require("../controllers/companyControllers.js");

const companyRoutes = express.Router();

companyRoutes.get("/get-leading-company", getLeadingCompany);
companyRoutes.get("/get-company-save-jobseeker", getCompanySaveJobseeker);
companyRoutes.post("/post-job", postJob);

module.exports = companyRoutes;
