const {
  queryGetLeadingCompany,
  queryPostJob,
  queryEditJob,
} = require("../models/companyModels.js");

const { queryGetWorkByUser } = require("../models/workModel.js");

const getLeadingCompany = async (req, res) => {
  try {
    const company = await queryGetLeadingCompany();

    if (company) {
      return res.status(200).json({ company });
    }
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
  getLeadingCompany,
  getCompanySaveJobseeker,
  postJob,
  editJob,
};
