const {
  queryGetUserInformation,
  queryGetExperienceByID,
  queryGetEducationByID,
  queryGetProjectByID,
  queryGetSkillByID,
  queryGetLanguageByID,
  queryGetCertificateByID,
  queryGetJobAppliedByID,
  queryGetJobSavedByID,
  queryGetFollowedCompanyByID,
  queryGetCompanyInformation,
} = require("../models/userModels.js");

const getUserInformation = async (req, res) => {
  const id = req.query.id;
  try {
    const userInfor = await queryGetUserInformation(id);
    if (userInfor) {
      return res.status(200).json({ userInfor });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin user:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin user." });
  }
};

const getExperienceByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const experience = await queryGetExperienceByID(id);
    if (experience) {
      console.log(experience);
      return res.status(200).json({ experience });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin kinh nghiệm:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin kinh nghiệm." });
  }
};

const getEducationByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const education = await queryGetEducationByID(id);
    if (education) {
      console.log(education);
      return res.status(200).json({ education });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin học vấn:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin học vấn." });
  }
};

const getProjectByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const project = await queryGetProjectByID(id);
    if (project) {
      console.log(project);
      return res.status(200).json({ project });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin dự án:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin dự án." });
  }
};

const getSkillByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const skill = await queryGetSkillByID(id);
    if (skill) {
      console.log(skill);
      return res.status(200).json({ skill });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin kỹ năng:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin kỹ năng." });
  }
};

const getLanguageByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const language = await queryGetLanguageByID(id);
    if (language) {
      console.log(language);
      return res.status(200).json({ language });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin ngôn ngữ:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin ngôn ngữ." });
  }
};

const getCertificateByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const certificate = await queryGetCertificateByID(id);
    if (certificate) {
      console.log(certificate);
      return res.status(200).json({ certificate });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin chứng chỉ:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin chứng chỉ." });
  }
};

const getJobAppliedByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const jobApplied = await queryGetJobAppliedByID(id);
    if (jobApplied) {
      console.log(jobApplied);
      return res.status(200).json({ jobApplied });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công việc đã ứng tuyển:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công việc đã ứng tuyển." });
  }
};

const getJobSavedByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const jobSaved = await queryGetJobSavedByID(id);
    if (jobSaved) {
      console.log(jobSaved);
      return res.status(200).json({ jobSaved });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công việc đã lưu:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công việc đã lưu." });
  }
};

const getFollowedCompanyByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const companySaved = await queryGetFollowedCompanyByID(id);
    if (companySaved) {
      console.log(companySaved);
      return res.status(200).json({ companySaved });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công ty đã theo dõi:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công ty đã theo dõi." });
  }
};

const getCompanyInformation = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const companyInfor = await queryGetCompanyInformation(id);
    if (companyInfor) {
      console.log(companyInfor);
      return res.status(200).json({ companyInfor });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công ty:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin công ty." });
  }
};

module.exports = {
  getUserInformation,
  getExperienceByID,
  getEducationByID,
  getProjectByID,
  getSkillByID,
  getLanguageByID,
  getCertificateByID,
  getJobAppliedByID,
  getJobSavedByID,
  getFollowedCompanyByID,
  getCompanyInformation,
};
