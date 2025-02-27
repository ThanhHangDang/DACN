const {
  queryGetLeadingCompany,
  queryPostJob,
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
    res.status(500);
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
      res.status(500);
    }
  } catch (error) {
    console.log("Get Leading Company error:", error);
    res.status(500);
  }
};

const getCompanySaveJobseeker = async (req, res) => {};

module.exports = { getLeadingCompany, getCompanySaveJobseeker, postJob };
