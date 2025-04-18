const express = require("express");
const notificationRoutes = express.Router();

const { 
//   getListNotificationByUser, 
//   updateNotificationByUser ,
  getNotifications
} = require("../controllers/notificationControllers.js");


notificationRoutes.get("/user", getNotifications); // lấy danh sách thông báo
notificationRoutes.put("/", getNotifications); // dùng để đánh dấu đã đọc thông báo

// module.exports = notificationRoutes;
module.exports = notificationRoutes ;