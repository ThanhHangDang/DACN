const express = require("express");

const authencationRoutes = require("./authencationRoutes.js");
const workRoutes = require("./workRoutes.js");
const companyRoutes = require("./companyRoutes.js");
const userRoutes = require("./userRoutes.js");
const categoryRoutes = require("./categoryRoutes.js");

const routes = express();

routes.use("/auth", authencationRoutes);
routes.use("/work", workRoutes);
routes.use("/company", companyRoutes);
routes.use("/user", userRoutes);
routes.use("/category", categoryRoutes);

module.exports = routes;
