const {
  queryGetLeadingCompany,
  queryPostJob,
} = require("../models/companyModels.js");

const getLeadingCompany = async (req, res) => {
  try {
    const company = await queryGetLeadingCompany();

    if (company) {
      return res.status(200).json({ company });
    }
  } catch (error) {
    console.log("Get Leading Company error:", error);
    res.status(500);
  }
};

const postJob = async (req, res) => {
  try {
    const data = req.body;
    const job_id = await queryPostJob(data);

    if (job_id) {
      return res.status(200).json({ job_id });
    }
  } catch (error) {
    console.log("Get Leading Company error:", error);
    res.status(500);
  }
};

const getCompanySaveJobseeker = async (req, res) => {};

module.exports = { getLeadingCompany, getCompanySaveJobseeker, postJob };
