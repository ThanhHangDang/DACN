const express = require("express");

const {
  getCategory_Industry,
  getCategory_Jobfunction,
  getCatalog_Benefit,
  getCategory_Nation,
  getCategory_City,
  getCategory_District,
  getCategory_Language,
  getCategory_Level,
  getCategory_Scale,
  getCategory_Tags,
  getCategory_Education,
  gettime,
} = require("../controllers/categoryController.js");

const categoryRoutes = express.Router();

categoryRoutes.get("/getCategory_Industry", getCategory_Industry);
categoryRoutes.get("/getCategory_Jobfunction", getCategory_Jobfunction);
categoryRoutes.get("/getCatalog_Benefit", getCatalog_Benefit);
categoryRoutes.get("/getCategory_Nation", getCategory_Nation);
categoryRoutes.get("/getCategory_City", getCategory_City);
categoryRoutes.get("/getCategory_District", getCategory_District);
categoryRoutes.get("/getCategory_Language", getCategory_Language);
categoryRoutes.get("/getCategory_Level", getCategory_Level);
categoryRoutes.get("/getCategory_Scale", getCategory_Scale);
categoryRoutes.get("/getCategory_Tags", getCategory_Tags);
categoryRoutes.get("/getCategory_Education", getCategory_Education);
categoryRoutes.get("/get-time", gettime);
module.exports = categoryRoutes;
