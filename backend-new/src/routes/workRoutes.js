const express = require("express");

const {
  getLatestWork,
  getWorkDetail,
  getAllWorks,
  getWorkByUser,
  getWorkBySearch,
  deleteWorkByUser,
} = require("../controllers/workControllers.js");

const workRoutes = express.Router();

workRoutes.get("/get-latest-work", getLatestWork);
workRoutes.get("/get-work-detail", getWorkDetail);
workRoutes.get("/get-all-works", getAllWorks);
workRoutes.get("/get-works-by-user", getWorkByUser);
workRoutes.get("/get-works-by-search", getWorkBySearch);

workRoutes.delete("/delete-work-by-user", deleteWorkByUser);

module.exports = workRoutes;
