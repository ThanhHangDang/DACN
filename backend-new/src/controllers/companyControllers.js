const {
  queryGetLeadingCompany,
  queryPostJob,
  queryEditJob,
  queryGetAllCompany,
  queryGetCountTotalCompany,
} = require("../models/companyModels.js");

const { queryGetWorkByUser } = require("../models/workModel.js");

const getAllCompany = async (req, res) => {
  console.log("Get All Company:", req.query);
  const page = parseInt(req.query.page);
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const company = await queryGetAllCompany(limit, offset);
    const total = await queryGetCountTotalCompany();
    const totalPages = Math.ceil(total[0].total / limit);
    console.log("total", total[0].total);
    if (company) {
      console.log("tra ve");
      return res.status(200).json({ company, totalPages });
    }
    return res.status(404).json({ message: "No companies found" });
  } catch (error) {
    console.log("Get All Company error:", error);
    return res.status(500);
  }
};

const getLeadingCompany = async (req, res) => {
  try {
    const data = await queryGetLeadingCompany();

    if (data) {
      return res.status(200).json({data});
    }
    return res.status(404).json({ message: "No leading company found" });
  } catch (error) {
    console.log("Get Leading Company error:", error);
    return res.status(500);
  }
};

const postJob = async (req, res) => {
  try {
    const data = req.body;
    const job_id = await queryPostJob(data);
    if (job_id) {
      const work = await queryGetWorkByUser(data.employer_id);
      return res.status(200).json({ work });
    } else {
      console.log("Post Job error:", error);
      return res.status(500).json({ error: "Đăng bài thất bại!" });
    }
  } catch (error) {
    console.log("Post Job error: ", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

const editJob = async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);
    const job_id = await queryEditJob(data);
    if (job_id) {
      const work = await queryGetWorkByUser(data.employer_id);
      return res.status(200).json({ work });
    } else {
      console.log("Edit Job error:", error);
      return res.status(500).json({ error: "Chỉnh sửa bài thất bại!" });
    }
  } catch (error) {
    console.log("Edit Job error: ", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

const getCompanySaveJobseeker = async (req, res) => {};

module.exports = {
  getAllCompany,

  getLeadingCompany,
  getCompanySaveJobseeker,
  postJob,
  editJob,
};
