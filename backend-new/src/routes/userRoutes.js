const express = require("express");

const {
  getListEmployee,
  getEmployeeDetail,
  getCompanyInformation,
  updateJobseekerProfileImage,
  getItemProfile,
  deleteItemProfile,
  addItemProfile,
  updateItemProfile,
  getNotificationByID,
} = require("../controllers/userControllers.js");

const { upload } = require("../middleware/imageUpload.js");

const userRoutes = express.Router();

userRoutes.get("/get-list-employee", getListEmployee);
userRoutes.get("/get-employee-detail", getEmployeeDetail);
userRoutes.get("/get-employer-information", getCompanyInformation);

userRoutes.post("/update-jobseeker-profile-image", upload.single("image"), updateJobseekerProfileImage);

userRoutes.get("/profile", getItemProfile);
userRoutes.post("/profile", addItemProfile);
userRoutes.put("/profile", updateItemProfile);
userRoutes.delete("/profile", deleteItemProfile);

userRoutes.get("/get-notification-by-user-id", getNotificationByID);

module.exports = userRoutes;
